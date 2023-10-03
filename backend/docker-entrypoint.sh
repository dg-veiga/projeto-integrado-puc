# venv

echo "building venv..."
python3 -m venv venv

source venv/bin/activate

# pip install --upgrade pip
# pip install -r requirements.txt

# Migrations

echo "migrating..."
python manage.py migrate

# Load fixtures

echo "flushing data and loading fistures..."
python manage.py flush --noinput
python manage.py shell < base_app/scripts/create_dummy_users.py

# Start backend
python manage.py runserver 0.0.0.0:8000