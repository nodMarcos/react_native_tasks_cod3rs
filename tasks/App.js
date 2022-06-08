import { useFonts } from '@use-expo/font'
import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import Navigator from './src/navigator';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Lato': require('./assets/fonts/Lato.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Navigator />
  );
}

