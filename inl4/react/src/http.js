const axios         = require('axios');
const MockAdapter   = require('axios-mock-adapter');

// ...

const mock = new MockAdapter(axios);

// ...
// Example of user credentials to match against incoming credentials.
const username = 'me@domain.com';
const password = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends  = ['alice', 'bob'] 

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// ...

// /api/auth
mock.onPost('/api/auth').reply(config => {
    const data // object
        = JSON.parse(config.data);
        if(username === data.body.username && password === data.body.password) {
            return [200, {token}]
        } else {
            return [401, { error : 'invalid login credentials'}]
        } 
});

mock.onGet('/api/friends').reply(config => {
    const {
        headers // object
    } = config;

    if(headers.Authorization === ` ${token}`){
        return [200, {friends}]
    } else if(!headers) {
        return [400, {error: 'No Authorization'}]
    } else if(headers.Authorization !== ` ${token}`) {
        return [401, {error: 'Unauthorized'}]
    }

});

// if a request in not handled in the mocks above, this will return a generic 400 response.
mock.onAny().reply(400, { error: 'Unsupported request' });

// ...

export default axios;