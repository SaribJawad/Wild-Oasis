// supabase client where we will initialize the supabase API and create a client we can then start  quering our database

import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wzrnooiecgoxjaslsaqo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6cm5vb2llY2dveGphc2xzYXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2NDIyOTgsImV4cCI6MjAyNzIxODI5OH0.SBxGX4ykHpaGonhpEYqshIxwDHrAuXQBqhXNhno4wms";
const supabase = createClient(supabaseUrl, supabaseKey);

// we can export this in some other file and start querying
export default supabase;
