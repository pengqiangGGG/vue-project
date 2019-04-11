<template>
    <div id="sport">
        <div>
            <van-nav-bar title="春夏时装" left-arrow @click-left="$router.push('/')" :fixed="true" :border="true"/>
        </div>
        <div>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <van-row>
                        <van-col span="12" v-for="(item,index) in showList" :key="index">
                            <div class="sport_img" @click.stop = go_goodsInfo(item.id)>
                                <div class="img_wrap">
                                    <img :src="item.src" alt="">
                                    <h6>{{item.title}}</h6>
                                    <div class="sport_text"><span class="new_price">{{item.price}}</span><span class="old_price">{{'￥'+item.oldPrice}}</span></div>
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import {getSportList} from "../api";

    export default {
        name: "sport",
        data(){
            return{
                list:[],
                showList:[],
                loading:false,
                finished:false,
                isLoading:false,
                num:10,
                count:0
            }
        },
        created(){
            // this.getList()
        },
        methods:{
            getList(id){
                var that = this
                getSportList().then(res=>{
                    console.log(res)
                    // 一维数组转化二维数组
                    that.list = new Array(Math.ceil(res.list.length/that.num)) //确定转换二维数组中的数组个数
                    for(let i = 0; i < that.list.length; i++){
                        that.list[i] = new Array()
                        for (let j = 0; j < that.list[i].length; j++){
                            that.list[i][j] = ''
                        }
                    }
                    for (let k = 0; k< res.list.length; k++){
                        that.list[parseInt(k/that.num)][k%that.num] = res.list[k]
                    }
                    that.showList = that.showList.concat(that.list[id])
                    if (that.showList.length>=res.list.length){
                        that.finished = true
                        return false
                    }
                    // console.log(that.showList)
                })
            },
            onRefresh(){
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                }, 500);
            },
            onLoad() {
                this.getList(this.count)
                // 异步更新数据
                setTimeout(() => {
                    this.count++
                    this.loading = false
                }, 500);
            },
            go_goodsInfo(id){
                // console.log(id)
                let choose_goods = {}
                for (let i = 0;i<this.showList.length;i++){
                    if (this.showList[i].id == id) {
                        choose_goods = this.showList[i]
                    }
                }
                console.log(choose_goods)
                localStorage.setItem('choose_goods',JSON.stringify(choose_goods))
                this.$router.push({
                    name:'GoodsInfo',
                    // params:{
                    //     choose_goods:choose_goods
                    // }
                })
            }
        }
    }
</script>

<style scoped>
    #sport{padding-top: 46px}
    #sport .sport_img{padding: 8px}
    /*#sport .sport_img .img_wrap{height: }*/
    #sport .sport_img img{width:100%;border: 1px solid lightgray;border-radius: 8px}
    #sport .sport_img .sport_text{line-height: 30px}
    #sport .sport_img .new_price{font-size: 16px;font-weight: bolder;color: orangered}
    #sport .sport_img .old_price{font-size: 12px;font-weight: bolder;color: grey}
</style>
