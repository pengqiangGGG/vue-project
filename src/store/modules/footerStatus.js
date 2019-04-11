//test页面



const state = {
    //要设置的全局访问的state对象
    showFooter: true,
    changeNum:0
    //要设置的初始属性值
}

const getters = {
    //实时监听state值的变化(最新状态)
    isShow(state) {  //承载变化的showFooter的值
        return state.showFooter
    },
    getChangedNum(){  //承载变化的changebleNum的值
        return state.changeNum
    }
}

const mutations = {
    SHOW(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.showFooter = true;
    },
    HIDE(state) {  //同上
        state.showFooter = false;
    },
    NEWNUM(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
        state.changeNum+=sum;
    }
}

const actions = {
    hideFooter(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
        context.commit('SHOW');
    },
    showFooter(context) {  //同上注释
        context.commit('SHOW');
    },
    getNewNum(context,num){   //同上注释，num为要变化的形参
        context.commit('NEWNUM',num)
    }
}

export default {
    namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}
