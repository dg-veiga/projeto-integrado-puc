from .defaults import *


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'projint',                      
        'USER': 'admin',
        'PASSWORD': '@dmin123',
        'HOST': 'localhost',
        'PORT': 5432,
    }
}

from ._aws_settings import *
