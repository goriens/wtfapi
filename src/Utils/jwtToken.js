const sendToken = (user, statusCode, res, msg) => {
  const token = user.getJWTToken();
  //30 days expired token
  const options = {
    expires: new Date(
      Date.now() + process.env.TOKEN_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ message: msg, user, token });
};
module.exports = sendToken;
