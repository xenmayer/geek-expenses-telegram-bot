export const ru = {
    expenseCategories: [
        "здоровье и красота",
        "образование",
        "развлечения",
        "туризм, путешествия",
        "продукты и хозтовары",
        "квартплата",
        "аренда жилья",
        "интернет и связь",
        "непредвиденное, ремонт",
        "одежда, товары",
        "авто",
        "цифровые покупки",
        "крупные траты",
        "чрезмерное потребление",
    ],
    months: [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
    ],
    expenseCategoryTitle: 'статья расходов',
    totalTitle: 'итого',
    permissionViolationMessage: 'Доступа нет соррян',
    startCommand: 'Для начала выбери команду',
    selectExpenseCategoryCommand: 'Выбери тип трат',
    enterExpenseAmountCommand: (expenseCategory) =>
        `Ты выбрал ${expenseCategory}. Сейчас давай сумму.`,
    storedMessage: (expenseCategory, selectedAmount) =>
        `Записано ${expenseCategory} ${selectedAmount}`,
}
