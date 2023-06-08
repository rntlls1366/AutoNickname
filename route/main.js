const express = require('express');
const path = require('path');

const router = express.Router();

const { callChatGPT } = require('./chatgpt');

var count = 0;

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
    console.log('외부 접근 IP : ' + ip + ' count : ' + count);
    count++;
    const prompt = req.body.prompt;
    const response = await callChatGPT(prompt);

    if (response) {
        res.json({ 'response': response });
    } else {
        res.status(500).json({ 'error': 'Failed to get response from ChatGPT API' });
    }
});

module.exports = router;
