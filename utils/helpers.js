import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(() =>
    Notifications.cancelAllScheduledNotificationsAsync()
  );
}

function createNotification() {
  return {
    title: 'Do your quiz!',
    body: "👋 don't forget to do your quiz for today!",
  };
}

export async function setLocalNotification() {
  const stored = await AsyncStorage.getItem(NOTIFICATION_KEY);
  if (JSON.parse(stored) !== null) {
    return;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: createNotification(),
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 20,
      minute: 0,
    },
  });

  await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
}
