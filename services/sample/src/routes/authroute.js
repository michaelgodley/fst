import express from 'express';
import Joi from 'joi';
import passport from 'passport';
import { validate } from '../middlewares/validateHandlers';
import { authJwt } from '../middlewares/authHandlers';
import { login, protectedRoute, createProtectedRoute } from '../controllers/authcontroller';

const router = express.Router();

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; // One capital, 6 characters
const schema = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().regex(passwordRegex).required(),
  },
};

router.post('/login', validate(schema), login);
//router.all('/protected', passport.authenticate('jwt', { session: false}));
router.all('/protected', authJwt);
router.get('/protected', protectedRoute);
router.post('/protected', createProtectedRoute);

export default router;
