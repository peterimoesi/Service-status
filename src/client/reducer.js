import { combineReducers } from 'redux';

const initialState = {
    data : {}
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
        const dataGroup = state.data[action.dataGroupName]; // get datagroup from state
        dataGroup.push(action.dataItem); // push new data to the group
        state.data[action.dataGroupName] = dataGroup;
        return {
            ...state,
            data : {...state.data}
        };
    }
    default:
        return state;
    }
};

export default combineReducers({
    statusData
});
