import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated, Easing, Button } from 'react-native';
import image1 from './media/logo.png';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
/* 

style={styles.}

*/
const position = new Animated.ValueXY({x:0, y:250})

this._animation1 = new Animated.Value(1);
this._animation2 = new Animated.Value(0);

export default function App() {

  let [fontsLoaded] = useFonts({
    'Montserrat': require('./media/Font/Montserrat-Black.ttf'),
    'MontserratBold': require('./media/Font/Montserrat-Bold.ttf')
  })

  const [mainLoaded, setMainLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  const [answer, setAnswer] = useState(0);

  Animated.sequence([
    Animated.timing(
      position,{
      toValue:{x:0, y: 0},
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true
      },),
    Animated.timing(
      this._animation1,{
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      },),
    Animated.timing(
      this._animation2,{
        toValue: 1,
        duration: 500,
        delay: 1000,
        useNativeDriver: true
    },
    
    ),
  ]).start();

  useEffect(() => {
    fetch('http://api.open-notify.org/iss-now.json')
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const fetchCoordinates = () => {
    fetch('http://api.open-notify.org/iss-now.json')
    .then((resp) => resp.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => console.log(data));
    console.log(data.iss_position.latitude);
    console.log(data.iss_position.longitude);
    setAnswer(distance(47.380400, data.iss_position.latitude, 8.541200, data.iss_position.longitude));
 }

 function distance(lat1, lat2, lon1, lon2)
 {

    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return(c * r);
  }


  if (!fontsLoaded){
    return <View ></View>
  }

  if (fontsLoaded){
    setTimeout(() => {
      setMainLoaded(true);
    }, 2000);
    
  }
  
  if(!mainLoaded){
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

  if(mainLoaded){
    return (
      <View style={styles.container}>
        <Animated.View style={styles.mainAnimation}>
          <View style={styles.section1}>
            <View style={styles.display}>
              <Text style={styles.distance}>{answer.toFixed(2)} km</Text>
              <View style={styles.coordinatesDisplay}>
                <View style={styles.coordinatesSection}>
                  <Text style={styles.coordinatesTitle}>longitude:</Text>
                  <Text style={styles.coordinates}>{data.iss_position.longitude}</Text>
                </View>
                <View style={styles.coordinatesSection}>
                  <Text style={styles.coordinatesTitle}>latitude:</Text>
                  <Text style={styles.coordinates}>{data.iss_position.latitude}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <View style={styles.button}>
              <Button title="Locate ISS" onPress={fetchCoordinates}></Button>
            </View>
          </View>
        </Animated.View>
      </View>
    )
  }

  

  
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
    ],
    opacity: this._animation1,
  },
  logoName: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    color: 'aliceblue',
    alignSelf: 'center',
  },
  mainAnimation: {
    opacity: this._animation2,
  },
  section1: {
    flex: 1,
  },
  display: {
    marginTop: 100,
    backgroundColor: 'aliceblue',
    width: 240,
    height: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distance: {
    fontFamily: 'MontserratBold',
    color: 'black',
    fontSize: 20,
  },
  coordinatesDisplay: {
    flexDirection: 'row',
  },
  coordinatesTitle: {
    marginHorizontal: 20,
    marginTop: 5,
  },
  coordinatesSection: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'aliceblue',
    margin: 20,
    borderRadius: 5,
    marginBottom: 100,
  },
  section2: {
    flex: 1,
    justifyContent: 'flex-end',
  }
 
});

