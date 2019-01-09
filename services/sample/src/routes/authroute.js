import express from 'express';
import Joi from 'joi';
import { validate, authJwt } from '../middlewares';
import { register, login, protectedRoute, createProtectedRoute } from '../controllers/authcontroller';

const router = express.Router();

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; // One capital, 6 characters
const schema = {
  body: {
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().regex(passwordRegex).required(),
  },
};

router.post('/register', validate(schema), register);
router.post('/login', login);
router.all('/protected', authJwt);
router.get('/protected', protectedRoute);
router.post('/protected', createProtectedRoute);

export default router;
