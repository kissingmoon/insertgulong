<template>
    <div class="draw-his-content">
        <div class="draw-his-background" @click="close"></div>
        <div class="draw-his-main">
            <div class="his-title-wrapper border-bottom-1px">
                <div class="title">
                    <i class="icon-clock-01 clock-01"></i>
                    <span class="txt">历史开奖</span>
                </div>
                <div class="close" @click="close">
                    <i class="icon-arrows-below"></i>
                </div>
            </div>
            <scroll class="draw-his-wrapper clearfix" :data="data">
                <ul>
                    <li class="item-wrapper border-bottom-1px" v-for="(item,i) in data" @click="goto(item.lottery_id,item.lottery_name)" :key="i">
                        <div class="period-num">{{item.lottery_qh}}期</div>
                        <div class="draw-num">
                            <span v-for="(num,k) in item.kj_code" :key="k">{{num}}</span>
                        </div>
                    </li>
                </ul>
            </scroll>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex';
  import Scroll from 'base/scroll/scroll';

  export default {
    props: {
        data:{
            type: [Array,Object,String],
            default: null
        }
    },
    components:{
        Scroll
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    activated() {
    },
    methods: {
        close(){
            this.$emit('close','drawHistoryShow');
        },
        goto(id,name){
            this.$router.push({
                path:'/draw/number',
                query:{id , name}
            })
        }
        
    }
  }
</script>

<style scoped lang="scss">
    @import "common/scss/variable.scss";
    @import 'common/scss/mixin.scss';
    .draw-his-background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 5000;
        background:$color-bg-shade-a5;
    }
    .draw-his-main{
        position:fixed;
        z-index:5001;
        width:100%;
        height:60%;
        overflow: hidden;
        bottom:0;
        background:#fff;
        .his-title-wrapper{
            position:relative;
            height:1.2rem;
            text-align: center;
            line-height: 1.2rem;
            padding-left:0.3rem;
            background: #eeecec;
            @include border-bottom-1px(solid,#f2f2f2);
            .title{
                float: left;
                display: flex;
                font-size: $font-size-large;
                color:#B35859;
                .clock-01{
                    line-height: 1.15rem;
                    padding-right: 0.1rem;
                    font-size: $font-size-large-x;
                }
            }
            .close{
                float: right;
                padding:0 0.5rem;
                color:#B35859;
                font-size: $font-size-large-x;
                height:1.2rem;
                overflow: hidden;
            }
        }
        .draw-his-wrapper{
            height:calc( 100% - 1.2rem);
            overflow: hidden;
            .item-wrapper{
                display: flex;
                height:auto;
                line-height: 0.4rem;
                overflow: hidden;
                padding: 0.2rem 0.3rem;
                @include border-bottom-1px(solid,#f2f2f2);
                font-size: $font-size-small-x;
                color:#403F3D;
                .period-num{
                    flex:2;
                    padding-right: 0.4rem;
                }
                .draw-num{
                    flex: 5;
                    span{
                        padding-right: 0.24rem;
                    }
                }
            }
        }
        
    }

</style>