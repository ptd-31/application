const router = require('express').Router();
const assert = require('assert');
const {readFile} = require('fs').promises;
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.post('/', async(req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /dialogflow-test');
  try {
    assert(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    assert(process.env.DIALOGFLOW_PROJECT_ID);
    //Credentials
    const gcreds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const path = gcreds.startsWith('/') ? gcreds : `${__dirname}/../../../${gcreds}`;
    const credentials = await readFile(path, {encoding: 'utf8'});

    const app = new WebhookResponse();

    app.dialogflow({
      //project: 'bot-ccall-9vhv', //ProjecTID
      project: process.env.DIALOGFLOW_PROJECT_ID,
      //region: 'europe-west2',
      credentials, //File key
      //region: 'europe-west2',
      lang: 'en-US', //Ngôn ngữ
      //welcomeEvent: 'Welcome', //Sau khi kết nối lần đầu tiên thì gửi event này đến dialogflow
      welcomeEvent: process.env.DIALOGFLOW_WELCOME_INTENT,
      eventHook: '/dialogflow-events', //Khi có events từ dialogflows(hội thoại, intents được phát hiện) sẽ gửi vào hook này
      actionHook: '/dialogflow-action',//Sau khi kết thúc cuộc gọi thì 
      passDtmfAsTextInput: true,
      tts: { //Âm thanh sẽ được phát bằng TTS thay vì được Dialogflow cung cấp
        vendor: 'default',
        language: 'default'
    }
      
    });
    res.status(200).json(app); //Phản hồi status&app
  } catch (err) { 
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

module.exports = router;