<template>
    <div id="goodInfo">
        <!--导航条-->
        <transition name="fade">
            <div class="nav" v-show="show">
                <van-nav-bar left-arrow @click-left="$router.push('/sport')">
                    <!--<van-icon name="search" slot="title" />-->
                    <van-tabbar v-model="active" slot="title" :fixed="false" @change="jump(active)">
                        <van-tabbar-item>宝贝</van-tabbar-item>
                        <van-tabbar-item>评价</van-tabbar-item>
                        <van-tabbar-item>详情</van-tabbar-item>
                        <van-tabbar-item>推荐</van-tabbar-item>
                    </van-tabbar>
                    <van-icon name="cart-o" slot="right"></van-icon>
                </van-nav-bar>
            </div>
        </transition>
        <transition name="fade">
            <div class="nav" v-show="!show">
                <van-row>
                    <van-col span="11" offset="1" style="height: 46px;line-height: 46px;padding-top: 5px">
                        <span style="height: 30px;
                        width: 30px;line-height: 37px;border-radius: 50%;color: white;
                        display: inline-block;font-size: 20px;background-color: rgba(0,0,0,0.5);
                        text-align: center" @click.stop="$router.push('/sport')">
                            <van-icon name="arrow-left"></van-icon>
                        </span>
                    </van-col>
                    <van-col span="11" style="height: 46px;line-height: 46px;text-align: right;padding-top: 5px">
                        <span style="height: 30px;width: 30px;line-height: 37px;border-radius: 50%;color: white;display: inline-block;font-size: 20px;background-color: rgba(0,0,0,0.5);text-align: center">
                            <van-icon name="cart"></van-icon>
                        </span>
                    </van-col>
                </van-row>
            </div>
        </transition>
        <!--宝贝内容-->
        <div class="goods_detail goods_describe">
            <van-swipe class="goods-swipe">
                <van-swipe-item v-for="(thumb,index) in goods_describe.main_pic" :key="thumb" @click.stop="ImagePreviews(index)">
                    <img :src="thumb" @click.stop="ImagePreviews(index)">
                </van-swipe-item>
            </van-swipe>
            <van-row>
                <!--价格-->
                <van-col span="24">
                    <div class="price">￥<span class="new_price">{{goods_describe.price}}</span>  <span class="sell">新品促销</span></div>
                    <div class="old_price">价格 <span> ￥{{goods_describe.oldPrice}}</span></div>
                </van-col>
                <!--标题-->
                <van-col span="18">
                    <div class="goods_title"> <van-icon name="hot" size="14px" color="red"></van-icon> {{goods_describe.title.replace("。",'')}}</div>
                </van-col>
                <van-col span="6">
                    <div class="goods-share">
                        <span><van-icon name="weapp-nav"></van-icon>分享</span>
                    </div>
                </van-col>
                <van-col span="8"><div class="sell_massage express">快递:0.00</div></van-col>
                <van-col span="8"><div class="sell_massage">月销:{{goods_describe.sell_num}}</div></van-col>
                <van-col span="8"><div class="sell_massage address pro_address">{{goods_describe.good_address.replace("。",'')}}</div></van-col>
            </van-row>
            <van-row>
                <van-col span="24"><div style="height: 10px;background-color: #f4f4f4"></div></van-col>
            </van-row>
            <van-row>
                <van-col span="3"><div class="sell_massage express">优惠</div></van-col>
                <van-col span="17">
                    <div class="sell_massage coupon">领券可少减5元</div>
                    <div class="coupon_massage coupon">
                        <div style="color: orangered;font-weight: bolder">店铺优惠券、满99减5、满199减10</div>
                    </div>
                    <div class="coupon_massage coupon">
                        <span style="padding: 2px 8px ;border-radius: 6px;background-color:#fcf1e8 ">积分</span>
                        <span>购买可得{{goods_describe.good_point}}积分</span>
                    </div>
                </van-col>
                <van-col span="4"><div class="sell_massage address" @click.stop="go_coupon('coupon')">领券 <van-icon name="arrow" class="icon_coupon"></van-icon></div></van-col>
            </van-row>
            <van-row>
                <van-col span="3"><div class="sell_massage express">活动</div></van-col>
                <van-col span="17"><div class="sell_massage coupon"><span style="color: #f32a08"><van-icon name="coupon"></van-icon> app专享</span> 、去app下单赢红包等好礼</div></van-col>
                <van-col span="4"><div class="sell_massage address"><van-icon name="arrow" class="icon_coupon"></van-icon></div></van-col>
            </van-row>

            <van-row>
                <van-col span="24"><div style="height: 10px;background-color: #f4f4f4"></div></van-col>
            </van-row>

            <van-row>
                <van-col span="3"><div class="sell_massage express">服务</div></van-col>
                <van-col span="17">
                    <div class="sell_massage coupon">急速退货·正品保证·急速退款</div>
                    <div class="coupon_massage coupon">
                        <span style="color:#f32a08"><van-icon name="new-arrival"></van-icon> 天猫无忧购、</span>正品保障·购物无忧
                    </div>
                </van-col>
                <van-col span="4"><div class="sell_massage address" @click.stop="go_coupon('help')"><van-icon name="arrow" class="icon_coupon"></van-icon></div></van-col>
            </van-row>
            <van-row>
                <van-col span="3"><div class="sell_massage express">选择</div></van-col>
                <van-col span="17"><div class="sell_massage coupon">已选“【直降70元的什么的额大啊大发】”</div></van-col>
                <van-col span="4"><div class="sell_massage address" @click.stop="go_sku"><van-icon name="arrow" class="icon_coupon"></van-icon></div></van-col>
            </van-row>
            <van-row>
                <van-col span="3"><div class="sell_massage express">参数</div></van-col>
                <van-col span="17"><div class="sell_massage coupon">品牌 材质</div></van-col>
                <van-col span="4"><div class="sell_massage address" @click.stop="go_coupon('param')"><van-icon name="arrow" class="icon_coupon"></van-icon></div></van-col>
            </van-row>
            <van-row>
                <van-col span="24"><div style="height: 10px;background-color: #f4f4f4"></div></van-col>
            </van-row>
        </div>
        <!--宝贝评价-->
        <div class="goods_detail goods_describe">
            <van-row>
                <van-col span="18"><div class="sell_massage express" style="padding-left: 0px">宝贝评价(2370)</div></van-col>
                <van-col span="6"><div class="sell_massage address" style="color: orange">查看更多 <van-icon name="arrow" class="icon_coupon"></van-icon></div></van-col>
            </van-row>
            <van-row>
                <van-col span="24">
                    <div>
                        <span class="rate_detail">很舒服(95)</span>
                        <span class="rate_detail">质量很好(78)</span>
                        <span class="rate_detail">版型好(70)</span>
                    </div>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="24">
                    <div class="user_rate">
                        <img src="../../static/images/icon/icon_1.png" alt="">
                        <span>Q********P</span>
                    </div>
                    <div class="rate_text">
                        裤子摸上去蛮舒服的，还送了一双短袜，很满意
                    </div>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="18"><div class="sell_massage express" style="padding-left: 0px">问大家(49)</div></van-col>
                <van-col span="6"><div class="sell_massage address" style="color: orange">查看全部 <van-icon name="arrow" class="icon_coupon"></van-icon></div></van-col>
                <van-col span="24">
                    <van-row>
                        <van-col span="12"> <div class="question"><span>问</span> 薄还是厚</div></van-col>
                        <van-col span="12"> <div class="question" style="text-align: right;padding-right: 5px;color: lightgray">1个回答</div></van-col>
                        <van-col span="12"> <div class="question"><span>问</span> 夏天合适吗</div></van-col>
                        <van-col span="12"> <div class="question" style="text-align: right;padding-right: 5px;color: lightgray;padding-bottom: 15px">6个回答</div></van-col>
                    </van-row>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="24"><div style="height: 10px;background-color: #f4f4f4"></div></van-col>
            </van-row>
            <!--<br v-for="(x,index) of 20" :key='index'>-->
            <van-row>
                <van-col span="18"><div class="sell_massage express" style="padding-left: 0px;font-weight: bolder">店铺推荐</div></van-col>
                <van-col span="6"><div class="sell_massage address" style="color: orange">查看全部 <van-icon name="arrow" class="icon_coupon"></van-icon></div></van-col>
                <van-col span="8" v-for="(x,index) in goods_describe.commend.shop_commend" :key="index">
                    <div style="padding: 5px">
                        <img :src="x.pic" style="height: 90px;width: 100%;border: 1px solid #CCC;border-radius: 5px"/>
                        <div>
                            <p style="font-size: 12px;">{{x.title.replace('。','')}}</p>
                            <div style="color: orange">￥<span style="font-size: 18px">{{x.price}}</span></div>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
        <!--宝贝详情-->
        <div class="goods_detail">
            <p style="height: 45px;line-height: 45px;text-align: center;font-size: 12px;margin-top: 15px;background-color: #f4f4f4;color: grey">———— 宝贝详情 ————</p>
            <div style="padding-bottom: 50px" v-for="(item,index) in goods_describe.detail_pic">
                <img :src="item" alt="" width="100%">
            </div>
            <!--<br v-for="(x,index) of 20" :key='index'>-->
        </div>
        <!--推荐-->
        <div class="goods_detail">
            <p style="height: 45px;line-height: 45px;text-align: center;font-size: 12px;margin-top: 15px;background-color: #f4f4f4;color: grey">———— 看了又看 ————</p>
            <van-row>
                <van-col span="12" v-for="(x,index) in goods_describe.commend.like_commend" :key="index">
                    <div style="padding: 10px">
                        <img :src="x.pic" style="height: 160px;width: 100%;border: 1px solid #CCC;border-radius: 5px"/>
                        <div>
                            <p style="font-size: 12px;">{{x.title.replace("。",'')}} </p>
                            <div style="color: orange">￥<span style="font-size: 18px">{{x.price}}</span></div>
                        </div>
                    </div>
                </van-col>
            </van-row>
            <!--<br v-for="(x,index) of 50" :key='index'>-->
        </div>


        <!--弹出层-->
        <van-popup v-model="dailog" position="bottom" :overlay="true">
            <div id="coupon">
                <div class="coupon_head">
                    <span v-if="flag == 'coupon'">优惠</span>
                    <span v-if="flag == 'help'">基础保障</span>
                    <span v-if="flag == 'param'">产品参数</span>
                </div>
                <!--优惠券-->
                <div v-if="flag == 'coupon'">
                    <div class="low_sell">促销</div>
                    <div class="points">
                        <span style="padding: 0px 8px;font-size: 12px;background-color: #fcf1e8;border-radius: 10px;color: #eb592a;-webkit-transform: scale(0.90);display: inline-block">积 分</span>
                        <span style="color: #111;-webkit-transform: scale(0.90);display: inline-block">购买可得{{goods_describe.good_point}}积分</span></div>
                        <van-row>
                            <van-col span="12"><div class="low_sell">领券</div></van-col>
                            <van-col span="12"><div class="low_sell" style="text-align: right;padding-right: 10px">已有积分：1740</div></van-col>
                        </van-row>
                    <div>
                        <van-row class="coupon_all" v-for="(item,index) in goods_describe.coupon_list" :key="index">
                            <van-col span="17">
                                <div class="coupon_detail" style="border-top-right-radius:0;border-bottom-right-radius:0;border-right: 1px dashed">
                                    <div class="small_font">￥<span class="coupon_price">{{item.price}}</span> 元店铺优惠券</div>
                                    <div class="small_font">满{{item.use_price}}使用</div>
                                    <div class="small_font">有效期 {{item.use_time}}</div>
                                    <div id='top_radius'></div>
                                    <div id="bottom_radius"></div>
                                </div>
                            </van-col>
                            <van-col span="7">
                                <div class="coupon_detail" style="line-height: 65px;text-align: center;border-top-left-radius:0;border-bottom-left-radius:0">立即领取</div>
                            </van-col>
                        </van-row>
                    </div>
                </div>

                <!--基础保障-->
                <div class="protect"  v-if="flag == 'help'">
                    <van-row v-for="(x,index) in goods_describe.goods_help" :key="index">
                        <van-col span="4">
                            <p style="text-align: center;height: 25px;line-height: 25px"><van-icon :name="x.icon+''" color="#eb592a"></van-icon></p>
                        </van-col>
                        <van-col span="20">
                            <p style="height: 20px;line-height: 20px;font-weight: bolder">{{x.help_title}}</p>
                            <p style="height: 20px;line-height: 20px;padding-bottom: 30px">{{x.help_text}}</p>
                        </van-col>
                    </van-row>
                </div>

                <!--产品参数-->
                <div class="parm" v-if="flag == 'param'">
                    <van-row v-for="(x,index) in goods_describe.goods_param" :key="index" style="border-bottom: 1px solid rgb(253, 253, 253)">
                        <van-col span="6">
                            <div class='goods_param' style="color: #848080">
                                <p>{{x.name}}</p>
                            </div>
                        </van-col>
                        <van-col span="18">
                            <div class='goods_param' style="text-align: left">
                                <p>{{x.value}}</p>
                            </div>
                        </van-col>
                    </van-row>
                </div>

                <div class="coupon_foot" @click.stop="dailog = false">
                    <span class="finished">
                        完成
                    </span>
                </div>
            </div>
        </van-popup>

        <!--产品规格-->

        <van-sku
                v-model="showSku"
                :sku="goods_describe.sku"
                :goods="goods_describe.goods"
                :goods-id="goods_describe.goods.goodsId"
                :hide-stock="goods_describe.sku.hide_stock"
                :quota="goods_describe.goods.quota"
                :quota-used="goods_describe.goods.quotaUsed"
                :reset-stepper-on-hide="resetStepperOnHide"
                :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
                :close-on-click-overlay="closeOnClickOverlay"
                :disable-stepper-input="disableStepperInput"
                @buy-clicked="onBuyClicked"
                @add-cart="onAddCartClicked"
        />


        <van-goods-action>
            <van-goods-action-mini-btn icon="chat-o">
                客服
            </van-goods-action-mini-btn>
            <van-goods-action-mini-btn icon="cart-o" @click="$router.push('/cart')">
                购物车
            </van-goods-action-mini-btn>
            <van-goods-action-big-btn @click="showSku = true">
                加入购物车
            </van-goods-action-big-btn>
            <van-goods-action-big-btn primary>
                立即购买
            </van-goods-action-big-btn>
        </van-goods-action>
    </div>
