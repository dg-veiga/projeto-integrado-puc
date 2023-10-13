import os
from django.conf import settings
from django.core.management import call_command
from project.core_models.aws_config import AWSConfig


def _files_to_upload_to_data_folder():
    path = os.path.join(settings.PROJECT_DIR, 'project/media/')
    files = []
    for (dirpath, dirnames, filenames) in os.walk(path):
        files.extend(filenames)
        break
    return (path, files)

def load_demo_fixture(apps, schema_editor, verbosity=2):
    print('Carregando dados de PlotStep...')
    call_command(
        'loaddata', 'base_app/fixtures/defaults/dumps/demo.json', verbosity=verbosity)

def reset_environment_data():
    print('Running reset_environment_data...')
    aws_config: AWSConfig = settings.ROOT_OBJECT.aws_config

    # flushing and inserting data
    call_command('flush', '--no-input', verbosity=1)
    aws_config.clear_bucket()

    path, filenames = _files_to_upload_to_data_folder()
    aws_config.insert_files_in_bucket_directory(path, filenames)
    
    # loading demostration fixture
    load_demo_fixture(None, None)
    
    print('reset_environment_data done!')

if __name__ == 'django.core.management.commands.shell':
    reset_environment_data()
