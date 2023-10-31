import os
from secrets import get_secret

AKELLO_ENV=os.getenv('AKELLO_ENV')
AWS_REGION=os.getenv('AWS_REGION')
AWS_SECRET_NAME=os.getenv('AWS_SECRET_NAME')
AWS_ACCESS_KEY_ID=os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY=os.getenv('AWS_SECRET_ACCESS_KEY')
DYNAMODB_TABLE=os.getenv('DYNAMODB_TABLE')
AWS_COGNITO_USERPOOL_ID=os.getenv('AWS_COGNITO_USERPOOL_ID')
AWS_COGNITO_APP_CLIENT_ID=os.getenv('AWS_COGNITO_APP_CLIENT_ID')

if AKELLO_ENV != 'LOCAL':
    secrets = get_secret()
    AWS_REGION=secrets['AWS_REGION']
    AWS_SECRET_NAME=secrets['AWS_SECRET_NAME']
    AWS_ACCESS_KEY_ID=secrets['AWS_ACCESS_KEY_ID']
    AWS_SECRET_ACCESS_KEY=secrets['AWS_SECRET_ACCESS_KEY']
    DYNAMODB_TABLE=secrets['DYNAMODB_TABLE']
    AWS_COGNITO_USERPOOL_ID=secrets['AWS_COGNITO_USERPOOL_ID']
    AWS_COGNITO_APP_CLIENT_ID=secrets['AWS_COGNITO_APP_CLIENT_ID']