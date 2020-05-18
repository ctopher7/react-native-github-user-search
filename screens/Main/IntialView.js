import React from 'react'
import Image from 'react-native-fast-image'
import {TouchableOpacity,Text,Keyboard} from 'react-native'

export default ()=>{
    const _onPress=()=>Keyboard.dismiss()
    return(
        <TouchableOpacity 
        onPress={_onPress} 
        style={{alignItems:'center',backgroundColor:'white',height:'100%'}}
        activeOpacity={1}
        >
            <Image source={require('../../assets/github-grey.png')} resizeMode={'contain'} style={{height:150,width:150,marginTop:'60%'}} />
            <Text style={{textAlign:'center',marginTop:20,color:'grey'}}>Type on search field{"\n"} to start finding Github users</Text>
        </TouchableOpacity>
    )
}