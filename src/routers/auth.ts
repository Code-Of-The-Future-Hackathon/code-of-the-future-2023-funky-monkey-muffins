import passport from 'passport';
import express from 'express';
import PrismaClient from '../db';
import { SignUpFormSchema, LoginFormSchema } from '../model';
import argon2 from 'argon2';

const router = express.Router();

router.post('/login', (req, res, next) => {
    LoginFormSchema.parse(req.body);
    next();
}, passport.authenticate('local'));

router.post('/signup', async (req, res, next) => {
    const form = /*SignUpFormSchema.parse(*/req.body/*)*/;

    PrismaClient.user.findUnique({
        where: {
            username: form.username,
            email: form.email
        }
    }).then(async user => {
        if (user) {
            return res.json({ message: 'User already exists' });
        } else {
            PrismaClient.user.create({
                data: {
                    username: form.username,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    passwordHash: await argon2.hash(form.password)
                }
            }).then(user => {
                req.login(user, err => next(err));
                res.json({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                });
            }).catch(err => {
                res.status(500);
                res.json(err);
            })
        }
    }).catch(err => {
        return res.json(err);
    })
});

export default router;