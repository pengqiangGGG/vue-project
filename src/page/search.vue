<template>
    <div id="search">
        <van-row style="border-bottom: 1px solid #f5f5f5">
            <van-col span="3">
                <div style="height:50px;line-height: 55px;text-align: center;font-size: 16px">
                    <van-icon name="arrow-left" @click="$router.back()"></van-icon>
                </div>
            </van-col>
            <van-col span="21">
                <van-search placeholder="请输入搜索关键词" v-model="value" shape="round" show-action @search="onSearch">
                    <div slot="action" @click="onSearch">搜索</div>
                </van-search>
            </van-col>
        </van-row>
        <van-row>
            <van-col span="24">
                <p class="hotSearch">热门搜索</p>
                <div class="hotTag" v-for="(item,index) in hotList" :key="index">{{item}}</div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import {searchHot} from "../api";

    export default {
        name: "search",
        data(){
            return{
                value:"",
                hotList:[]
            }
        },
        created(){
            searchHot().then(res=>{
                // console.log(res)
                this.hotList = res
            })
        },
        methods:{
            onSearch(){
                console.log(this.value)
            }
        }
    }
</script>

<style scoped>
#search .hotSearch{margin:20px 0px 25px 10px;font-weight: bold}
#search .hotTag{width:45px;margin:10px;padding:5px 15px;display: inline-block;border: 1px solid #e8ecf9;color: #3e9bfa;text-align: center}
</style>
