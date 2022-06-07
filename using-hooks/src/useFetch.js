import React from 'react';

// pretend to fetch data
function useFetch(url) {
    const [data, setData] = React.useState('[1]');

    React.useEffect(() => {
        Promise.resolve([Math.random()])
            .then(result => JSON.stringify(result))
            .then(json => setData(json));
    }, [url]); // run any time url changes

    console.log('fetching data and I will return ' + data);
    return data;
}


export default useFetch;