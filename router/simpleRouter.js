var express = require('express');
var usersCtrl = require('../routes/usersController');
const passport = require("passport");
const { isUserAuthenticated } = require("../middlewares/auth");

const successLoginUrl = "http://localhost:3000/#/login";
const errorLoginUrl = "http://localhost:3000/#/error";

//Router
exports.router = (function(){
    var simpeRouter = express.Router();

    //Google routes
    simpeRouter.get(
        "/login/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
      );

    simpeRouter.get(
        "/auth/user/",
        passport.authenticate("google", {
          failureMessage: "Cannot login to Google, please try again later!",
          failureRedirect: errorLoginUrl,
          successRedirect: successLoginUrl,
        }),
        usersCtrl.login
      );
      
    return simpeRouter
})();