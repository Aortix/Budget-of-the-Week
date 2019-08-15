const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
export const initializeDB = () => {
    return new Promise((resolve, reject) => {
        if (db.get("weeks[0]").value() !== undefined) {
            resolve(null);
        } else {
            resolve(db.defaults({weeks: [{
                id: 0,
                budget: 0,
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