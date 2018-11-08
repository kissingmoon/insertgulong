<template>
    <div class="loading-bg flex flex-center">
        <div class="loading-image flex flex-center flex-v">
            <div class="loading-icon"></div>
            <div class="loading-text"> {{loadingTip}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
      loadingTip: {
        type: String,
        default: '加载中...'
      }
    }
}
</script>
<style scoped lang="scss">
.loading-bg{
        top:0;
        left:0;
        position: fixed;
        width: 100%;
        height:100%;
        z-index: 10001;
        .loading-image{
            // animation: changeBG 2s ease 0 infinite;
            min-height: 2.7rem;
            min-width: 3rem;
            border-radius: 0.2rem;
            
            background-color: rgba(90,90,90,0.9);
            
            .loading-icon{
                height: 1rem;
                width: 1rem;
                background-image: url('loading.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .loading-text{
                padding: 0.2rem 0.2rem 0 0.2rem;
                color: #ffffff;
            }
        }
}
</style>
