export const updateObject = (oldVal, updatedProperty) => {
    return {
        ...oldVal,
        ...updatedProperty
    }
}

export const checkValidity = (value, rules) =>  {
    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minlength) {
        isValid = value.trim().length >= rules.minlength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}