import express from "express";
import PrismaClient from "../../db";

const router = express.Router();

router.get('/', (req, res) => {
    return res.send({status: 'ok'})
})

router.get("/psychologists", (req, res) => {
    return PrismaClient.psychologist
        .findMany()
        .then(psychologists => {
            if(psychologists === undefined ||  psychologists.length == 0)
            {
                return res.status(404).json({ message: 'No psychologists found'});
            }
            res.json(psychologists);
        }).catch(err => {
            res.status(500);
            res.json(err);
        })
})

export default router;