from django.conf import settings
from django.core.management import call_command
from project.core_models.aws_config import AWSConfig


def load_demo_fixture(apps, schema_editor, verbosity=2):
    print('Carregando dados de PlotStep...')
    call_command(
        'loaddata', 'backend/base_app/fixtures/defaults/dumps/demo.json', verbosity=verbosity)

def reset_environment_data():
    print('Running reset_environment_data...')
    aws_config: AWSConfig = settings.ROOT_OBJECT.aws_config

    # flushing and inserting data
    call_command('flush', '--no-input', verbosity=1)
    aws_config.clear_bucket()

    # loading demostration fixture
    load_demo_fixture(None, None)
    
    print('reset_environment_data done!')

if __name__ == 'django.core.management.commands.shell':
    reset_environment_data()
