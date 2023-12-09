import express from 'express';
import passport from 'passport';
import './utils/auth';
import AuthRouter from './routers/auth';
import expressSession from 'express-session';

const app = express()

app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET!,
  resave: true,
  saveUninitialized: true
}))

app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', AuthRouter);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, () => console.log('server is running'));
