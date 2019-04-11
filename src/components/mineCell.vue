<template>
    <van-row style="border-bottom: 2px solid #f9f9f9">
        <van-col span="3" v-if="icon">
            <div class="mine_slide">
                <van-icon :name="icon" style="margin-top: 13px"></van-icon>
            </div>
        </van-col>
        <van-col span="18"  v-if="icon">
            <div class="mine_slide" style="text-align: left;color: grey">
                {{title}}
            </div>
        </van-col>
        <van-col span="21" v-if="!icon">
            <div class="mine_slide" style="text-align: left;color: grey;text-indent:15px">
                {{title}}
            </div>
        </van-col>
        <van-col span="3" v-if="icon">
            <div class="mine_slide">
                <van-icon name="arrow" style="margin-top: 13px"></van-icon>
            </div>
        </van-col>
        <van-col span="3" v-if="!icon">
            <div class="mine_slide">
                <van-icon name="arrow" style="margin-top: 13px"></van-icon>
            </div>
        </van-col>
    </van-row>
</template>

<script>
    export default {
        name: "mineCell",
        props:['title','icon']
    }
</script>

<style scoped>
.mine_slide{height: 40px ;line-height: 40px;text-align: right;padding-right: 15px}
</style>
