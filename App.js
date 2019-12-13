import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { Switch } from 'react-native-paper';



export default class App extends React.Component  {


  
  constructor(props){
    super(props);

    this.state = {
      temperature: "12",
      isSwitchOn: false,
    };
  }

  render() {

    const { isColdSwitchOn } = this.state;
    const { isWarmSwitchOn } = this.state;

    return (

      <View style = {{flex : 1, backgroundColor: '#7bc7dd'}}>
        <ScrollView>

        <View style={{flex: 0.2 }}> 
            <View style={{paddingTop : 60, paddingStart: 10, paddingBottom : 15, flexDirection: "row", alignItems:'center'}}>
                    <Ionicons name = "md-thermometer" size={28} color ="#e42d65"/>
                    <Text style={{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingStart: 8}}>Il fait actuellement</Text>
            <Text style={{color:"#e42d65",fontWeight:"500", fontSize: 17, paddingStart: 8}}>{this.state.temperature}°C</Text>
                    <Text style={{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingStart: 8}}>dans l'appartement</Text>

                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

                <Text style={{color:"#e5e5e5",fontWeight:"500", fontSize: 17, paddingEnd: 8 , paddingBottom : 10}}>Activer le chauffage</Text>

                    <Switch
                                color = "#e42d65"
                                
                                value={isWarmSwitchOn}
                                onValueChange={() =>
                                { this.setState({ isWarmSwitchOn: !isWarmSwitchOn }); }
                                }
                            />
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
