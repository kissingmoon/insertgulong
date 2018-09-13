<template>
    <parcel>
        <div class="kind-content">
            <div class="kind-title-content">
                <div class="back" @click="close"><i class="icon-arrows-left"></i></div>
                <router-link tag="div" :to="{path:'/service',query:{flag:'customer_service_url'}}"  class="service"><i class="icon-diamond"></i><span>客服</span></router-link>
                <h1 class="title">玩法选择</h1>
            </div>
            <scroll ref="scroll" class="scroll-content" :data="data">
                <div class="kind-wrapper" v-if="$route.query.type != 9">
                    <div class="kind-item" v-for="(item,i) in data" :key="i">
                        <div class="item-title">{{item.name}}</div>
                        <div class="sub-main">
                            <div class="sub" :class="{'currentSub': sub.wf_flag == currentWF}" v-for="(sub,s) in item.wf" @click="selectWf(i,s)" :key="s">
                                {{sub.name}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="kuai3WF" v-else>
                    <div class="item" :class="{'on':item.wf_flag == currentWF}" v-for="(item,index) in newArr" :key="index" @click="selectWf(parseInt(item.parantIndex),parseInt(item.activeIndex))">
                        <p class="name">{{item.name}}</p>
                        <p class="percent">赔率{{item.wf_pl[0].award_money.toFixed(2) }}倍</p>
                        <div class="imgBox">
                            <span v-for="(it,index) in item.datas" :key="index" :class="it.clas" :style="{background:it.bg.background,backgroundSize:it.bg.backgroundSize}"></span>
                        </div>
                    </div>
                </div>
            </scroll>
        </div>
    </parcel>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex';
  import Scroll from 'base/scroll/scroll';
  import Parcel from 'base/parcel/parcel';
  import showCode from 'common/js/showKjCodeByType'

  export default {
    data() {
      return {
          dataArr:[],
          newArr:[],
      }
    },
    props: {
        data:{
            type: [Array,Object,String],
            default: null
        },
        currentWF:{
            type: String,
            default:null
        }
    },
    components:{
        Scroll,
        Parcel
    },
    created(){      
        if(this.$route.query.type == '9'){
            this.makeData();
        }
    },
    mounted() {
        setTimeout(() => {
            this.$refs.scroll.refresh();
        }, 20)
    },
    activated() {
    },
    methods: {
        makeData(){
            this.newArr = [];
            let that = this;
            for (const item in this.data) {
                if(this.data[item].wf.length > 0){
                    for(const it in this.data[item].wf){
                        this.data[item].wf[it].parantIndex = item;
                        this.data[item].wf[it].activeIndex = it;
                        this.newArr.push(this.data[item].wf[it])
                    }
                }
            }
            for(let i = 0; i < this.newArr.length; i++){                
                if(that.newArr[i].name == '三不同和值'){
                    that.newArr[i].datas = showCode([1,1,1],'9')
                }else
                if(that.newArr[i].name == '三不同胆拖'){
                    that.newArr[i].datas = showCode([1,1,1],'9')
                }else
                if(that.newArr[i].name == '三不同标准'){
                    that.newArr[i].datas = showCode([2,3,5],'9')
                }else
                if(that.newArr[i].name == '三连号通选'){
                    that.newArr[i].datas = showCode([1,2,3],'9')
                }else
                if(that.newArr[i].name == '三同号单选'){
                    that.newArr[i].datas = showCode([1,1,1],'9')
                }else
                if(that.newArr[i].name == '三同号通选'){
                    that.newArr[i].datas = showCode([1,1,1],'9')
                }else
                if(that.newArr[i].name == '二不同标准'){
                    that.newArr[i].datas = showCode([1,1,3],'9')
                }else
                if(that.newArr[i].name == '二不同胆拖'){
                    that.newArr[i].datas = showCode([1,4,4],'9')
                }else
                if(that.newArr[i].name == '和值'){
                    that.newArr[i].datas = showCode([1,2,3],'9')
                }
            }
        },
        close(){
            this.$emit('close','wfKindShow');
        },
        selectWf(i,s){
            this.$emit('selectWf',i,s);
        },
    },
  }
</script>

<style scoped lang="scss">
    @import "common/scss/variable.scss";
    @import 'common/scss/mixin.scss';
    .kind-content{
        position: fixed;
        width: 100%;
        top: 0rem;
        bottom: 0rem;
        z-index: 503;
        background-color: #fff;
        .kind-title-content{
            position:relative;
            height:1.2rem;
            line-height: 1.2rem;
            text-align: center;
            color:#fff;
            background-color: #474643;            
            .back{
                position:absolute;
                height:1.2rem;
                line-height: 1.4rem;
                padding: 0 0.5rem 0 0.3rem;
                font-size: 0.52rem;
                font-size: $font-size-large-x;
            }
            .service{
                position:absolute;
                height:1.2rem;
                line-height: 1.35rem;
                font-size:$font-size-large-x;
                padding-right: 0.4rem;
                vertical-align: bottom;
                color:$color-yellow;
                right: 0;
                span{
                    font-size:$font-size-small-x;
                }
            }
            .title{
                display: inline-block;
                height:1.2rem;
                line-height: 1.2rem;
                vertical-align: top;
                padding: 0 2.4rem;
                font-size: $font-size-large-m;
                @include no-wrap();
            }
        }
        .scroll-content{
            height:calc( 100% - 1.2rem);
            overflow: hidden;
            .kind-wrapper{
                height:auto;
                overflow: hidden;
                .kind-item{
                    height:auto;
                    overflow: hidden;
                    color: #454545;
                    .item-title{
                        height:0.8rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background: #F1F1F1;
                    }
                    .sub-main{
                        height:auto;
                        overflow: hidden;
                        padding-left:0.3rem;
                        .sub{
                            float: left;
                            margin:0.3rem 0.3rem 0.3rem 0;
                            height:0.9rem;
                            width:2.87rem;
                            color: $color-red;
                            line-height: 0.9rem;
                            text-align: center;
                            overflow: hidden;
                            border:1px solid #d2d2d2;
                            border-radius: 0.8rem;
                        }
                        .currentSub{
                            color: #fff;
                            border-color: $color-red;
                            background-color: $color-red;    
                        }
                    }
                }
            }
            .kuai3WF{
                position: absolute;
                left:0;
                right: 0;
                top: 0;
                bottom: 0;
                padding: .3rem .5rem;
                font-size: 0;
                @include bg-image('greenbg');
                .item{
                    display: inline-block;
                    width: 2.6rem;
                    height: 2.6rem;
                    border: 1px solid #A6DFC6;
                    border-radius: .2rem;
                    box-sizing: border-box;
                    margin-right: .59rem;
                    margin-bottom: .3rem;
                    font-size: .3rem;
                    padding: .32rem .1rem;
                    vertical-align: top;
                    &.on{
                        border-color: #DEC233;
                        .name{
                            color: #DEC233;
                        }
                        .percent{
                            color: #fff;
                        }
                    }
                    &:nth-child(3n){
                        margin-right: 0;
                    }
                    >p{
                        text-align: center;
                    }
                    .name{
                        font-size: .4rem;
                        color: #fff;
                    }
                    .percent{
                        font-size: .3rem;
                        color: #0B4426;
                        margin-top: .3rem;
                    }
                    .imgBox{
                        margin-top: .34rem;
                        text-align: center;
                        >span{
                            display: inline-block;
                            width: .5rem;
                            height: .5rem;
                            margin-right: .31rem;
                            &:last-child{
                                margin-right: 0;
                            }
                        }
                    }
                }
            }
        }
    }

</style>