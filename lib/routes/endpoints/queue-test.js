const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /queue-test');
  try {
    const app = new WebhookResponse();
    app
      .say({text: 'Xin chào, giờ tôi sẽ chuyển cuộc gọi đến kỹ thuật'})
      .play({url: 'https://www.kozco.com/tech/piano2.wav'})
      .enqueue({
        name: 'support',
        waitHook: '/queue-test/queue-handler',
      });
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/queue-handler', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /queue-test/queue-handler');
  try {
    const app = new WebhookResponse();
    app
      .say({text: 'Hiện tại bạn đang đứng thứ năm trong hàng đợi'})
      .play({url: 'https://www.kozco.com/tech/piano2.wav'})
      .play({url: 'https://www.kozco.com/tech/piano2.wav'});
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;