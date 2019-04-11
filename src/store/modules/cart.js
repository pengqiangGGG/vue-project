const state = {
    cartList:localStorage["cartList"]?JSON.parse(localStorage["cartList"]): [] , //初始化购物车数组
}

const getters = { //过滤
    allPrice:(state)=>{
        var total=0;
        state.cartList.forEach((item)=>{
            if(item.select){
                total+=item.price*item.skuData.selectedNum
            }
        })
        return total
    },
    allNum:()=>{
        var total = 0;
        state.cartList.forEach((item)=>{
            if(item.select){
                total+=item.skuData.selectedNum
            }
        })
        return total
    }

}

const mutations = { //改变state 逻辑
    ADDGOODS:(state,data)=>{
        state.cartList.push(data)
        localStorage.setItem("cartList",JSON.stringify(state.cartList));
    },
    DELGOODS:(state,id)=>{
        state.cartList.splice(id,1)
        localStorage.setItem("cartList",JSON.stringify(state.cartList));
    },
    ADDNUMBER:(state,id)=>{
        state.cartList[id].skuData.selectedNum++
        localStorage.setItem("cartList",JSON.stringify(state.cartList));
    },
    DELNUMBER:(state,id)=>{
        state.cartList[id].skuData.selectedNum--
        localStorage.setItem("cartList",JSON.stringify(state.cartList));
    }
}

const actions = {  //异步分发mutations
    addGoods: (context, data) => {
        context.commit('ADDGOODS', data)
    },
    delGoods: (context, id) => {
        context.commit('DELGOODS', id)
    },
    addNumber: (context, id) => {
        context.commit('ADDNUMBER',id)
    },
    delNumber: (context, id) => {
        context.commit('DELNUMBER',id)
    }
}
export default {
    namespaced:true,//用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}
