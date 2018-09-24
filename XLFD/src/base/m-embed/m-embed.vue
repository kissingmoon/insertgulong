<template>
    <div class="iframe-content">
        <embed :src="data" class="iframe">
    </div>
    
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return{
            }
        },
        props:{
            data: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .iframe-content{
        width:100%;
        height:100%;
        -webkit-overflow-scrolling:touch;
        overflow:auto;
        .iframe{
            width:100%;
            height:100%;
            //overflow-y:auto;
            overflow:auto;
        }
    }
</style>