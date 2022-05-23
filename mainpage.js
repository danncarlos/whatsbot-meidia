const express = require('express')
const app = express()
const port = 3000

const venom = require('venom-bot');
const chatId = '5511958836943-1534778775@g.us'; //Guarda Link
const fs = require('fs')
let count = 0;

app.get('/', function (req, res) {
//   res.send('Hello World');
    let ses = req.query.name;
    venom.create(ses, (base64Qr, asciiQR, attempts, urlCode) => {
        // console.log(asciiQR); // Optional to log the QR in the terminal
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
    
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
    
        var imageBuffer = response;
        require('fs').writeFile(
          'public/images/out.png',
          imageBuffer['data'],
          'binary',
          function (err) {
            if (err != null) {
              console.log(err);
            }
          }
        );
        res.send(base64Qr);

        if(attempts >= 5){
            return null;
        }

      },
      undefined, {logQR: false}).then((client => start(client))).catch((error) => console.log(error));


});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

async function start(client){
    await client.sendText(chatId, msg).then((result) => {
        console.log('Result:', result);
    }).catch((error) => {
        console.error('Error when sending: ', error);
    });
}

async function sessionStatus(statusSession, session) {
    console.log('Status Session: ', statusSession);
    //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
    //Create session wss return "serverClose" case server for close
    console.log('Session name: ', session);
}