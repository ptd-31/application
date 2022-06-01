//Thêm module express vào project.
const router = require('express').Router();
const speech = require('@google-cloud/speech');
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

// Include fs module
const fs = require('fs');
//Tạo ra đường dẫn đến thư mục chứa file json credentials
//const credentials = fs.readFileSync(process.env.DIALOGFLOW_CRED_PATH,
//    {encoding: 'utf-8'});
const credentials = fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS,
    {encoding: 'utf-8'});
//POST
//Địa chỉ server sẽ nhận request từ client.
router.post('/', (req, res) => {

//log
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /dialogflow');
  try {
    const app = new WebhookResponse();
    app.dialogflow({ 
        project: 'bot-ccall-9vhv', //project id của google dialogflow
        lang: 'vi-VN', //Ngôn ngữ
        //lang: 'en-US',
        credentials, //Import from Line 10
        welcomeEvent: 'xin chào', //Một event  gửi đến dialogflow khi kết nối lần đầu tiên
        passDtmfAsTextInput: true, //Người dùng nói sẽ chuyển thành text và chuyển đến dialogflow
        eventHook: "/dialogflow/events", //Thực hiện khi có events(hội thoại, intents được phát hiện)
        bargein: true, //Ngừng phát âm thanh khi người dùng nói(mode True)
        tts: { //Âm thanh sẽ được phát bằng TTS thay vì được Dialogflow cung cấp
            vendor: 'default',
            language: 'default'
        }
    });
    res.status(200).json(app); //Respond status và app
} catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
}
});
//POST 2
router.post('/events', (req, res) => {

    const {logger} = req.app.locals;
    const payload = req.body;
    logger.debug({payload}, 'POST /dialogflow/events');
    try {
        res.sendStatus(200);
    } catch (err) {
        logger.error({err}, 'Error');
        res.sendStatus(503);
    }
});
module.exports = router;