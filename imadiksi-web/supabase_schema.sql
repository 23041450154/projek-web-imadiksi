-- Enable Row Level Security (RLS)
-- Define tables for content management

-- 1. Programs Table
create table programs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  summary text,
  status text check (status in ('ongoing', 'upcoming', 'completed')),
  date date,
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
x
-- 2. Posts (News) Table
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  category text,
  image_url text, -- Store URL from storage or external
  file_url text, -- Store URL for file attachments (PDF, DOC, etc.)
  date date default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Divisions Table
create table divisions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique,
  description text,
  work_programs text[], -- Array of strings
  members jsonb, -- Store simple member list as JSON for now
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Gallery Table
create table gallery (
  id uuid default gen_random_uuid() primary key,
  title text,
  category text,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Events Table
create table events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  date date not null,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Allow read to everyone, write only to authenticated users)

alter table programs enable row level security;
alter table posts enable row level security;
alter table divisions enable row level security;
alter table gallery enable row level security;
alter table events enable row level security;

-- Policy: Public Read Access
create policy "Public Read Programs" on programs for select using (true);
create policy "Public Read Posts" on posts for select using (true);
create policy "Public Read Divisions" on divisions for select using (true);
create policy "Public Read Gallery" on gallery for select using (true);
create policy "Public Read Events" on events for select using (true);

-- Policy: Authenticated Write Access (Insert, Update, Delete)
create policy "Admin Write Programs" on programs for all using (auth.role() = 'authenticated');
create policy "Admin Write Posts" on posts for all using (auth.role() = 'authenticated');
create policy "Admin Write Divisions" on divisions for all using (auth.role() = 'authenticated');
create policy "Admin Write Gallery" on gallery for all using (auth.role() = 'authenticated');
create policy "Admin Write Events" on events for all using (auth.role() = 'authenticated');

-- Storage Bucket for Images (Optional, if using storage)
insert into storage.buckets (id, name, public) values ('images', 'images', true);
create policy "Public Access Images" on storage.objects for select using ( bucket_id = 'images' );
create policy "Admin Upload Images" on storage.objects for insert using ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- 6. Organization Members Table (Struktur Kepengurusan)
create table organization_members (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    position text not null,
    division_id uuid references divisions(id) on delete set null,
    photo_url text,
    order_index integer default 0,
    is_active boolean default true,
    created_at timestamptz default now()
);

alter table organization_members enable row level security;
create policy "Public Read Organization Members" on organization_members for select using (true);
create policy "Admin Write Organization Members" on organization_members for all using (auth.role() = 'authenticated');

-- Storage Bucket for Member Photos
insert into storage.buckets (id, name, public) values ('members', 'members', true);
create policy "Public Access Members" on storage.objects for select using ( bucket_id = 'members' );
create policy "Admin Upload Members" on storage.objects for insert using ( bucket_id = 'members' and auth.role() = 'authenticated' );
