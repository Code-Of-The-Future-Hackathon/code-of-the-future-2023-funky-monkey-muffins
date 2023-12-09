import express from 'express';
import passport from 'passport';
import PrismaClient from '../../db';

const router = express.Router();

// TODO: return json according to the UserInfo view
router.get('/@me', passport.authenticate('session'), (req, res) => {
    console.log(req.user);
    res.json(req.user);
})

router.get('/:id', (req, res) => {
    PrismaClient.userInfo.findUnique({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

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
});