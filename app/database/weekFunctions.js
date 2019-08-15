const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

export const getTotalPriceForTheWeek = (weekID = 0) => {
    let allPricesForTheWeek = [];

    try {
        let test = db.get(`weeks[${weekID}].days`)
            .value()

        let values = Object.values(test);
        values.forEach((item) => {
            if (!item) {
                console.log("undefined item");
            } else {
                item.forEach((nestedItem) => {
                    if (!nestedItem.price) {
                        allPricesForTheWeek.push(0);
                    } else {
                        allPricesForTheWeek.push(nestedItem.price);
                    }
                })
            }
        })

        console.log(allPricesForTheWeek);
        return allPricesForTheWeek;
    }
    catch(error) {
        return error.toString();
    }
}