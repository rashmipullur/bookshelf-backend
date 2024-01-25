const passport = require("passport");
const jwt = require("jsonwebtoken");
const HTTP = require("../constants/responseCode");
const UserSession = require("../models/userSession");

function authUser(req, res, next) {
  passport.authenticate(
    "jwt",
    { session: false },
    async (err, user, info, status) => {
      try {
        if (err) {
          console.log(err);
          return next(err);
        }
        const { user, sessionId } = userData;
        console.log(" ---------------authUser------------------- ");

        if (!user) {
          return res.status(HTTP.SUCCESS).send({
            status: false,
            code: HTTP.UNAUTHORIZED,
            message: "Please authenticate yourself",
            data: {},
          });
        }

        if (!sessionId || !ObjectId.isValid(sessionId)) {
          return res.status(HTTP.SUCCESS).send({
            status: false,
            code: HTTP.NOT_ALLOWED,
            message: "Invalid session!",
            data: {},
          });
        }

        const userSession = await UserSession.findOne({
          _id: sessionId,
          userid: user._id,
          isActive: true,
        });
        if (!userSession) {
          return res.status(HTTP.SUCCESS).send({
            status: false,
            code: HTTP.BAD_REQUEST,
            message: "User session is expired!",
            data: {},
          });
        }

        req.user = user;
        req.user.sessionId = sessionId;
        return next();
      } catch (e) {
        console.log("error from user middleware", e);
        return next();
      }

      // if (err) return res.status(500).json({ message: "Internal Server Error" });
      // if (!user) {
      //   return res.status(401).json({ message: "Authentication failed", user });
      // }

      // req.login(user, { session: false }, (err) => {
      //   if (err) return next(err);

      //   const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
      //   return res.json({ user, token });
      // });
    }
  )(req, res, next);
}

const logout = (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
};

module.exports = { authUser, logout };
