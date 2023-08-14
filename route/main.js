const express = require('express');
const path = require('path');
const router = express.Router();
const { callChatGPT } = require('./chatgpt');
const schedule = require('node-schedule');

var ipMap = new Map();  //<클라이언트의 ip, 사용횟수> 를 저장한 Map

/*매일 자정 저장된 ipMap을 초기화하여 사용횟수를 모두 채운 클라이언트가 다시 이용 가능하도록 */
const job = schedule.scheduleJob('0 0 * * *', () => {
    ipMap.clear();
    console.log("ip리스트 초기화");
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/enter.html'));
});

router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/main.html'));
});

router.get('/ask', async function (req, res) {
    res.render('askgpt', {
        pass: true
    });
});


router.post('/ask', async (req, res) => {       //ask url로 json형식 요청이 들어오면, 메시지에 해당하는 값을 OpenAI 연동 함수로 보내고 돌아온 값을 res로 리턴해줌.

    const ip = req.ip;
    let count = ipMap.get(ip);
    console.log("ip : " + ip + " ipMap : " + count);
    if (count === undefined || count === 0) {
        ipMap.set(ip, 1);
    }
    else {
        ipMap.set(ip, count + 1);
    }

    if (count < 30 || count === undefined) {
        const prompt = req.body.prompt;
        const response = await callChatGPT(prompt);

        if (response) {
            res.json({ 'response': response });
        } else {
            res.status(500).json({ 'error': '너무 많은 요청 보냄' });
        }
    }
    else {
        res.json({'resoponse': 'over'});
    }
    


});

module.exports = router;
