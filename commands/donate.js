module.exports = {
  name: 'donate',
  aliases: ['support', 'contribute'],
  cooldown: 3,
  description: 'Command used to invoke donation options.',
  execute (message, args) {
    message.reply('Use the following options to donate:')
    message.reply('Donate via Ko-Fi (It will redirect to PayPal) :point_right: https://ko-fi.com/karazhanwow')
    message.reply('Donate via Bitcoin :point_right: 12fXC5uiS7YP4md957f1uPEJaS3PohQLv8')
    message.reply('Make sure to message an admin after your payment has been processed to get your VIP role.')
  }
}
