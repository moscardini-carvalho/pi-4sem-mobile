import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hndeyarwwlezfyfuhimr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZGV5YXJ3d2xlemZ5ZnVoaW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MTk0NjAsImV4cCI6MjA3NzQ5NTQ2MH0.6qSfpUow0QSndZSJrYsdKJKnqpS1dJNbDgk11iJMDDE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
