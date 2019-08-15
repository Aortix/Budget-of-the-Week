const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

export const getPurchasesOfDay = (day = "Monday", weekID = 0) => {
    let arrayOfPrices = [];

    try {
        db.get(`weeks[${weekID}].days[${day}]`)
            .value()
            .forEach((item) => {
                if (!item.price) {
                    arrayOfPrices.push(0);
                } else {
                    arrayOfPrices.push(item.price);
                }
            })

        return arrayOfPrices;
    }
    catch(error) {
        return error.toString();
    }
}