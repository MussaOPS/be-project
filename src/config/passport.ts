import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {UsersModel} from '../models/usersModel';

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req.cookies.jwt,
    ]),
    secretOrKey: '50abce5f-4837-4ce5-a673-a2bf7eb5ed98',
};

passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        try {
            const user = UsersModel.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    })
);
