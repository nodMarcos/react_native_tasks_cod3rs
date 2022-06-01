import TaskList from './src/screens/TasksList';
import { useFonts } from '@use-expo/font'
import AppLoading from 'expo-app-loading';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Lato': require('./assets/fonts/Lato.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TaskList />
  );
}

