-- ============================================
-- Gadgets Store — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  email text,
  created_at timestamptz default now()
);

-- Auto-create profile on new signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable Row Level Security
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);


-- 2. Orders
create table public.orders (
  id text primary key,
  user_id uuid references public.profiles(id) on delete set null,
  total numeric not null,
  item_count integer not null default 1,
  status text not null default 'Processing',
  products jsonb,
  created_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);

create policy "Users can insert own orders"
  on public.orders for insert with check (auth.uid() = user_id);

-- Admins can view all orders (service role bypasses RLS)


-- 3. Admin Settings
create table public.admin_settings (
  id serial primary key,
  section text unique not null,
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- Only service role (admin) can access — no public RLS policies
alter table public.admin_settings enable row level security;
