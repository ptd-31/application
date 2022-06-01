const router = require('express').Router();
const assert = require('assert');
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.post('/', async(req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /rasa');
  try {
    assert(process.env.RASA_URL);

    const app = new WebhookResponse();
    app.rasa({
      url: process.env.RASA_URL, //URL kết nối với Rasa bằng RestInput
      //prompt: 'Chào mừng bạn đến với tổng đài CCALL, tôi có thể giúp gì được cho bạn', //Một lời chào gửi đến user
      prompt: 'Xin chào',
      eventHook: '/rasa/event', //Một webhook sẽ được gọi khi người dùng gửi tin nhắn
      actionHook: '/rasa/action' //Webhook sẽ gọi khi cuộc khi hoàn thành cuộc gọi
    });

    res.status(200).json(app); //Phản hồi status và app
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/event', async(req, res) => {
  const {logger} = req.app.locals;
  const payload = req.body;
  logger.debug({payload}, 'POST /rasa/event');
  try {
    if (payload.event === 'userMessage' && payload.message.includes('kỹ thuật')) {
      const app = new WebhookResponse();
      app
      .say({text: 'Vui lòng chờ chúng tôi đang kết nối cuộc gọi đến kỹ thuật'})
      .dial({
        target: [
            {
                type: 'phone',
                //number: `${number}`,
                number: `${30000}`,
                trunk: "jambonz"
            }
        ]})
      return res.status(200).json(app);
      
    }
    res.sendStatus(200);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/action', async(req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /rasa/action');
  try {

    res.sendStatus(200);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;