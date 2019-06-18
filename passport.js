const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/userModel');

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

require('dotenv').config();

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, cb) => {

        UserModel.validatePassword(username, password, (res) => {
            if (res) {
                return cb(null, username, {message: 'Logged In!'});
            } else {
                return cb(null, null, {message: 'Incorrect username or password'});
            }
        })
    })
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
    },
    (jwtPayload, cb) => {
        return UserModel.getById(jwtPayload, (err, res) => {
            if (err) {
                console.error("Error here " + err);
                return cb(err);
            } else {
                return cb(null, res);
            }

        })
    }));
