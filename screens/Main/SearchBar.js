import React,{useEffect,useRef} from 'react'
import {View,Alert,StyleSheet,TextInput,ActivityIndicator,Keyboard} from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import {setLoading,setTimer,setSearchMode,fetchUsers,clearData,setPage,setSearchValue,setTotalData} from '../../redux/actions/MainScreen'
import Reanimated,{Easing} from 'react-native-reanimated'
import {SearchBarHeight,SearchBarMarginTop,SearchBarOpacity,AnimatedValue} from './Animation'

const SearchBar =(props)=>{
    const textInputRef = useRef()

    useEffect(() => {
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide)
        return () => {Keyboard.removeListener("keyboardDidHide", _keyboardDidHide)};
    }, [])

    useEffect(() => {
        props.setSearchValue(props.searchValue)
    }, [props.searchValue])

    useEffect(()=>{
        if(props.searchValue==''){
            props.setTimer(0)
            props.setLoading(false)
            props.setSearchMode(false)
            props.setPage(0)
            props.setTotalData(0)
            props.clearData()
        }
        else{
            props.setLoading(true)
            props.setSearchMode(true)
            props.setTimer(1)
        }
    },[props.searchValue])

    useEffect(() => {
        let timeout
        if(props.timer > 0) timeout = setTimeout(() => props.setTimer(props.timer + 1), 1000)
        return ()=>{clearTimeout(timeout)}
    }, [props.timer]);

    useEffect(()=>{
        if(!props.searchBarVisible){
            Reanimated.timing(AnimatedValue,{toValue:1,duration:200,easing:Easing.inOut(Easing.ease)}).start()
        }
        else{
            Reanimated.timing(AnimatedValue,{toValue:0,duration:200,easing:Easing.inOut(Easing.ease)}).start()
        }
    },[props.searchBarVisible])

    useEffect(()=>{
        if(props.timer>3&&props.loading)_fetchUsers(props.searchValue,1)
    },[props.timer])

    useEffect(()=>{
        if(props.requestStatus&&props.requestStatus!=200){
            Alert.alert('Error',props.requestMessage)
        }
    },[props.requestStatus])

    const _fetchUsers=async(query,page)=>{
        await props.fetchUsers(query,page)
        props.setLoading(false)
        props.setTimer(0)
    }

    const _keyboardDidHide = () => textInputRef.current.blur()

    return(
    <Reanimated.View 
    style={[styles.container,{
            height:SearchBarHeight,
            marginTop:SearchBarMarginTop,
            opacity:SearchBarOpacity
    }]}
    >
        <View style={styles.innerContainer}>
            <View 
            style={styles.iconContainer}>
                {props.loading
                ?<ActivityIndicator size={'small'} color={'grey'}/>
                :<Icons name={'magnify'} size={25} color={'grey'}/>
                }
            </View>
            <TextInput 
            placeholder ='Search Github users'
            placeholderTextColor='grey'
            onChangeText={props.setSearchValue}
            value={props.searchValue}
            style={styles.textInput}
            ref={textInputRef}
            />
        </View>
    </Reanimated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'deepskyblue',
        padding:10,
        width:'100%',
        position:'absolute'
    },
    innerContainer:{
        width:'100%',
        backgroundColor:'white',
        height:50,
        borderRadius:3,
        flexDirection:'row',
        alignItems:'center'
    },
    iconContainer:{
        flex:1,
        alignItems:'center'
    },
    textInput:{
        flex:9,
        width:'100%',
        color:'black'
    }
})

const stateProps=(state)=>({
    loading:state.MainScreen.loading,
    timer:state.MainScreen.timer,
    searchBarVisible:state.MainScreen.searchBarVisible,
    requestStatus:state.MainScreen.requestStatus,
    requestMessage:state.MainScreen.requestMessage,
    searchValue:state.MainScreen.searchValue
})

const dispatchProps=(dispatch)=>({
    setLoading:(payload)=>dispatch(setLoading(payload)),
    setTimer:(payload)=>dispatch(setTimer(payload)),
    setSearchMode:(payload)=>dispatch(setSearchMode(payload)),
    fetchUsers:async (payload1,payload2)=>dispatch(fetchUsers(payload1,payload2)),
    clearData:()=>dispatch(clearData()),
    setPage:(payload)=>dispatch(setPage(payload)),
    setSearchValue:(payload)=>dispatch(setSearchValue(payload)),
    setTotalData:(payload)=>dispatch(setTotalData(payload))
})

export default connect(stateProps,dispatchProps)(SearchBar)