-- 本日の配置機能用のスキーマ。
-- SupabaseダッシュボードのSQL Editorに貼り付けて実行する。
-- 履歴は残さない方針のため、常に id=1 の1行だけを保持し、保存時は毎回その行を上書きする。

create table if not exists public.placements (
  id              smallint primary key default 1,
  assignment_date date,
  assignments     jsonb not null default '{}'::jsonb,
  updated_at      timestamptz not null default now(),
  constraint placements_singleton check (id = 1),
  constraint placements_assignments_is_object check (jsonb_typeof(assignments) = 'object')
);

comment on column public.placements.assignments is
  'src/lib/positions.ts のposition idをキーにした名前配列のオブジェクト。例: {"entrance-o":["山田","佐藤"]}';

-- 初期行を1つ作成（存在しない場合のみ）
insert into public.placements (id, assignment_date, assignments)
values (1, null, '{}'::jsonb)
on conflict (id) do nothing;

-- updated_at を自動更新するトリガー
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists placements_set_updated_at on public.placements;
create trigger placements_set_updated_at
  before update on public.placements
  for each row execute function public.set_updated_at();

-- RLS: 読み取りは誰でも可、書き込みは service_role キー（RLSをバイパス）のみ
alter table public.placements enable row level security;

drop policy if exists placements_public_read on public.placements;
create policy placements_public_read
  on public.placements
  for select
  to anon, authenticated
  using (true);

-- insert/update/delete のポリシーを意図的に作らない。
-- RLS有効＋許可ポリシーなしの状態では anon/authenticated の書き込みは
-- 42501 (permission denied) で拒否される。service_role キーはRLSをバイパスするため、
-- サーバー側（Server Action経由）の書き込みだけが成功する。
revoke insert, update, delete on public.placements from anon, authenticated;
