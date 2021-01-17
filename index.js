// requiring packages
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000;
const db = require("./config/mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passportJWT = require("./config/passport-jwt-strategy");
app.use(express.urlencoded());
// setting up session for a user
app.use(
  session({
    name: "HospitalSession",
    secret: "Antyhing",
    saveUninitializedL: true,
    resave: true,
    cookie: {
      maxAge: 60 * 10 * 10 * 10000,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (error) {
        if (error) {
          console.log("error in storing cookies in mongoo");
        } else {
          console.log("successfully stored");
        }
      }
    ),
  })
);
// passport configuration
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", require("./routes"));
// port to listen
app.listen(port , function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});