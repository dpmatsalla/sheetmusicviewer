// src/msalConfig.js
export const msalConfig = {
    auth: {
        clientId: 'dpmatsalla@hotmail.com',
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
