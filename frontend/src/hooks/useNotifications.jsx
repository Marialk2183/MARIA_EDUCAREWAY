import { useEffect } from 'react';
import { requestNotificationPermission, onMessageListener } from '../config/firebase';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export const useNotifications = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const setupNotifications = async () => {
      try {
        // Request permission and get FCM token
        const token = await requestNotificationPermission();
        
        if (token) {
          // Send token to backend
          await authAPI.updateFCMToken(token);
          console.log('FCM token sent to server');
        }
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    setupNotifications();

    // Listen for foreground messages
    onMessageListener()
      .then((payload) => {
        console.log('Foreground message received:', payload);
        
        // Show toast notification
        toast.info(
          <div>
            <strong>{payload.notification.title}</strong>
            <p>{payload.notification.body}</p>
          </div>,
          {
            position: 'top-right',
            autoClose: 5000,
          }
        );
      })
      .catch((err) => console.log('Failed to receive foreground message:', err));
  }, [user]);
};

export default useNotifications;

