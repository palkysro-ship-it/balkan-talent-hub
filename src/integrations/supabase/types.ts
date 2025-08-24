export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          active_projects_count: number | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          active_projects_count?: number | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          active_projects_count?: number | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      contracts: {
        Row: {
          amount: number
          client_id: string
          created_at: string
          end_date: string | null
          freelancer_id: string
          id: string
          project_id: string
          proposal_id: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["contract_status"]
          terms: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          client_id: string
          created_at?: string
          end_date?: string | null
          freelancer_id: string
          id?: string
          project_id: string
          proposal_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["contract_status"]
          terms?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          client_id?: string
          created_at?: string
          end_date?: string | null
          freelancer_id?: string
          id?: string
          project_id?: string
          proposal_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["contract_status"]
          terms?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          availability_status: string | null
          avatar_url: string | null
          bio: string | null
          company_name: string | null
          created_at: string
          first_name: string | null
          hourly_rate: number | null
          id: string
          languages: string[] | null
          last_name: string | null
          location: string | null
          projects_completed: number | null
          rating: number | null
          reviews_count: number | null
          role: Database["public"]["Enums"]["user_role"]
          skills: string[] | null
          total_earned: number | null
          updated_at: string
          user_id: string
          verified_email: boolean | null
          verified_identity: boolean | null
          verified_phone: boolean | null
        }
        Insert: {
          availability_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          first_name?: string | null
          hourly_rate?: number | null
          id?: string
          languages?: string[] | null
          last_name?: string | null
          location?: string | null
          projects_completed?: number | null
          rating?: number | null
          reviews_count?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: string[] | null
          total_earned?: number | null
          updated_at?: string
          user_id: string
          verified_email?: boolean | null
          verified_identity?: boolean | null
          verified_phone?: boolean | null
        }
        Update: {
          availability_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string
          first_name?: string | null
          hourly_rate?: number | null
          id?: string
          languages?: string[] | null
          last_name?: string | null
          location?: string | null
          projects_completed?: number | null
          rating?: number | null
          reviews_count?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: string[] | null
          total_earned?: number | null
          updated_at?: string
          user_id?: string
          verified_email?: boolean | null
          verified_identity?: boolean | null
          verified_phone?: boolean | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          attachments: string[] | null
          budget_type: Database["public"]["Enums"]["budget_type"]
          category_id: string | null
          client_id: string
          created_at: string
          deadline: string | null
          description: string
          estimated_hours: number | null
          featured: boolean | null
          fixed_amount: number | null
          hourly_max: number | null
          hourly_min: number | null
          id: string
          nda_required: boolean | null
          proposals_count: number | null
          remote_ok: boolean | null
          skills_required: string[] | null
          status: Database["public"]["Enums"]["project_status"]
          title: string
          updated_at: string
        }
        Insert: {
          attachments?: string[] | null
          budget_type?: Database["public"]["Enums"]["budget_type"]
          category_id?: string | null
          client_id: string
          created_at?: string
          deadline?: string | null
          description: string
          estimated_hours?: number | null
          featured?: boolean | null
          fixed_amount?: number | null
          hourly_max?: number | null
          hourly_min?: number | null
          id?: string
          nda_required?: boolean | null
          proposals_count?: number | null
          remote_ok?: boolean | null
          skills_required?: string[] | null
          status?: Database["public"]["Enums"]["project_status"]
          title: string
          updated_at?: string
        }
        Update: {
          attachments?: string[] | null
          budget_type?: Database["public"]["Enums"]["budget_type"]
          category_id?: string | null
          client_id?: string
          created_at?: string
          deadline?: string | null
          description?: string
          estimated_hours?: number | null
          featured?: boolean | null
          fixed_amount?: number | null
          hourly_max?: number | null
          hourly_min?: number | null
          id?: string
          nda_required?: boolean | null
          proposals_count?: number | null
          remote_ok?: boolean | null
          skills_required?: string[] | null
          status?: Database["public"]["Enums"]["project_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          attachments: string[] | null
          cover_letter: string | null
          created_at: string
          delivery_days: number | null
          freelancer_id: string
          id: string
          project_id: string
          proposed_amount: number | null
          proposed_hours: number | null
          status: Database["public"]["Enums"]["proposal_status"]
          updated_at: string
        }
        Insert: {
          attachments?: string[] | null
          cover_letter?: string | null
          created_at?: string
          delivery_days?: number | null
          freelancer_id: string
          id?: string
          project_id: string
          proposed_amount?: number | null
          proposed_hours?: number | null
          status?: Database["public"]["Enums"]["proposal_status"]
          updated_at?: string
        }
        Update: {
          attachments?: string[] | null
          cover_letter?: string | null
          created_at?: string
          delivery_days?: number | null
          freelancer_id?: string
          id?: string
          project_id?: string
          proposed_amount?: number | null
          proposed_hours?: number | null
          status?: Database["public"]["Enums"]["proposal_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposals_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          contract_id: string
          created_at: string
          id: string
          rating: number
          reviewed_id: string
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          contract_id: string
          created_at?: string
          id?: string
          rating: number
          reviewed_id: string
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          contract_id?: string
          created_at?: string
          id?: string
          rating?: number
          reviewed_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewed_id_fkey"
            columns: ["reviewed_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number | null
          created_at: string
          currency: string | null
          escrow_balance: number | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number | null
          created_at?: string
          currency?: string | null
          escrow_balance?: number | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number | null
          created_at?: string
          currency?: string | null
          escrow_balance?: number | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      budget_type: "fixed" | "hourly"
      contract_status: "active" | "completed" | "disputed" | "cancelled"
      escrow_status: "pending" | "released" | "disputed" | "refunded"
      project_status:
        | "draft"
        | "open"
        | "in_progress"
        | "completed"
        | "cancelled"
      proposal_status: "pending" | "accepted" | "rejected" | "withdrawn"
      user_role: "freelancer" | "client" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      budget_type: ["fixed", "hourly"],
      contract_status: ["active", "completed", "disputed", "cancelled"],
      escrow_status: ["pending", "released", "disputed", "refunded"],
      project_status: [
        "draft",
        "open",
        "in_progress",
        "completed",
        "cancelled",
      ],
      proposal_status: ["pending", "accepted", "rejected", "withdrawn"],
      user_role: ["freelancer", "client", "admin"],
    },
  },
} as const
