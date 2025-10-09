create table profile (
  address text not null primary KEY,
  name text not null,
  handle text not null UNIQUE
)