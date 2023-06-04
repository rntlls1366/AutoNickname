const express = require('express');
const path = require('path');

const router = express.Router();

const { callChatGPT } = require('./chatgpt');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/main.html'));
  });

router.get('/ask', async function (req, res) {
    res.render('askgpt', {
        pass: true
    });
});


router.post('/ask', async (req, res) => {
    const prompt = req.body.prompt;
    const response = await callChatGPT(prompt);

    if (response) {
        res.json({ 'response': response });
    } else {
        res.status(500).json({ 'error': 'Failed to get response from ChatGPT API' });
    }
});

// router.get('/cart', (req, res) => { //세션 내 장바구니 리스트 전체를 JSON 문자열로 리턴해줌
//   console.log("cartLog");
//   if (req.session.list != undefined && req.session.list != null) {
//     console.log("now list's state is " + JSON.stringify(req.session.list));
//     res.send(JSON.stringify(req.session.list));
//   }
//   res.end();
// })

// router.get('/count', (req, res) =>  {   //세션 리스트의 각 개수와 가격을 곱한 값을 전부 더해서 리턴
//   console.log("count is " + req.session.list.length)
//   res.send({"count" :req.session.list.length});
// })

// router.post('/plus', (req, res) => {   //장바구니 특정 품목 하나 수량 +
//   let num = req.body["number"];
//   console.log("plus method : num : length" + num + " " + req.session.list.length);
//   for(let i = 0; i < req.session.list.length; i++) {
//     if(req.session.list[i]["number"] == num) {
//       req.session.list[i]["count"] = req.session.list[i]["count"] + 1;
//       break;
//     }
//   }  
//   res.end();
// })

module.exports = router;
