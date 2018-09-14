import { createToken } from '../utils';
import env from '../env';

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
