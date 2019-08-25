export const validateStringsForItems = (stringDummyValue) => {
    if (!stringDummyValue && stringDummyValue.trim().length !== 0) {
        return "Undefined type.";
    } else if (typeof stringDummyValue !== "string") {
        return "Not a valid input type (must be as string).";
    } else if (stringDummyValue.trim().length === 0) {
        return "Must have some content.";
    } else {
        return true;
    }
}

export const validateStringsForPrices = (stringDummyValue) => {
    const regex = new RegExp("^[0-9.]+$", "g");

    if (!stringDummyValue && stringDummyValue.trim().length !== 0) {
        return "Undefined type.";
    } else if (typeof stringDummyValue !== "string") {
        return "Not a valid input type (must be a string).";
    } else if (stringDummyValue.trim().length === 0) {
        return "Must have a value.";
    } else if (regex.test(stringDummyValue) !== true) {
        return "Numbers and periods only."
    } else {
        return true;
    }
}

export const validateNumbers = (numberDummyValue) => {
    if (!numberDummyValue) {
        console.log("Number value does not exist.");
        return false;
    } else if (typeof numberDummyValue !== "number") {
        console.log("Number isn't of type number.");
        return false;
    } else {
        return true;
    }
}