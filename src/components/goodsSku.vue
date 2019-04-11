<template>
    <div>
        <van-sku
                v-model="showSku"
                :sku="sku"
                :goods="goods"
                :goods-id="goodsId"
                :hide-stock="sku.hide_stock"
                :quota="quota"
                :quota-used="quotaUsed"
                :reset-stepper-on-hide="resetStepperOnHide"
                :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
                :close-on-click-overlay="closeOnClickOverlay"
                :disable-stepper-input="disableStepperInput"
                @buy-clicked="onBuyClicked"
                @add-cart="onAddCartClicked"
        />
        <!--<img src="../../static/images/lunbo/01" alt="">-->
    </div>
</template>

<script>
    export default {
        name: "goodsSku",
        data() {
            return {
                // showSku:true,
                sku: {
                    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                    // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                    tree: [
                        {
                            k: '颜色', // skuKeyName：规格类目名称
                            v: [
                                {
                                    id: '30349', // skuValueId：规格值 id
                                    name: '白色', // skuValueName：规格值名称
                                    imgUrl: '../../static/images/wx/wx_01.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                                },
                                {
                                    id: '1215',
                                    name: '黑色',
                                    imgUrl: '../../static/images/wx/wx_02.jpg'
                                }
                            ],
                            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        },
                        {
                            k: '尺码', // skuKeyName：规格类目名称
                            v: [
                                {
                                    id: '0000', // skuValueId：规格值 id
                                    name: '39', // skuValueName：规格值名称
                                    // imgUrl: '../../static/images/lunbo/01.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                                },
                                {
                                    id: '0001',
                                    name: '40',
                                    // imgUrl: '../../static/images/lunbo/01.jpg'
                                }
                            ],
                            k_s: 's2' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                        }
                    ],
                    // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                    list: [
                        {
                            id: 30349, // skuId，下单时后端需要
                            price: 50900, // 价格（单位分）
                            s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '0000', // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 50 // 当前 sku 组合对应的库存
                        },
                        {
                            id: 1215, // skuId，下单时后端需要
                            price: 50900, // 价格（单位分）
                            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '0001', // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 99 // 当前 sku 组合对应的库存
                        },
                        {
                            id: 30349, // skuId，下单时后端需要
                            price: 50900, // 价格（单位分）
                            s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '0001', // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 0 // 当前 sku 组合对应的库存
                        },
                        {
                            id: 1215, // skuId，下单时后端需要
                            price: 50900, // 价格（单位分）
                            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                            s2: '0000', // 规格类目 k_s 为 s2 的对应规格值 id
                            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                            stock_num: 0 // 当前 sku 组合对应的库存
                        }
                    ],
                    price: '509.00', // 默认价格（单位元）
                    stock_num: 227, // 商品总库存
                    collection_id: 1215, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                    none_sku: false, // 是否无规格商品

                    // 留言配置信息
                    // messages: [
                    //     {
                    //         // 商品留言
                    //         datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                    //         multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                    //         name: '留言', // 留言名称
                    //         type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                    //         required: '0' // 是否必填 '1' 表示必填
                    //     }
                    // ],

                    hide_stock: false // 是否隐藏剩余库存
                },

                goods: {
                    // 商品标题
                    title: '测试商品',
                    // 默认商品 sku 缩略图
                    picture: '../../static/images/wx/wx_01.jpg'
                },

                // 添加购物车和点击购买回调函数接收的 skuData 对象结构
                skuData: {
                    // 商品 id
                    goodsId: '946755',
                    // 留言信息
                    messages: {
                        message_0: '12',
                        message_1: ''
                    },
                    // 另一种格式的留言，key 不同
                    cartMessages: {
                        '留言1': 'xxxx',
                        '留言1': 'xxxx',
                        '留言1': 'xxxx',
                        '留言1': 'xxxx',
                        '留言1': 'xxxx'
                    },
                    // 选择的商品数量
                    selectedNum: 1,
                    // 选择的 sku 组合
                    selectedSkuComb: {
                        id: 2257,
                        price: 100,
                        s1: '30349',
                        s2: '1193',
                        s3: '0',
                        stock_num: 111
                    }
                },

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
                goodsId: '946755',
                quota:0,//限购件数 0代表不限购
                quotaUsed:0,//已购买件数
                resetStepperOnHide:false,//隐藏时重置选择的商品数量
                resetSelectedSkuOnHide:false,//隐藏时重置已选择的 sku
                closeOnClickOverlay:true,//是否在点击蒙层后关闭
                disableStepperInput:false,//是否禁用步进器输入,
            }
        },
        methods:{
            onBuyClicked(){

            },
            onAddCartClicked(){

            }
        },
        props:{
            showSku:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style scoped>

</style>
