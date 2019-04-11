<template>
    <div id="setting">
        <div>
            <van-nav-bar title="" left-arrow @click-left="$router.back()" :fixed="true" :border="true" title="个人设置"/>
        </div>
        <div>
            <div class="author_icon">
                <img :src="userInfo.icon" alt=""/>
                <span>{{userInfo.name}}</span>
                <span style="position: absolute;position: absolute;top: 0px;right: 60px;">
                    <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
                        <van-icon name="photograph" />
                    </van-uploader>
                </span>
                <span  style="float: right;padding-right: 15px">
                    <van-icon name="arrow"></van-icon>
                </span>
            </div>
            <mineCell title="账户与安全"></mineCell>
            <mineCell title="隐私"></mineCell>
            <mineCell title="通用"></mineCell>
            <mineCell title="关于我们"></mineCell>
            <div class="exit">
                <div class="btn_exit" @click="exit_login">退出登录</div>
            </div>
        </div>
    </div>
</template>

<script>
    import mineCell from '../components/mineCell'
    import {mapState,mapGetters,mapActions} from 'vuex'
    export default {
        name: "setting",
        components:{
            mineCell
        },
        data(){
            return{
                flag:localStorage['token'],
                show:false,
                userInfo:JSON.parse(localStorage['userInfo']),
            }
        },
        computed:{
            // ...mapState('userInfo',['userInfo'])
        },
        created(){
            console.log(this.userInfo)
           if (!this.flag){
               localStorage.setItem('path','/mine')
               this.$router.push({
                   name:'Login',
               })
           }
        },
        methods:{
            ...mapActions('userInfo',['userLogin','loginOut']),
            onRead(file, detail) {
                // this.$toast(detail.name);
                // console.log(file.content)
                if (file.content){
                    // this.changeIcon(file.content)
                    this.userInfo.icon = file.content
                    this.userLogin(this.userInfo)
                    this.$toast('更换头像成功!')
                }
            },
            exit_login(){
                this.$dialog.confirm({
                    title: '',
                    message: '确认退出登录吗？'
                }).then(() => {
                    this.loginOut()
                    this.$toast('退出登录成功!')
                    this.$router.go(0)
                }).catch(() => {
                    // on cancel
                });
            }
        }
    }
</script>

<style scoped>
#setting{padding-top: 46px;}
#setting .exit{padding:10% 5%;}
#setting .exit .btn_exit{background:-webkit-gradient(linear,left top, right top,from(#eb9c42),to(#e8632d));color: white;text-align: center;line-height: 36px;border-radius: 20px}
#setting .author_icon *{display:inline-block;vertical-align: middle;line-height:70px;}
#setting .author_icon {border-bottom: 2px solid rgb(249, 249, 249);padding-left: 12px;position: relative}
#setting .author_icon img{width: 45px;height: 45px;border-radius: 50%}
</style>
