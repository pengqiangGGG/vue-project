<template>

    <!--测试页面-->
    <div class="goods">
        <van-swipe class="goods-swipe">
            <van-swipe-item v-for="(thumb,index) in goods.thumb" :key="thumb" @click="ImagePreviews(index)">
                <img :src="thumb" @click="ImagePreviews(index)">
            </van-swipe-item>
        </van-swipe>

        <van-cell-group>
            <van-cell>
                <div class="goods-title">{{ goods.title }}</div>
                <div class="goods-price">{{ formatPrice(goods.price) }}</div>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="10">运费：{{ goods.express }}</van-col>
                <van-col span="14">剩余：{{ goods.remain }}</van-col>
            </van-cell>
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
                <template slot="title">
                    <span class="van-cell-text">有赞的店</span>
                    <van-tag class="goods-tag" type="danger">官方</van-tag>
                </template>
            </van-cell>
            <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
            <van-cell title="查看商品详情" is-link @click="sorry" />
        </van-cell-group>

        <van-goods-action>
            <van-goods-action-mini-btn icon="chat-o" @click="sorry">
                客服
            </van-goods-action-mini-btn>
            <van-goods-action-mini-btn icon="cart-o" @click="onClickCart">
                购物车
            </van-goods-action-mini-btn>
            <van-goods-action-big-btn @click="sorry">
                加入购物车
            </van-goods-action-big-btn>
            <van-goods-action-big-btn primary @click="sorry">
                立即购买
            </van-goods-action-big-btn>
        </van-goods-action>
    </div>
</template>

<script>
    import {ImagePreview} from 'vant'
    export default {
        data() {
            return {
                goods: {
                    title: '美国伽力果（约680g/3个）',
                    price: 2680,
                    express: '免运费',
                    remain: 19,
                    thumb: [
                        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
                        'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
                    ]
                }
            };
        },
        methods: {
            ImagePreviews(id) {
                ImagePreview({images: [
                        'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
                        'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
                    ],
                    startPosition: id,
                    onClose() {
                        // do something
                    }});
            },
            formatPrice() {
                return '¥' + (this.goods.price / 100).toFixed(2);
            },
            onClickCart() {
                this.$router.push('cart');
            },
            sorry() {
                this.$toast('暂无后续逻辑~');
            }
        }
    };
</script>

<style>
    .goods{padding-bottom: 50px;}
    .goods .goods-swipe img{width: 100%;display: block;}
    .goods .goods-title{font-size: 16px;}
    .goods .goods-price{color: #f44;}
    .goods .goods-express{color: #999;font-size: 12px;padding: 5px 15px;}
    .goods .goods-cell-group{margin: 15px 0;}
    .goods .goods-cell-group .van-cell__value{ color: #999;}
    .goods .goods-tag{ margin-left: 5px;}
</style>
