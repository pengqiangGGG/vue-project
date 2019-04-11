<template>
    <div id="site">
        <div>
            <van-nav-bar title="" left-arrow @click-left="$router.back()" :fixed="true" :border="true" title="收货地址" right-text="添加新地址" @click-right="addAddressList()"/>
        </div>

        <div class="address_list" v-for="(item,index) in mineAddressList" :key="index">
            <van-row>
                <van-col span="3">
                    <div class="first_name">{{item.name.slice(0,1)}}</div>
                </van-col>
                <van-col span="18">
                    <div class="all_address">
                        <strong>{{item.name}}</strong> <span class="address_phone">{{item.tel}}</span>
                        <p><span class="default_address" v-if="item.isDefault">默认</span> {{item.province+' '+item.city+' '+item.county+' '+item.addressDetail}}</p>
                    </div>
                </van-col>
                <van-col span="3">
                    <div class="address_edit" @click="editAddressList(index)">编辑</div>
                </van-col>
            </van-row>
        </div>

    </div>
</template>

<script>
    import {mapState,mapGetters,mapActions,mapMutations} from'vuex'
    export default {
        name: "site",
        data(){
            return{
                show:false,
                chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        address: '浙江省杭州市拱墅区莫干山路 50 号'
                    }
                ],
            }
        },
        created(){
            // localStorage.removeItem('mineAddressList')
            console.log(this.mineAddressList)
        },
        computed:{
            ...mapState('collection',['mineAddressList']),
        },
        methods:{
            addAddressList(){
                this.$router.push({
                    name:'NewAddress',
                    params:{
                        type:'creat'
                    }
                })
            },
            editAddressList(id){
                this.$router.push({
                    name:'NewAddress',
                    params:{
                        type:'edit',
                        num:id
                    }
                })
            }
        }
    }
</script>

<style scoped>
#site{padding-top: 46px}
#site .address_list{padding:10px 0}
#site .address_list .first_name{width: 30px;height: 30px;border-radius: 50%;background-color: lightgray;text-align: center;line-height: 30px;color: white;margin-top: 6px;margin-left: 5px}
#site .address_list .address_edit{font-size: 12px;color: grey;height: 24px;line-height: 24px;margin-top: 12px;text-align: center;border-left: 1px solid lightgray}
#site .address_list strong{font-size: 13px}
#site .address_list .address_phone{color: grey;margin-left: 10px}
#site .address_list .default_address{color: orangered;background-color: blanchedalmond;padding: 0 4px}
#site .address_list .all_address{padding: 0 5px}
</style>
