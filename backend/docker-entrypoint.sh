# venv

env

echo "building venv..."
python3 -m venv venv

source venv/bin/activate

# Migrations

echo "migrating..."
python manage.py migrate

# Load fixtures

echo "flushing data and loading fistures..."
python manage.py flush --noinput
python manage.py shell < base_app/utils/reset_environment_data.py
python manage.py collectstatic --no-input

# Start backend
python manage.py runserver 0.0.0.0:8000