module.exports = {
  name: 'donate',
  aliases: ['support', 'contribute'],
  cooldown: 3,
  description: 'Command used to invoke donation options.',
  execute (message, args) {
    message.reply('Use the following options to donate:')
    message.reply('Donate via Ko-Fi (It will redirect to PayPal) => https://ko-fi.com/karazhanwow\nDonate via Bitcoin => 12fXC5uiS7YP4md957f1uPEJaS3PohQLv8\n\nAny amounts are welcome, profits will be destined towards building/expanding the server.')
    message.reply('Make sure to message an admin after your payment has been processed to get your VIP role.')
  }
}
