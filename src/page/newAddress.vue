<template>
    <div id="addAddress">
        <div>
            <van-nav-bar title="" left-arrow @click-left="$router.back()" :fixed="true" :border="true" :title="title"/>
        </div>
        <div class="address_detail">
            <van-address-edit
                    :address-info="addressInfo"
                    :area-list="areaList"
                    show-postal
                    show-set-default
                    :show-delete="show_delete"
                    @save="onSave"
                    @delete="onDelete"
                    @change-default="changeChoose"
            />
        </div>
    </div>
</template>

<script>
    import areaList from'../until/area'
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "newAddress",
        data() {
            return {
                areaList,
                show_delete:false,
                searchResult: [],
                num:this.$route.params.num,
                type:this.$route.params.type,
                addressInfo:{},
                title:''
            }
        },
        computed:{
            ...mapState('collection',['mineAddressList'])
        },
        created(){
            if (this.type == 'creat'){
                this.addressInfo = {}
                this.title = '新增收货地址'
                this.show_delete = false
            }else if (this.type == 'edit') {
                // console.log(this.num);
                this.addressInfo = this.mineAddressList[this.num]
                this.title = '编辑收货地址'
                this.show_delete = true
            }
            // console.log(this.num);
            // console.log(this.type);
        },
        methods: {
            ...mapActions('collection',['addMineAddress','editMineAddress','delAddress']),
            onSave(content) {
               if (this.type == 'creat'){
                   this.addMineAddress(content)
                   this.$toast('地址保存成功！');
                   this.$router.back()
               } else if (this.type == 'edit'){
                   // console.log(content)
                   this.editMineAddress({"id":this.num,"item":content})
                   this.$toast('地址修改成功！');
                   this.$router.back()
               }
            },
            onDelete() {
                this.delAddress(this.num)
                this.$toast('删除成功');
                this.$router.back()
            },
            //改变默认地址
            changeChoose(value){
                console.log(value)
            }
        }
    }
</script>

<style scoped>
#addAddress{padding-top: 46px}

</style>
