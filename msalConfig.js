// src/msalConfig.js
export const msalConfig = {
    auth: {
        clientId: 'YOUR_CLIENT_ID',
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: 'http://localhost:3000/auth/callback',
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: ['User.Read', 'Files.Read'],
};
