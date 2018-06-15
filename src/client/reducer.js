import { combineReducers } from 'redux';

const initialState = {
    data : []
};

const statusData = (state = {...initialState}, action) => {
    switch (action.type) {
    case 'GET_DATA':
        return {
            data : action.data
        };
    case 'CLEAR_DATA':
        return {
            data : initialState
        };
    case 'ADD_STATUS': {
        const data = state.data; // get datagroup from state
        data.push(action.data); // push new data to the group
        console.log(data);
        return {
            ...state,
            data : [...data]
        };
    }
    default:
        return state;
    }
};

export default combineReducers({
    statusData
});
