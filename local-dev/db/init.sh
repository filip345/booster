#!/bin/sh
psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE $DATABASE_NAME;
	CREATE user $DATABASE_USERNAME WITH ENCRYPTED PASSWORD '$DATABASE_PASSWORD';
	GRANT ALL PRIVILEGES ON DATABASE $DATABASE_NAME TO $DATABASE_USERNAME;
EOSQL

psql --username "$DATABASE_USERNAME" --dbname "$DATABASE_NAME" <<-EOSQL
	CREATE EXTENSION IF NOT EXISTS pg_trgm;
EOSQL