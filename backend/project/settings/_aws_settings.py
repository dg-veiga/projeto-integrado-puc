import os

from .defaults import ROOT_OBJECT, BASE_DIR, WEBSITE_URL


USE_S3 = os.getenv('USE_S3') == 'True'
USE_S3_STATICFILES = os.getenv('USE_S3_STATICFILES') == 'True'

aws_config = ROOT_OBJECT.aws_config

AWS_ACCESS_KEY_ID = aws_config.aws_access_key_id
AWS_SECRET_ACCESS_KEY = aws_config.aws_secret_access_key
AWS_STORAGE_BUCKET_NAME = aws_config.aws_storage_bucket_name
AWS_S3_REGION_NAME = aws_config.region_name
AWS_S3_ENDPOINT_URL = aws_config.endpoint_url
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
    DEFAULT_FILE_STORAGE = 'project.core_models.storage_backends.PublicMediaStorage'
    # s3 private media settings
    PRIVATE_MEDIA_LOCATION = 'media/private'
    PRIVATE_FILE_STORAGE = 'project.core_models.storage_backends.PrivateMediaStorage'
    # s3 static settings
    if USE_S3_STATICFILES:
        STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{STATIC_LOCATION}/'
        STATICFILES_STORAGE = 'project.core_models.storage_backends.StaticStorage'
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
