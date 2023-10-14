from storages.backends.s3boto3 import S3Boto3Storage
from storages.utils import setting


class StaticStorage(S3Boto3Storage):
    location = 'static'

    def __init__(self, **settings):
        endpoint_url = setting('AWS_S3_ENDPOINT_URL')
        bucket_name = setting('AWS_STORAGE_BUCKET_NAME')
        if endpoint_url == 'http://localhost:5000':
            self.custom_domain = f'localhost:5000/{bucket_name}'
            self.url_protocol = 'http:'
        super().__init__(**settings)


class PublicMediaStorage(S3Boto3Storage):
    location = 'media/public'
    file_overwrite = False


class PrivateMediaStorage(S3Boto3Storage):
    location = 'media/private'
    file_overwrite = False
    custom_domain = False


class DataStorage(S3Boto3Storage):
    location = 'data'
    file_overwrite = False
    custom_domain = False
