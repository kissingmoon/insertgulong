<template>
<div class="intro_wapper">
    <div class="title flex">
        <div><i @click="closeInfo" class="icon-arrows-left"></i></div>
        <div class="flex-1" style="padding-right: 0.4rem;" ><b>规则</b></div>
    </div>
    <div class="intro_content">
        <div class="intro_item">
            <div class="intro_item_title flex flex-align-center" style="border-bottom:1px solid #E8E8E8;">
                <span class="shu"></span>
                <span class="title-text"><b>如何获取打码量</b></span>
            </div>
            <div class="intro_item_body " style="border-bottom:3px solid #F2F2F2;padding:0 0.5rem;">
                <div class="intro_article flex flex-align-center">打码：平台中，每次下注投注金额-中奖金额为打码量。<br>示例：下注100元，中奖70元，则打码量为30，若未中奖，则打码量为100</div>
              
            </div>
        </div>
        <div class="intro_item">
            <div class="intro_item_title flex flex-align-center">
                <span class="shu"></span>
                <span class="title-text"><b>等级打码量对应</b></span>
            </div>
            <div class="intro_item_body">
                <div class="intro-item-content">
                       <div class="reward-item flex">
                           <div class="reward-cols flex-1 flex flex-center">等级</div>
                           <div class="reward-cols flex-1 flex flex-center">打码量</div>
                           <div class="reward-cols flex-1 flex flex-center">等级礼金</div>
                           <div class="reward-cols flex-1 flex flex-center">周俸禄</div>
                           <div class="reward-cols flex-1 flex flex-center">月俸禄</div>
                       </div>
                       <div v-for="(v,k) in levelTable" :key="k" class="reward-item flex">
                            <div class="reward-cols flex-1 flex flex-center">{{v.level_alias}}</div>
                            <div class="reward-cols flex-1 flex flex-center">{{v.cumulative_code}}</div>
                            <div class="reward-cols flex-1 flex flex-center">{{v.level_gift}}</div>
                            <div class="reward-cols flex-1 flex flex-center">{{v.weekly_gift}}</div>
                            <div class="reward-cols flex-1 flex flex-center">{{v.monthly_gift}}</div>
                       </div>
                   </div>
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
import {httpUrl} from 'common/js/map';

export default {
    data(){
        return{
            levelTable:[]
        }
    },
    created(){
        this.$axios.postRequest(httpUrl.info.levelIntro)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.levelTable=res.data
                }
            });
    },
    methods:{
        closeInfo(){
            this.$emit('closeIntro');
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';

.intro_wapper{
    width: 100%;
    .title{
        padding: 0 0.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: $font-size-large;
        color: #ffffff;
        text-align: center;
        background: #414141;
    }
    .intro_content{
        position:absolute;
        top:1.2rem;
        bottom: 0rem;
        width: 100%;
        -webkit-overflow-scrolling:touch;
        overflow:auto;
        .intro_item{
            .intro_item_title{
                .title-text{
                    font-size: $font-size-medium-x;
                }
                height: 1rem;
                padding: 0 0.3rem;
                    .shu{
                    width: 0.1rem;
                    height: 0.5rem;
                    background: #F1C779;
                    margin-right: 0.2rem;
                }
            }
            .intro_item_body{
                .intro_article{
                    padding: 0.3rem 0;
                    line-height: 0.5rem;
                }
                .intro-item-content{
                    .reward-item {
                        color: #979797;
                        border-top:1px solid #E8E8E8;
                        height: 0.6rem;
                        &:last-child{
                            border-bottom:1px solid #E8E8E8;
                        }
                    }
                    .empty-img{
                        height: 3rem;
                    }
                }
            }
        }
    }
}

</style>
