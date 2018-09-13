<template>
    <div class="draw-his-content">
        <div class="draw-his-background" @click="close"></div>
        <div class="draw-his-main" :style='lotteryType==9&&k3Style'>
            <div class="his-title-wrapper border-bottom-1px" >
                <div class="title" >
                    <i class="icon-clock-01 clock-01" :style='lotteryType==9&&k3Color' ></i>
                    <span class="txt" :style='lotteryType==9&&k3Color' >历史开奖</span>
                </div>
                <div class="close" @click="close">
                    <i class="icon-arrows-below" :style='lotteryType==9&&k3Color' ></i>
                </div>                
            </div>
            <div class="tit" v-if="lotteryType!=9"><span>期数</span><em>开奖号码</em></div>
            <div class="tit-k3 flex" v-if="lotteryType==9" >
                <span class="flex-2 flex flex-center">期数</span>
                <span class="flex-2 flex flex-center">开奖号码</span>
                <span class="flex-1 flex flex-center">和值</span>
                <span class="flex-1 flex flex-center">大小</span>
                <span class="flex-1 flex flex-center">单双</span>
            </div>
            <scroll class="draw-his-wrapper clearfix" :data="data">
                <!-- <ul>
                    <li class="item-wrapper border-bottom-1px" v-for="(item,i) in data" @click="goto(item.lottery_id,item.lottery_name,lotteryType)" :key="i">
                        <div class="period-num">{{item.lottery_qh}}期</div>
                        <div class="draw-num">
                            <span v-for="(num,k) in item.kj_code" :key="k">{{num}}</span>
                        </div>
                    </li>
                </ul> -->
                <ul v-if="lotteryType!=9">
                    <li class="item-wrapper border-bottom-1px" v-for="(item,i) in trueList" @click="goto(item.lottery_id,item.lottery_name,lotteryType)" :key="i">
                        <div class="period-num">{{item.lottery_qh}}期</div>
                        <div class="draw-num">
                            <span v-for="(num,k) in item.kj_code" :key="k" :class="num.clas" :style="num.bg">{{num.val}}</span>
                        </div>
                    </li>
                </ul>
                <ul v-if="lotteryType==9">
                    <li class="item-k3-wrapper flex" v-for="(item,i) in trueList" @click="goto(item.lottery_id,item.lottery_name,lotteryType)" :key="i">
                        <div class="draw-k3-num flex-2  flex flex-center">{{item.lottery_qh}}期</div>
                        
                        <i class="tit-k3-shu"></i>
                        <div class="draw-k3-num flex-2  flex flex-center">
                            <span v-for="(num,k) in item.kj_code" :key="k" :class="num.clas" :style="num.bg"></span>
                        </div>
                        <div class="draw-k3-num flex-1 flex flex-center">
                            <span>{{judge(item.kj_code).total}}</span>
                        </div>
                        <div class="draw-k3-num flex-1 flex flex-center">
                            <span>{{judge(item.kj_code).daxiao}}</span>
                        </div>
                        <div class="draw-k3-num flex-1 flex flex-center">
                            <span>{{judge(item.kj_code).danshuang}}</span>
                        </div>
                    </li>
                </ul>
                <div class="more">查看更多</div>
            </scroll>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll';
  import showKjCodeByType from 'common/js/showKjCodeByType.js'
  import {mapMutations,mapActions,mapGetters} from 'vuex';

  export default {
    props: {
        data:{
            type: [Array,Object,String],
            default: null
        },
        lotteryType:{
            type:String,
            default: ""
        }
    },
    components:{
        Scroll
    },
    data() {
      return {
          trueList:[],
          k3Style:{
              background:'#257953'
          },
          k3Color:{
              color:'#ffffff'
          }
              
      }
    },
    mounted() {
        if(this.data){
            var tempList=[]
            this.data.map((v,k)=>{
                tempList[k]=v;
                tempList[k].kj_code=showKjCodeByType(v.kj_code,this.lotteryType,this.xglhc_color)
                //tempList[k].kj_code=showKjCodeByType(v.kj_code,this.lotteryType,this.xglhc_color)
            })
            this.trueList=tempList.concat();
            //this.trueList=showKjCodeByType(this.data,this.lotteryType,this.xglhc_color)
            
        }
    },
    computed:{
        ...mapGetters([
            'xglhc_color'
        ])
    },
    activated() {
    },
    methods: {
        close(){
            this.$emit('close','drawHistoryShow');
        },
        goto(id,name,lotteryType){
            this.$router.push({
                path:'/draw/number',
                query:{id , name,type:lotteryType}
            })
        },
        judge(list){
            console.log(list)
            var returnObj={
                total:0,
                danshuang:"单",
                daxiao:"小"
            }
            list.map((v,k)=>{
                returnObj.total+=v.value
            })
            if(returnObj.total%2==0){
                returnObj.danshuang="双"
            }
            if(returnObj.total>=11){
                returnObj.daxiao="大"
            }
            return returnObj
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
            .title{
                float: left;
                display: flex;
                font-size: $font-size-large;
                color:$color-red ;
                .clock-01{
                    line-height: 1.15rem;
                    padding-right: 0.1rem;
                    font-size: $font-size-large-x;
                }
            }
            .close{
                float: right;
                padding:0 0.5rem;
                color:$color-red;
                font-size: $font-size-large-x;
                height:1.2rem;
                overflow: hidden;
            }
        }
        .tit{
            display: flex;
            font-size:100%;
            color: #727272;
            line-height: .6rem;
            @include border-bottom-1px(solid,#D8D8D8);
            @include border-top-1px(solid,#D8D8D8);
           
            span{
                flex: 2;
                text-align: center;
                padding-right: .4rem;
            }
            em{
                flex: 5;
                font-style: normal;
                text-indent: 1.6rem;
            }
        }
        .tit-k3{
            font-size:100%;
            color: #C0FFE2;
            line-height: .6rem;
            @include border-bottom-1px(solid,#106438);
            @include border-top-1px(solid,#106438);
        }
        .draw-his-wrapper{
            height:calc( 100% - 1.8rem);    
            overflow: hidden;
            .item-wrapper{
                display: flex;
                height:auto;
                line-height: 0.6rem;
                overflow: hidden;
                padding: 0.1rem 0.3rem;
                @include border-bottom-1px(solid,#f2f2f2);
                font-size: $font-size-small-x;
                color:#403F3D;
                .period-num{
                    flex:2.5;
                    padding-right: 0.4rem;
                }
                .draw-num{
                    flex: 5;
                    .last-draw-ssc{
                        display: inline-block;
                        width: 0.5rem;
                        height: 0.5rem;
                        margin: 0 0.1rem;
                        border-radius: 50%;
                        font-size: 0.3rem;
                        color: #ffffff;
                        line-height: 0.5rem;
                        text-align: center;
                        background: $color-red ;
                    }
                    
                    .last-draw-11x5{
                        display: inline-block;
                        width: 0.5rem;
                        height: 0.5rem;
                        margin: 0 0.1rem;
                        font-size: 0.3rem;
                        border-radius: 50%;
                        color: #ffffff;
                        line-height: 0.5rem;
                        background: #DA1C36;
                        text-align: center;
                    }
                    .last-draw-xy28{
                        display: inline-block;
                        width: 0.5rem;
                        height: 0.5rem;
                        margin: 0 0.1rem;
                        line-height: 0.5rem;
                        margin-left: 0.2rem;
                        font-size: 0.4rem;
                        border-radius: 50%;
                        color: #ffffff;
                         background: #DA1C36;
                        text-align: center;
                    }
                    .last-draw-lhc{
                        display: inline-block;
                        width: 0.5rem;
                        height: 0.5rem;
                        margin: 0 0.1rem;
                        border-radius: 50%;
                        line-height: 0.5rem;
                        text-align: center;
                        margin-left: 0.05rem;
                        color: #F2F2F2;
                        font-size: .3rem;
                        &:nth-child(7){
                            position: relative;
                            top: .12rem;
                        }
                    }
                    .last-draw-pk10{
                        display: inline-block;
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 50%;
                        line-height: 0.5rem;
                        text-align: center;
                        color: #F2F2F2;
                        font-size: 0.3rem;
                        margin-left: 0.05rem;
                    }
                }
            }
            .item-k3-wrapper{
                height:auto;
                overflow: hidden;
                font-size: $font-size-small-x;
                color:#403F3D;
                .draw-k3-num{
                    color: #C0FFE2;
                    height: 0.7rem;
                    .last-draw-k3{
                        display: inline-block;
                        width: 0.5rem;
                        height: 0.5rem;
                        margin: 0 0.1rem;
                    }
                }
                .tit-k3-shu{
                    display: inline-block;
                    @include bg-image('k3-shu');
                    background-size: 100% 100%;
                    height: 0.7rem;
                    width: 0.15rem;
                }
            }
            .more{
                text-align: center;
                font-size: 100%;
                color: #727272;
                line-height: 1rem;
            }
        }
        
    }

</style>