<template>
    <div id="mine">
        <div v-if="flag">
            <div class="head_help">
                <van-nav-bar :border="false" fixed  @click-left="$router.push('/setting')">
                    <van-icon name="setting" slot="left" class="head_icon"/>
                    <van-icon name="bell" slot="right" class="head_icon" info="9"/>
                </van-nav-bar>
            </div>
            <div class="head_img">
                <img :src="userInfo.icon"/>
                <p>{{userInfo.name}}</p>
                <p>{{"Lv"+userInfo.level}}</p>
            </div>
            <div>
                <van-row>
                    <van-col span="11">
                        <div class="user_info" style="text-align: right">粉丝 &nbsp;{{(userInfo.fans/1000).toFixed(1)+'K'}}</div>
                    </van-col>
                    <van-col span="2">
                        <div class="user_info">&nbsp;</div>
                    </van-col>
                    <van-col span="11">
                        <div class="user_info">关注 &nbsp; &nbsp;{{userInfo.concern}}</div>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="8">
                        <div class="user_collect">
                            <p>{{userInfo.collect}}</p>
                            <div>收藏</div>
                        </div>
                    </van-col>
                    <van-col span="8">
                        <div class="user_collect">
                            <p>{{userInfo.shop}}</p>
                            <div>关注店铺</div>
                        </div>
                    </van-col>
                    <van-col span="8">
                        <div class="user_collect">
                            <p>{{userInfo.coupon}}</p>
                            <div>卡券</div>
                        </div>
                    </van-col>
                </van-row>
                <div style="height: 10px;background-color: #f4f4f4"></div>
                <van-row>
                    <van-col span="8">
                        <div class="icon_order">
                            <img src="../../static/images/icon/icon_1.png"/>
                            <p>我的订单</p>
                        </div>
                    </van-col>
                    <van-col span="8">
                        <div class="icon_order" @click="$router.push('/site')">
                            <img src="../../static/images/icon/icon_6.png"/>
                            <p>地址管理</p>
                        </div>
                    </van-col>
                    <van-col span="8">
                        <div class="icon_order">
                            <img src="../../static/images/icon/icon_7.png"/>
                            <p>我的评价</p>
                        </div>
                    </van-col>
                </van-row>
                <div style="height: 10px;background-color: #f4f4f4"></div>
                <mine-cell title="我的等级" icon="gem"></mine-cell>
                <mine-cell title="我的经验" icon="gem"></mine-cell>
                <mine-cell title="我的M币" icon="gem"></mine-cell>
                <mine-cell title="我的M币" icon="gem"></mine-cell>
                <mine-cell title="我的M币" icon="gem"></mine-cell>
                <mine-cell title="我的M币" icon="gem"></mine-cell>
                <mine-cell title="我的M币" icon="gem"></mine-cell>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    import mineCell from '../components/mineCell'
    export default {
        name: "mine",
        data(){
            return{
                flag:localStorage['token'],
                userInfo:JSON.parse(localStorage['userInfo'])
            }
        },
        components:{
            mineCell
        },
        // computed:{
        //     ...mapState('userInfo',['userInfo'])
        // },
        created(){
            console.log(this.userInfo)
            if (!this.flag){
                localStorage.setItem('path',this.$route.path)
                this.$router.push({
                    name:'Login',
                })
            }
            document.scrollingElement.scrollTop = 0
        },
        mounted(){
        },
        methods:{
        }
    }
</script>

<style scoped>
.van-nav-bar .van-icon{color: #111}
#mine{padding-bottom: 50px}
.van-nav-bar{background: -webkit-gradient(linear,left top, right top,from(#eb9c42),to(#e8632d));}
#mine .head_help{height:120px;background: -webkit-gradient(linear,left top, right top,from(#eb9c42),to(#e8632d));}
#mine .head_help .head_icon{font-size: 20px;color:white}
#mine .user_collect{text-align: center;}
#mine .user_collect>p{font-size: 18px;padding-top: 5px}
#mine .user_collect>div{font-size: 12px;color: grey;padding-bottom: 5px;-webkit-transform: scale(0.9)}
#mine .user_info{line-height: 30px;border-bottom: 1px solid #f9f9f9;font-weight: bolder;color: grey}
#mine .head_img{text-align: center;margin-top: -30px}
#mine .head_img img{width: 65px;height: 65px;border-radius: 50%}
#mine .head_img p{line-height: 16px;color: orange;font-weight: bolder}
    #mine .icon_order{text-align: center;padding: 8px 0;}
    #mine .icon_order img{width: 45px;height: 45px;border-radius: 50%;}
    #mine .icon_order p{color: grey;font-size:12px;-webkit-transform: scale(0.9)}
    #mine .mine_slide{height: 40px ;line-height: 40px;text-align: center}
</style>
