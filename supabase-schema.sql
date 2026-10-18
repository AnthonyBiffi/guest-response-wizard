-- Script de criação da tabela 'guests' no Supabase
-- Execute este script no SQL Editor do painel do seu projeto Supabase

create table if not exists public.guests (
  id text primary key default substr(md5(random()::text), 1, 7),
  name text not null,
  gift text not null,
  confirmed boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ativar Row Level Security (RLS)
alter table public.guests enable row level security;

-- Políticas de acesso (RLS):
-- 1. Leitura: Qualquer pessoa com o link do convite pode carregar os dados
create policy "Permitir leitura publica de convidados"
  on public.guests for select
  using (true);

-- 2. Inserção: Permitir cadastrar novos convidados pelo painel
create policy "Permitir cadastro de convidados"
  on public.guests for insert
  with check (true);

-- 3. Atualização: Permitir que o convidado confirme sua presença
create policy "Permitir confirmacao de presenca"
  on public.guests for update
  using (true)
  with check (true);

-- 4. Exclusão: Permitir remover convidados pelo painel
create policy "Permitir exclusao de convidados"
  on public.guests for delete
  using (true);

-- Habilitar Realtime para refletir confirmações e novos convidados instantaneamente
alter publication supabase_realtime add table public.guests;

