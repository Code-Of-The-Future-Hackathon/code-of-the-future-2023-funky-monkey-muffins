/*
- GET /timeline
- GET /timeline/:psychologistId
- POST /
*/

import express from 'express';
import prisma from '../../db';
import passport from 'passport';
import { User } from '@prisma/client';
import { CreateTherapySessionCommentFormSchema, CreateTherapySessionFormSchema } from '../../model';

const router = express.Router();

router.get('/timeline', passport.authenticate('local'), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    let user = req.user as User;
    
    prisma.therapySession.findMany({
        where: {
            patient: {
                user: {
                    id: user.id
                }
            }
        },
        select: {
            id: true,
            date: true,
            isCompleted: true,
            psychologist: {
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phoneNumber: true,
                            username: true,
                        }
                    }
                }
            },
            sessionTier: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    price: true,
                    durationMin: true
                }
            }
        }
    }).then(sessions => {
        res.json(sessions);
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
});

router.get('/timeline/:psychologistId', passport.authenticate('local'), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    let user = req.user as User;

    prisma.therapySession.findMany({
        where: {
            psychologist: {
                id: req.params.psychologistId
            },
            patient: {
                user: {
                    id: user.id
                }
            }
        },
        select: {
            id: true,
            date: true,
            isCompleted: true,
            psychologist: {
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phoneNumber: true,
                            username: true,
                        }
                    }
                }
            },
            sessionTier: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    price: true,
                    durationMin: true
                }
            }
        }
    }).then(sessions => {
        res.json(sessions);
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
});

router.post('/comment', passport.authenticate('local'), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    let user = req.user as User;
    let result = CreateTherapySessionCommentFormSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid request body' });
    }

    let form = result.data;

    // check if user was patient in session
    prisma.therapySession.findUnique({
        where: {
            id: form.sessionId
        },
        include: {
            patient: {
                select: {
                    user: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    }).then(session => {
        if (!session || session.patient.user.id !== user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        prisma.comment.create({
            data: {
                description: form.description,
                rating: form.rating,
                session: {
                    connect: {
                        id: form.sessionId
                    }
                }
            }
        }).then(comment => {
            res.json(comment);
        }).catch(err => {
            console.error(err);
            res.status(500);
            res.json({ message: 'Internal server error' });
        })
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
});

router.post('/', passport.authenticate('local'), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    let user = req.user as User;
    let result = CreateTherapySessionFormSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid request body' });
    }

    let form = result.data;

    prisma.therapySession.create({
        data: {
            date: form.date,
            isCompleted: true,
            patient: {
                connect: {
                    userId: user.id
                }
            },
            psychologist: {
                connect: {
                    id: form.psychologistId
                }
            },
            sessionTier: {
                connect: {
                    id: form.sessionTierId
                }
            }
        }
    }).then(session => {
        res.json(session);
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
});

export default router;
