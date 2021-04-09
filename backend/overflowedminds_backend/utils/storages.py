from storages.backends.s3boto3 import S3Boto3Storage


class StaticRootS3Boto3Storage(S3Boto3Storage):
    location = ""  # replaced "static" by "". In the bucket all react files will be placed in the root (e.g. index.html)
    default_acl = "public-read"


class MediaRootS3Boto3Storage(S3Boto3Storage):
    location = "media"
    file_overwrite = False
