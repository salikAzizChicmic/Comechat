import { CometChat } from '@cometchat-pro/react-native-chat';
import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/LoginScreen/Login';
import Register from './src/components/RegisterScreen/Register';
import MessageScreen from './src/components/MessageScreen/MessageScreen';
import UserMessage from './src/components/MessageScreen/UserMessage';
import { STRING ,SCREEN} from './src/constant/Strings';


const App = () => {
  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(false)
  function initiate() {
    var appID = STRING.APP_ID;
    var region = STRING.REGION ;
    var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    CometChat.init(appID, appSetting).then(() => {
      console.log("Initialization completed successfully");
    },
    error => {
      console.log("Initialization failed with error:", error);
    }
    );
  }
  function Logout() {
    CometChat.logout().then(
      () => {
          console.log("Logout completed successfully");
        },error=>{
          console.log("Logout failed with exception:",{error});
        }
    );
}

  useEffect(() => {
    initiate()
    Logout()
  },[])
 
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name={SCREEN.LOGIN_SCREEN} component={Login} />
        <Stack.Screen name={SCREEN.REGISTER_SCREEN} component={Register} />
        <Stack.Screen name={SCREEN.MESSAGE_SCREEN} component={MessageScreen} />
        <Stack.Screen name={SCREEN.USER_MESSAGE_SCREEN} component={UserMessage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App