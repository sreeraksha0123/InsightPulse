import boto3
from botocore.exceptions import BotoCoreError, ClientError
from backend.config import Config

def get_s3_client():
    return boto3.client(
        "s3",
        aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
        region_name=Config.AWS_REGION,
    )

def upload_file_to_s3(file_obj, filename, content_type="application/octet-stream"):
    """Upload a file-like object to S3 and return the public URL."""
    s3 = get_s3_client()
    bucket = Config.AWS_S3_BUCKET
    if not bucket:
        raise RuntimeError("AWS_S3_BUCKET is not configured")

    try:
        s3.upload_fileobj(
            file_obj,
            bucket,
            filename,
            ExtraArgs={"ContentType": content_type, "ACL": "public-read"},
        )
        url = f"https://{bucket}.s3.{Config.AWS_REGION}.amazonaws.com/{filename}"
        return url
    except (BotoCoreError, ClientError) as e:
        raise RuntimeError(f"Failed to upload to S3: {e}") from e
