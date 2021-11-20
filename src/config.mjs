import dotenv from 'dotenv'
dotenv.config()

const requiredVars = [
    'GOOGLE_SHEET_ID','GOOGLE_CREDS_PATH','ALLOWED_TELEGRAM_IDS','TELEGRAM_BOT_TOKEN'
]
const undefinedVars = requiredVars.filter((requiredVar) => process.env[requiredVar] === undefined)
if (undefinedVars.length > 0) {
    throw new Error(`Please define the required variables: ${JSON.stringify(undefinedVars)}`)
}

export const googleSheetId = process.env.GOOGLE_SHEET_ID
export const googleCredsPath = process.env.GOOGLE_CREDS_PATH
export const allowedTelegramIds = process.env.ALLOWED_TELEGRAM_IDS.split(",")
export const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
export const selectedLanguage = process.env.LANGUAGE.toLowerCase() || 'en'
