<template>
    <div class="iframe-content">
        <iframe :src="url" frameborder="0" class="iframe">

        </iframe>
    </div>
    
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return{
            }
        },
        props:{
            url: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .iframe-content{
        height:100%;
        -webkit-overflow-scrolling:touch;
        overflow:auto;
        .iframe{
            width:100%;
            height:100%;
        }
    }
</style>
