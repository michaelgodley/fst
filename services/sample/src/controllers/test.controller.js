
export function findOne(req, res) {
  req.log.info(`findOne`);
  res.status(200).json({
    code: 200,
    message: 'Ok'
  });
}

export function findAll(req, res) {
  req.log.info(`findAll`);
}
