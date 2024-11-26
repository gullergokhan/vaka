# Backend



## Installation

Install python 3.12 from https://www.python.org/downloads/release/python-3120/#:~:text=.sigstore-,Windows%20installer%20(64%2Dbit),-Windows to Windows

Install pipenv

```bash
python -m pip install --upgrade pip
python -m pip install pipenv

pipenv install --python 3.12
```

## Usage

```bash
pipenv shell

cd n2techvaka 

python manage.py runserver
```

## Create admin user
```bash
python manage.py createsuperuser
```

## Env
Create **.env** file in project main directory.

Copy all lines from **.env.example** to **.env**

## Psql create database

Install PostgreSQL

```bash
# MacOS and Linux
sudo -i -u postgres

# Windows
# Open postgres shell
```

```sql
    psql
        CREATE USER n2techvaka  WITH PASSWORD 'n2techvaka pswd';
        ALTER ROLE n2techvaka  SET client_encoding TO 'utf8';
        ALTER ROLE n2techvaka  SET timezone TO 'UTC';
        ALTER ROLE n2techvaka  SET default_transaction_isolation TO 'read committed';
        CREATE DATABASE n2techvaka_db;
        GRANT ALL PRIVILEGES ON DATABASE n2techvaka_db TO n2techvaka ;
        ALTER DATABASE n2techvaka_db OWNER TO n2techvaka;
        ctrl+d
    ctrl+d
```

```bash
# Linux:
sudo systemctl restart postgresql

# MacOS:
brew services restart postgresql

# Windows:
# Navigate to Services:
# Press Win + R, type services.msc, and press Enter.
# Locate PostgreSQL in the list, right-click, and choose Restart.
```

## Django database commands
```bash
# Remove all items
python manage.py flush

# Create migrations (after add/change/delete models):
python manage.py makemigrations

# Migrate
python manage.py migrate
```

## Pre-commit
Pre-commit (https://pre-commit.com/) is part of the development requirements and will thus be installed with them.

```bash
pre-commit install
```
