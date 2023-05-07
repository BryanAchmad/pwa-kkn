// import { WindowSharp } from '@mui/icons-material';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);

    const handleOnline = () => {
        setIsConnected(true);
    };

    const handleOffline = () => {
        setIsConnected(false);
    };

    useEffect(() => {
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <ConnectionContext.Provider value={{ isConnected }}>
            {children}
        </ConnectionContext.Provider>
    );
};

export default ConnectionContext;

export function useConnection() {
    const context = useContext(ConnectionContext);
    if (context === undefined) {
        throw new Error('Context must be used within a Provider');
    }
    return context;
}

