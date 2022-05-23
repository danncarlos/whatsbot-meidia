const venom = require('venom-bot');
const chatId = '5511959725723-1565039596@g.us'; //Guarda Link
const chatIds = ['5511958836943-1529022554@g.us', '5511959725723-1565039596@g.us']; //Guarda Link
// const chatId = '5511958836943-1529022554@g.us'; //Uni
let sendThisWeek = false;
venom.create('session-GL', 
  (base64Qr, asciiQR, attempts, urlCode) => {
    // console.log(asciiQR); // Optional to log the QR in the terminal
    var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');

    var imageBuffer = response;
    require('fs').writeFile(
      'out.png',
      imageBuffer['data'],
      'binary',
      function (err) {
        if (err != null) {
          console.log(err);
        }
      }
    );
  },
  undefined,
  {logQR: true}).then((client => start(client))).catch((error) => console.log(error));

async function start(client){
  // // Retrieve all chats
  // const chats = await client.getAllChats();
  // console.log(chats[0]);

  // sendTestMsg(client, '*');
  let enviado = false;

  let intervalLoop = setInterval(() => {
    if(sendThisWeek){
      console.log('Já enviado');
      clearInterval(intervalLoop);
    }
    else{
      if(isFriday() && !enviado){
        groupMeiiDia(client);
        enviado = true;
      }
      else console.log('ainda não', new Date());
    }

  }, 5000);
}

function isFriday(){
  let day = new Date().toLocaleDateString('en-us', {weekday: 'long'});
  if(day == 'Friday') {
    if(new Date().getHours() >= 12 && new Date().getHours() <= 13){
      return true
    }
    else return false;
  }
  else return false;
}

async function groupMeiiDia(client){
  chatIds.forEach(async (id) => {
    await client.sendFile(id, 'files/sextaMeiiidia.mp4', null, '✨ from bot ✨').then((result) => {
      console.log("Mensagem enviada: ", new Date());
      sendThisWeek = true;
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
  });
}

async function meiiiDia(client){
  // console.log('enviado');
  await client.sendFile(chatId, 'files/sextaMeiiidia.mp4', null, '🤖 from bot').then((result) => {
    console.log("Mensagem enviada: ", new Date());
    sendThisWeek = true;
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
}

async function sendTestMsg(client, msg){
  chatIds.forEach(async (id) => {
    await client.sendText(id, msg).then((result) => {
      // console.log('Result:', result);
      console.log("Mensagem enviada: ", new Date());
    }).catch((error) => {
      console.error('Error when sending: ', error); //return object error
    });
  });
}