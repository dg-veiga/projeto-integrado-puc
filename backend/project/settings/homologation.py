from .defaults import *


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'projint',                      
        'USER': 'admin',
        'PASSWORD': '@dmin123',
        'HOST': 'projint-db',
        'PORT': 5432,
    }
}
