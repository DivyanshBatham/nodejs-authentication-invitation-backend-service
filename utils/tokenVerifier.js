const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const tokenVerifier = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];

    try {
        const payload = await jwt.verify(bearerToken, process.env.JWT_SECRET);

        switch(payload.type) {
            case "one-time-invitation": {
                // Check whether token is still active by querying revokedTokens
                const { sub: email, org } = decoded;
                // Create a new User()
                // Add token to revokedTokens
                break;
            },
            case "open-invitation": {
                const { org, orgInviteToken } = decoded;
                // Check whether org & orgInviteToken match by querying organizations
                // Create a new User()
                break;
            }
            case "access": {
                if (!payload.emailVerified)
                next(createError(403));
                break;
            }
        }
        // If everything went fine:
        req.userId = payload.sub;
        next();

    } catch(err) {
        
        next(createError(401));
    }

  } else {
    next(createError(401));
  }
};

module.exports = tokenVerifier;
