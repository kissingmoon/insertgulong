<template>
    <div class="ins-wapper">
        <div class="ins-ImgDocker">
            <img src="./what-is-anency.png" alt="">
        </div>
        <article class="ins-Text">
            <div class="ins-Text_Item">当您能看到这个页面，说明您的账号即是玩家账号也是代理账号，即可以自己投注，也可以发展下级玩家，赚取返点佣金。</div>
            <div class="ins-Text_Item ins-Text_Header">如何赚取返点？</div>
            <div class="ins-Text_Item">可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点，如下级投注100元，你将会获得2元。</div>
            <div class="ins-Text_Item ins-Text_Header">如何赚取返点？</div>
            <div class="ins-Text_Item">可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点，如下级投注100元，你将会获得2元。</div>
            <div class="ins-Text_Item ins-Text_Header">如何赚取返点？</div>
            <div class="ins-Text_Item">可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点，如下级投注100元，你将会获得2元。</div>
            <div class="ins-Text_Item ins-Text_Header">如何赚取返点？</div>
            <div class="ins-Text_Item">可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点，如下级投注100元，你将会获得2元。</div>
        
        </article>
    </div>
</template>
<script>
export default {
    
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
        }
    }
}
</style>
