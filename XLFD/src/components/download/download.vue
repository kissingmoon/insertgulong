<!-- 下载页 -->
<template>
    <div class="wrap">
        <div class="logo"></div>
        <div class="btns">
            <a class="androidBtn" href="" download="">
                <span class="icon iosIco"></span><em>iphone下载</em>
            </a>
            <a class="iosBtn" href="" download="">
                <span class="icon androidIco"></span><em>Android下载</em>
            </a>
        </di>
        <div class="foot"></div>
    </div>
</template>

<script>
 export default {
    name:'',
    data () {
        return {
        };
    },

    computed: {},
    methods: {},
    components: {},
}
</script>

<style lang='scss' scoped>
    .wrap{
        overflow: hidden;
        font-size: .16rem;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        .logo{
            width: 1.08rem;
            height: 1.46rem;
            margin: .95rem auto 1.32rem;
            background: url("./img/logo.png") no-repeat;
            background-size: cover;
        }
        .btns >a{
            display: block;
            width: 2.1rem;
            height: .46rem;
            margin: 0 auto .26rem;
            border-radius: .04rem;
            padding: .09rem 0;
            border: 1px solid #979797;
            box-sizing: border-box;
        }
        .btns >div >em{
            vertical-align: middle;
        }
        .icon{
            display: inline-block;
            width: .28rem;
            height: .28rem;
            margin-right: .18rem;
            margin-left: .4rem;
            
            vertical-align: middle;            
        }
        .iosIco{
            background: url("./img/ios.png") no-repeat;
            background-size: cover;
        }
        .androidIco{
            background: url("./img/android.png") no-repeat;
            background-size: cover;
        }
        .foot{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 1.26rem;
            background: url("./img/foot.png") no-repeat;
            background-size: cover;
        }
    }
        
</style>