import { getStatusBarHeight } from 'react-native-status-bar-height';
import Reanimated from 'react-native-reanimated'
const AnimatedValue = new Reanimated.Value(0)

const SearchBarOpacity = AnimatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[1,0],
    extrapolate:Reanimated.Extrapolate.CLAMP
})
const SearchBarHeight = AnimatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[70,0],
    extrapolate:Reanimated.Extrapolate.CLAMP
})
const SearchBarMarginTop = AnimatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[getStatusBarHeight(),0],
    extrapolate:Reanimated.Extrapolate.CLAMP
})

module.exports={AnimatedValue,SearchBarHeight,SearchBarOpacity,SearchBarMarginTop}