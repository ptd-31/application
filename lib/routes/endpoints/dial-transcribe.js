const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;

router.post('/', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, 'POST /dial-transcribe');
  try {
    const app = new WebhookResponse();
    app.dial({
      callerId: process.env.OUTBOUND_CALLER_ID, //Caller
      answerOnBridge: true, //Cuộc gọi sẽ đổ chuông cho đến khi được trả lời
      target: [
        {
          type: 'phone',
          number: `${40000}`, //Destination
          trunk: "jambonz"
        }
      ],
      transcribe: {
        transcriptionHook: '/dial-transcribe/test',
        recognizer: {
          vendor: 'google',
          language: 'vi-VN',
          interim: false,
          separateRecognitionPerChannel: true, //Nhận diện người gọi và người nghe.
          enhancedModel: true, //Sử dụng model nâng cao. Dùng để thêm các trường phía dưới
          diarization: true, //Bật speaker diaziration
          diarizationMinSpeakers: 1, //Số người tối thiểu
          diarizationMaxSpeakers: 2, //Số người tối đa
          interactionType: 'phone_call' //Loại tương tác
        }
        
      }
    });
    res.status(200).json(app);
  } catch (err) {
    logger.error({err}, 'Error');
    res.sendStatus(503);
  }
});

router.post('/test', (req, res) => {
  const {logger} = req.app.locals;
  logger.debug({payload: req.body}, '/transcribe/transcription');
  res.sendStatus(200);
});
module.exports = router;