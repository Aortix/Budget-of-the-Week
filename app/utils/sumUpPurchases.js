const sumUpPurchases = (purchaseArray) => {
    if (purchaseArray.length === 0 || purchaseArray == undefined || purchaseArray == null) {
        return 0;
    } else {
        return purchaseArray.reduce((accu, currValue) => {
            return accu + currValue;
        })
    }
}

export default sumUpPurchases;