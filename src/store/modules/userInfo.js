

const state = {
    userInfo:localStorage['userInfo']?JSON.parse(localStorage['userInfo']):{},
    flag:localStorage['token']?true:false
}

const getters = {
}

const mutations = {
    USERLOGIN:(state,data)=>{
       localStorage.setItem('userInfo',JSON.stringify(data))
    },
    // CHANGEICON:(state,url)=>{
    //     state.userInfo.icon = url
    //     localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
    // },
    LOGINOUT:()=>{
        localStorage.removeItem("token")
        // localStorage.removeItem("userInfo")
    }
}

const actions = {
    userLogin:(context,data)=>{
        context.commit('USERLOGIN',data)
    },
    // changeIcon:(context,url)=>{
    //     context.commit('CHANGEICON',url)
    // },
    loginOut:(context)=>{
        context.commit('LOGINOUT')
    }
}


export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
