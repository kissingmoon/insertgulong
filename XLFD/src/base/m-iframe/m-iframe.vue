<template>
    <div class="iframe-content">
        <loading v-if="loadingshow" :loadingTip="loadingTip" :loadingshow="loadingshow"></loading>
        <iframe :src="url" frameborder="0" class="iframe" ref="payiframe" :loadingTip="loadingTip" :loadingshow="loadingshow">
        </iframe>
    </div>
</template>

<script type="text/ecmascript-6">
import loading from 'base/loading/loading';

    export default {
        data() {
            return{
                loadingTip:loadingTip
            }
        },
        props:{
            url: {
                type: String,
                default: ''
            },
            loadingTip:{
                type: String,
                default: ''
            },
            loadingshow:{
                type:Boolean,
                default:false
            }
        },
        watch:{
        },
        components:{
            loading
        },
        mounted(){
            console.log(this.$refs.payiframe)
            var _this=this;
            this.$refs.payiframe.onload=function(){
                _this.loadingshow=false;
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