</template>

<script>
    import {mapState,mapActions} from'vuex'
    import {ImagePreview} from"vant"
    export default {
        name: "goodsInfo",
        data(){
            return{
                active:0,
                show:false,
                dailog:false,
                showSku:false,
                goods_describe:JSON.parse(localStorage.getItem('choose_goods')),

                customStepperConfig: {
                    // 自定义限购文案
                    quotaText: '每次限购xxx件',
                    // 自定义步进器超过限制时的回调
                    handleOverLimit: (data) => {
                        const { action, limitType, quota, quotaUsed } = data;

                        if (action === 'minus') {
                            Toast('至少选择一件商品');
                        } else if (action === 'plus') {
                            // const { LIMIT_TYPE } = Sku.skuConstants;
                            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
                                let msg = `单次限购${quota}件`;
                                if (quotaUsed > 0) msg += `，您已购买${quotaUsed}`;
                                Toast(msg);
                            } else {
                                Toast('库存不够了~~');
                            }
                        }
                    }
                },


                // messageConfig: {
                //     // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
                //     uploadImg: () => {
                //         return new Promise((resolve) => {
                //             setTimeout(() => resolve('https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'), 1000);
                //         });
                //     },
                //     // 最大上传体积 (MB)
                //     uploadMaxSize: 3,
                //     // placehold配置
                //     placeholderMap: {
                //         text: '买家请留言 ',
                //         tel: 'xxx',
                //     }
                // },
                // goodsId: '946755',
                // quota:0,//限购件数 0代表不限购
                // quotaUsed:0,//已购买件数
                resetStepperOnHide:false,//隐藏时重置选择的商品数量
                resetSelectedSkuOnHide:false,//隐藏时重置已选择的 sku
                closeOnClickOverlay:true,//是否在点击蒙层后关闭
                disableStepperInput:false,//是否禁用步进器输入,
                flag:'',
                newFlag:localStorage['token']
            }
        },
        computed:{
            ...mapState({
                cartList:state=> state.cart.cartList,
            })
        },
        created(){
            // console.log(this.showGoods)
            // console.log(this.cartList)
            document.scrollingElement.scrollTop = 0
        },
        mounted() {
            // 将自定义方法绑定到窗口滚动条事件
            window.onscroll = () => {

                let top = document.scrollingElement.scrollTop; //触发滚动条，记录数值
                // console.log('鼠标移动的距离'+top)
                let goods_detail = document.querySelectorAll('.goods_detail')
                // let detail_one = goods_detail[0].offsetTop-47 //
                let detail_two = goods_detail[1].offsetTop-46 //
                let detail_three = goods_detail[2].offsetTop-46 //
                let detail_four = goods_detail[3].offsetTop-46 //
                if(top>=46 && top<detail_two-10){
                    this.show = true;
                    this.active = 0
                } else if(top>=detail_two && top<detail_three-10){
                    this.show = true;
                    this.active = 1
                } else if (top>=detail_three && top<detail_four-10){
                    this.show = true;
                    this.active = 2
                } else if(top>=detail_four-10){
                    this.show = true;
                    this.active = 3
                } else if (top<46) {
                    //相反...
                    this.show = false;
                }
            };
        },
        methods:{
            ...mapActions('cart',['addGoods']),
            onBuyClicked(){

            },
            onAddCartClicked(value){
                if (!this.newFlag){
                    this.$toast("请登录！")
                    localStorage.setItem('path',this.$route.path)
                    this.$router.push({
                        name:'Login',
                    })
                    // return false
                }else {
                    // console.log(value)
                    // localStorage.removeItem('cartList')
                    var isHas = this.cartList.find((item)=>{
                        return item.goods.goodsId == value.goodsId
                    })
                    if(!isHas){
                        var data = this.goods_describe
                        // this.$store.dispatch('cart/addGoods',data)
                        this.addGoods(data)
                        console.log(this.cartList)
                        this.$toast("加入购物车成功！")
                        this.showSku = false
                    }else {
                        this.$toast("该商品已加入购物车")
                    }
                }

            },
            go_sku(){
                this.showSku = true
                this.dailog = false
                // console.log(this.skuShow)
            },
            go_coupon(id){
                this.showSku = false
                this.dailog = true
                this.flag = id
            },
            ImagePreviews(id) {
                ImagePreview({images: this.goods_describe.main_pic,
                    startPosition: id,
                    onClose() {
                        // do something
                    }});
            },
            jump(active){
                // active 为当前点击的tabbar的索引
                let goods_detail = document.querySelectorAll('.goods_detail')
                let goods_top = goods_detail[active].offsetTop-46 //获取点击的tabbar对应的元素到顶部的距离
                console.log('目标元素到顶部的距离'+goods_top)
                let distance = document.documentElement.scrollTop || document.body.scrollTop //滚动条已经滚动的距离
                // console.log('滚动条已经滚动的距离'+distance)
                // 平滑滚动，时长500ms，每10ms一跳，共50跳
                let step = 10
                //当滚动条已经滚动的高度小于目标元素的到顶部的距离
                if (goods_top>distance){
                    smoothDown()
                }else if (goods_top == distance){
                    document.documentElement.scrollTop = distance
                    // Chrome
                    document.body.scrollTop = distance
                } else {
                    smoothUp()
                }
                //递归调用
                function smoothDown() {
                    if (goods_top > distance) {
                        distance += step
                        // Firefox
                        document.documentElement.scrollTop = distance
                        // Chrome
                        document.body.scrollTop = distance
                        setTimeout(smoothDown, 1)
                    }else{
                        return false
                    }
                };
                function smoothUp() {
                    if (goods_top < distance) {
                        distance -= step
                        // Firefox
                        document.documentElement.scrollTop = distance
                        // Chrome
                        document.body.scrollTop = distance
                        setTimeout(smoothUp, 2)
                    }else{
                        return false
                    }
                }
            },
        }
    }
