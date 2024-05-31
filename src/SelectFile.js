// src/SelectFile.js
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { Client } from '@microsoft/microsoft-graph-client';

const SelectFile = () => {
    const { account } = useAuth();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (account) {
            const client = Client.init({
                authProvider: (done) => {
                    done(null, account.idToken);
                },
            });

            client.api('/me/drive/root/search(q=\'.pdf\')')
                .get()
                .then(response => setFiles(response.value))
                .catch(error => console.error(error));
        }
    }, [account]);

    if (!account) {
        return <p>Please log in</p>;
    }

    return (
        <div>
            <h1>Select a PDF file to view</h1>
            <ul>
                {files.map(file => (
                    <li key={file.id}>
                        <a href={`/view-file/${file.id}`}>{file.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectFile;
