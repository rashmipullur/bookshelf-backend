const User = require("../models/user");
const UserSession = require("../models/userSession");

//genrate JWT token store user session
async function createSessionAndJwtToken(user) {
  try {
    const expAt = new Date().getTime() / 1000 + 86400;

    const userSession = await new UserSession({
      userid: user._id,
      isActive: true,
      expAt: expAt.toFixed(),
    }).save();
    if (!userSession) {
      throw "Unable to store user session.";
    }
    // let payload = { result: { id: user._id, sessionId: userSession._id } }
    // token = sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    // sign the JWT token
    // const payload = { email: user.email, id: user._id, sessionId: userSession._id }
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "Id" })

    console.log(
      "---------------create session and jwt token----------------------"
    );

    //sign the JWT token
    const payload = {
      username: user.username,
      id: user._id,
      sessionId: userSession._id,
    };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(token);

    return token;
  } catch (e) {
    console.log(e);
    throw "Unable to create session or genrate JWT token";
  }
}

module.exports = {
  createSessionAndJwtToken,
};
