<template>
<div class="loading-bg">

  <div class="loading">
    <img class="img" width="24" height="24" src="./loading.gif"></br>
    <span class="desc">{{loadingTip}}</span>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      loadingTip: {
        type: String,
        default: '正在提交...'
      }
    }
  }
</script>
<style scoped lang="scss">
    @import "common/scss/variable.scss";
    .loading-bg{
        top:0;
        left:0;
        position: fixed;
        width: 100%;
        height:100%;
        background: $color-bg-shade-a5;
        z-index: 10001;
        .loading{
            position: absolute;
            width: 100%;
            top:45%;
            line-height: 50%;
            text-align: center;
            z-index: 10002;
            .desc{
                line-height: 0.6rem;
                font-size: $font-size-medium;
                color:$color-bg-white-a8;
            } 
        }
    }

</style>
