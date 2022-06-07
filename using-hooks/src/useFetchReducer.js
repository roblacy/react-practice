import React from 'react';

function sleeper(ms) {
    return function (x) {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
}

const initialState = {
    loading: '',
    error: '',
    data: [],
};

function apiReducer(state, action) {
    switch(action.type) {
        case 'START_FETCH':
            return { ...state, loading: 'yes' };
            break;
        case 'FETCH_ERROR':
            return { ...state, loading: '', error: action.payload };
            break;
        case 'FETCH_SUCCESS':
            return { ...state, loading: '', data: action.payload };
            break;
        default:
            return state;
    }
}

// pretend to fetch data
function useFetchReducer(url) {
    const [data, dispatch] = React.useReducer(apiReducer, initialState);

    React.useEffect(() => {
        dispatch({ type: 'START_FETCH' });

        Promise.resolve()
            .then(sleeper(500))
            .then(() => [Math.random()])
            .then(result => JSON.stringify(result))
            .then(json => {
                console.log('here is the json: ', json, ' ', typeof json);
                dispatch({ type: 'FETCH_SUCCESS', payload: json });
            })
            .catch(error => {
                dispatch({ type: 'FETCH_ERROR', payload: error.message });

            });
    }, [url]); // run any time url changes

    console.log('fetch reducer fetching data and I will return ' + data);
    return data;
}


export default useFetchReducer;