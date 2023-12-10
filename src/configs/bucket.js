const aws = require('aws-sdk');
require('dotenv').config();

const endpoint = new aws.Endpoint(process.env.BLAZE_URL);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.BLAZE_ID,
        secretAccessKey: process.env.BLAZE_KEY
    }
});


module.exports = s3;