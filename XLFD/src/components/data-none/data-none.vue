<template>
    <div class="data-tip-wrapper">
        <div class="data-tip">
            <div class="img">

            </div>
            <div class="btn">
                这里什么都没有
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
    .data-tip-wrapper{
        width: 100%;
        height:auto;
        background: #fff;
        .data-tip{
            width:5rem;
            height:auto;
            overflow: hidden;
            margin: 0 auto;
            margin-top:calc((100% - 5rem)/2);
            .img{
                width:5rem;
                height:5rem;
                @include bg-image('icon-em');
                background-position: center bottom;
                background-size: 5rem;
                background-repeat: no-repeat;
            }
            .btn{
                height:1rem;
                width:86%;
                line-height: 1rem;
                text-align: center;
                font-size: $font-size-medium-x;
                margin: 0 auto;
            }
        }
    }
</style>
