import Axios from 'axios'

export const setLoading = (payload)=>({
    type:'MAINSCREEN_LOADING',
    payload
})

export const setSearchValue = (payload)=>({
    type:'MAINSCREEN_SEARCH_VALUE',
    payload
})

export const setTotalData = (payload)=>({
    type:'MAINSCREEN_TOTAL_DATA',
    payload
})

export const setTimer = (payload)=>({
    type:'MAINSCREEN_TIMER',
    payload
})

export const setSearchBarVisible = (payload)=>({
    type:'MAINSCREEN_SEARCH_BAR_VISIBLE',
    payload
})

export const setSearchMode = (payload)=>({
    type:'MAINSCREEN_SEARCH_MODE',
    payload
})

const setData = (payload)=>({
    type:'MAINSCREEN_SET_DATA',
    payload
})

const setMoreData = (payload)=>({
    type:'MAINSCREEN_SET_MORE_DATA',
    payload
})

export const clearData = ()=>({
    type:'MAINSCREEN_CLEAR_DATA'
})

export const setPage = (payload)=>({
    type:'MAINSCREEN_SET_PAGE',
    payload
})

export const setRequestStatus = (payload)=>({
    type:'MAINSCREEN_REQUEST_STATUS',
    payload
})

export const setRequestMessage = (payload)=>({
    type:'MAINSCREEN_REQUEST_MESSAGE',
    payload
})

export const fetchUsers=(query,page)=>async(dispatch)=>{
    try {
        const response = await Axios({
            method:'GET',
            url:`https://api.github.com/search/users?q=${query}&page=${page}`,
            validateStatus:false
        }).catch(e=>{
            const error = new Error(e)
            throw{code:Math.random(),message:`${error.message}, please check your internet connection`}
        })
        if(response.status!==200)throw {message:response.message,code:response.status}
        dispatch(setRequestStatus(response.status))
        const processedData = response.data.items.map(item=>({id:item.id,a:item.avatar_url,b:item.login}))
        if(parseInt(page)<=1){dispatch(setData(processedData))}
        else{dispatch(setMoreData(processedData))}
        dispatch(setPage(page))
        dispatch(setTotalData(response.data.total_count))
    } catch (error) {
        if(error.message) {dispatch(setRequestMessage(error.message))} 
        else{dispatch(setRequestMessage('Something wrong happened'))}
        dispatch(setRequestStatus(error.code))
    }
}