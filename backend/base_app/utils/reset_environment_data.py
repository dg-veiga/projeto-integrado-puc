from django.core.management import call_command
from base_app.scripts import create_dummy_users


def reset_environment_data():
    print('Running reset_environment_data...')

    # flushing and inserting data
    call_command('flush', '--no-input', verbosity=1)

    # creating dummy users
    create_dummy_users()

    print('reset_environment_data done!')


if __name__ == 'django.core.management.commands.shell':
    reset_environment_data()
