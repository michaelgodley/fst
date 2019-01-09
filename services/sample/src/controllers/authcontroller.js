import { createToken } from '../utils';
import env from '../env';
import User from '../db/mongoose/models/user';

export async function register(req, res) {
  try {
    req.log.trace(`register with ${req.username}`);
    const user = await (new User(req.body)).save();
    res.status(200).json( {status: 200, message: 'ok'});
  } catch (error) {
    req.log.warn({ err: error });
    res.status(400).json( {status: 400, message: 'request error'});
  }
};

export function login(req, res) {
  let { username, password } = req.body;
  req.log.trace(`login with ${username}`);
  const token = createToken({ user: username });
  res.cookie('jwt', token, { httpOnly: true});
  res.status(200).json( {status: 200, message: 'ok',  token: token});
};

export function protectedRoute(req, res) {
  req.log.trace(`protected route`);
  res.status(200).json({ status: 200, message: 'get protected route' });
};

export function createProtectedRoute(req, res) {
  req.log.trace(`create protected route`);
  res.status(200).json({ status: 200, message: 'create protected route' });
};
