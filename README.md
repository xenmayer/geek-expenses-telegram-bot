# Geek Expenses (works fine, but in the active developing phase now)
## The Telegram bot with the GoogleSpreadsheet database

## Steps to deploy your own expense tracking bot

1. Create the Telegram bot via BotFather
2. Create the Google api keys
3. Configure the bot backend

### 1 Create telegram bot

[The official description of creation](https://core.telegram.org/bots)

In two words: 
1. Go to the https://t.me/BotFather bot
2. Start with the `/newbot` command and follow the instructions
3. Copy and save the token as the ```TELEGRAM_BOT_TOKEN=``` variable in the `.env` file

### 2 Create Google Api keys

Slightly complicated that Telegram bot but let's do some stuff.
This bot uses the Google spreadsheet npm library. 
It has a good authentication tutorials. You need to do 2 things
1. Follow the instructions in the 
[Service Account (recommended)](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account)
2. Save the `creds.json` from the Google in the bot root directory

### 3 Configure the bot backend

There are two variants of running the bot. 

1. `Pull repo` 
-> `cp env.template .env` 
-> `download creds.json from google and place somewhere in your disc` 
-> `npm ic` -> `npm run start`
2. Use the docker run command below:

!!! pass the Google's creds.json file into command
```bash
docker run \
-e TELEGRAM_BOT_TOKEN='your-telegram-bot-token' \
-e ALLOWED_TELEGRAM_IDS='0000000,00000000' \
-e GOOGLE_SHEET_ID='your-google-document-id' \
-e LANGUAGE='en' \
-e GOOGLE_CREDS_PATH='/usr/src/app/creds/creds.json' \
-v path/to/creds_json/directory:/usr/src/app/creds
xenmayer/geek-expenses-telegram-bot:latest
```

[The DockerHub package page](https://hub.docker.com/r/xenmayer/geek-expenses-telegram-bot)
