<template>
    <div class="totalwapper">
        <div class="topwapper">
        </div>
        <div class="bottomtip">
            <p><span class="cha" @click="closeself"> <img src="./Combined-Shape@3x.png" style="width:130%;height:130%" alt=""></span><span class="title">温馨提示</span></p>
            <p style="position:relative;top:7px;">为保证您正常充值,请打开箭头指示的按钮跳到外部</p>
            <p style="position:relative;top:9px;"><span class="zhinanzhen"> <img src="./zhinanzhen.png" alt=""></span>浏览器打开</p>
            <p style="height:1rem;"><span class="jiantou"> <img src="./jiantou@2x.png" alt=""></span></p>
        </div>
    </div>
    
</template>
<script>
export default {
    data (){
        return {
            myShakeEvent:'',
            randomList:false,
            selectObjList:false,
            randomPos:false,
            selectObj:false,
            showbtn:true,
            showmodel:false
        }
    },
    methods: {
        closeself(){
            this.$emit('closebtip')
        }
    }
}
</script>
<style scoped lang="scss">
    @import 'common/scss/variable.scss';
    @import 'common/scss/mixin.scss';
    .totalwapper{
         position: relative;
    }
    .topwapper{
        position: fixed;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        background: lightgray;
        opacity: 0.5;
        filter:alpha(opacity=50);
    }
    .bottomtip{
        position: fixed;
        background: #ffffff;
        bottom: 0;
        width: 100vw;
        p{
            font-size: 0.4rem;
            padding: 3px 0;
        }
        img{
            width: 100%;
            height: 100%;
            display:inline-block;
        }
        .cha{
          display:inline-block;
          width: 0.6rem;
          height: 0.6rem;
          //@include bg-image('Combined-Shape');
          background-repeat: no-repeat;
          float: left;
        }
        .title{
            font-size: 0.6rem;
            font-weight: 550;
        position: relative;
           top:0.1rem;
        }
        .zhinanzhen{
            display:inline-block;
          width: 0.5rem;
          height: 0.5rem;
          //@include bg-image('zhinanzhen');
          background-repeat: no-repeat;
          vertical-align: middle;
        }
        .jiantou{
          display:inline-block;
          width: 1.3rem;
          height: 1.3rem;
          //@include bg-image('jiantou');
          background-repeat: no-repeat;
          position: relative;
          top: -0.1rem;
          left: -0.7rem;
        }
    }
    .bottomtip p{
        text-align: center;
    }
</style>


