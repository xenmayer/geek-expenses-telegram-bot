'use strict'

import {selectedLanguage} from "./config.mjs"
import {en} from './languages/en.mjs'
import {ru} from './languages/ru.mjs'

/**
 * @typedef {{
 *  expenseCategories: [string],
 *  months: [string],
 *  expenseCategoryTitle: string,
 *  totalTitle: string,
 *  permissionViolationMessage: string,
 *  startCommand: string,
 *  selectExpenseCategoryCommand: string,
 *  enterExpenseAmountCommand: (expenseCategory: string) => string,
 *  storedMessage: (expenseCategory: string, selectedAmount: string) => string
 * }} Translation
 */

/**
 * @returns {Translation}
 */
export function getTranslation() {
    const languages = {en, ru}

    return languages[selectedLanguage]
}
