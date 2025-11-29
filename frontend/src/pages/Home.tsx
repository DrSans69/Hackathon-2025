import { useEffect, useState } from 'react';
import api from '../api';

export default function Home() {
    const [response, setResponse] = useState<string>('');

    useEffect(() => {
        async function fetchStatus() {
            try {
                const res = await api.get('hello/');
                setResponse(JSON.stringify(res.data, null, 2));
            } catch (err) {
                console.error('Failed to fetch brokers:', err);
            }
        }

        fetchStatus();
    }, []);

    return (
        <div>
            <pre>Hello world</pre>
            <pre>{response}</pre>
        </div>
    );
}
