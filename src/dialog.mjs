/**
 * @param {TelegramBot} bot
 * @param {Translation} translation
 * @param {StorageAdapter} storageAdapter
 * @return {void}
 */
export function initDialog(bot, translation, storageAdapter) {
    const {
        startCommand,
        enterExpenseAmountCommand,
        storedMessage,
    } = translation

    let callbackState = {}
    // The expense category selection reaction
    bot.on("callback_query", (callbackQuery) => {
        const action = JSON.parse(callbackQuery.data)
        const msg = callbackQuery.message
        const chatId = msg.chat.id
        const selectedCategory = action?.txt
        bot.sendMessage(chatId, enterExpenseAmountCommand(selectedCategory)).then(() => {
            callbackState = { ...callbackState, amount: { chatId, selectedCategory } }
        })
    })

    // The amount entering dialog
    bot.on("message", (msg) => {
        const chatId = msg.chat.id

        if (callbackState.amount) {
            const selectedAmount = getSelectedAmount(msg.text)
            const {
                amount: { selectedCategory },
            } = callbackState


            return storageAdapter.storeExpense(selectedCategory, selectedAmount)
                .then(() =>
                    bot.sendMessage(chatId, storedMessage(selectedCategory, String(selectedAmount)))
                )
                .then(() => (callbackState = {}))
        }

        return bot.sendMessage(chatId, startCommand)
    })

    function getSelectedAmount(messageText = '') {
        const preparedAmountString = Number(String(messageText)?.replace(/\s/g, "").replace(/,/g, "."))

        return  Number.isNaN(preparedAmountString) ? 0 : preparedAmountString
    }
}
