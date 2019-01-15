<template>
    <div class="ins-wapper">
        <div class="ins-ImgDocker">
            <img src="./what-is-anency.png" alt="">
        </div>
        <article class="ins-Text">
            <div class="ins-Text_Item">当您能看到这个页面，说明您的账号即是玩家账号也是代理账号，即可以自己投注，也可以发展下级玩家，赚取返点佣金。</div>
            <div class="ins-Text_Item ins-Text_Header">如何赚取返点？</div>
            <div class="ins-Text_Item">可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点，如下级投注100元，你将会获得2元。</div>
            <div class="ins-Text_Item">点击下级开户，可查看自身返点，也可为下级设置返点。</div>
            <div class="ins-Text_Item ins-Text_Header">如何为下级开户？</div>
            <div class="ins-Text_Item">点击下级开户，先为您的下级设置返点，设置成功后会生成一条邀请码，将邀请码发送给您的下级注册，注册后他就是您的下级，点击会员管理，就能查看他注册的账号；</div>           
            <div class="ins-Text_Item">如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心；</div>           
            <div class="ins-Text_Item ins-Text_Header">温馨提示</div>
            <div class="ins-Text_Item">返点不同赔率也不同，点击返点赔率表，可查看返点赔率；</div>
            <div class="ins-Text_Item">返点越低，赔率就越低，建议为下级设置的返点不要过低；</div>
            <div class="ins-Text_Item">可在代理报表、投注明细、交易明细查看代理的发展情况；</div>
            <div class="ins-Text_Item">建议开设的下级也是代理类型，无论发展了几级，您都能获得返点。</div>
            
        </article>
    </div>
</template>
<script>
import {headerConfig,httpUrl} from 'common/js/map';
export default {
    data(){
        return{}
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.$axios.postRequest(httpUrl.lottery.bypoint,{lottery_id:"cqssc"})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    console.log(res.data)
                };
            });
            this.$axios.postRequest(httpUrl.lottery.lhc28Bypoint,{lottery_id:"xglhc"})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    console.log(res.data)
                };
            });
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';

.ins-wapper{
    width: 100%;
    background: #ffffff;
    position:absolute;
    top:0;
    overflow: hidden;
    min-height: 100%;
    -webkit-overflow-scrolling: touch;   
    .ins-ImgDocker{
        height: 4.7rem;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .ins-Text{
        padding: 0 0.1rem 0.5rem 0.1rem;
        font-size: $font-size-medium-x;
        line-height: 0.7rem;
        .ins-Text_Item{
            padding-top: 0.5rem;
        }
        .ins-Text_Header{
            color: #DA1C36;
            &::before{
                content: "";   
                display: inline-block;   
                width: 0.4rem;   
                height: 0.4rem;
                background-color: #DA1C36;   
                border-radius: 50%;
                margin-right: 0.2rem;
                position: relative;
                top:0.05rem
            }
        }
    }
}
</style>
