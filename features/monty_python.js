const { Botkit, BotkitConversation } = require('botkit');
const MY_DIALOG_ID = 'my-dialog-name-constant';

module.exports = function(controller) {

  let convo = new BotkitConversation(MY_DIALOG_ID, controller);

  controller.hears('hello', 'message', async(bot, message) => {
       await bot.beginDialog(MY_DIALOG_ID);
  });
  //
  convo.say('Stop! Who would cross the Bridge of Death must answer me these questions three, ere the other side he see.');

// ask a question, store the response in 'name'
convo.ask('What is your name?', async(response, convo, bot) => {
    console.log(`user name is ${ response }`);
    // do something?
}, 'name');

convo.addAction('the_quest');

convo.ask('what...is your quest?', async(response, convo, bot) => {
  console.log(`users quest is ${ response }`);
}, 'quest', 'the_quest');

// use add action to switch to a different thread, defined below...
convo.addAction('favorite_color');

// add a message and a prompt to a new thread called `favorite_color`
convo.addMessage('what...', 'favorite_color');
convo.addQuestion('...is your favorite color?', async(response, convo, bot) => {
    console.log(`user favorite color is ${ response }`);
},'color', 'favorite_color');

// go to a confirmation
convo.addAction('confirmation' ,'favorite_color');

// do a simple conditional branch looking for user to say "no"
convo.addQuestion('Your name is {{vars.name}} and your favorite color is {{vars.color}}. Is that right?', [
    {
        pattern: 'no',
        handler: async(response, convo, bot) => {
            // if user says no, go back to favorite color.
            await convo.gotoThread('favorite_color');
        }
    },
    {
        default: true,
        handler: async(response, convo, bot) => {
            // do nothing, allow convo to complete.
        }
    }
], 'confirm', 'confirmation');

  controller.addDialog(convo);
};
