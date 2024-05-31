// src/ViewFile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Client } from '@microsoft/microsoft-graph-client';

const ViewFile = () => {
    const { id } = useParams();
    const { account } = useAuth();
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        if (account) {
            const client = Client.init({
                authProvider: (done) => {
                    done(null, account.idToken);
                },
            });

            client.api(`/me/drive/items/${id}`)
                .get()
                .then(response => setFileUrl(response['@microsoft.graph.downloadUrl']))
                .catch(error => console.error(error));
        }
    }, [account, id]);

    if (!account) {
        return <p>Please log in</p>;
    }

    if (!fileUrl) {
        return <p>Loading...</p>;
    }

    return (
        <iframe src={fileUrl} style={{ width: '100%', height: '100vh', border: 'none' }} title="PDF Viewer"></iframe>
    );
};

export default ViewFile;
