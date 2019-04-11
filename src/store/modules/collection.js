//地址

const state = {
    mineAddressList:localStorage['mineAddressList']?JSON.parse(localStorage['mineAddressList']):[]//初始化一个地址数组
}

const getters = {

}

const mutations = { //如何改变collects，插入items
    ADDADDRESS:(state,data)=>{ //新增地址
        if(data.isDefault == true){
            for (let i = 0;i<state.mineAddressList.length;i++){
                state.mineAddressList[i].isDefault = false
            }
        }
        state.mineAddressList.push(data)
        localStorage.setItem('mineAddressList',JSON.stringify(state.mineAddressList))
    },
    EDITADDRESS:(state,product)=>{ //编辑地址
        if(product.item.isDefault == true){
            for (let i = 0;i<state.mineAddressList.length;i++){
                state.mineAddressList[i].isDefault = false
            }
        }
        // console.log(product)
        state.mineAddressList.splice(product.id,1,product.item)
        localStorage.setItem('mineAddressList',JSON.stringify(state.mineAddressList))
    },
    DELADDRESS:(state,id)=>{
        if (state.mineAddressList.length == 1 && state.mineAddressList[0].isDefault == true){
            state.mineAddressList.splice(id,1)
            localStorage.setItem('mineAddressList',JSON.stringify(state.mineAddressList))
        } else if (state.mineAddressList.length>1 && state.mineAddressList[id].isDefault == true){
            state.mineAddressList.splice(id,1)
            state.mineAddressList[0].isDefault = true
            localStorage.setItem('mineAddressList',JSON.stringify(state.mineAddressList))
        } else{
            state.mineAddressList.splice(id,1)
            localStorage.setItem('mineAddressList',JSON.stringify(state.mineAddressList))
        }
    }
}

const actions = {
    addMineAddress:(context,data)=>{
        context.commit('ADDADDRESS',data)
    },
    editMineAddress:(context,value)=>{
        context.commit('EDITADDRESS',value)
    },
    delAddress:(context,id)=>{
        context.commit('DELADDRESS',id)
    }
}

export default {
    namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}
