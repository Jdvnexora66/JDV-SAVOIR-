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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      academic_resources: {
        Row: {
          academic_year: string | null
          author_name: string | null
          created_at: string
          description: string | null
          domain_id: string | null
          exam_year: number | null
          id: string
          institution_id: string | null
          level_label: string | null
          metadata: Json
          program_id: string | null
          publication_status: string
          resource_type: string
          rights_status: string
          session_label: string | null
          source_id: string | null
          source_url: string | null
          storage_path: string | null
          subject_label: string | null
          title: string
          updated_at: string
          verification_status: string
        }
        Insert: {
          academic_year?: string | null
          author_name?: string | null
          created_at?: string
          description?: string | null
          domain_id?: string | null
          exam_year?: number | null
          id?: string
          institution_id?: string | null
          level_label?: string | null
          metadata?: Json
          program_id?: string | null
          publication_status?: string
          resource_type: string
          rights_status?: string
          session_label?: string | null
          source_id?: string | null
          source_url?: string | null
          storage_path?: string | null
          subject_label?: string | null
          title: string
          updated_at?: string
          verification_status?: string
        }
        Update: {
          academic_year?: string | null
          author_name?: string | null
          created_at?: string
          description?: string | null
          domain_id?: string | null
          exam_year?: number | null
          id?: string
          institution_id?: string | null
          level_label?: string | null
          metadata?: Json
          program_id?: string | null
          publication_status?: string
          resource_type?: string
          rights_status?: string
          session_label?: string | null
          source_id?: string | null
          source_url?: string | null
          storage_path?: string | null
          subject_label?: string | null
          title?: string
          updated_at?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "academic_resources_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "education_domains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "academic_resources_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "education_institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "academic_resources_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "education_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "academic_resources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "resource_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_roles: {
        Row: {
          created_at: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          is_public: boolean
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          is_public?: boolean
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          is_public?: boolean
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      bookstore_order_items: {
        Row: {
          created_at: string
          id: string
          item_title_snapshot: string
          order_id: string
          product_id: string
          quantity: number
          unit_price_xof: number
        }
        Insert: {
          created_at?: string
          id?: string
          item_title_snapshot: string
          order_id: string
          product_id: string
          quantity?: number
          unit_price_xof: number
        }
        Update: {
          created_at?: string
          id?: string
          item_title_snapshot?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price_xof?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookstore_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "bookstore_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookstore_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "bookstore_products"
            referencedColumns: ["id"]
          },
        ]
      }
      bookstore_orders: {
        Row: {
          created_at: string
          currency_code: string
          delivery_details: Json
          delivery_fee_xof: number
          id: string
          order_number: string
          paid_at: string | null
          payment_provider: string | null
          provider_reference: string | null
          status: string
          subtotal_xof: number
          total_xof: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency_code?: string
          delivery_details?: Json
          delivery_fee_xof?: number
          id?: string
          order_number?: string
          paid_at?: string | null
          payment_provider?: string | null
          provider_reference?: string | null
          status?: string
          subtotal_xof?: number
          total_xof?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency_code?: string
          delivery_details?: Json
          delivery_fee_xof?: number
          id?: string
          order_number?: string
          paid_at?: string | null
          payment_provider?: string | null
          provider_reference?: string | null
          status?: string
          subtotal_xof?: number
          total_xof?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bookstore_products: {
        Row: {
          author_name: string | null
          availability_status: string
          cover_path: string | null
          created_at: string
          description: string | null
          digital_storage_path: string | null
          format: string
          id: string
          isbn: string | null
          language: string
          level_label: string | null
          metadata: Json
          preview_url: string | null
          price_xof: number
          product_type: string
          publisher: string | null
          purchase_url: string | null
          rights_status: string
          series: string | null
          subject_label: string | null
          title: string
          updated_at: string
          verification_status: string
        }
        Insert: {
          author_name?: string | null
          availability_status?: string
          cover_path?: string | null
          created_at?: string
          description?: string | null
          digital_storage_path?: string | null
          format: string
          id?: string
          isbn?: string | null
          language?: string
          level_label?: string | null
          metadata?: Json
          preview_url?: string | null
          price_xof?: number
          product_type: string
          publisher?: string | null
          purchase_url?: string | null
          rights_status?: string
          series?: string | null
          subject_label?: string | null
          title: string
          updated_at?: string
          verification_status?: string
        }
        Update: {
          author_name?: string | null
          availability_status?: string
          cover_path?: string | null
          created_at?: string
          description?: string | null
          digital_storage_path?: string | null
          format?: string
          id?: string
          isbn?: string | null
          language?: string
          level_label?: string | null
          metadata?: Json
          preview_url?: string | null
          price_xof?: number
          product_type?: string
          publisher?: string | null
          purchase_url?: string | null
          rights_status?: string
          series?: string | null
          subject_label?: string | null
          title?: string
          updated_at?: string
          verification_status?: string
        }
        Relationships: []
      }
      competition_documents: {
        Row: {
          competition_session_id: string
          created_at: string
          document_type: string
          external_url: string | null
          id: string
          rights_status: string
          status: string
          storage_path: string | null
          subject_id: string | null
          title: string
          uploaded_by: string | null
          verification_status: string
        }
        Insert: {
          competition_session_id: string
          created_at?: string
          document_type: string
          external_url?: string | null
          id?: string
          rights_status?: string
          status?: string
          storage_path?: string | null
          subject_id?: string | null
          title: string
          uploaded_by?: string | null
          verification_status?: string
        }
        Update: {
          competition_session_id?: string
          created_at?: string
          document_type?: string
          external_url?: string | null
          id?: string
          rights_status?: string
          status?: string
          storage_path?: string | null
          subject_id?: string | null
          title?: string
          uploaded_by?: string | null
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "competition_documents_competition_session_id_fkey"
            columns: ["competition_session_id"]
            isOneToOne: false
            referencedRelation: "competition_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_documents_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      competition_sessions: {
        Row: {
          closing_date: string | null
          competition_id: string
          competition_year: number
          id: string
          is_current: boolean
          opening_date: string | null
          session_name: string | null
          source_url: string | null
          verified_at: string | null
        }
        Insert: {
          closing_date?: string | null
          competition_id: string
          competition_year: number
          id?: string
          is_current?: boolean
          opening_date?: string | null
          session_name?: string | null
          source_url?: string | null
          verified_at?: string | null
        }
        Update: {
          closing_date?: string | null
          competition_id?: string
          competition_year?: number
          id?: string
          is_current?: boolean
          opening_date?: string | null
          session_name?: string | null
          source_url?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competition_sessions_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          category: string
          country_id: string
          created_at: string
          description: string | null
          eligibility: string | null
          id: string
          name: string
          official_url: string | null
          organizing_body: string | null
          status: string
        }
        Insert: {
          category: string
          country_id: string
          created_at?: string
          description?: string | null
          eligibility?: string | null
          id?: string
          name: string
          official_url?: string | null
          organizing_body?: string | null
          status?: string
        }
        Update: {
          category?: string
          country_id?: string
          created_at?: string
          description?: string | null
          eligibility?: string | null
          id?: string
          name?: string
          official_url?: string | null
          organizing_body?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitions_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      content_bookmarks: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          code: string
          created_at: string
          currency_code: string
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          currency_code: string
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          currency_code?: string
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          country_id: string
          cover_path: string | null
          created_at: string
          created_by: string | null
          description: string | null
          education_domain_id: string | null
          education_program_id: string | null
          id: string
          level_id: string
          slug: string
          status: string
          subject_id: string
          title: string
          updated_at: string
        }
        Insert: {
          country_id: string
          cover_path?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          education_domain_id?: string | null
          education_program_id?: string | null
          id?: string
          level_id: string
          slug: string
          status?: string
          subject_id: string
          title: string
          updated_at?: string
        }
        Update: {
          country_id?: string
          cover_path?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          education_domain_id?: string | null
          education_program_id?: string | null
          id?: string
          level_id?: string
          slug?: string
          status?: string
          subject_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_education_domain_id_fkey"
            columns: ["education_domain_id"]
            isOneToOne: false
            referencedRelation: "education_domains"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_education_program_id_fkey"
            columns: ["education_program_id"]
            isOneToOne: false
            referencedRelation: "education_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "school_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      document_purchases: {
        Row: {
          amount: number
          created_at: string
          currency_code: string
          exam_session_id: string
          id: string
          paid_at: string | null
          provider: string | null
          provider_reference: string | null
          status: string
          subject_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          currency_code?: string
          exam_session_id: string
          id?: string
          paid_at?: string | null
          provider?: string | null
          provider_reference?: string | null
          status?: string
          subject_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency_code?: string
          exam_session_id?: string
          id?: string
          paid_at?: string | null
          provider?: string | null
          provider_reference?: string | null
          status?: string
          subject_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_purchases_exam_session_id_fkey"
            columns: ["exam_session_id"]
            isOneToOne: false
            referencedRelation: "exam_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_purchases_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      editorial_calendar: {
        Row: {
          activity_type: string
          created_at: string
          id: string
          notes: string | null
          scheduled_at: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_type?: string
          created_at?: string
          id?: string
          notes?: string | null
          scheduled_at: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          id?: string
          notes?: string | null
          scheduled_at?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      education_domains: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      education_institutions: {
        Row: {
          acronym: string | null
          city: string | null
          created_at: string
          description: string | null
          id: string
          institution_type: string
          name: string
          official_url: string | null
          parent_id: string | null
          verification_status: string
        }
        Insert: {
          acronym?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          id?: string
          institution_type: string
          name: string
          official_url?: string | null
          parent_id?: string | null
          verification_status?: string
        }
        Update: {
          acronym?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          id?: string
          institution_type?: string
          name?: string
          official_url?: string | null
          parent_id?: string | null
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_institutions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "education_institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      education_programs: {
        Row: {
          admission_profile: string | null
          code: string
          created_at: string
          description: string | null
          domain_id: string
          id: string
          institution_name: string | null
          level_label: string | null
          name: string
          official_source_url: string | null
          status: string
        }
        Insert: {
          admission_profile?: string | null
          code: string
          created_at?: string
          description?: string | null
          domain_id: string
          id?: string
          institution_name?: string | null
          level_label?: string | null
          name: string
          official_source_url?: string | null
          status?: string
        }
        Update: {
          admission_profile?: string | null
          code?: string
          created_at?: string
          description?: string | null
          domain_id?: string
          id?: string
          institution_name?: string | null
          level_label?: string | null
          name?: string
          official_source_url?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_programs_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "education_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          course_id: string
          enrolled_at: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          course_id: string
          enrolled_at?: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          course_id?: string
          enrolled_at?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "my_primary_learning_progress"
            referencedColumns: ["course_id"]
          },
        ]
      }
      exam_documents: {
        Row: {
          created_at: string
          description: string | null
          document_type: string
          exam_session_id: string
          external_url: string | null
          id: string
          rights_status: string
          status: string
          storage_path: string | null
          subject_id: string | null
          title: string
          uploaded_by: string | null
          verification_status: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          document_type: string
          exam_session_id: string
          external_url?: string | null
          id?: string
          rights_status?: string
          status?: string
          storage_path?: string | null
          subject_id?: string | null
          title: string
          uploaded_by?: string | null
          verification_status?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          document_type?: string
          exam_session_id?: string
          external_url?: string | null
          id?: string
          rights_status?: string
          status?: string
          storage_path?: string | null
          subject_id?: string | null
          title?: string
          uploaded_by?: string | null
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_documents_exam_session_id_fkey"
            columns: ["exam_session_id"]
            isOneToOne: false
            referencedRelation: "exam_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_documents_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_sessions: {
        Row: {
          created_at: string
          exam_id: string
          exam_year: number
          id: string
          series: string | null
          session_name: string
          source_name: string | null
          source_url: string | null
          status: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          exam_id: string
          exam_year: number
          id?: string
          series?: string | null
          session_name?: string
          source_name?: string | null
          source_url?: string | null
          status?: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          exam_id?: string
          exam_year?: number
          id?: string
          series?: string | null
          session_name?: string
          source_name?: string | null
          source_url?: string | null
          status?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exam_sessions_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          code: string
          country_id: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          level_id: string | null
          name: string
        }
        Insert: {
          code: string
          country_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          level_id?: string | null
          name: string
        }
        Update: {
          code?: string
          country_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          level_id?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exams_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "school_levels"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          answer_key: Json | null
          competency_tags: Json
          created_at: string
          difficulty: string | null
          id: string
          instructions: string | null
          lesson_id: string
          questions: Json
          rubric: Json
          status: string
          title: string
        }
        Insert: {
          answer_key?: Json | null
          competency_tags?: Json
          created_at?: string
          difficulty?: string | null
          id?: string
          instructions?: string | null
          lesson_id: string
          questions?: Json
          rubric?: Json
          status?: string
          title: string
        }
        Update: {
          answer_key?: Json | null
          competency_tags?: Json
          created_at?: string
          difficulty?: string | null
          id?: string
          instructions?: string | null
          lesson_id?: string
          questions?: Json
          rubric?: Json
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "my_primary_learning_progress"
            referencedColumns: ["lesson_id"]
          },
        ]
      }
      learning_assessment_keys: {
        Row: {
          answer_key: Json
          assessment_id: string
          rubric: Json
          updated_at: string
        }
        Insert: {
          answer_key: Json
          assessment_id: string
          rubric?: Json
          updated_at?: string
        }
        Update: {
          answer_key?: Json
          assessment_id?: string
          rubric?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_assessment_keys_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: true
            referencedRelation: "learning_assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_assessments: {
        Row: {
          created_at: string
          duration_minutes: number | null
          id: string
          instructions: string
          lesson_id: string
          questions: Json
          status: string
          title: string
          total_points: number
        }
        Insert: {
          created_at?: string
          duration_minutes?: number | null
          id?: string
          instructions: string
          lesson_id: string
          questions?: Json
          status?: string
          title: string
          total_points?: number
        }
        Update: {
          created_at?: string
          duration_minutes?: number | null
          id?: string
          instructions?: string
          lesson_id?: string
          questions?: Json
          status?: string
          title?: string
          total_points?: number
        }
        Relationships: [
          {
            foreignKeyName: "learning_assessments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: true
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_assessments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: true
            referencedRelation: "my_primary_learning_progress"
            referencedColumns: ["lesson_id"]
          },
        ]
      }
      learning_progress: {
        Row: {
          completed_at: string | null
          id: string
          lesson_id: string
          progress_percent: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          lesson_id: string
          progress_percent?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          lesson_id?: string
          progress_percent?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "my_primary_learning_progress"
            referencedColumns: ["lesson_id"]
          },
        ]
      }
      lesson_resources: {
        Row: {
          created_at: string
          id: string
          lesson_id: string
          resource_id: string
          usage_note: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_id: string
          resource_id: string
          usage_note: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_id?: string
          resource_id?: string
          usage_note?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_resources_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_resources_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "my_primary_learning_progress"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lesson_resources_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "academic_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: Json
          course_id: string
          created_at: string
          document_path: string | null
          estimated_minutes: number | null
          id: string
          language_code: string
          learning_objectives: Json
          prerequisites: Json
          sort_order: number
          status: string
          title: string
          video_url: string | null
        }
        Insert: {
          content?: Json
          course_id: string
          created_at?: string
          document_path?: string | null
          estimated_minutes?: number | null
          id?: string
          language_code?: string
          learning_objectives?: Json
          prerequisites?: Json
          sort_order?: number
          status?: string
          title: string
          video_url?: string | null
        }
        Update: {
          content?: Json
          course_id?: string
          created_at?: string
          document_path?: string | null
          estimated_minutes?: number | null
          id?: string
          language_code?: string
          learning_objectives?: Json
          prerequisites?: Json
          sort_order?: number
          status?: string
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "my_primary_learning_progress"
            referencedColumns: ["course_id"]
          },
        ]
      }
      library_entitlements: {
        Row: {
          access_type: string
          granted_at: string
          id: string
          order_item_id: string | null
          product_id: string
          user_id: string
        }
        Insert: {
          access_type?: string
          granted_at?: string
          id?: string
          order_item_id?: string | null
          product_id: string
          user_id: string
        }
        Update: {
          access_type?: string
          granted_at?: string
          id?: string
          order_item_id?: string | null
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "library_entitlements_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "bookstore_order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "library_entitlements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "bookstore_products"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          kind: string
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          kind?: string
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          kind?: string
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency_code: string
          id: string
          paid_at: string | null
          provider: string
          provider_reference: string | null
          status: string
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency_code?: string
          id?: string
          paid_at?: string | null
          provider: string
          provider_reference?: string | null
          status?: string
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency_code?: string
          id?: string
          paid_at?: string | null
          provider?: string
          provider_reference?: string | null
          status?: string
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          billing_interval: string
          code: string
          created_at: string
          currency_code: string
          description: string | null
          entitlements: Json
          id: string
          is_active: boolean
          name: string
          price_amount: number
        }
        Insert: {
          billing_interval: string
          code: string
          created_at?: string
          currency_code?: string
          description?: string | null
          entitlements?: Json
          id?: string
          is_active?: boolean
          name: string
          price_amount?: number
        }
        Update: {
          billing_interval?: string
          code?: string
          created_at?: string
          currency_code?: string
          description?: string | null
          entitlements?: Json
          id?: string
          is_active?: boolean
          name?: string
          price_amount?: number
        }
        Relationships: []
      }
      platform_metrics: {
        Row: {
          comments: number
          created_at: string
          engagements: number
          followers: number
          id: string
          impressions: number
          metric_date: string
          platform: string
          prints: number
          shares: number
        }
        Insert: {
          comments?: number
          created_at?: string
          engagements?: number
          followers?: number
          id?: string
          impressions?: number
          metric_date: string
          platform?: string
          prints?: number
          shares?: number
        }
        Update: {
          comments?: number
          created_at?: string
          engagements?: number
          followers?: number
          id?: string
          impressions?: number
          metric_date?: string
          platform?: string
          prints?: number
          shares?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_path: string | null
          country_id: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_path?: string | null
          country_id?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_path?: string | null
          country_id?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          answers: Json
          completed_at: string | null
          exercise_id: string
          id: string
          score: number | null
          started_at: string
          user_id: string
        }
        Insert: {
          answers?: Json
          completed_at?: string | null
          exercise_id: string
          id?: string
          score?: number | null
          started_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string | null
          exercise_id?: string
          id?: string
          score?: number | null
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_sources: {
        Row: {
          base_url: string
          checked_at: string | null
          created_at: string
          id: string
          is_active: boolean
          name: string
          notes: string | null
          rights_policy: string
          scope: string
          source_type: string
          trust_level: string
        }
        Insert: {
          base_url: string
          checked_at?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          notes?: string | null
          rights_policy?: string
          scope: string
          source_type: string
          trust_level?: string
        }
        Update: {
          base_url?: string
          checked_at?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          notes?: string | null
          rights_policy?: string
          scope?: string
          source_type?: string
          trust_level?: string
        }
        Relationships: []
      }
      school_levels: {
        Row: {
          country_id: string
          id: string
          is_active: boolean
          name: string
          sort_order: number
          stage: string
        }
        Insert: {
          country_id: string
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number
          stage: string
        }
        Update: {
          country_id?: string
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number
          stage?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_levels_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          country_id: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
        }
        Insert: {
          country_id: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
        }
        Update: {
          country_id?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          ends_at: string | null
          id: string
          plan_id: string
          provider: string | null
          provider_subscription_id: string | null
          starts_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          ends_at?: string | null
          id?: string
          plan_id: string
          provider?: string | null
          provider_subscription_id?: string | null
          starts_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          ends_at?: string | null
          id?: string
          plan_id?: string
          provider?: string | null
          provider_subscription_id?: string | null
          starts_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_devices: {
        Row: {
          created_at: string
          device_label: string | null
          id: string
          last_seen_at: string
          platform: string
          push_token: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          device_label?: string | null
          id?: string
          last_seen_at?: string
          platform: string
          push_token?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          device_label?: string | null
          id?: string
          last_seen_at?: string
          platform?: string
          push_token?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      my_primary_learning_progress: {
        Row: {
          completed_at: string | null
          course_id: string | null
          course_title: string | null
          lesson_id: string | null
          lesson_title: string | null
          level_name: string | null
          progress_percent: number | null
          subject_name: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_document_purchase: {
        Args: { p_exam_session_id: string; p_subject_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
