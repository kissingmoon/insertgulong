<template>
  <div class="loading">
    <img class="img" width="24" height="24" src="./loading.gif"></br>
    <span class="desc">{{title}}</span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="scss">
    @import "~common/scss/variable";

    .loading{
        position: absolute;
        width: 100%;
        top:40%;
        text-align: center;
        z-index: 3000;
        background: #fff;
        .desc{
            line-height: 0.6rem;
            font-size: $font-size-small-x;
            color: $color-bg-shade-a5;
        } 
    }

</style>
