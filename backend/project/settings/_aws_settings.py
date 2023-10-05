import os

from .defaults import BASE_DIR, WEBSITE_URL

USE_S3 = True
USE_S3_STATICFILES = True
AWS_S3_ACCESS_KEY_ID = 'testing'
AWS_S3_SECRET_ACCESS_KEY = 'testing'
AWS_STORAGE_BUCKET_NAME = 'testing-bucket'
AWS_S3_REGION_NAME = 'us-east-1'
AWS_S3_ENDPOINT_URL = 'http://localhost:5000'
AWS_S3_VERIFY = True

STATIC_LOCATION = 'static'

if USE_S3:
    # aws settings
    AWS_DEFAULT_ACL = None
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
    # s3 public media settings
    PUBLIC_MEDIA_LOCATION = 'media/public'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/'
    DEFAULT_FILE_STORAGE = 'directo_backend.core_models.storage_backends.PublicMediaStorage'
    # s3 private media settings
    PRIVATE_MEDIA_LOCATION = 'media/private'
    PRIVATE_FILE_STORAGE = 'directo_backend.core_models.storage_backends.PrivateMediaStorage'
    # s3 static settings
    if USE_S3_STATICFILES:
        STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{STATIC_LOCATION}/'
        STATICFILES_STORAGE = 'directo_backend.core_models.storage_backends.StaticStorage'
        STATIC_FILES_ABSOLUTE_URL = STATIC_URL
    else:
        STATIC_URL = '/static/'
        STATIC_ROOT = os.path.join(BASE_DIR, 'static')
        STATIC_FILES_ABSOLUTE_URL = f'{WEBSITE_URL}{STATIC_URL}'
else:
    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
    STATIC_FILES_ABSOLUTE_URL = f'{WEBSITE_URL}{STATIC_URL}'
