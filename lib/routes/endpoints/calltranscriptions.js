const router = require('express').Router();

router.post('/calltranscriptions', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'calltranscription');
  res.sendStatus(200);
});

module.exports = router;