var jwt = require("jsonwebtoken");

function auth(req, res, next) {
console.log(req.session);
  if (!req.session.payload || req.session.payload.role == 1) {
    res.redirect("http://localhost:3000/admin/login");
  } else {
    next();
  }
}

function apiAuth(req, res, next) {
  // console.log(req.headers.token);
  try {
    var decoded = jwt.verify(req.headers.token, "FptPolyTechnic");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token khong dung", err });
  }
}

module.exports = { auth, apiAuth };