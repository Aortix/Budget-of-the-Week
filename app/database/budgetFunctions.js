const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

export const getBudgetFunction = (weekID = 0) => {
    try {
        return (
            db.get(`weeks[${weekID}].budget`)
                .value()
        )
    }
    catch(error) {
        return error.toString();
    }
}

export const setBudgetFunction = (budgetValue = 0, weekID) => {
    try {
        let test = db.set(`weeks[${weekID}].budget`, budgetValue)
            .write()

        return Number(budgetValue);
    }
    catch(error) {
        return error.toString();
    }
}