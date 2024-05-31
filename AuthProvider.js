// src/AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './msalConfig';

const msalInstance = new PublicClientApplication(msalConfig);
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const accounts = msalInstance.getAllAccounts();
        if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
        }
    }, []);

    const login = async () => {
        try {
            const loginResponse = await msalInstance.loginPopup(loginRequest);
            setAccount(loginResponse.account);
        } catch (error) {
            console.error(error);
        }
    };

    const value = {
        account,
        login,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
