import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from"../page/home"
import Activity from"../page/activity"
import Cart from"../page/cart"
import Mine from"../page/mine"
import Login from "../page/login"
import Search from "../page/search"
import Sport from "../page/sport"
import Detail from '../page/detail'
import GoodsInfo from '../page/goodsInfo'
import Site from '../page/site'
import NewAddress from'../page/newAddress'
import Setting from '../page/setting'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'Home', component: Home, meta:{index:0,keepAlive: true }},
        {path: '/activity', name: 'Activity', component: Activity, meta:{index:0,keepAlive: true }},
        {path: '/cart', name: 'Cart', component: Cart, meta:{index:0,keepAlive: false}},
        {path: '/mine', name: 'Mine', component: Mine, meta:{index:0,keepAlive: false}},
        {path: '/login', name: 'Login', component: Login, meta:{keepAlive: false}},
        {path: '/search', name: 'Search', component: Search, meta:{keepAlive: true}},
        {path: '/sport', name: 'Sport', component: Sport, meta:{keepAlive: true}},
        {path: '/site', name: 'Site', component: Site, meta:{keepAlive: true}},
        {path: '/goodsInfo', name: 'GoodsInfo', component: GoodsInfo, meta:{keepAlive: false}},
        {path: '/newAddress', name: 'NewAddress', component: NewAddress, meta:{keepAlive: false}},
        {path: '/setting', name: 'Setting', component: Setting, meta:{keepAlive: false}},
    ]
})
