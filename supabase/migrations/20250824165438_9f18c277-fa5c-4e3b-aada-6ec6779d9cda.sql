-- Fix security issues with functions

-- Drop and recreate handle_new_user function with proper search_path
DROP FUNCTION IF EXISTS public.handle_new_user();
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
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
$$;

-- Drop and recreate update_updated_at function with proper search_path
DROP FUNCTION IF EXISTS public.update_updated_at();
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;