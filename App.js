import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo, MaterialCommunityIcons, AntDesign, Foundation } from 'react-native-vector-icons';
import { Switch } from 'react-native-paper';
import Slider from "react-native-slider";

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
      isAutoSwitchOn: false,
      isLightSwitchOn: false,

      vitesseventilo: null,
      seuilTemperature: null,

      intensitelumiere:null,
      tempseclairage : null,
      seuileclairage : null,

      voletup: false,
      voletstop: false,
      voletdown: false,

      value: null,
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

  _setVentiloSpeed = () => {

    fetch('http://192.168.0.50:3002/vitesseventilo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valeur: Math.round(this.state.vitesseventilo),
      }),
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  _setSeuilTemp = () => {

    fetch('http://192.168.0.50:3002/seuilventilo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valeur: Math.round(this.state.seuilTemperature),
      }),
    })
    .catch((error) => {
      console.log(error);
    });
    
    
  }

  _setSeuil = () => {

    fetch('http://192.168.0.50:3002/seuillum', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valeur: Math.round(this.state.seuileclairage),
      }),
    })
    .catch((error) => {
      console.log(error);
    });


  }

  _setTempsLum = () => {

    fetch('http://192.168.0.50:3002/tempslum', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valeur: Math.round(this.state.tempseclairage),
      }),
    })
    .catch((error) => {
      console.log(error);
    });
  }


  _onPressIntensite = () => {

    fetch('http://192.168.0.50:3002/intensitelum', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valeur: Math.round(this.state.intensitelumiere),
      }),
    })
    .catch((error) => {
      console.log(error);
    });

  }

  _voletup = () => {
    

    this._voletstop();

    this.setState.voletup = true;
    console.log(this.setState.voletup);

    fetch('http://192.168.0.50:3002/voletup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valeur: this.setState.voletup,
      }),
    })
    .catch((error) => {
      console.log(error);
    });


  }

  _voletstop = () => {

    this.setState.voletup = false;
    this.setState.voletdown = false;

    fetch('http://192.168.0.50:3002/voletup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valeur: this.setState.voletup,
      }),
    })
    .catch((error) => {
      console.log(error);
    });


    fetch('http://192.168.0.50:3002/voletdown', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valeur: this.setState.voletdown,
      }),
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  _voletdown = () => {

    this._voletstop();

    this.setState.voletdown = true;
    console.log(this.setState.voletdown);

    fetch('http://192.168.0.50:3002/voletdown', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valeur: this.setState.voletdown,
      }),
    })
    .catch((error) => {
      console.log(error);
    });

    
  }

  _activerventilo = () => {

    console.log(!this.state.isColdSwitchOn);
    
    fetch('http://192.168.0.50:3002/ventilateur', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valeur: !this.setState.isColdSwitchOn,
      }),
    })
    .catch((error) => {
      console.log(error);
    });
    
  }


  render() {

    const { isColdSwitchOn } = this.state;
    const { isAutoSwitchOn } = this.state;
    const { isLightSwitchOn } = this.state;


    
    return (

      <View style = {{flex : 1, backgroundColor: '#7bc7dd'}}>
        <ScrollView scrollEnabled={this.state.scrollEnabled}>

        <View style ={{paddingTop : 60, justifyContent : 'center', alignItems: 'center', }}>
          <Text style ={{color:"#568b9a",fontWeight:"500", fontSize: 28}}>Domo</Text>
        </View>

                                  <View style={{padding : 15}}>
                                  <TouchableOpacity>
                                  <Foundation name = "sound" size={35} color ="#e42d65"/>
                                  </TouchableOpacity>
                                  </View>

        <View style ={{paddingTop : 0, flexDirection: 'row', alignItems :'center', justifyContent :'center'}}>
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
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12, alignItems: 'center'}}>

                  <View style={{justifyContent: 'center', alignItems : 'center'}}>
                    <Text style={{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingStart: 8, paddingBottom : 25}}>Activer le ventilateur</Text>
                    
                    <Switch
                            color = "#50e6ff"
                            theme = "light"
                            value={isColdSwitchOn}
                            onValueChange={() =>
                            { this.setState({ isColdSwitchOn: !isColdSwitchOn });
                              this._activerventilo();
                            }
                            }
                        />
                        
                  </View>

                  <View style={{justifyContent: 'center', alignItems : 'center'}}>

                <Text style={{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingEnd: 8 , paddingBottom : 25}}>Mode Automatique</Text>

                    <Switch
                                color = "#e42d65"
                                
                                value={isAutoSwitchOn}
                                onValueChange={() =>
                                { this.setState({ isWarmSwitchOn: !isAutoSwitchOn });
                                  
                                }
                                }
                            />
                </View>  

                </View>


                <Text style ={{paddingTop: 10, padding : 8, color:"#e5e5e5",fontWeight:"500", fontSize: 17,}}>Vitesse Ventilateur :</Text>

                <View style={{flexDirection : 'row', justifyContent :'center', alignItems: 'center', paddingHorizontal : 40, paddingTop : 8, }}>
                <Text style= {{fontSize: 17, fontWeight : '500', color :'#e42d65', }}>{Math.round(((this.state.vitesseventilo)/255)*100)}%</Text>

                <View style = {{width: '100%', paddingHorizontal: 20}}> 
                    
                                  <Slider
                    
                    maximumValue = {'255'}
                    minimumTrackTintColor	= {'#e42d65'}
                    maximumTrackTintColor = {'#dff7fb'}
                    thumbTintColor = {'#fff'}
                    value={this.state.vitesseventilo}
                    onValueChange={vitesseventilo => this.setState({ vitesseventilo })}
               />

              
              </View>
                  
                  <TouchableOpacity 
                  style={{backgroundColor :'#dff7fb', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius : 8}}
                  onPress = {this._setVentiloSpeed}
                  >
                  
                    <Text style= {{fontSize: 17, fontWeight : '500', color :'#7bc7dd', }}>Ok</Text>
                    </TouchableOpacity>      
                  
                </View>

                <Text style ={{paddingTop: 10, padding : 8, color:"#e5e5e5",fontWeight:"500", fontSize: 17,}}>Seuil déclenchement ventilateur :</Text>

                <View style={{flexDirection : 'row', justifyContent :'center', alignItems: 'center', paddingHorizontal : 40, paddingTop : 8, paddingBottom:20}}>
                <Text style= {{fontSize: 17, fontWeight : '500', color :'#e42d65', }}>{Math.round(((this.state.seuilTemperature)/255)*100)}%</Text>

                <View style = {{width: '100%', paddingHorizontal: 20}}> 
                    
                                  <Slider
                    
                    maximumValue = {'255'}
                    minimumTrackTintColor	= {'#e42d65'}
                    maximumTrackTintColor = {'#dff7fb'}
                    thumbTintColor = {'#fff'}
                    value={this.state.seuilTemperature}
                    onValueChange={seuilTemperature => this.setState({ seuilTemperature })}
               />

              
              </View>
                  
                  <TouchableOpacity 
                  style={{backgroundColor :'#dff7fb', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius : 8}}
                  onPress = {this._setSeuilTemp}
                  >
                  
                    <Text style= {{fontSize: 17, fontWeight : '500', color :'#7bc7dd', }}>Ok</Text>
                    </TouchableOpacity>      
                  
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

                <Text style ={{paddingTop: 25, padding : 8, color:"#e5e5e5",fontWeight:"500", fontSize: 17,}}>Intensité lumière :</Text>

                <View style={{flexDirection : 'row', justifyContent :'center', alignItems: 'center', paddingHorizontal : 40, paddingTop : 8}}>
                <Text style= {{fontSize: 17, fontWeight : '500', color :'#f0f0bb', }}>{Math.round(((this.state.intensitelumiere)/255)*100)}%</Text>

                <View style = {{width: '100%', paddingHorizontal: 20}}> 
                    
                  <Slider
                    
                    maximumValue = {'255'}
                    minimumTrackTintColor	= {'#dff7fb'}
                    maximumTrackTintColor = {'#ffeac6'}
                    thumbTintColor = {'#fff'}
                    value={this.state.intensitelumiere}
                    onValueChange={intensitelumiere => this.setState({ intensitelumiere })}
                    />

              
              </View>
                  
                  <TouchableOpacity 
                  style={{backgroundColor :'#dff7fb', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius : 8}}
                  onPress = {this._onPressIntensite}
                  >
                  
                    <Text style= {{fontSize: 17, fontWeight : '500', color :'#7bc7dd', }}>Ok</Text>
                    </TouchableOpacity>      
                  
                </View>
              

                <Text style ={{paddingTop: 25, padding : 8, color:"#e5e5e5",fontWeight:"500", fontSize: 17,}}>Temps d'éclairage :</Text>
                

                <View style={{flexDirection : 'row', justifyContent :'center', alignItems: 'center', paddingHorizontal : 40, paddingTop : 8}}>
                <Text style= {{fontSize: 17, fontWeight : '500', color :'#f0f0bb', }}>{Math.round(((this.state.tempseclairage)/255)*100)}%</Text>

                <View style = {{width: '100%', paddingHorizontal: 20}}> 
                    
                                  <Slider
                    
                    maximumValue = {'255'}
                    minimumTrackTintColor	= {'#dff7fb'}
                    maximumTrackTintColor = {'#ffeac6'}
                    thumbTintColor = {'#fff'}
                    value={this.state.tempseclairage}
                    onValueChange={tempseclairage => this.setState({ tempseclairage })}
               />

              
              </View>
                  
                  <TouchableOpacity 
                  style={{backgroundColor :'#dff7fb', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius : 8}}
                  onPress = {this._setTempsLum}
                  >
                  
                    <Text style= {{fontSize: 17, fontWeight : '500', color :'#7bc7dd', }}>Ok</Text>
                    </TouchableOpacity>      
                  
                </View>


                <Text style ={{paddingTop: 25, padding : 8, color:"#e5e5e5",fontWeight:"500", fontSize: 17,}}>Seuil éclairage :</Text>
                

                <View style={{flexDirection : 'row', justifyContent :'center', alignItems: 'center', paddingHorizontal : 40, paddingTop : 8}}>
                <Text style= {{fontSize: 17, fontWeight : '500', color :'#f0f0bb', }}>{Math.round(((this.state.seuileclairage)/255)*100)}%</Text>

                <View style = {{width: '100%', paddingHorizontal: 20}}> 
                    
                                  <Slider
                    
                    maximumValue = {'255'}
                    minimumTrackTintColor	= {'#dff7fb'}
                    maximumTrackTintColor = {'#ffeac6'}
                    thumbTintColor = {'#fff'}
                    value={this.state.seuileclairage}
                    onValueChange={seuileclairage => this.setState({ seuileclairage })}
               />

              
              </View>
                  
                  <TouchableOpacity 
                  style={{backgroundColor :'#dff7fb', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius : 8}}
                  onPress = {this._setSeuil}
                  >
                  
                    <Text style= {{fontSize: 17, fontWeight : '500', color :'#7bc7dd', }}>Ok</Text>
                    </TouchableOpacity>      
                  
                </View>


                              {/* *************************************** VOLET ***************************************** */}

                              <View style ={{flexDirection: 'row', alignItems :'center', justifyContent :'center', paddingTop: 20}}>
                              <View style={{backgroundColor :'#a9a9a9', width: '25%', height : 1}}></View>
                              <Text style={{paddingHorizontal : 30,color:"#6c6674",fontWeight:"500", fontSize: 17,}}>Commande volet électrique</Text>
                              <View style={{backgroundColor :'#a9a9a9', width: '25%', height : 1}}></View>
                              </View>
                        <View style = {{paddingBottom: 100}}>

                        <Text style ={{paddingTop: 8, padding : 8, color:"#6c6674",fontWeight:"500", fontSize: 17,}}> </Text>

                                <View style={{ justifyContent: 'center', alignItems: 'center',}}>

                                  
                        
                                  <TouchableOpacity
                                    onPress = {this._voletup}
                                  >
                                  <AntDesign name = "caretup" size={40} color ="#6c6674"/>
                                    
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                    onPress = {this._voletstop}
                                  >
                                  <AntDesign name = "pausecircle" size={40} color ="#6c6674"/>
                                    
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                    onPress = {this._voletdown}
                                  >
                                  <AntDesign name = "caretdown" size={40} color ="#6c6674"/>
                                    
                                  </TouchableOpacity>
                                </View>
                        
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