</script>

<style scoped>
    #goodInfo{padding-bottom: 60px}
    #goodInfo .goods-swipe img{width: 100%;display: block;height: 350px}
    #goodInfo .goods_describe .price{color: orangered;padding: 15px 0 0 9px}
    #goodInfo .goods_describe .old_price{color: grey;padding:0 0 5px 10px}
    #goodInfo .goods_describe .old_price span{text-decoration: line-through}
    #goodInfo .goods_describe .price .new_price{font-size: 26px}
    #goodInfo .goods_describe .price .sell{font-size: 12px;padding: 0 2px;background-color: #fdebe5}
    #goodInfo .goods_describe .goods_title{font-size:12px;font-weight: bold;line-height: 15px;padding-left: 10px}
    #goodInfo .goods_describe .goods-share{text-align: right;line-height: 30px;}
    #goodInfo .goods_describe .goods-share span{padding: 5px 8px;background-color: #f4f4f4;border-top-left-radius: 15px;border-bottom-left-radius: 15px;color: grey}
    #goodInfo .goods_describe .sell_massage {height: 32px;line-height: 32px;text-align: center;color: #111;font-size: 12px;-webkit-transform: scale(0.90);}
    #goodInfo .goods_describe .coupon_massage {height: 28px;line-height: 28px;text-align: center;color: #111;font-size: 12px;-webkit-transform: scale(0.90);}
    #goodInfo .goods_describe .express {text-align: left;padding-left: 10px}
    #goodInfo .goods_describe .address {text-align: right;padding-right: 28px;position: relative}
    #goodInfo .goods_describe .pro_address {padding-right: 8px}
    #goodInfo .goods_describe .address .icon_coupon{position: absolute;top: 10px;right: 10px}
    #goodInfo .goods_describe .coupon {text-align: left;}
    #coupon {height: 380px;padding: 45px 0px;position: relative;overflow-y:auto;}
    #coupon .coupon_head{text-align: center;font-size: 14px;line-height: 45px;height: 45px;position: fixed;top: 0;width: 100%;background-color: white;z-index: 2}
    #coupon .coupon_foot{text-align: center;font-size: 14px;line-height: 45px;height: 45px;position: fixed;bottom: 0;width: 100%;padding-bottom: 2px;background-color: white;z-index: 100}
    #coupon .coupon_foot .finished{padding:3% 42%;background:linear-gradient(left,#eb9c42,#e8632d);border-radius: 25px;color: white}
    #coupon .low_sell{text-indent: 10px;color: grey;height: 30px;line-height: 30px;font-size: 12px;font-weight: bolder}
    #coupon .points{padding-left: 10px;height: 25px;line-height: 25px;font-size: 12px;}
    #coupon .coupon_detail{height: 65px;background-color: #fcf1e8;color: #eb592a;border-radius: 5px;padding: 5px 0;position: relative;}
    #coupon .coupon_detail .coupon_price{font-size: 24px}
    #coupon .coupon_detail .small_font{font-size: 12px;-webkit-transform: scale(0.90);}
    #coupon .coupon_all{padding: 0 10px; margin-bottom: 20px;}
    #coupon .parm .goods_param{padding:15px 5px 10px 5px; text-align: center;}
    #top_radius{height:15px;width: 12px;position: absolute;background-color: white;border-radius: 50%;right:0;top: 0;transform: translate(50%,-50%);z-index: 99}
    #bottom_radius{height:15px;width: 12px;position: absolute;background-color: white;border-radius: 50%;right:0;bottom: 0;transform: translate(50%,50%);z-index: 99}
    .goods_detail .rate_detail{padding: 4px 12px;background-color: #fdebe5;border-radius: 14px;text-decoration: underline;display: inline-block;-webkit-transform: scale(0.80);}
    .goods_describe .user_rate *{display:inline-block;vertical-align: middle;line-height:20px;margin-top: 10px;}
    .goods_describe .user_rate img{width: 15px;height: 15px;border-radius: 50%}
    .goods_describe .rate_text {font-size: 12px;-webkit-transform: scale(0.90);padding-bottom: 20px;border-bottom: 1px solid #f5f5f5}
    .goods_describe .user_rate {font-size: 12px;-webkit-transform: scale(0.90)}
    .goods_describe .question {font-size: 12px;-webkit-transform: scale(0.90);padding-left: 5px}
    .goods_describe .question span{color: orange}



    .nav {width: 100%;position: fixed;top: 0;z-index: 99}
    .van-popup--bottom{border-top-right-radius: 10px;border-top-left-radius: 10px;}
    .van-tabbar{height: 46px}
    .van-tabbar-item--active{color: orangered;font-weight: bold}
    .fade-enter-active,
    .fade-leave-active {transition: all 0.5s;}
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {opacity: 0;height: 0;}
</style>
