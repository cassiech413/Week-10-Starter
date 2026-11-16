import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3LightTheme}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: MD3LightTheme.colors.background } }} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
