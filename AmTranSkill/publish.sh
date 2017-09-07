rm -rf lambda_upload.zip 
zip -r lambda_upload.zip index.js
aws lambda update-function-code --function-name AmTranSkill --zip-file fileb://lambda_upload.zip