<template>
    <div id="cart">
        <div v-if="cartList.length">
            <div>
                <van-nav-bar title="" left-arrow @click-left="$router.back()" :fixed="true" :border="false" left-text="购物车" right-text="管理"/>
            </div>
            <van-row class="cart_bg" v-for="(item,index) in cartList" :key="index" >
                <van-col span="3">
                    <div class="shop_name" @click="delGoods(index)">
                        <van-icon name="delete"></van-icon>
                    </div>
                </van-col>
                <van-col span="21">
                    <div class="shop_name" style="text-align: left">
                        {{item.shopName}}
                    </div>
                </van-col>
                <van-col span="24" style="padding: 5px 0">
                    <van-row>
                        <van-col span="3">
                            <div class="cart_choose">
                                <van-checkbox v-model="item.select" @click="checked=false"></van-checkbox>
                            </div>
                        </van-col>
                        <van-col span="6">
                            <div class="cart_img">
                                <img :src="item.src" alt="">
                            </div>
                        </van-col>
                        <van-col span="12">
                            <p class="cart_title">{{item.title}}</p>
                            <p class="cart_describe">{{item.title}}</p>
                            <div style="margin-top: 30px;text-indent: 10px"><van-button size="mini" @click="sum(index)">-</van-button><van-button size="mini" @click="addNumber(index)">+</van-button></div>
                        </van-col>
                        <van-col span="3">
                            <p class="cart_price">{{'￥'+item.price}}</p>
                            <p class="cart_num">{{'x'+item.skuData.selectedNum}}</p>
                        </van-col>
                    </van-row>
                </van-col>
                <van-col :span="24">
                    <div style="height: 15px;background-color: white"></div>
                </van-col>
            </van-row>
            <div class="footer_all_pay">
                <van-row>
                    <van-col span="6">
                        <div class="foot_finish">
                            <van-checkbox v-model="checked" @click="all_choose">全选</van-checkbox>
                        </div>
                    </van-col>
                    <van-col span="10">
                        <div class="foot_finish all_price">合计：<span style="color: orangered">{{'￥'+allPrice}}</span></div>
                    </van-col>
                    <van-col span="8" style="padding: 0 10px">
                        <div class="foot_finish pay">
                            {{'结算('+allNum+')'}}
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div v-if="!cartList.length">
            <div class="empty">
                购物车(0)
            </div>
            <div style="text-align: center;padding-top: 150px">
                <div class="wrap_cart">
                    <van-icon name="shopping-cart-o" class="empty_cart"></van-icon>
                </div>
                <p class="text_empty">购物车竟然是空的</p>
                <p class="buy_text">“再忙，也要买点什么犒赏自己~”</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState,mapGetters,mapMutations,mapActions} from'vuex'
    export default {
        name: "cart",
        data(){
            return{
                checked:false,
                flag:localStorage['token']
            }
        },
        computed:{
            ...mapState({
                cartList:state=> state.cart.cartList,
            }),
            ...mapGetters('cart',['allPrice','allNum'])
        },
        created(){
            document.scrollingElement.scrollTop = 0
        },
        mounted(){
            if (!this.flag){
                localStorage.setItem('path',this.$route.path)
                this.$router.push({
                    name:'Login',
                })
            }
        },
        methods:{
            ...mapActions('cart',['delGoods','addNumber','delNumber']),
            all_choose(){
                if (this.checked){
                    this.cartList.forEach(item=>{
                        item.select = true
                    })
                }else {
                    this.cartList.forEach(item=>{
                        item.select = false
                    })
                }
            },
            sum(id){
                if (this.cartList[id].skuData.selectedNum>1) {
                    this.delNumber(id)
                }else{
                   this.$dialog.confirm({
                        message: '确认删除此商品吗？'
                    }).then(() => {
                        this.delGoods(id)
                    }).catch(() => {
                        // on cancel
                    });
                }
            }
        }
    }
</script>

<style scoped>
#cart{padding-top: 46px;padding-bottom: 85px}
#cart .cart_bg{background-color: #fafafa;border-radius: 5px}
#cart .shop_name{line-height: 30px;color: grey;text-align: center}
#cart .cart_img img{width: 100%;height: 90px}
#cart .cart_choose{text-align: center;margin-top: 32px}
#cart .cart_title{text-indent: 10px;font-size: 14px;font-weight: bolder}
#cart .cart_describe{text-indent: 10px;color: grey}
#cart .cart_price{font-weight: bolder;text-align: center;margin-top: 32px;line-height: 24px}
#cart .cart_num{text-align: center}
#cart .foot_finish{height: 35px;line-height: 35px;text-align: center;}
#cart .all_price{text-align: right}
#cart .pay{border-radius: 30px;background: -webkit-gradient(linear,left top, right top,from(#eb9c42),to(#e8632d));color: white}
#cart .footer_all_pay{position: fixed;bottom: 50px;width: 100%;background-color: white}
#cart .empty{position: fixed;width:100%;top:0;height: 46px;line-height: 46px;text-align: center;
    color: white;background:-webkit-gradient(linear,left top, right top,from(#eb9c42),to(#e8632d));font-size: 15px;text-decoration: underline}
#cart .empty_cart{font-size: 55px;color: #ececec}
#cart .wrap_cart {display: inline-block;padding: 15px;background:-webkit-gradient(linear,left top, right top,from(#eb9c42),to(#e8632d));border-radius: 50% }
#cart .text_empty {font-size: 14px;color: grey;font-family: '微软雅黑';line-height: 28px}
#cart .buy_text {font-size: 12px;color: #b5b4b4;-webkit-transform:scale(0.9)}
.van-nav-bar__text{color: #111;text-decoration: underline;font-size: 14px;color: white}
.van-nav-bar{background: -webkit-gradient(linear,left top, right top,from(#eb9c42),to(#e8632d));}
.van-nav-bar .van-icon{color: white}
</style>
