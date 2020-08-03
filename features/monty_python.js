const { Botkit, BotkitConversation } = require('botkit');
const MY_DIALOG_ID = 'my-dialog-name-constant';

module.exports = function(controller) {

  let convo = new BotkitConversation(MY_DIALOG_ID, controller);

  controller.hears('hello', 'message', async(bot, message) => {
       await bot.beginDialog(MY_DIALOG_ID);
  });

  convo.say('Stop! Who would cross the Bridge of Death must answer me these questions three, ere the other side he see.');

  convo.ask('What is your name?', async(response, convo, bot) => {
      console.log(`user name is ${ response }`);
  }, 'name');


  convo.ask('what...is your quest?', async(response, convo, bot) => {
    console.log(`users quest is ${ response }`);
  }, 'quest', 'the_quest');

  convo.ask('what...is your favorite color?', async(response, convo, bot) => {
      console.log(`user favorite color is ${ response }`);
      if (response != "blue"){
      bot.reply('AUGH!')} else {
        bot.reply('Right then, off you go.')
      };
  },'color', 'favorite_color');

  // convo.say('AUGH!!');

  controller.afterDialog(convo, async(bot, results) => {

      // use results of dialog here
      let name = results.name;
      let color = results.color;

      if (name=="Sir Lancelot" && color=="blue") {
        convo.say("Right, off you go!") } else {
          convo.say("AUGH!")
        };

      // do some cool database stuff here

      // start next dialog
      // await bot.beginDialog(NEXT_DIALOG);

  });
// go to a confirmation
// convo.addAction('confirmation' ,'favorite_color');
//
//
// // do a simple conditional branch looking for user to say "no"
// convo.addQuestion('Your name is {{vars.name}} and your favorite color is {{vars.color}}. Is that right?', [
//     {
//         pattern: 'no',
//         handler: async(response, convo, bot) => {
//             // if user says no, go back to favorite color.
//             await convo.gotoThread('favorite_color');
//         }
//     },
//     {
//         default: true,
//         handler: async(response, convo, bot) => {
//             // do nothing, allow convo to complete.
//         }
//     }
// ], 'confirm', 'confirmation');

  controller.addDialog(convo);
};
