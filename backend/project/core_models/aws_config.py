import boto3
from typing import List


class AWSConfig:

    STATIC_FOLDER_NAME = "static/"
    MEDIA_FOLDER_NAME = "media/public/"
    PRIVATE_FOLDER_NAME = "media/private/"
    DATA_FOLDER_NAME = "data/"

    def __init__(self, aws_access_key_id: str, aws_secret_access_key: str,
                 aws_storage_bucket_name: str, region_name: str, endpoint_url: str) -> None:
        self.aws_access_key_id = aws_access_key_id
        self.aws_secret_access_key = aws_secret_access_key
        self.aws_storage_bucket_name = aws_storage_bucket_name
        self.region_name = region_name
        self.endpoint_url = endpoint_url

        self._s3_client = boto3.client(
            's3',
            aws_access_key_id=self.aws_access_key_id,
            aws_secret_access_key=self.aws_secret_access_key,
            region_name=self.region_name,
            endpoint_url=self.endpoint_url
        )

        self._cloudwatch_client = boto3.client(
            'logs',
            aws_access_key_id=self.aws_access_key_id,
            aws_secret_access_key=self.aws_secret_access_key,
            region_name=self.region_name,
            endpoint_url=self.endpoint_url
        )

    def create_bucket(self):
        try:
            try:
                self._s3_client.head_bucket(
                    Bucket=self.aws_storage_bucket_name)
            except Exception as e:
                print(e)
                print(f'Criando bucket {self.aws_storage_bucket_name}')
                self._s3_client.create_bucket(
                    Bucket=self.aws_storage_bucket_name)
            for key in [self.STATIC_FOLDER_NAME,
                        self.MEDIA_FOLDER_NAME,
                        self.PRIVATE_FOLDER_NAME,
                        self.DATA_FOLDER_NAME]:
                self._s3_client.put_object(
                    Bucket=self.aws_storage_bucket_name, Key=(key))
            print('Buckets list: \n', self._s3_client.list_buckets())
            self.list_contents()
        except Exception as e:
            print(e)

    def list_contents(self):
        try:
            contents = [content["Key"] for content in self._s3_client.list_objects_v2(
                Bucket=self.aws_storage_bucket_name).get('Contents', [])]
            print('Contents list: \n', contents)
        except Exception as e:
            print(e)

    def clear_bucket(self):
        try:
            objects = self._s3_client.list_objects_v2(
                Bucket=self.aws_storage_bucket_name)["Contents"]
            objects = list(map(lambda x: {"Key": x["Key"]}, objects))
            self._s3_client.delete_objects(
                Bucket=self.aws_storage_bucket_name, Delete={"Objects": objects})
        except Exception as e:
            print('clear_bucket: ', e)
        finally:
            self.create_bucket()

    def insert_files_in_bucket_directory(self,
                                         dirpath: str,
                                         filenames: List[str], 
                                         directory: str = DATA_FOLDER_NAME):
        for _file in filenames:
            self._s3_client.upload_file(f'{dirpath}{_file}', 
                                        self.aws_storage_bucket_name,
                                        f'{directory}{_file}')
        self.list_contents()

    @property
    def s3_client(self) -> boto3.session.Session.client:
        return self._s3_client

    @property
    def cloudwatch_client(self) -> boto3.session.Session.client:
        return self._cloudwatch_client

    @classmethod
    def create(cls, aws_access_key_id: str, aws_secret_access_key: str,
               aws_storage_bucket_name: str, region_name: str,
               endpoint_url: str) -> 'AWSConfig':
        return AWSConfig(aws_access_key_id=aws_access_key_id,
                         aws_secret_access_key=aws_secret_access_key,
                         aws_storage_bucket_name=aws_storage_bucket_name,
                         region_name=region_name,
                         endpoint_url=endpoint_url)
