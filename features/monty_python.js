const { Botkit, BotkitConversation } = require('botkit');
const MY_DIALOG_ID = 'my-dialog-name-constant';

module.exports = function(controller) {

  let convo = new BotkitConversation(MY_DIALOG_ID, controller);

  controller.hears('hello', 'message', async(bot, message) => {
       await bot.beginDialog(MY_DIALOG_ID);
  });

  convo.say('Stop! Who would cross the Bridge of Death must answer me these questions three, ere the other side he see.');

  convo.ask('What is your name?', async(response, convo, bot) => {
      console.log(`My name is ${ response }`);
      // do something?
  }, 'name');

  controller.addDialog(convo);
//   controller.on('message', async(bot, message) => {
//      // do something!
// });

};
