
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

type Config = {
    method: 'POST' | 'GET' | 'PUT',
    headers: {
        endpoint: string,        
    }
    body?: any
}

type Response = {
    ok?: string,
    status?: string,
    json?: string 
}

const client = endpoint => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    
    return window    
        .fetch(`${endpoint}`, config)
        .then(async response => {            
            if (response.ok) {
                return await response.json();
            } else {
                return new Error('500')
                // const errorMessage = await response.text();
                // return Promise.reject([ { error: new Error(errorMessage) } ]);
            }
        });
};

export default client;