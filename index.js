const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

app.use(cors());

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-l-mi0e-3.us.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'https://dev-l-mi0e-3.us.auth0.com/api/v2/',
    issuer: [`https://dev-l-mi0e-3.us.auth0.com/`],
    algorithms: ['RS256']
});

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
    res.json({
        message: 'pubic'
    });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
    res.json({
        message: 'ruta privada con auth'
    });
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    return res.status(status).json({ error: error.toString() });
});

const port = 3001;

app.listen(port, function () {
    console.log(`Orders app listening on port ${port}!`);
});