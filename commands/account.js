require('dotenv').config()
const mysql = require('mysql')
const crypto = require('crypto')

const connection = mysql.createConnection(`mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}/acore_auth`)

module.exports = {
  name: 'account',
  description: 'Command used to work with account related operations.',
  aliases: ['acc'],
  usage: '[<reset> <newpassword>|<delete>]',
  cooldown: 30,
  execute (message, args) {
    if (!args.length) return message.reply('Missing arguments, type `!help account` for more info.')

    connection.query('select exists(select id from account where reg_mail = ?)', [message.author.id], (error, results, fields) => {
      if (error) return message.reply('An error occured.')

      if (Object.values(results[0])[0] === 1) {
        if (args[0] === 'reset') {
          const password = args[1]

          if (!password || password.length <= 6) return

          const toPassword = (username, password) => {
            const hash = crypto.createHash('sha1')
            const data = hash.update(`${username.toUpperCase()}:${password.toUpperCase()}`, 'utf-8')
            return data.digest('hex').toUpperCase()
          }

          connection.query('select username from account where reg_mail = ?', [message.author.id], (error, results, fields) => {
            if (error) return message.reply('An error occured.')

            const username = Object.values(results[0])[0]

            connection.query('update account set sha_pass_hash = ?, s = ?, v = ? where reg_mail = ?', [toPassword(username, password), '', '', message.author.id], (error, results, fields) => {
              if (error) return message.reply('An error occured.')
              message.reply('New password set.')
            })
          })
        }

        if (args[0] === 'delete') {
          connection.query('delete from account where reg_mail = ?', [message.author.id], (error, results, fields) => {
            if (error) return message.reply('An error occured.')

            message.reply('Account deleted successfully.')
          })
        }
      } else {
        message.reply('You do not have an account.')
      }
    })
  }
}
