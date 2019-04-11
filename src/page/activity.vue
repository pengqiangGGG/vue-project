<template>
    <div id="activity">
        <!--头部搜索-->
        <div>
            <van-row style="border-bottom: 1px solid #f5f5f5">
                <van-col span="3">
                    <div style="height:50px;line-height: 50px;text-align: center;font-size: 12px" @click="go_login">登录</div>
                </van-col>
                <van-col span="18">
                    <van-search placeholder="请输入搜索关键词" v-model="value" shape="round" @search="onSearch">
                    </van-search>
                </van-col>
                <van-col span="3">
                    <div style="height:50px;line-height: 50px;text-align: center"><van-icon name="wap-nav"></van-icon></div>
                </van-col>

            </van-row>
        </div>
        <!--tabs导航-->
        <van-tabs :line-width="70" swipeable  title-active-color="#ff4444" :sticky="true">
            <van-tab v-for="(item,index) in title" :title="item" :key="index">
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" v-if="item == '动态'">
                        <van-row v-for="(item,index) in showList" :key="index">
                            <van-col span="21" style="padding-left: 8px;">
                                <div class="author_icon">
                                    <img :src="item.author_icon" alt="">
                                    <span>
                                       热门内容来自：{{item.author_name}}
                                    </span>
                                </div>
                            </van-col>
                            <van-col span="3">
                                <div style="height: 45px;line-height: 45px;text-align: right;padding-right: 15px;font-weight: bold" @click="share">
                                    ···
                                </div>
                            </van-col>
                            <van-col span="18">
                                <div class="title title_right">{{item.title.replace("。","")}}</div>
                            </van-col>
                            <van-col span="6">
                                <div class="title title_left">浏览{{item.watch}}次</div>
                            </van-col>
                            <van-col span="24">
                                <div class="thumbnail_pic">
                                    <img :src="item.thumbnail_pic_s" alt="">
                                </div>
                            </van-col>
                        </van-row>
                    </van-list>
                    <div v-if="item == '热门'">
                        热门内容
                    </div>
                    <div v-if="item == '发现'">
                        发现内容
                    </div>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>

        <!--点击分享-->
        <van-popup v-model="show" position="bottom">
            <van-row>
                <van-col span="24">
                    <div class="share">转发</div>
                </van-col>
                <van-col span="24">
                    <div class="share">发送给好友</div>
                </van-col>
                <van-col span="24">
                    <div class="share" @click="show = false">取消分享</div>
                </van-col>
            </van-row>
        </van-popup>
    </div>
</template>

<script>
    import {getMockList} from "../api";

    export default {
        name: "activity",
        data(){
            return{
                title:["动态","热门","发现"],
                isLoading:false,
                value:'',
                show:false,
                loading:false,
                finished:false,
                activityList:[],
                showList:[],
                num:10,//每次滚动加载10条;
                count:0
            }
        },
        created() {
            // this.getList(this.count)
            document.scrollingElement.scrollTop = 0
        },
        methods:{
            getList(id){
                var that = this
                getMockList().then(res=>{
                    // console.log(res.articles)
                    // 得到的是一个一维数组转化成二维数组进行滚动加载
                    that.activityList = new Array(Math.ceil(res.articles.length/that.num));//第一步先确定二维数组中能有多少个数组；一维数组的length除以二维数组中每个数组个数；向上取整
                    for(var i = 0; i<that.activityList.length;i++){//第二步循环遍历这个二维数组，把里面数组的每个值赋值为空
                        that.activityList[i] = new Array();
                        for(var j = 0; j<that.num; j++){
                            that.activityList[i][j] = '';
                        }
                    }
                    for(var i = 0; i<res.articles.length;i++){//第三步；循环遍历一维数组给二维数组的每个数组中的每一项赋值
                        that.activityList[parseInt(i/that.num)][i%that.num] = res.articles[i];
                    }
                    // console.log(that.activityList)
                   that.showList =  that.showList.concat(that.activityList[id])
                    if (that.showList.length>=res.articles.length){
                        that.finished = true
                        return false
                    }
                })
            },
            onSearch(){
                //打印当前输入搜索框的值
                console.log(this.value)
            },
            onRefresh(){
              //下拉刷新
              //   this.count ++
              //   this.getList(this.count)
                setTimeout(()=>{
                    this.$toast('刷新成功');
                    this.isLoading = false;
                },500)
            },
            onLoad(){
                this.getList(this.count)
                setTimeout(()=>{
                    this.count ++
                    // console.log(this.count)
                    this.loading = false
                },500)
            },
            share(){
                this.show = true
            },
            go_login(){
                this.$router.push({
                    name:'Login',
                    params:{
                        path:this.$route.path
                    }
                })
            }
        }
    }
</script>

<style scoped>
#activity .author_icon *{display:inline-block;vertical-align: middle;line-height:45px;}
#activity .author_icon img{width: 20px;height: 20px;border-radius: 50%}
#activity .title{height:30px;line-height: 30px;}
#activity .title_right{font-size: 12px;text-indent: 15px;font-weight: bolder}
#activity .title_left{font-size: 12px;color: #ccc}
#activity .thumbnail_pic img{width: 100%;height: 200px;border-radius: 3px}
#activity .thumbnail_pic{padding: 0 5px 30px 5px}
#activity{padding-bottom: 50px}
#activity .share{height:35px;line-height: 35px;text-align: center;color: lightskyblue}
</style>
