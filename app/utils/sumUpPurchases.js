const sumUpPurchases = (purchaseArray) => {
    if (purchaseArray.length === 0 || purchaseArray == undefined || purchaseArray == null) {
        return 0;
    } else {
        let returnNumber = purchaseArray.reduce((accu, currValue) => {
            return accu + currValue;
        })

        returnNumber = parseFloat(returnNumber).toFixed(2);
        return returnNumber;
    }
}

export default sumUpPurchases;