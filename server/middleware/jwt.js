const jwt = require("jsonwebtoken");

const verify_access_token = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          if (err instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: "Access token has expired" });
          } else {
            return res.status(403).json({ error: "Invalid access token" });
          }
        }
        req.user = payload;
        next();
      });
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const verify_access_token_and_paramsId_with_tokenId = (req, res, next) => {
  verify_access_token(req, res, () => {
    if (req.params.account) {
      if (req.user.user_id === req.params.account) {
        next();
      } else {
        return res.status(403).json({ error: "Unauthorized" });
      }
    } else {
      return res.status(400).json({ error: "Account id is required" });
    }
  });
};

const verify_refresh_token = (req, res, next) => {
  const refresh_token = req.body.refresh;
  if (refresh_token) {
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          if (err instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: "Refresh token has expired" });
          } else {
            return res.status(403).json({ error: "Invalid refresh token" });
          }
        }
        req.user = payload;
        next();
      }
    );
  } else {
    return res.status(401).json({ error: "Refresh token required" });
  }
};

module.exports = {
  verify_access_token,
  verify_refresh_token,
  verify_access_token_and_paramsId_with_tokenId,
};
