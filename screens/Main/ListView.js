import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,FlatList, Keyboard,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {setLoading,setTimer,setSearchBarVisible,fetchUsers} from '../../redux/actions/MainScreen'
import Shimmer from 'react-native-shimmer-placeholder'
import Image from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/AntDesign'
import {getStatusBarHeight} from 'react-native-status-bar-height'

const statusBarHeight= getStatusBarHeight()

const ListView= (props)=>{
    const [offset,setOffset]=useState(0)
    const [prevOffset,setPrevOffset]=useState(0)
    const [fetching,setFetching]=useState(false)

    useEffect(()=>{
        if(offset>prevOffset+20&&props.searchBarVisible){
            props.setSearchBarVisible(false)
        }
        if(offset<prevOffset-10&&!props.searchBarVisible){
            props.setSearchBarVisible(true)
        }
        setPrevOffset(offset)
    },[offset])

    const _onScroll=(e)=>{
        Keyboard.dismiss()
        setOffset(e.nativeEvent.contentOffset.y)
    }

    const _keyExtractor =(data)=>data.id.toString()

    const _renderItem=({item,index})=>(<>
        {props.loading?<LoadingRow index={index}/>:<DataRow data={item} index={index}/>}
    </>)


    const _onEndReached=async()=>{
        if(props.data.length<props.totalData&&props.data.length>0&&!props.loading&&props.page>=1&&!fetching&&props.requestStatus==200){
            setFetching(true)
            await props.fetchUsers(props.searchValue,props.page+1)
            setFetching(false)
        }
    }

    return(
        <View style={styles.container}>
            <FlatList
            style={{flex:1}}
            onScroll={_onScroll}
            data={props.loading&&props.data.length<3?[{id:-1},{id:-2},{id:-3}]:props.data}
            scrollEventThrottle={1}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            ItemSeparatorComponent={()=><Separator/>}
            ListEmptyComponent={()=><EmptyComponent props={props}/>}
            onEndReached={_onEndReached}
            onEndThreshold={0}
            ListFooterComponent={()=><FooterComponent props={props}/>}
            bounces={false}
            scrollToOverflowEnabled={false}
            scrollEnabled={!props.loading}
            />
        </View>
    )
}

const LoadingRow = (props)=>
<View style={[styles.rowContainer,{marginTop:props.index==0?80+statusBarHeight:0}]}>
    <View style={{flex:2,alignItems:'center'}}>
        <Shimmer autoRun height={50} width={50} style={{borderRadius:1}} />
    </View>
    <View style={{flex:8}}>
        <Shimmer autoRun height={20} width={200} style={{borderRadius:4,marginLeft:20}} />
    </View>
</View>

const DataRow = (props)=>{
    const [status,setStatus] = useState('loading')

    return <View style={[styles.rowContainer,{marginTop:props.index==0?80+statusBarHeight:0}]}>
        <View style={{flex:2,alignItems:'center'}}>
            <Image source={{uri:props.data.a}} onLoadEnd={()=>setStatus('ok')} onError={()=>setStatus('error')} style={{height:50,width:50}}/>
            {status=='loading'&&<Shimmer autoRun height={50} width={50} style={{borderRadius:1,position:'absolute'}}/ >}
            {status=='error'&&<Icon name={'exclamationcircleo'} size={30} style={{position:'absolute'}} />}
        </View>
        <View style={{flex:8}}>
            <Text style={{color:'black',fontSize:22,marginLeft:20}}>{props.data.b}</Text>
        </View>
    </View>
}

const Separator=()=> <View style={styles.separator}/>

const EmptyComponent=({props})=>
<View style={{alignItems:'center',justifyContent:'center'}}>
    <Image 
    source={props.requestStatus==200?require('../../assets/not-found.png'):require('../../assets/offline.png')} 
    resizeMode={'contain'} 
    style={{height:150,width:150,marginTop:'60%'}} 
    />
    <Text style={{textAlign:'center',marginTop:20,color:'grey'}}>
        {props.requestStatus==200
        ?"Uh oh!\nThe user you are looking for does not exist"
        :"Please check your internet connection"
        }
    </Text>
</View>
    
const FooterComponent=({props})=>
<View style = {{height:100,width:'100%',justifyContent:'center',alignItems:'center'}}>
    {props.data.length<props.totalData&&props.requestStatus==200
    ?<ActivityIndicator size={'large'} color="grey"/>
    :props.searchMode&&!props.loading&&props.requestStatus==200&&props.data.length>0
    ?<Text style={{color:'grey',fontSize:18}}>All data have been displayed</Text>
    :<View/>}
</View>

const styles = StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'white',
    },
    rowContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:5
    },
    separator:{
        width:'100%',
        borderTopWidth:.5,
        borderTopColor:'lightgrey'
    }
})

const stateProps=(state)=>({
    loading:state.MainScreen.loading,
    timer:state.MainScreen.timer,
    data:state.MainScreen.data,
    page:state.MainScreen.page,
    searchValue:state.MainScreen.searchValue,
    totalData:state.MainScreen.totalData,
    searchMode:state.MainScreen.searchMode,
    searchBarVisible:state.MainScreen.searchBarVisible,
    requestStatus:state.MainScreen.requestStatus
})

const dispatchProps=(dispatch)=>({
    setLoading:(payload)=>dispatch(setLoading(payload)),
    setTimer:(payload)=>dispatch(setTimer(payload)),
    setSearchBarVisible:(payload)=>dispatch(setSearchBarVisible(payload)),
    fetchUsers:async (payload1,payload2)=>dispatch(fetchUsers(payload1,payload2)),
})

export default connect(stateProps,dispatchProps)(ListView)