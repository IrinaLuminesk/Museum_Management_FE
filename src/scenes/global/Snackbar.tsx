import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { Snackbar, Alert, type AlertColor, AlertTitle } from '@mui/material';

interface NotificationOptions {
    title: string;
    message: string;
    severity?: AlertColor; // 'success' | 'info' | 'warning' | 'error'
    autoHideDuration?: number;
}

interface NotificationContextType {
    showNotification: (options: NotificationOptions) => void;
    hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState<NotificationOptions>({
        title: '',
        message: '',
        severity: 'info',
        autoHideDuration: 4000,
    });

    const showNotification = (options: NotificationOptions) => {
        setNotification({
            severity: 'info',
            autoHideDuration: 4000,
            ...options,
        });
        setOpen(true);
    };

    const hideNotification = () => {
        setOpen(false);
    };

    return (
        <NotificationContext.Provider value={{ showNotification, hideNotification }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={notification.autoHideDuration}
                onClose={hideNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={hideNotification}
                    severity={notification.severity || 'info'}
                    // success
                    // info
                    // warning
                    // error
                    variant="filled"
                    sx={{ width: '100%', minWidth: '300px' }}
                >
                    <AlertTitle sx={{ fontWeight: 'bold' }}>{notification.title}</AlertTitle>
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};