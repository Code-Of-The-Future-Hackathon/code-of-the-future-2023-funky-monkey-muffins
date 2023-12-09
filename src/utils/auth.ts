import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import PrismaClient from '../db';
import argon2 from 'argon2';

passport.use(new LocalStrategy(
    async function (username, password, done) {
        return PrismaClient.user.findUnique({
            where: {
                username
            }
        }).then(async user => {
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!(await argon2.verify(user.passwordHash, password))) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        }).catch(err => {
            return done(err);
        })
    }
))

passport.serializeUser((user: object, done) => {
    if ('id' in user) {
        done(null, user.id);
    }
})

passport.deserializeUser((id: string, done) => {
    PrismaClient.user.findUnique({
        where: {
            id
        }
    }).then(user => {
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    }).catch(err => {
        return done(err);
    }) 
});
