import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '../db';
import argon2 from 'argon2';

passport.use(new LocalStrategy(
    async function (username, password, done) {
        return prisma.user.findUnique({
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
    prisma.user.findUnique({
        where: {
            id
        },
        select: {
            createdAt: true,
            id: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
            username: true,
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
