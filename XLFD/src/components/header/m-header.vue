<template>
    <div class="header">
        <div class="service"></div>
        <h1 class="title">小李飞刀</h1>
        <div class="information"></div>
    </div>
</template>
<script>
    
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
.header{
    position:relative;
    height:1.2rem;
    text-align: center;
    color:#fff;
    background:$color-bg-theme;
    .service{
        position: absolute;
        vertical-align: top;
    }
    .title{
        display: inline-block;
        line-height: 1.2rem;
        vertical-align: top;
        font-size: $font-size-large;
    }
}
</style>
