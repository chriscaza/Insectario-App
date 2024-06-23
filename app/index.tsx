import { createStackNavigator } from '@react-navigation/stack';

import Welcome from "@/components/screens/Welcome";
import LogIn from '@/components/screens/LogIn';
import apptheme from '@/themes/apptheme';


export default function index() {
  const Stack = createStackNavigator();

  return (
    // <Stack.Navigator>
    //   <Stack.Screen 
    //     name="Welcome" 
    //     component={Welcome}
    //     options={{
    //       headerStyle: {
    //         height: 150,
    //         backgroundColor: apptheme.black
            
    //       }
    //     }}/>
    //   <Stack.Screen name='LogIn' component={LogIn} />
    // </Stack.Navigator>
    <Welcome />
    // <LogIn />
  );
}
