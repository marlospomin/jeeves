# Jeeves [![CircleCI](https://circleci.com/gh/marlospomin/jeeves.svg?style=shield&circle-token=e5eb693e3f68161e197dea92d5e9387ea5810979)](https://circleci.com/gh/marlospomin/jeeves)

> An AzerothCore control bot.

## Usage

```bash
# Install dependencies with yarn
yarn install

# Start the bot
yarn start
```

## Commands

* `help` - Displays a help message for the commands.
* `account` - Resets your password or deletes your account.
* `join` - Register a new account.
* `status` - Retrieves the amount of online players.

## Deploy

Here's how to deploy the bot to Heroku.

```bash
# Login
heroku login
# Create a new app
heroku create
# Update its stack to container
heroku set stack:container
# Push to remote
git push heroku master
```

Add the **required** environment variables using a `.env` file or within Heroku settings page:

| Variable | Type | Example |
| --- | --- | --- |
| PREFIX | `string` | `!` |
| TOKEN | `string` | `Ajk5NDU2NzEyNzg3EDQxMTE0.ZtAFYg.H5tKCb628tZ4X2ttUCZ2xhsbX1I` |
| MYSQL_USER | `string` | `username` |
| MYSQL_PASSWORD | `string` | `password` |
| MYSQL_HOST | `string` | `127.0.0.1` |


## Roadmap

* Add comments to the source code.
* Update account creation logic.
* Create all the basic commands.
* Add basic server util commands.

## License

Code released under the [MIT](LICENSE) license.
