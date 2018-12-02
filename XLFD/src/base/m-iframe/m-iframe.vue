<template>
    <div class="iframe-content">
        <loading v-if="loadingShow" :loadingTip="loadingTip" ></loading>
        <iframe :src="url" frameborder="0" class="iframe" :ref="iframeName" :id="iframeName">
        </iframe>
    </div>
</template>

<script type="text/ecmascript-6">
import loading from 'base/loading/loading';

    export default {
        data() {
            return{
               // loadingTip:loadingTip
               loadingShow:true
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
            iframeName:{
                type:String,
                default: ''
            }
        },
        watch:{
        },
        components:{
            loading
        },
        mounted(){
            var _this=this;
            _this.loadingShow=true;
            // this.currentUrl = this.$refs[this.iframeName].getAttribute("src");
            this.$refs[this.iframeName].onload=function(){
                _this.loadingShow=false;
                if(_this.iframeName=="activityIframe"){
                    // _this.$emit("LoadComplate");
                }
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

