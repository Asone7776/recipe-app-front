export const formatDate = date => {
    let modifiedDate = new Date(date);
    let dd = String(modifiedDate.getDate()).padStart(2, "0");
    let mm = String(modifiedDate.getMonth() + 1).padStart(2, "0");
    let yyyy = modifiedDate.getFullYear();
    let minutes =
        modifiedDate.getMinutes() < 10
            ? "0" + modifiedDate.getMinutes()
            : modifiedDate.getMinutes();
    let hoursMinutes = `${modifiedDate.getHours()}:${minutes}`;
    return dd + "." + mm + "." + yyyy + " " + hoursMinutes;
};
export const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
};

export const capitalizeFirstLetter = (string) => {
    let lowerCaseString = string.toLowerCase();
    return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
};
export const debounce = (func, wait, immediate) => {
    let timeout;

    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

export const keysGreaterThanZero = (object) => {
    return Object.keys(object).length > 0;
}
export const fromArrayToObj = (array, value = true) => {
    return array.reduce((acc, item) => ({
        ...acc,
        [item]: value
    }), {});
};


export const findItem = (data, id) => {
    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                return data[i];
            }
            if (data[i].subordinates.length > 0) {
                let found = findItem(data[i].subordinates, id);
                if (found) return found;
            }
        }
    }
};
export const flatFilter = (nestedProp, compareKey, compareId, arr) => {
    return arr.filter(o => {
        const keep = o[compareKey] !== compareId;
        if (keep && o[nestedProp]) {
            o[nestedProp] = flatFilter(nestedProp, compareKey, compareId, o[nestedProp]);
        }
        return keep;
    });
}
export const flatMap = (nestedProp, compareKey, compareId, arr, item) => {
    return arr.map(o => {
        const keep = o[compareKey] !== compareId;
        if (keep) {
            if (o[nestedProp]) {
                o[nestedProp] = flatMap(nestedProp, compareKey, compareId, o[nestedProp], item);
            }
        } else {
            console.log('here', item);
            o[nestedProp].push(item);
        }
        return o;
    });
}

