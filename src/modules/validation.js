/**
 * Checks an array of objects for uniqueness based on a property of said objects
 * Assumes that each 
 * @param Array objectArray 
 * @param string propertyToCheck 
 * @returns boolean
 */
const checkArrayOfObjectsForUniquenes = (objectArray, propertyToCheck) => {
    const properties = objectArray.map(o => o[propertyToCheck]);
    const distinctProperties = [...new Set(properties)];
    
    if (objectArray.length !== distinctProperties.length) {
        return false;
    }

    return true;
};

export {
    checkArrayOfObjectsForUniquenes,
};
