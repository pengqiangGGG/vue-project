<template>
        <div id="home">
            <div>
                <van-row style="border-bottom: 1px solid #f5f5f5">
                    <van-col span="3">
                        <div style="height:50px;line-height: 50px;text-align: center;font-size: 16px">
                            <van-icon name="scan"></van-icon>
                        </div>
                    </van-col>
                    <van-col span="18">
                        <van-search placeholder="请输入搜索关键词" v-model="value" shape="round" @search="onSearch" @focus="go_search"></van-search>
                    </van-col>
                    <van-col span="3">
                        <div style="height:50px;line-height: 50px;text-align: center;font-size: 16px"><van-icon name="wap-nav"></van-icon></div>
                    </van-col>
                </van-row>
            </div>
            <!--tab切换-->
            <van-tabs :line-width="70" swipeable  title-active-color="#ff4444" :sticky="true">
                <van-tab v-for="(item,index) in title" :title="item" :key="index">
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <!--今日推荐内容-->
                        <div v-if="item == '今日推荐'">
                            <!--今日推荐轮播-->
                            <van-swipe :autoplay="3000" indicator-color="white">
                                <van-swipe-item v-for="(item,index) in images" :key="index">
                                    <div class="banner_img">
                                        <img :src="item" alt="" width="100%">
                                    </div>
                                </van-swipe-item>
                            </van-swipe>

                            <!--今日推荐分类-->
                            <div class="nav_bar">
                                <van-row>
                                    <van-col span="6" v-for="(item,index) in nav" :key="index" style="padding-bottom: 5px">
                                        <div class="nav_po" @click = 'go_shoose' >
                                            <!--<img :src="'../../static/images/icon/'+item.icon+'.png'" alt="" width="45px" height="45px">-->
                                            <img :src="'static/images/icon/'+item.icon+'.png'" alt="" width="45px" height="45px">
                                            <p class="nav_title">{{item.title}}</p>
                                        </div>
                                    </van-col>
                                </van-row>
                            </div>

                            <!--今日特卖-->
                            <div>
                                <van-row>
                                    <van-col span="24"><div class="nowDay-sell">今日特卖·每天早十点 晚八点上新</div></van-col>
                                </van-row>

                                <!--下拉刷新-->

                                <!--滚动加载-->
                                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                                    <div v-for="(item,index) in nowdayImagesList" :key="index">
                                        <div class="banner_img">
                                            <img :src="item" alt="" width="100%">
                                        </div>
                                    </div>
                                </van-list>

                            </div>
                        </div>

                        <!--美妆-->
                        <div v-if="item == '时尚'">
                            时尚页面
                        </div>
                        <div v-if="item == '美妆'">
                            美妆页面
                        </div>
                        <div v-if="item == '家电'">
                            家电页面
                        </div>
                        <div v-if="item == '家居'">
                            家居页面
                        </div>
                        <div v-if="item == '国际'">
                            国际页面
                        </div>
                        <div v-if="item == '生活'">
                            生活页面
                        </div>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>
</template>

<script>
  import {getData} from "../api/index";

  export default {
        name: "home",
        data(){
          return{
              nav:[
                  {icon:'icon_6',title:'鞋包馆'},
                  {icon:'icon_7',title:'运动馆'},
                  {icon:'icon_8',title:'母婴馆'},
                  {icon:'icon_9',title:'美妆馆'},
                  {icon:'icon_10',title:'超市'},
                  {icon:'icon_11',title:'女装馆'},
                  {icon:'icon_12',title:'男装馆'},
                  {icon:'icon_13',title:'更多'},
              ],
              title:['今日推荐','时尚','美妆','家电','家居','国际','生活'],
              images: [],
              nowdayImagesList:[],
              value:"",
              loading: false,
              finished: false,
              isLoading:false,
          }
        },
      created(){
        this.getImgList()
      },
      methods:{
          getImgList(){
              getData().then(response=>{
                  // console.log(response)
                  this.images = response.home.lunbo.home
                  this.nowdayImagesList = response.home.imageList
              })
          },
          onSearch(){
              console.log(this.value)
          },
          onLoad(){
              // console.log("1111111111111111111")
              // 触碰底部加载更多数据
              setTimeout(()=>{
                  for (let i = 0;i<5;i++){
                      this.nowdayImagesList.push(this.nowdayImagesList[i])
                  }
              },500)

              // 加载状态结束
              this.loading = false

              //全部加载完的时候
              if (this.nowdayImagesList.length >=15) {
                  this.finished = true;
              }
          },
          // 下拉刷新
          onRefresh(){
              setTimeout(()=>{
                  this.nowdayImagesList = []
                  this.$toast('刷新成功');
                  this.isLoading = false;
                  //重新给图片列表请求赋值
                  this.getImgList()
              },500)
          },
          go_login(){
              this.$router.push({
                  name:'Login',
                  params:{
                      path:this.$route.path
                  }
              })
          },
          go_search(){
              this.$router.push({
                  name:'Search',
                  params:{
                      path:this.$route.path
                  }
              })
          },
          go_shoose(){
              this.$router.push({
                  name:'Sport',
                  params:{
                      path:this.$route.path
                  }
              })
          }
      }

    }
</script>

<style scoped>
#home .nav_po{font-size: 12px;text-align: center}
#home .banner_img{padding: 5px}
#home .banner_img img{border-radius: 5px}
#home .nav_po .nav_title{margin: 0px;color: grey;font-size: 12px;}
#home{padding-bottom: 50px}
#home .nav_bar{padding-top: 15px}
#home .nowDay-sell{line-height:95px;height: 65px;text-align: center;font-weight: bolder;font-size: 12px}
</style>
