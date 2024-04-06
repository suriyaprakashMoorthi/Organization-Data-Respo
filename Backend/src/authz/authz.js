const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const OrganizeModel = require("../models/organizations.models")
const UserModel = require('../models/user.models');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const fakerData = require("../../Utils/faker")

const Key = process.env.SECRET_KEY;


passport.use('signup', new localStrategy(
  {
    usernameField: 'emp_id',
    passwordField: 'emp_password'
  },
  async (emp_id, emp_password, done) => {
    try {
      const CheckUser = await UserModel.findOne({ emp_id });
      if (CheckUser) {
        return done(null, false, { message: 'User Already Exist!' });
      }
      let OrganizeData = fakerData.GetOrganizeData(emp_id);
      const Organize = await OrganizeModel.create(OrganizeData)
      var _id = Organize._id;
      const user = await UserModel.create({ "emp_id": emp_id, "emp_password": emp_password, "personal": _id });

      return done(null, user);
    } catch (error) {
      console.log(error)
      if (error.code == 11000) {
        return done(null, false, { message: "Dublicate Key!" });
      }
      return done(null, false, { message: error });
    }
  }
)
);

passport.use('login', new localStrategy({
  usernameField: 'emp_id',
  passwordField: 'emp_password'
},
  async (emp_id, emp_password, done) => {
    try {
      var user = await UserModel.findOne({ emp_id: emp_id }).populate("personal");
      if (!user) {
        return done(null, false, { message: 'Authentication Failed!' });
      }


      if (user.emp_password != emp_password) {
        return done(null, false, { message: 'Authentication Failed!' });
      }

      return done(null, user, { message: 'Logged in Successfully' });
    } catch (error) {
      return done(error);
    }
  }
)
);

passport.use(new JWTstrategy({
  secretOrKey: Key,
  jwtFromRequest: ExtractJWT.fromHeader('authz')
},
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }
)
);