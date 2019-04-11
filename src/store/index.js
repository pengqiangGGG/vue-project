import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 基本写法
/** const store = new Vuex.Store({
    state :{     //要设置的全局访问的state对象  已经可以用this.$store.state.XXX来获取
        showFooter: true,
        changeNum:0
    },

    getters:{    //实时监听state值的变化(最新状态)
        isShow(state) {  //方法名随意,主要是来承载变化的showFooter的值
            return state.showFooter
        },
        getChangedNum(){  //方法名随意,主要是用来承载变化的changableNum的值
            return state.changeNum
        }
    },

    mutations:{
        show(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);可以用 this.$store.commit('show')
            state.showFooter = true;
        },
        hide(state) {  //同上
            state.showFooter = false;
        },
        newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
            state.changeNum+=sum;
        }
    },

    actions:{
        hideFooter(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性,可以在组件内this.$store.dispatch('hideFooter')
            context.commit('hide');
        },
        showFooter(context) {  //同上注释
            context.commit('show');
        },
        getNewNum(context,num){   //同上注释，num为要变化的形参
            context.commit('newNum',num)
        }
    }
})
export  default store **/

//modules 模块化写法

import footerStatus from './modules/footerStatus'
import collection from './modules/collection'
import cart from './modules/cart'
import userInfo from'./modules/userInfo'
export default new Vuex.Store({
    modules:{
        collection,
        footerStatus,
        cart,
        userInfo
    }
})
