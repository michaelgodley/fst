// eslint-disable-next-line no-unused-vars
export function findOne(req, res) {
  req.log.info(`findOne`);
  res.status(200).json({
    code: 200,
    message: 'Ok',
  });
}

// eslint-disable-next-line no-unused-vars
export function findAll(req, res) {
  req.log.info(`findAll`);
}
