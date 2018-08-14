<template>
    <div class="iframe-content">
        <object :data="data" frameborder="0" class="iframe">

        </object>
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
        height:100%;
        -webkit-overflow-scrolling:touch;
        overflow:auto;
        .iframe{
            width:100%;
            height:100%;
            overflow-y:auto;
        }
    }
</style>