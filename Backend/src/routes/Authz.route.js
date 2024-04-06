const express = require("express")
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Key = process.env.SECRET_KEY;


router.post("/signup", (req, res, next) => {
  passport.authenticate('signup', (err, user, info) => {
    if (err) {
      return res.status(500).json({ status: "not_ok", message: 'Internal server error' });
    }
    if (!user) {
      return res.status(400).json({ status: "not_ok", message: info.message });
    }
    res.status(200).json({ status: "ok", message: 'Signup Successful!' });
  })(req, res, next);
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        res.status(400).json({ status: "not_ok", msg: "Login Failed!" })
        return
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { empid: user.empid, role: user.personal.emp_role };
        const token = jwt.sign({ user: body }, Key);
        return res.json({ status: "ok", token });
      }
      );
    } catch (error) {
      return next(error);
    }
  }
  )(req, res, next);
}
);


module.exports = router