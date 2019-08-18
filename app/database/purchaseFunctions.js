const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

import moment from 'moment'

//GET ACTIONS
export const updateDay = (day = "Monday") => {
    return db.get(`weeks[${db.get("weeks").value().length - 1}].days`)
        .value()[day]
}

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
        return allPricesForTheWeek;
    }
    catch(error) {
        return error.toString();
    }
}

//POST ACTIONS
export const addPurchaseToDay = (itemInput, priceInput, day = "Monday", week = 0) => {
        try {
            db.get(`weeks[${week}].days[${day}]`)
                .push({
                    id: itemInput + moment().format(),
                    itemName: itemInput,
                    price: Number(priceInput)
                })
                .write()
        }
        catch(error) {
            return error.toString();
        }
}