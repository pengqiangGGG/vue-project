

//添加一个mock规则
const Mock = require('mockjs')


//获取mock.random对象
const Random = Mock.Random


// mock一组数据
const produceNewsData  = function () {
    let articles = [];
    for (let i = 0; i < 100; i++) {
        let newArticleObject = {
            id:i,
            title: Random.csentence(5, 15), //  Random.csentence( min, max )标题描述
            text: Random.csentence(50, 80), //  Random.csentence( min, max )内容描述
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            author_icon: Random.dataImage('50x50', 'mock的图片'),//随机生成一个用户头像
            watch: Random.natural(100,3000),//随机生成一个浏览次数
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }
    return{
        articles: articles
    }
}

//mock用户登录
const userLogin = function(data){
    if (data.username == 'admin' && parseInt(data.password) == 123456){
        let userInfo = {
            code:200,
            name:"小明",
            icon:Random.dataImage('120x120', 'mock的图片'),
            level:Random.natural(10,50),
            fans:Random.natural(1000,2000),
            concern:Random.natural(10,20),
            collect:Random.natural(10,100),
            shop:Random.natural(50,100),
            coupon:Random.natural(100,200),
            token:"#13216546465",
        }
        return userInfo
    }else{
        let userInfo = {
            code:400,
            text: "密码错误！"
        }
        return userInfo
    }
}

//mock 运动会场商品列表的数据
const goodsList = function () {
    let list = []
    for (let i = 0;i < 50; i++){
        let newgoodsList = {
            id:i,
            shopName:Random.csentence(5, 8).replace('。','')+'店',
            select:false,
            src: Random.dataImage('260x320', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            title: Random.csentence(5, 10), //  Random.csentence( min, max )标题描述
            price:Random.natural(500,600),//随机生成一个价格
            oldPrice:Random.natural(700,800),//随机生成一个原价格
            sell_num:Random.natural(2000,3000),//随机生成一个月销量
            good_address: Random.csentence(2, 4),//商品产地
            good_point:Random.natural(50,80),//随机生成商品购买可得积分
            coupon_list:[         //优惠券数组
                {
                    price: 5, //优惠券数值
                    use_price: 60, //优惠券满减数值
                    use_time: Random.date() + ' ' + Random.time()//优惠券数组, //优惠券到期时间
                },
                {
                    price: 10, //优惠券数值
                    use_price: 100, //优惠券满减数值
                    use_time: Random.date() + ' ' + Random.time()//优惠券数组, //优惠券到期时间
                },
                {
                    price: 20, //优惠券数值
                    use_price: 200, //优惠券满减数值
                    use_time: Random.date() + ' ' + Random.time()//优惠券数组, //优惠券到期时间
                },
                {
                    price: 50, //优惠券数值
                    use_price: 400, //优惠券满减数值
                    use_time: Random.date() + ' ' + Random.time()//优惠券数组, //优惠券到期时间
                },
                {
                    price: 70, //优惠券数值
                    use_price: 500, //优惠券满减数值
                    use_time: Random.date() + ' ' + Random.time()//优惠券数组, //优惠券到期时间
                },
            ],
            goods_help:[                //商品可提供服务
                {
                    icon:'like',
                    help_title:Random.csentence(2, 4),
                    help_text:Random.csentence(5, 10)
                },
                {
                    icon:'fire',
                    help_title:Random.csentence(2, 4),
                    help_text:Random.csentence(5, 10)
                },
                {
                    icon:'star',
                    help_title:Random.csentence(2, 4),
                    help_text:Random.csentence(5, 10)
                },
                {
                    icon:'cart',
                    help_title:Random.csentence(2, 4),
                    help_text:Random.csentence(5, 10)
                },
                {
                    icon:'setting',
                    help_title:Random.csentence(2, 4),
                    help_text:Random.csentence(5, 10)
                },
                {
                    icon:'bag',
                    help_title:Random.csentence(2, 4),
                    help_text:Random.csentence(5, 10)
                },
                {
                    icon:'question',
                    help_title:Random.csentence(2, 4),
                    help_text:Random.csentence(5, 10)
                },
                {
                    icon:'bookmark',
                    help_title:Random.csentence(2, 4),
                    help_text:Random.csentence(5, 10)
                }
            ],
            goods_param:[    //品牌材质
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
                {
                    name:Random.csentence(1, 4),
                    value:Random.csentence(4, 10)
                },
            ],
            sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [
                    {
                        k: '颜色', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: 30349, // skuValueId：规格值 id
                                name:Random.csentence(1, 3), // skuValueName：规格值名称
                                imgUrl: Random.dataImage('260x380', 'mock的图片') // 规格类目图片，只有第一个规格类目可以定义图片
                            },
                            {
                                id: 1215,
                                name: Random.csentence(1, 3),
                                imgUrl: Random.dataImage('260x380', 'mock的图片')
                            }
                        ],
                        k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    },
                    {
                        k: '尺码', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: '0000', // skuValueId：规格值 id
                                name: Random.natural(1,50), // skuValueName：规格值名称
                                // imgUrl: '../../static/images/wx/wx_03.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                            },
                            {
                                id: '0001',
                                name:Random.natural(1,50),
                                // imgUrl: '../../static/images/wx/wx_04.jpg'
                            }
                        ],
                        k_s: 's2' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    }
                ],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                list: [
                    {
                        id: 30349, // skuId，下单时后端需要
                        price: Random.natural(1,500)*100, // 价格（单位分）
                        s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '0000', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: Random.natural(1,500) // 当前 sku 组合对应的库存
                    },
                    {
                        id: 1215, // skuId，下单时后端需要
                        price: Random.natural(1,500)*100, // 价格（单位分）
                        s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '0001', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: Random.natural(1,500) // 当前 sku 组合对应的库存
                    },
                    {
                        id: 30349, // skuId，下单时后端需要
                        price: Random.natural(1,500)*100, // 价格（单位分）
                        s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '0001', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: Random.natural(1,500) // 当前 sku 组合对应的库存
                    },
                    {
                        id: 1215, // skuId，下单时后端需要
                        price: Random.natural(1,500)*100, // 价格（单位分）
                        s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '0000', // 规格类目 k_s 为 s2 的对应规格值 id
                        s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                        stock_num: Random.natural(1,500) // 当前 sku 组合对应的库存
                    }
                ],
                price: '509.00', // 默认价格（单位元）
                stock_num: Random.natural(400,500), // 商品总库存
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
                goodsId: Random.natural(1,500),
                quota:0,//限购件数 0代表不限购
                quotaUsed:0,//已购买件数
                // 商品标题
                title: Random.csentence(1, 3),
                // 默认商品 sku 缩略图
                picture: Random.dataImage('260x380', 'mock的图片')
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
            commend:{
                shop_commend:[
                    {
                        pic:Random.dataImage('98x98', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('98x98', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('98x98', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('98x98', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('98x98', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('98x98', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                ],
                like_commend:[
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },
                    {
                        pic:Random.dataImage('260x380', 'mock的图片'),
                        title: Random.csentence(12, 15),
                        price:Random.natural(50,80)
                    },

                ]
            },
            main_pic:[
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片')],
            detail_pic:[
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片'),
                Random.dataImage('260x380', 'mock的图片')
            ]

        }
        list.push(newgoodsList)
    }
    return{
        list:list
    }
}


//mock热门搜索的数组
const searchHot = function(){
    let hotList = [
        "羽绒服","围巾","面膜","护肤","运动鞋","卫衣","T恤"
    ]
    return hotList
}



// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData); //activity接口
Mock.mock('/user/login', 'post', (options)=>{ //登录接口
    // console.log(options.body)
    let data = JSON.parse(options.body)
    // console.log(data)
    return userLogin(data)
});
Mock.mock('/search/hot', 'get', searchHot);
Mock.mock('/goods/sport', 'get', goodsList);
