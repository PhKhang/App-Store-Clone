import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://urlopeutmnzslbzcmrlj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybG9wZXV0bW56c2xiemNtcmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNjY5MjIsImV4cCI6MTk4Mzg0MjkyMn0.aNJOE0z1fnxDG4dt3oMQ2_Mrue1zyuU4Sa7RTQsVNX0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
