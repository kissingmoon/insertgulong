<template>
   <div class="level-wapper">
       <div class="cav-wapper">
           <div class="half-circle-wapper">
               <div class="title">我的等级</div>
           </div>
           <div class="circle-wapper">
           </div>
       </div>
       <div class="equity-wapper">
           <div class="equity-title flex">
               <div class="flex-1 flex flex-center">当前积分:0</div>
               <div class="flex-2 flex flex-center">离升级还差：30000</div>
           </div>
           <div class="equity-body flex">
               <div v-for="(v,k) in equityList" :key="k" class="equity-item flex flex-v flex-center">
                   <div>
                       <i class="equity-icon" :style="v.itemStyle"></i>
                   </div>
                   <div>{{v.name}}</div>
               </div>
           </div>
           <div class="libao-wapper">
                <div class="libao-title flex flex-align-center">
                   升级礼包
                </div>
                <div class="libao-body flex">
                    <div v-for="(v,k,indx) in giftObj" :key="indx" class="libao-item flex-1 flex flex-center">
                        <div class="libao-item-content">{{v.name}}</div>
                    </div>
                </div>
           </div>
           <div class="reward-wapper">
               <div class="reward-title flex flex-align-center">奖励明细</div>
               <div class="reward-body">
                   <div class="reward-content">
                       <div class="reward-item flex">
                           <div class="reward-cols flex-1 flex flex-center">111</div>
                           <div class="reward-cols flex-1 flex flex-center">222</div>
                           <div class="reward-cols flex-1 flex flex-center">333</div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
</template>
<script>
export default {
    data(){
        return{
            equityList:[
                {
                    name:"等级礼金",
                    itemStyle:{
                        backgroundImage:'url(' + require('./level-money.png') + ')'
                    }
                },
                {
                    name:"周俸禄",
                    itemStyle:{
                        backgroundImage:'url(' + require('./week-money.png') + ')'
                    }
                },
                {
                    name:"月俸禄",
                    itemStyle:{
                        backgroundImage:'url(' + require('./month-money.png') + ')'
                    }
                },
                {
                    name:"24小时客服",
                    itemStyle:{
                        backgroundImage:'url(' + require('./service.png') + ')'
                    }
                }
            ],
            giftObj:{
                level_gift:{
                    count:200,
                    name:"等级礼金",
                    tip:"升级领取"
                },
                weekly_gift:{
                    count:200,
                    name:"周俸禄",
                    tip:"升级领取"
                },
                monthly_gift:{
                    count:200,
                    name:"月俸禄",
                    tip:"升级领取"
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';

.level-wapper{
    position: fixed;
    top:0;
    bottom: 0;
    background-color: #ffffff;
    z-index: 102;
    width: 100%;
    .cav-wapper{
        position: relative;
        height: 4.7rem;
        .half-circle-wapper{
            height: 3.5rem;
            background-image: url("./top-bg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .circle-wapper{
            height: 2.6rem;
            width: 2.6rem;
            position:absolute;
            bottom: 0;
            left: 50%;
            margin-left: -1.3rem;
            background-image: url("./circle-crown.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            
        }
    }
    .equity-wapper{
        .equity-body{
            flex-wrap:wrap;
            .equity-item{
                flex: 0 0 25%;
                height: 2.5rem;
                .equity-icon{
                    display: block;
                    width: 0.7rem;
                    height: 0.7rem;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
        }
    }
    .libao-wapper{
        border-top: 5px solid #F2F2F2;
        border-bottom: 5px solid #F2F2F2;
        .libao-title{
            height: 1.2rem;
            padding: 0 0.5rem;
            font-size: $font-size-medium-x;
            border-bottom: 1px solid #E8E8E8 ;
        }
        .libao-body{
             padding: 0.5rem 0.5rem 0.5rem 0.2rem;
            .libao-item{
                padding-left: 0.3rem;
                .libao-item-content{
                    width: 100%;
                    height: 1.3rem;
                    background-image: url("./bg-libao.png");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
        }
    }
    .reward-wapper{
        .reward-title{
            height: 1.2rem;
            padding: 0 0.5rem;
            font-size: $font-size-medium-x;
        }
    }
}
</style>
