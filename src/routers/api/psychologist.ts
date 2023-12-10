import express from "express";
import prisma from "../../db";
import passport from "passport";
import { CreatePsychologistFormSchema, PsychologistQuerySchema } from "../../model";
import { z } from 'zod';
import { User } from "@prisma/client";

const router = express.Router();

router.post('/', passport.authenticate('session'), (req, res) => {
    let result = CreatePsychologistFormSchema.safeParse(req.body);
    
    if (result.success === false) {
        res.status(400);
        res.json({ message: 'Invalid data', data: result.error });
        return;
    }

    let form = result.data;

    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    let user = req.user as User;

    prisma.psychologist.findUnique({
        where: {
            userId: user.id
        }
    }).then(async psychologist => {
        if (psychologist) {
            return res.status(400).json({ message: 'User is already a psychologist' });
        }

        try {
            let psychologist = await prisma.psychologist.create({
                data: {
                    qualification: form.qualification,
                    aboutMe: form.aboutMe,
                    userId: user.id,
                }
            });

            await prisma.psychologistTag.createMany({
                data: form.tags.map(tagId => {
                    return {
                        psychologistId: psychologist.id,
                        tagId
                    }
                })
            });

            res.json(psychologist);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.json({ message: 'Internal server error' });
        }
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
})

router.get('/@me', passport.authenticate('session'), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    let user = req.user as User;

    prisma.psychologist.findUnique({
        where: {
            userId: user.id
        }
    }).then(psychologist => {
        if (!psychologist) {
            return res.status(404).json({ message: 'Psychologist not found' });
        }

        res.json(psychologist);
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
})

router.get('/:id', (req, res) => {
    prisma.psychologist.findUnique({
        where: {
            id: req.params.id
        }
    }).then(psychologist => {
        if (!psychologist) {
            return res.status(404).json({ message: 'Psychologist not found' });
        }

        res.json(psychologist);
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
});

router.get('/:id/tags', (req, res) => {
    prisma.psychologistTag.findMany({
        where: {
            psychologistId: req.params.id,
        },
        include: {
            tag: true
        }
    }).then(tags => {
        res.json(tags.map(tag => tag.tag));
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
});

router.put('/@me/tags', passport.authenticate('session'), (req, res) => {
    let result = z.array(z.string()).safeParse(req.body);

    if (result.success === false) {
        res.status(400);
        res.json({ message: 'Invalid data', data: result.error });
        return;
    }

    let form = result.data;

    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    let user = req.user as User;

    prisma.psychologist.findUnique({
        where: {
            userId: user.id
        }
    }).then(async psychologist => {
        if (!psychologist) {
            return res.status(404).json({ message: 'Psychologist not found' });
        }

        try {
            await prisma.psychologistTag.deleteMany({
                where: {
                    psychologistId: psychologist.id
                }
            });

            await prisma.psychologistTag.createMany({
                data: form.map(tagId => {
                    return {
                        psychologistId: psychologist.id,
                        tagId
                    }
                })
            });

            res.json({ message: 'Successfully updated tags' });
        } catch (err) {
            console.error(err);
            res.status(500);
            res.json({ message: 'Internal server error' });
        }
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
});

router.get('/user/:id', (req, res) => {
    prisma.psychologist.findUnique({
        where: {
            userId: req.params.id
        }
    }).then(psychologist => {
        if (!psychologist) {
            return res.status(404).json({ message: 'Psychologist not found' });
        }

        res.json(psychologist);
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
});

router.get("/query", (req, res) => {
    let query = req.query.q as string;
    let parsed: z.infer<typeof PsychologistQuerySchema>;

    try {
        parsed = PsychologistQuerySchema.parse(JSON.parse(query));
    } catch (err) {
        return res.status(400).json({ message: 'Invalid query' });
    }

    prisma.psychologist.findMany({
        take: 50,
        where: {
            psychologistsTags: {
                some: {
                    tag: {
                        name: {
                            in: parsed.tags
                        }
                    }
                }
            },
            OR: [
                {
                    user: {
                        firstName: {
                            contains: parsed.generalText
                        }
                    }
                },
                {
                    user: {
                        lastName: {
                            contains: parsed.generalText
                        }
                    }
                },
                {
                    user: {
                        username: {
                            contains: parsed.generalText
                        }
                    }
                },
                {
                    user: {
                        email: {
                            contains: parsed.generalText
                        }
                    }
                },
                {
                    qualification: {
                        contains: parsed.generalText
                    }
                },
                {
                    aboutMe: {
                        contains: parsed.generalText
                    }
                }
            ],
        },
        include: {
            user: true,
            psychologistsTags: {
                include: {
                    tag: true
                }
            }
        }
    }).then(psychologists => {
        res.json(psychologists);
    }).catch(err => {
        console.error(err);
        res.status(500);
        res.json({ message: 'Internal server error' });
    })
})

export default router;