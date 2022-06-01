const router = require('express').Router();
const WebhookResponse = require('@jambonz/node-client').WebhookResponse;
//POST 1
router.post('/collect', (req, res) => {
    const {logger} = req.app.locals;
    logger.debug({payload: req.body}, 'POST /dial-o-rama/collect');
    try {
        const app = new WebhookResponse(); //Gọi các digits và speech đã collect
        //appppppppppppppppppppppppppppppppp
        app.gather({
            actionHook: '/dial-o-rama/process', //Sẽ POST đến Hook các số hoặc chữ đã collect
            input: ['digits', 'speech'],
            finishOnKey: '#', //Key kết thúc input
            numDigits: 5, //Số lượng số dự định collect
            timeout: 150, //Số giây dừng truyền sẽ ngắt cuộc gọi
            say: { //Phát ra text --> speech nhắc người dùng
                //text: 'Call five number you would like to call:  ',
                //text: 'Đọc 5 số mà bạn muốn gọi: '
                text: 'Đọc số mà bạn muốn thực hiện cuộc gọi: '
            }
        });
        res.status(200).json(app);

    } catch (err) {
        logger.error({err}, 'Error');
        res.sendStatus(503);
    
    }
});
//POST 2
router.post('/process', (req, res) => {

    const {logger} = req.app.locals;
    const payload = req.body;
    logger.debug({payload}, 'POST /dial-o-rama/process');
    try {
        //Khai báo biến Destination
        //let destination; 
        if (payload.speech && payload.speech.alternatives.length){
            const result = payload.speech.alternatives;
        logger.debug(result);
        const number = result.transcript;
            const app = new WebhookResponse();
            app
                .say({text: 'Vui lòng chờ, chúng tôi đang kết nối cuộc gọi của bạn'})
                .dial({
                    target: [
                        {
                            type: 'phone',
                            //number: `${number}`,
                            number: `${12345}`,
                            trunk: "jambonz"
                        }
                    ]})
                .play({url: 'silence_stream://1000'})
                .transcribe({
                    transcriptionHook: "/test",
                    recognizer: {
                        vendor: 'google',
                        language: 'vi-VN',
                        altLanguages: ['en-US'],
                        dualChannel: true,
                        separateRecognitionPerChannel: true,
                        enhancedModel: true,
                        diarization: true,
                        diarizationMinSpeakers: 1,
                        diarizationMaxSpeakers: 2
                    }

                })
            return res.status(200).json(app);
        }
        res.sendStatus(200);
    } catch (err) {
        logger.error({err}, 'Error');
        res.sendStatus(503);
    }
});
//POST 3
router.post('/test', async(req, res) => {
    const {logger} = req.app.locals;
    logger.debug({payload: req.body}, 'POST /dial-o-rama/transcribe');
  
    try {
      const app = new WebhookResponse();
      app
        .play({url: 'silence_stream://1000'}) //Dùng để truyền audio đã ghi cho cuộc gọi, một url sẽ đến một file mp3/wav
        .transcribe({
          transcriptionHook: '/transcribe/transcription',
          recognizer: {
            vendor: 'google',
            language: 'vi-VN',
            diarization: true
            //profanityOption: 'masked',
            //requestSnr: true,
            //outputFormat: 'detailed'
          }
        });
      res.status(200).json(app);
    } catch (err) {
      logger.error({err}, 'Error');
      res.sendStatus(503);
    }
  });
  //POST 4
  router.post('/transcription', (req, res) => {
    const {logger} = req.app.locals;
    logger.debug({payload: req.body}, '/dial-o-rama/transcribe/transcription');
    res.sendStatus(200);
  });

module.exports = router;