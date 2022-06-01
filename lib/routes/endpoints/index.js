const router = require('express').Router();
//*=Later
//@=Đã test
//router.use('/auth', require('./auth')); //*Xác thực người dùng SIP bằng cách đọc danh sách người dùng. Ở trong google sheet. Tìm sheet.
router.use('/call-status', require('./call-status')); //@Hiển thị thông tin cuộc gọi(bao gồm các bản tin, Trunk, Caller, Destination, Duration,…)
//router.use('/listen-test', require('./listen-test')); //*Say text và app sẽ listen, sau đó gửi audio đến app(websocket) để nhận và xử lý
//router.use('/tts-test', require('./tts-test'));//*Dùng tag để liên kết thông tin cuộc gọi, nếu như có cuộc gọi ra thì chỉ cần sử dụng thông tin gắn trên thẻ tag thay vì lấy toàn bộ cache
//router.use('/lex-test', require('./lex-test'));//*Kết nối với lex. Gửi một event(bao gồm câu hỏi trong kịch bản) đến lex.
//router.use('/lex-events', require('./lex-events'));//*Chưa hiểu. Pause
//#router.use('/dialogflow-test', require('./dialogflow-test')); //
//#router.use('/dialogflow-events', require('./dialogflow-events'));
//#router.use('/dialogflow-action', require('./dialogflow-action'));
//router.use('/gather', require('./gather-test'));
//router.use('/transcribe', require('./transcribe-test'));
//router.use('/lcc-test', require('./lcc-test'));  // lcc = live call control
//router.use('/lcc-dtmf', require('./lcc-dtmf'));
//router.use('/callback', require('./callback'));
//router.use('/callback-followup', require('./callback-followup'));
//#router.use('/dial-transcribe', require('./dial-transcribe'));
//router.use('/calltranscriptions', require('./calltranscriptions'));
//router.use('/sip-trunking', require('./sip-trunking'));
//router.use('/translator', require('./translator'));
//router.use('/queue', require('./queue'));
//#router.use('/queue-test', require('./queue-test'));
//router.use('/dial', require('./dial'));
//router.use('/cognigy', require('./cognigy'));
//#router.use('/rasa', require('./rasa'));
//router.use('/conference', require('./conference'));
//router.use('/sms', require('./sms'));
//router.use('/refer', require('./refer'));
//router.use('/say-pause', require('./say-pause'));
router.use('/hello-world', require('./tts-hello-world'));
router.use('/test', require('./test'));


module.exports = router;