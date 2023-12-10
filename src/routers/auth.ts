import passport from 'passport';
import express from 'express';
import prisma from '../db';
import { SignUpFormSchema, LoginFormSchema } from '../model';
import argon2 from 'argon2';
import { z } from 'zod';

const router = express.Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
}));

router.post('/signup', async (req, res) => {
    let result = SignUpFormSchema.safeParse(req.body);
    if (result.success === false) {
        res.status(400);
        res.send({ message: 'Invalid data', data: result.error });
        return;
    }

    let form = result.data;

    prisma.user.findUnique({
        where: {
            username: form.username,
            email: form.email
        }
    }).then(async user => {
        if (user) {
            return res.json({ message: 'User already exists' });
        } else {
            prisma.user.create({
                data: {
                    username: form.username,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    phoneNumber: form.phoneNumber,
                    passwordHash: await argon2.hash(form.password)
                }
            }).then(user => {
                req.login(user, err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                });
                res.json({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
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

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.redirect('/');
    });
});

export default router;