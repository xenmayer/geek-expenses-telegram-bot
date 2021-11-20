'use strict'

import {readFile} from 'fs/promises'
import {GoogleSpreadsheet} from "google-spreadsheet"
import {googleCredsPath, googleSheetId} from "./config.mjs"

/**
 * @typedef {{storeExpense: ((function(category: string=, amount: number=): Promise<void>))}} StorageAdapter
 */

/**
 * @param {Translation} translation
 * @returns {{storeExpense: Promise<void>}}
 */
export async function initGoogleStorage(translation) {
    const {
        expenseCategories, expenseCategoryTitle, months, totalTitle
    } = translation
    const creds = JSON.parse(String(await readFile(new URL(googleCredsPath, import.meta.url))))
    const doc = await initGoogleSpreadsheet()
    const worksheet = await upsertYearSheet(doc)

    /**
     * @param {string} category
     * @param {number} amount
     * @return {Promise<void>}
     */
    async function storeExpense(category = "", amount = 0) {
        await upsertExpense(worksheet, category, amount)
    }

    return {
        storeExpense,
    }

    /**
     * @return {Promise<GoogleSpreadsheet>}
     */
    async function initGoogleSpreadsheet() {
        const doc = new GoogleSpreadsheet(googleSheetId)
        await doc.useServiceAccountAuth(creds)
        await doc.getInfo()

        return doc
    }

    /**
     * @param {GoogleSpreadsheet} doc
     * @return {Promise<GoogleSpreadsheetWorksheet>}
     */
    async function upsertYearSheet(doc) {
        const sheets = doc.sheetsByTitle
        const sheetsNames = Object.keys(sheets)
        const year = String(new Date().getFullYear())
        if (!sheetsNames.includes(year)) {
            await doc.addSheet({title: year})
        }
        const worksheet = doc.sheetsByTitle[year]
        const headerRowValues = [expenseCategoryTitle, ...months, totalTitle]
        const boilerplateZeros = Array(13).fill(0)
        const spendsTemplate = expenseCategories.map((expenseCategory) => [
            expenseCategory,
            ...boilerplateZeros,
        ])
        try {
            await worksheet.getRows()
        } catch {
            await worksheet.setHeaderRow(headerRowValues)
            await worksheet.addRows(spendsTemplate)
        }

        return worksheet
    }

    /**
     * @param {GoogleSpreadsheetWorksheet} worksheet
     * @param {string} category
     * @param {number} amount
     * @return {Promise<void>}
     */
    async function upsertExpense(worksheet, category = "", amount = 0) {
        const rows = await worksheet.getRows()

        const selectedRow = rows.find(
            (row) => row[expenseCategoryTitle] === category
        )
        const month = months[new Date().getMonth()]
        selectedRow[month] =
            Number(selectedRow[month]?.replace(/,/g, ".") || 0) + Number(amount)
        await selectedRow.save()
    }
}

