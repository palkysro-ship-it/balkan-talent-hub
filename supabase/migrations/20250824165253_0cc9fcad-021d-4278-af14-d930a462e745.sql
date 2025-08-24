-- BalkanX Platform Database Schema

-- Create enum types
CREATE TYPE user_role AS ENUM ('freelancer', 'client', 'admin');
CREATE TYPE project_status AS ENUM ('draft', 'open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE proposal_status AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE contract_status AS ENUM ('active', 'completed', 'disputed', 'cancelled');
CREATE TYPE budget_type AS ENUM ('fixed', 'hourly');
CREATE TYPE escrow_status AS ENUM ('pending', 'released', 'disputed', 'refunded');

-- Categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    active_projects_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'freelancer',
    first_name TEXT,
    last_name TEXT,
    company_name TEXT,
    avatar_url TEXT,
    location TEXT,
    bio TEXT,
    hourly_rate INTEGER, -- in cents EUR
    languages TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    verified_email BOOLEAN DEFAULT false,
    verified_phone BOOLEAN DEFAULT false,
    verified_identity BOOLEAN DEFAULT false,
    rating DECIMAL(3,2) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    projects_completed INTEGER DEFAULT 0,
    total_earned INTEGER DEFAULT 0, -- in cents EUR
    availability_status TEXT DEFAULT 'available',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- Projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    budget_type budget_type NOT NULL DEFAULT 'fixed',
    fixed_amount INTEGER, -- in cents EUR
    hourly_min INTEGER, -- in cents EUR
    hourly_max INTEGER, -- in cents EUR
    estimated_hours INTEGER,
    deadline DATE,
    skills_required TEXT[] DEFAULT '{}',
    status project_status NOT NULL DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    nda_required BOOLEAN DEFAULT false,
    remote_ok BOOLEAN DEFAULT true,
    attachments TEXT[] DEFAULT '{}',
    proposals_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Proposals table
CREATE TABLE public.proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    cover_letter TEXT,
    proposed_amount INTEGER, -- in cents EUR
    proposed_hours INTEGER,
    delivery_days INTEGER,
    status proposal_status NOT NULL DEFAULT 'pending',
    attachments TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(project_id, freelancer_id)
);

-- Contracts table
CREATE TABLE public.contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    proposal_id UUID REFERENCES public.proposals(id),
    amount INTEGER NOT NULL, -- in cents EUR
    status contract_status NOT NULL DEFAULT 'active',
    terms TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reviewed_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Wallets table
CREATE TABLE public.wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    balance INTEGER DEFAULT 0, -- in cents EUR
    escrow_balance INTEGER DEFAULT 0, -- in cents EUR
    currency TEXT DEFAULT 'EUR',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read)
CREATE POLICY "categories_select_all" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_admin_all" ON public.categories FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Profiles policies
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Projects policies
CREATE POLICY "projects_select_all" ON public.projects FOR SELECT USING (true);
CREATE POLICY "projects_insert_client" ON public.projects FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = client_id)
);
CREATE POLICY "projects_update_own" ON public.projects FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = client_id)
);

-- Proposals policies
CREATE POLICY "proposals_select_related" ON public.proposals FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = freelancer_id)
    OR
    EXISTS (SELECT 1 FROM public.projects p JOIN public.profiles pr ON p.client_id = pr.id 
            WHERE p.id = project_id AND pr.user_id = auth.uid())
);
CREATE POLICY "proposals_insert_freelancer" ON public.proposals FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = freelancer_id)
);
CREATE POLICY "proposals_update_own" ON public.proposals FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = freelancer_id)
);

-- Contracts policies
CREATE POLICY "contracts_select_related" ON public.contracts FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND (id = freelancer_id OR id = client_id))
);
CREATE POLICY "contracts_insert_client" ON public.contracts FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = client_id)
);
CREATE POLICY "contracts_update_related" ON public.contracts FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND (id = freelancer_id OR id = client_id))
);

-- Reviews policies
CREATE POLICY "reviews_select_all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews_insert_reviewer" ON public.reviews FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = reviewer_id)
);
CREATE POLICY "reviews_update_own" ON public.reviews FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND id = reviewer_id)
);

-- Wallets policies
CREATE POLICY "wallets_select_own" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "wallets_insert_own" ON public.wallets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wallets_update_own" ON public.wallets FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
('Programiranje', 'programiranje', 'Web i mobilni razvoj, back-end, DevOps, AI/ML', 'Code'),
('Dizajn', 'dizajn', 'UI/UX, grafički dizajn, brend i ilustracije', 'Palette'),
('Pisanje & Prevođenje', 'pisanje', 'Copywriting, tehničko pisanje i prijevodi', 'PenTool'),
('Marketing & Rast', 'marketing', 'SEO, performance i društvene mreže', 'TrendingUp'),
('Video & Audio', 'video-audio', 'Montaža, animacije, 3D i zvuk', 'Video'),
('Administracija', 'administracija', 'Virtualna asistencija i unos podataka', 'Settings'),
('Analitika & Data', 'analitika', 'BI, data engineering i data science', 'BarChart'),
('Sigurnost & Mreže', 'sigurnost', 'Kibernetička sigurnost i mreže', 'Shield');

-- Functions to automatically create profiles and wallets
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (user_id, first_name, last_name)
    VALUES (
        new.id,
        new.raw_user_meta_data ->> 'first_name',
        new.raw_user_meta_data ->> 'last_name'
    );
    
    INSERT INTO public.wallets (user_id)
    VALUES (new.id);
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile and wallet on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON public.contracts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();