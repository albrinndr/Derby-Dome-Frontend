import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_F_API_KEY,
    authDomain: import.meta.env.VITE_F_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_F_PROJECT_ID,
    storageBucket: import.meta.env.VITE_F_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_F_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_F_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const VAPID_KEY = import.meta.env.VITE_F_VAPID_KEY;


export const getNotificationToken = async () => {
    if (Notification.permission === 'granted') {
        const browserToken = await getToken(messaging, { vapidKey: VAPID_KEY }).then(async (currentToken) => {
            // debugger
            if (currentToken) {
                // console.log('current token for client: ', currentToken);
                return currentToken;
            } else {
                // console.log('No registration token available. Request permission to generate one.');
                // shows on the UI that permission is required 
                return null;
            }
        }).catch(() => {
            // const error: Error = err as Error;
            // console.log('An error occurred while retrieving token. ', error.message);
            console.log('An error occurred while retrieving token. ');
            // catch error while creating client token
        });
        return browserToken;
    } else {
        console.log('Notification permission not granted.');
        // Handle the case where permission is not granted (show UI to request permission)
        return null;
    }

};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });