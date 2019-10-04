export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

function joinOldAndNewArray(oldObject,updatedValues,arrayName){
	if(updatedValues[arrayName]){
		let values;
		values = oldObject[arrayName].concat(updatedValues[arrayName]);
		updatedValues[arrayName] = values;
	}
}

export const addObject = (oldObject, updatedValues) => {
	joinOldAndNewArray(oldObject, updatedValues, "values");
	joinOldAndNewArray(oldObject, updatedValues, "filters");
    return {
        ...oldObject,
        ...updatedValues
    }
};