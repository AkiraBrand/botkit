/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    controller.hears('sample','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'I heard a sample message.');
    });

    controller.hears('ask me the questions, bridgekeeper, I am not afraid', 'message,direct_message', async(bot, message) => {
      await bot.reply(message, 'What...is your name?');
    });

    controller.hears('Sir Lancelot of Camelot', 'message,direct_message', async(bot, message) => {
      await bot.reply(message, 'What...is your quest?');
    });

    controller.hears('To seek the holy grail', 'message,direct_message', async(bot, message) => {
      await bot.reply(message, 'What... is your favorite color?');
    });

    controller.hears('Blue', 'message,direct_message', async(bot, message) => {
      await bot.reply(message, 'Right. Off you go.');
    });

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, `Echo: ${ message.text }`);
    });

}
