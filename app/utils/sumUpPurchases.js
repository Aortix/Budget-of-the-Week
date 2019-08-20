const sumUpPurchases = (purchaseArray = [0]) => {
    if (purchaseArray.length === 0 || purchaseArray == undefined || purchaseArray == null ||
        typeof purchaseArray === "string") {
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