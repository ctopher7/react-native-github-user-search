
import React,{useEffect} from 'react';
import {StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import Splash from 'react-native-splash-screen'
import ReduxStore from '../../redux'
import SearchBar from './SearchBar'
import ListView from './ListView'
import InitialView from './IntialView'
import {connect} from 'react-redux'

export default () => {
    useEffect(()=>{
        setTimeout(()=>Splash.hide(),1000)
    },[])
    return (
        <Provider store = {ReduxStore}>
            <StatusBar translucent backgroundColor="deepskyblue"/>
            <MainViewConnected/>
            <SearchBar/>
        </Provider>
    );
};

const MainView= (props)=><>
    {props.searchMode?<ListView/>:<InitialView/>}   
</>

const stateProps = (state)=>({
    searchMode:state.MainScreen.searchMode
})

const MainViewConnected = connect(stateProps,null)(MainView)