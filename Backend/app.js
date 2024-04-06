const express = require("express")
const app = express()
require('dotenv').config()
const passport = require("passport")
const session = require('express-session');
var cors = require('cors')


const DB = require("./src/config/dbconfig")
require("./src/authz/authz")
//Routes
const AuthzController = require("./src/routes/Authz.route")
const UserRoute = require("./src/routes/Users.route")


const BodyParser = require("body-parser");

const PORT = process.env.PORT || 5011;
const DOMAIN = process.env.DOMAIN || "localhost";

//middleware
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );

  next();
});
app.use(express.json())

app.use(passport.initialize());
app.use(passport.session());

function errorHandler(err, req, res, next) {
  res.status(500).json({ status: "not_ok", "err": err })
}

app.use(errorHandler)

app.use("/authz", cors(), AuthzController)
app.use("/users", cors(), passport.authenticate('jwt', { session: false }), UserRoute);



app.listen(PORT, DOMAIN, () => {
  console.log(`Server Running on PORT :: ${PORT} && DOMAIN :: ${DOMAIN}`);
})


