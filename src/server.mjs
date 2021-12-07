'use strict'

import TelegramBot from "node-telegram-bot-api"
import {getTranslation} from "./translation.mjs"
import {initGoogleSpreadsheetAdapter} from "./google-spreadsheet-adapter.mjs"
import {telegramBotToken} from "./config.mjs"
import {initDialog} from "./dialog.mjs"
import {initMenu} from "./menu.mjs";

(async () => {
    const bot = new TelegramBot(telegramBotToken, { polling: { interval: 1000 }})
    const translation = getTranslation()
    const googleStorage = await initGoogleSpreadsheetAdapter(translation)

    initMenu(bot, translation)
    initDialog(bot, translation, googleStorage)
})()
