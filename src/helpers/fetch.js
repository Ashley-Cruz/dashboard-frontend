const baseUrl = process.env.REACT_APP_API_URL

const fetchSinToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;

    if(method === 'GET'){
        return fetch(url);
    }else{
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

const fetchConToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if(method === 'GET'){
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    }else{
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        })
    }
}

const fetchCardGenerator = () => {
    const url = 'https://randommer.io/api/Card';
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-Api-Key': process.env.REACT_APP_RANDOMMER_API_CARD_HEADER
        }
    })
}

export {
    fetchSinToken,
    fetchConToken,
    fetchCardGenerator
}