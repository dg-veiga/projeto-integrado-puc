# venv

python3 -m venv venv

source venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

# Migrations

python manage.py migrate

# Load fixtures

python manage.py flush --noinput
# python manage.py shell < base_app/fixtures/local_dev/scripts/create_testing_bucket.py
# python manage.py collectstatic --noinput