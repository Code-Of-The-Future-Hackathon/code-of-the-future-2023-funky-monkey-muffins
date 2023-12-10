import express from 'express';
import passport from 'passport';
import './utils/auth';
import session from 'express-session';

import AuthRouter from './routers/auth';
import PsychologistRouter from './routers/api/psychologist';
import UserRouter from './routers/api/user';
import TherapySessionRouter from './routers/api/therapySession';

const app = express()

app.use(session({
  secret: "string",
  resave: true,
  saveUninitialized: true
}))

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/therapySession', TherapySessionRouter);
app.use('/api/psychologist', PsychologistRouter);
app.use('/api/user', UserRouter);

app.use('/auth', AuthRouter);

app.get('/', function (req, res) {
  res.send('*wind noises*')
})

app.listen(3000, () => console.log('server is running'));
