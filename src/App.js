// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider';
import SelectFile from './SelectFile';
import ViewFile from './ViewFile';

const App = () => {
    const { login } = useAuth();

    return (
        <Router>
            <div>
                <button onClick={login}>Login to OneDrive</button>
                <Switch>
                    <Route path="/view-file/:id" component={ViewFile} />
                    <Route path="/" component={SelectFile} />
                </Switch>
            </div>
        </Router>
    );
};

export default () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);
