import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mipbripfwyawmcbpyndw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcGJyaXBmd3lhd21jYnB5bmR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExMjkzNjksImV4cCI6MjAxNjcwNTM2OX0.jiH0mhTmng6A0MKSjQZZfE8UNv32vxx5QB3qd2xVSGE"
);

export default supabase;
