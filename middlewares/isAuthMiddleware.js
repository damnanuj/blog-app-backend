const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers['authorization'] || req.cookies.token;

  if (!token) {
    // Allow logout route to proceed even if the token is missing
    if (req.path === '/logout') {
      return next();
    }
    return res.status(401).send({
      status: 401,
      message: "Session expired, please login again!",
    });
  }

  try {
    const decoded = jwt.verify(token,  process.env.SECRET_KEY);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: "Invalid token, please login again!",
    });
  }
};

module.exports = isAuth;
