import {allowedTelegramIds} from "./config.mjs"

/**
 * @param {TelegramBot} bot
 * @param {Translation} translation
 * @return {void}
 */
export function initMenu(bot, translation) {
    const {
        expenseCategories,
        permissionViolationMessage,
        selectExpenseCategoryCommand,
    } = translation
    const expenseCategoriesMenu = makeMenu(
        expenseCategories,
    )

    bot.onText(/\/store/, showMenu)

    function showMenu(msg) {
        const chatId = msg.chat.id
        hasStorePermissions(msg)

        return hasStorePermissions(msg) ?
            createMenuRequest(chatId, expenseCategoriesMenu)
            : bot.sendMessage(chatId, permissionViolationMessage)
    }

    function createMenuRequest(chatId, menu) {
        const options = {
            reply_markup: JSON.stringify({
                inline_keyboard: menu,
            }),
        }
        return bot.sendMessage(chatId, selectExpenseCategoryCommand, options)
    }

    function makeMenu(menuItems = []) {
        return menuItems.map((menuItem) => [
            {
                text: menuItem,
                callback_data: JSON.stringify({ txt: menuItem }),
            },
        ])
    }

    function hasStorePermissions(msg) {
        return allowedTelegramIds.includes(String(msg.from?.id))
    }
}
