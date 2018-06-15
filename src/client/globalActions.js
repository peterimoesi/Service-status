import { getDataDogData, getAzureData } from './apis';

export function getData(page) {
    return async (dispatch) => {
        try {
            const data = page === 'dataDog' ? await getDataDogData() : await getAzureData();
            console.log(data);
            dispatch({
                type : 'GET_DATA',
                data
            })
        } catch (e) {
            console.log(e);
        }
    }
}

export function clearData() {
    return {
        type : 'CLEAR_DATA'
    }
}

export function saveData(data) {
    return {
        type : 'ADD_STATUS',
        data
    }
}