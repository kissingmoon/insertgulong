<template>
    <iframe :src="url" frameborder="0" class="iframe">

    </iframe>
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
    .iframe{
        width:100%;
        height:100%;
    }
</style>
