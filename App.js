import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { Ionicons, Entypo, MaterialCommunityIcons } from 'react-native-vector-icons';
import { Switch } from 'react-native-paper';

window.navigator.userAgent = 'react-native';


export default class App extends React.Component  {


  
  constructor(props){
    super(props);

    this.state = {
      isLoading : true,
      temperature: null,
      lumiere: null,
      dataSource : null,
      isColdSwitchOn: false,
      isWarmSwitchOn: false,
      isLightSwitchOn: false,
      tempseclairage : null,
      seuileclairage : null,
    };
  }

  baseURL = 'http://192.168.0.50:3002/'; 

  
  
  componentDidMount() {

    this.socket = new WebSocket('ws://192.168.0.50:3002/');

    this.socket.onopen = () => {
      // connection opened
    this.socket.send(JSON.stringify({type: 'connect'})); // send a message

    };

    this.socket.onmessage = (e) => {

      e.data = JSON.parse(e.data)
      // a message was received
      if(e.data.type == 'temperature') {
        this.setState({
          temperature : e.data.valeur,
        })
      }
      else if(e.data.type == 'lumiere') {
        this.setState({
          lumiere : Math.round((e.data.valeur/255)*100)
        })
      }
      console.log(Math.round(this.state.lumiere));
    };

    return fetch(this.baseURL + 'temperature/5deceab017e01d67d7f755e0')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        temperature: responseJson.valeur,
      })

    })
    .catch((error) => {
    
    });

  }

  _setSeuil (text) {

    this.setState({
      seuileclairage: text
  });

  }

  _setTempsLum(text) {
      this.setState({
        tempseclairage: text
      });
  }

  render() {

    const { isColdSwitchOn } = this.state;
    const { isWarmSwitchOn } = this.state;
    const { isLightSwitchOn } = this.state;

    
    return (

      <View style = {{flex : 1, backgroundColor: '#7bc7dd'}}>
        <ScrollView>

        <View style ={{paddingTop : 60, justifyContent : 'center', alignItems: 'center', paddingBottom : 10}}>
          <Text style ={{color:"#568b9a",fontWeight:"500", fontSize: 28}}>Domo</Text>
        </View>

        <View style ={{paddingTop : 20, flexDirection: 'row', alignItems :'center', justifyContent :'center'}}>
                <View style={{backgroundColor :'#a9a9a9', width: '25%', height : 1}}></View>
                <Text style={{paddingHorizontal : 30, color:"#e42d65",fontWeight:"500", fontSize: 17,}}>Température</Text>
                <View style={{backgroundColor :'#a9a9a9', width: '25%', height : 1}}></View>
                </View>

        <View> 
            <View style={{paddingTop : 15, paddingStart: 10, paddingBottom : 15, flexDirection: "row", alignItems:'center'}}>
                    <Ionicons name = "md-thermometer" size={28} color ="#e42d65"/>
                    <Text style={{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingStart: 8}}>Il fait actuellement</Text>
            <Text style={{color:"#e42d65",fontWeight:"500", fontSize: 17, paddingStart: 8}}>{this.state.temperature}°C</Text>
                    <Text style={{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingStart: 8}}>dans l'appartement</Text>

                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12}}>
                  <View style={{justifyContent: 'center', alignItems : 'center'}}>
                    <Text style={{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingStart: 8, paddingBottom : 10}}>Activer le ventilateur</Text>
                    
                    <Switch
                            color = "#50e6ff"
                            theme = "light"
                            value={isColdSwitchOn}
                            onValueChange={() =>
                            { this.setState({ isColdSwitchOn: !isColdSwitchOn }); }
                            }
                        />
                        
                  </View>

                  <View style={{justifyContent: 'center', alignItems : 'center'}}>

                <Text style={{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingEnd: 8 , paddingBottom : 25}}>Mode Automatique</Text>

                    <Switch
                                color = "#e42d65"
                                
                                value={isWarmSwitchOn}
                                onValueChange={() =>
                                { this.setState({ isWarmSwitchOn: !isWarmSwitchOn }); }
                                }
                            />
                </View>  

                </View>

                
                                {/* *************************************** LUMIERE ***************************************** */}
                <View style ={{flexDirection: 'row', alignItems :'center', justifyContent :'center'}}>
                <View style={{backgroundColor :'#a9a9a9', width: '25%', height : 1}}></View>
                <Text style={{paddingHorizontal : 30,color:"#f0f0bb",fontWeight:"500", fontSize: 17,}}>Lumière</Text>
                <View style={{backgroundColor :'#a9a9a9', width: '25%', height : 1}}></View>
                </View>

                <View style ={{paddingStart : 10, paddingTop : 12, flexDirection: 'row', alignItems: 'center'}}>
                  <Entypo name = "light-up" size={28} color ="#f0f0bb"/>
                  <Text style = {{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingStart: 8}}>L'intensité lumineuse est à</Text>
                  <Text style = {{color:"#f0f0bb",fontWeight:"500", fontSize: 17, paddingStart: 8}}>{this.state.lumiere}%</Text>
                </View>
                
                <View style ={{paddingStart : 10, paddingTop : 25, flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons name = "lightbulb-on" size={28} color ="#f0f0bb"/>
                  <View style = {{paddingStart : 20}}>
                    <Switch
                                color = "#f0f0bb"
                                
                                value={isLightSwitchOn}
                                onValueChange={() =>
                                { this.setState({ isLightSwitchOn: !isLightSwitchOn }); }
                                }
                            />
                    
                    </View>       
                
                </View>

                <View style ={{flexDirection :'row', paddingStart : 10, paddingTop : 25, alignItems: 'center',}}>
                    <Text style = {{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingStart: 8, paddingEnd: 5}}>Temps d'éclairage  :</Text>
                    <TextInput
                    style={{borderWidth : 2, borderRadius : 5,borderColor: '#fff', fontSize: 14,padding : 5, width: '15%'}}
                      placeholder = '0/255'
                      returnKeyType= "send"
                      onChangeText={(text) => this._setTempsLum(text)}
                    />
                    </View> 


                    <View style ={{flexDirection :'row', paddingStart : 10, paddingTop : 25, alignItems: 'center', }}>
                    <Text style = {{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingStart: 8, paddingEnd: 5}}>Seuil d'éclairage :</Text>
                    <TextInput
                    style={{borderWidth : 2, borderRadius : 5,borderColor: '#fff', fontSize: 14,padding : 5, width: '15%'}}
                      placeholder = '0/255'
                      returnKeyType= "send"
                      onChangeText={(text) => this._setSeuil(text)}
                    />

                    </View> 

                    
                                
        </View>
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
