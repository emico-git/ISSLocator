import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated, Easing } from 'react-native';
import image1 from './media/logo.png';
import { useFonts } from 'expo-font';
/* 

style={styles.}

*/
const position = new Animated.ValueXY({x:0, y:250})



export default function App() {

  let [fontsLoaded] = useFonts({
    'Montserrat': require('./media/Font/Montserrat-Black.ttf')
  })

  Animated.timing(
    position,{
    toValue:{x:0, y: 0},
    duration: 1000,
    easing: Easing.out(Easing.exp),
    delay: 1000,
    },).start()

  if (!fontsLoaded){
    return <View ></View>
  }

  return (
    <View style={styles.container}>
      <View style={styles.slideBorder}>
        <Animated.View style={styles.logoAnimation}>
        <Image style={styles.logoImage} source={image1} />
        <Text style={styles.logoName}>Emil Collins</Text>
        </Animated.View>
      </View>
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideBorder: {
    overflow: 'hidden',
  },
  logoImage: {
    width: 250,
    height: 250,

  },
  logoAnimation: {
    transform:[
      {translateY:position.y}
    ]
  },
  logoName: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    color: 'aliceblue',
    alignSelf: 'center',
  },
});

