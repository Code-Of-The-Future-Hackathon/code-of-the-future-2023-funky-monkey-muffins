import express from 'express';
import passport from 'passport';
import prisma from '../../db';
import type { User } from '@prisma/client';
import { UpdateUserFormSchema } from '../../model';

const router = express.Router();

router.get('/@me', passport.authenticate('session'), (req, res) => {
    if (req.user === undefined) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    prisma.user.findUnique({
        where: {
            id: (req.user as User).id
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
            req.logout(function(err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                return res.status(401).json({ message: 'Unauthorized' });
            });

            return;
        }

        res.json({
            createdAt: user.createdAt,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            username: user.username,
        });
    }).catch(err => {
        res.status(500);
        res.json(err);
    })
})

router.get('/:id', (req, res) => {
    prisma.user.findUnique({
        where: {
            id: req.params.id
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
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            createdAt: user.createdAt,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            username: user.username,
        });
    }).catch(err => {
        res.status(500);
        res.json(err);
    })
});

router.put('/@me', passport.authenticate('session'), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    let user = req.user as User;
    let result = UpdateUserFormSchema.safeParse(req.body);

    if (result.success === false) {
        res.status(400);
        res.send({ message: 'Invalid data', data: result.error });
        return;
    }

    let form = result.data;

    prisma.user.update({
        where: {
            id: user.id
        },
        data: form
    }).then(user => {
        res.json({
            createdAt: user.createdAt,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            username: user.username,
        });
    }).catch(err => {
        res.status(500);
        res.json(err);
    })
});

export default router;
