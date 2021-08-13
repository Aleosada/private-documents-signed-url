const cfsign = require('aws-cloudfront-sign');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  // All log statements are written to CloudWatch
  console.info('received:', event);

  var signingParams = {
    keypairId: 'K2ERZGVH7DE3W',
    privateKeyPath: path.join(__dirname, 'pk.pem'),
    expireTime: new Date().getTime() + 300000
  };

  var signedUrl = cfsign.getSignedUrl(
    'https://documents.osadainc.com.br/LICENSE',
    signingParams
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify({ signedUrl })
  };

  // All log statements are written to CloudWatch
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
