const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

import moment from 'moment'

// Set some defaults (required if your JSON file is empty)
export const initializeDB = () => {
    return new Promise((resolve, reject) => {
        if (db.get("weeks[0]").value() !== undefined) {
            resolve(null);
        } else {
            resolve(db.defaults({weeks: [{
                id: 0,
                budget: 0,
                dateCreated: moment().format("YYYY-MM-DD"),
                days: { 
                Monday: [{
                    id: 0,
                    itemName: "Grocery shopping",
                    price: 100
                }],
                Tuesday: [{
                    id: 0,
                    itemName: "Gasoline",
                    price: 20
                  },
                  {
                      id: 1,
                      itemName: "Lunch",
                      price: 20
                  }
                ],
                Wednesday: [{
                    id: 0,
                    itemName: "Textbooks",
                    price: 200
                }],
                Thursday: [{
                    id: 0,
                    itemName: "Gift",
                    price: 40
                }],
                Friday: [{
                }],
                Saturday: [{
                    id: 0,
                    itemName: "Bar",
                    price: 100
                }],
                Sunday: [{
                    id: 0,
                    itemName: "Snack",
                    price: 5
                }]
            }}]})
              .write())
        }
    })
}

//GET ACTIONS
export const updateDay = (day = "Monday") => {
    if (db.get("weeks").value() === undefined) {
        return 0;
    } else {
        return (
            db.get(`weeks[${db.get("weeks").value().length - 1}].days`)
                .value()[day]
        )
    }
}

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

export const getBudgetFunction = (weekID = 0) => {
    if (db.get(`weeks[${weekID}].budget`).value() === undefined) {
        return 0;
    } else {
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
}

export const getCurrentWeekID = () => {
    return (
        db.get("weeks").value().length - 1
    )
}

//POST ACTIONS
export const addPurchaseToDay = (itemInput, priceInput, day = "Monday", week = 0) => {
        let convertedPrice = Number.parseFloat(priceInput).toFixed(2);

        try {
            db.get(`weeks[${week}].days[${day}]`)
                .push({
                    id: itemInput + moment().format(),
                    itemName: itemInput,
                    price: Number(convertedPrice)
                })
                .write()
        }
        catch(error) {
            return error.toString();
        }
}

//PUT REQUESTS
export const updatePurchaseToDay = (itemID, itemText, itemPrice, day, week) => {
    let convertedPrice = Number.parseFloat(itemPrice).toFixed(2);

    try {
        db.get(`weeks[${week}].days[${day}]`)
            .find({ id: itemID})
            .assign({
                itemName: itemText, 
                price: Number(convertedPrice)
            })
            .write()
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

//DELETE REQUESTS
export const deletePurchaseToDay = (itemID, day, week) => {
    try {
        db.get(`weeks[${week}].days[${day}]`)
            .remove({ id: itemID})
            .write()
    }
    catch(error) {
        return error.toString();
    }
}