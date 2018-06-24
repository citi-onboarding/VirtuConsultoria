from .base import *

DEBUG = False

'''
Check if DATABASE_URL exists in the environment so we 
can use dj_database_url to set the DB automatically. If 
not, we use our environment.py files to configure 
manually a psql database.
'''
if 'DATABASE_URL' in os.environ:
    default_db = dj_database_url.config(conn_max_age=500)
else:
    db_url = 'postgres://{}:{}@{}:{}/{}'.format(
        config('POSTGRES_DB_USER'), # USER
        config('POSTGRES_DB_PASSWORD'), #PASSWORD
        config('POSTGRES_DB_HOST', default='localhost'), #HOST
        config('POSTGRES_DB_PORT', default=''), #PORT
        config('POSTGRES_DB_NAME') #NAME
    )
    default_db = dj_database_url.config(default=db_url, conn_max_age=500)

DATABASES['default'].update(default_db)

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

SENDGRID_API_KEY = config('SENDGRID_API_KEY', default='')

if SENDGRID_API_KEY == '':
    print('SENDGRID_API_KEY not configured, skipping e-mail settings')
else:
    EMAIL_BACKEND = 'sgbackend.SendGridBackend'

# Configuring STATIC files serving using whitenoise

MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Configuring MEDIA files storage using Amazon S3

INSTALLED_APPS += [
    'storages',
]

AWS_S3_SECURE_URLS = False
AWS_QUERYSTRING_AUTH = False
AWS_S3_ACCESS_KEY_ID = config('AWS_S3_ACCESS_KEY_ID', default='')
AWS_S3_SECRET_ACCESS_KEY = config('AWS_S3_SECRET_ACCESS_KEY', default='')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME', default='')

AWS_REGION = config('AWS_REGION', default='')
AWS_S3_ENDPOINT_URL = 'https://{}.digitaloceanspaces.com'.format(AWS_REGION, default='')

MEDIAFILES_LOCATION = 'media'
DEFAULT_FILE_STORAGE = 'custom_storages.MediaStorage'