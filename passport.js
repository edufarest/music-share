const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/userModel');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
    },
    (username, password, cb) => {

        UserModel.validatePassword(username, password, (res) => {
            if (res) {
                return cb(null, username, {message: 'Logged In!'});
            } else {
                return cb(null, false, {message: 'Incorrect username or password'});
            }
        })
    }));