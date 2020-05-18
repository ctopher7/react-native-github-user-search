const defaultState={
    loading:false,
    timer:0,
    searchBarVisible:true,
    data:[],
    page:0,
    searchMode:false,
    requestStatus:null,
    requestMessage:'',
    searchValue:'',
    totalData:0
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case 'MAINSCREEN_LOADING':return{...state,loading:action.payload}
        case 'MAINSCREEN_SEARCH_VALUE':return{...state,searchValue:action.payload}
        case 'MAINSCREEN_TIMER':return{...state,timer:action.payload}
        case 'MAINSCREEN_TOTAL_DATA':return{...state,totalData:action.payload}
        case 'MAINSCREEN_SEARCH_BAR_VISIBLE':return{...state,searchBarVisible:action.payload}
        case 'MAINSCREEN_SEARCH_MODE':return{...state,searchMode:action.payload}
        case 'MAINSCREEN_SET_DATA':return{...state,data:action.payload}
        case 'MAINSCREEN_SET_MORE_DATA':{
            let filtered = action.payload.filter(ele=>{
                let find = state.data.find(item=>item.id==ele.id)
                if(!find) return ele
            })
            return{...state,data:[...state.data,...filtered]}
        }
        case 'MAINSCREEN_SET_PAGE':return{...state,page:action.payload}
        case 'MAINSCREEN_CLEAR_DATA':return{...state,data:[]}
        case 'MAINSCREEN_REQUEST_STATUS':return{...state,requestStatus:action.payload}
        case 'MAINSCREEN_REQUEST_MESSAGE':return{...state,requestMessage:action.payload}
        default:return state
    }
}