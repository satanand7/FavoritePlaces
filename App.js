import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';

// SplashScreen.preventAutoHideAsync();


const Stack = createNativeStackNavigator();
export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);



  useEffect(()=>{
    async function prepare(){
      init().then(()=>{
        setAppIsReady(true);
      }).catch((err)=>{
        console.log(err);
      });
    }
    prepare();
  },[])

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerStyle:{
            backgroundColor:Colors.primary500,
            
          },
          headerTintColor:Colors.gray700,
          contentStyle:{
            backgroundColor:Colors.gray700
          }
        }}>
          <Stack.Screen name='AllPlaces' component={AllPlaces} 
          
          options={({navigation})=>({
            title:'Your Favorite Places',
            headerRight:({tintColor})=> 
            <IconButton icon={'add'} 
            size={24} 
            color={tintColor} 
            onPress={()=>navigation.navigate('AddPlace')}
            
            />
          })}
          />
          <Stack.Screen name='AddPlace' component={AddPlace} 
          options={{
            title:'Add a new place'
          }} />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={{
            title:'Loading Place...'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>

    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
