<template>
    <div id="login">
        <div>
            <van-nav-bar title="" left-arrow @click-left="$router.push('/')" :fixed="true" right-text="更多" :border="false"/>
        </div>
        <div class="welcome">
            <img src="../../static/images/welcome.png" alt="">
        </div>
        <div class="login_form" v-if="login">
            <div class="login_item">
                <span>用户名</span><input type="text" placeholder="请输入用户名" v-model="username" @keydown="rules(username,'user')"/>
            </div>
            <div class="login_item">
                <span>密码</span><input type="password" placeholder="请输入密码" v-model="password" @keydown="rules(password,'pass')"/>
            </div>
            <div class="login_sub" @click="user_login">立 即 登 录</div>
            <div style="line-height: 28px;text-align: center;color: #1b1b82;" @click="register">立即注册 | 忘记密码？</div>
        </div>
        <div class="register" v-else>
            <div class="login_item" style="position: relative">
                <span>手机号</span><input type="text" placeholder="请输入手机号" v-model="phone" @keydown="rules(phone,'phone')"/>
                <div class="checkcode" @click="getPhoneCode">{{second>0? second+'秒' : '获取验证码'}}</div>
            </div>
            <div class="login_item">
                <span>验证码</span><input type="password" placeholder="请输入验证码" v-model="password" @keydown="rules(password,'pass')"/>
            </div>
            <div class="login_sub">立 即 注 册</div>
            <div style="line-height: 28px;text-align: center;color: #1b1b82;" @click="backLogin">返回登录 | 忘记密码？</div>
        </div>
    </div>
</template>

<script>
    import {login} from "../api";
    import {mapActions} from 'vuex'
    export default {
        name: "login",
        data(){
            return{
                username:"",
                password:'',
                phone:"",
                login:true,
                second:0,
                path:localStorage['path']
            }
        },
        created(){
            console.log(this.path)
        },
        methods:{
            ...mapActions('userInfo',['userLogin']),
            rules(v,choose){
                if(choose == 'user') {
                    let username = v.trim();
                    let uPattern = /^[a-zA-Z0-9_]{2,12}$/g;

                    if(username.split('').length > 12 ) { return false;}

                    if(!uPattern.test(username)) {
                        this.$toast('请输入2到12位(字母,数字,下划线)')
                    }
                    // console.log(username,v.trim());
                }else if(choose == 'pass') {
                    let password = v.trim();
                    //最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
                    let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
                    if(!pPattern.test(password)) {
                        // this.$toast('密码强度较弱!');
                    }
                }else if ( choose == 'phone') {
                    let phone = v.trim()
                    let hPattern = /^1(3|4|5|7|8)\d{9}$/
                    if(!hPattern.test(phone)){
                        this.$toast('请输入正确手机号!');
                    }
                }
            },
            register(){
                this.login = false
            },
            backLogin(){
                this.login = true
            },
            getPhoneCode(){
                if (this.second>0){
                    this.$toast('验证码已发送，请勿重复获取！')
                    return false
                }
                this.second = 60
                setInterval(()=>{
                    this.second --
                    if(this.second<=0){
                        this.second = 0
                        return
                    }
                    console.log(this.second)
                },1000)

            },
            user_login(){
                let data = {
                    username: this.username,
                    password: this.password
                }
                login(data).then(res=>{
                    console.log(res)
                    if (res.code == 200){
                        localStorage.setItem("token",res.token)
                        if(!localStorage['userInfo']){
                            this.userLogin(res)
                        }else {
                            this.$toast("登录成功！")
                            // this.$router.go(0)
                            this.$router.push(this.path)
                        }
                    }else {
                        // console.log(res)
                        this.$toast(res.text)
                    }
                }).catch(err=>{

                })
            }
        }
    }
</script>

<style scoped>
    #login{background-image: url("../../static/images/login/bg.jpeg");background-size: cover;width:100%;height:100%;background-repeat: no-repeat;position:fixed;z-index:-10;}
    #login .welcome img{width: 100%;padding: 25% 0}
    #login .login_item{margin: 0px 30px 5px 30px;font-size: 14px;border:1px solid #fff;border-radius:25px;}
    #login .login_item span{color: #d6d4d4;width: 4em;display: inline-block;text-align: center}
    #login .login_item input{border: none;padding: 6px 15px 6px 6px;background-color: transparent}
    #login .login_sub{line-height: 28px;text-align: center;color: #fff;;border-radius: 15px;background-color: #717a8c2b;margin: 60px 40px 5px 40px;font-size: 14px;border:1px solid #fff;}
    input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
        transition:background-color 5000s ease-in-out 0s;
        outline:none;
    }
    input{
        background-color:rgba(255,255,255,0.6);
    }
    #login .checkcode{position: absolute;padding: 2px 10px;border-radius: 8px;background-color:#6e92a9 ;font-size: 12px;border: 1px solid #ccc;top:3px;right: 5px}
    .van-nav-bar{background-color: transparent;}
    .van-nav-bar__text,.van-nav-bar,.van-icon{color: white}
</style>
