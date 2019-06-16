const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/userModel');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
    },
    (username, password, cb) => {
        let user = null;
        UserModel.getById(username, (err, res) => {

            if (err) {
                console.error(err);
                return;
            }

            user = res;
            console.log(res);
        })

        if (user.validatePassword(password)) {
            return cb(null, user, {message: 'Logged In!'});
        } else {
            return cb(null, false, {message: 'Incorrect username or password'});
        }
    }))