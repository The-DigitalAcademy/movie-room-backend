const { verifySignUp } = require("../middleware");
// const controller = require("../controllers/auth.controller");

const loginController = require("../controllers/signin_controller");
const SignUpController = require("../controllers/signup_controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/register/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    SignUpController.signup
  );

  app.post("/api/login/signin", loginController.signin);
};