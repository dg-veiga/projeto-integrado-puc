import os
from project.core_models.aws_config import AWSConfig


class RootObject:
    def __init__(self, environment: str) -> None:
        endpoint_url = None if os.getenv('AWS_S3_ENDPOINT_URL') == '' else os.getenv('AWS_S3_ENDPOINT_URL')

        self.environment = environment
        self._aws_config = AWSConfig.create(
            aws_access_key_id=os.getenv('AWS_S3_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_S3_SECRET_ACCESS_KEY'),
            aws_storage_bucket_name=os.getenv('AWS_STORAGE_BUCKET_NAME'),
            region_name=os.getenv('AWS_S3_REGION_NAME'),
            endpoint_url=endpoint_url
        )

    @property
    def aws_config(self):
        return self._aws_config
