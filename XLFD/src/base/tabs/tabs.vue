<template>
    <div class="tabs-wapper" @click="emitClickPane">
        <slot name="TabPane"></slot>
        <div ref="linkBar" class="tabs-link-bar" :style="linkBarStyle"></div>
    </div>
</template>
<script>
import TabPane from 'base/tabs/pane'
export default {
    data(){
        return{
            linkBarStyle:{
                transform: "translate3d(0px, 0px, 0px)",
                width:""
            }
        }
    },
    components:{
        TabPane
    },
    props:{
    },
    watch:{
    },
    mounted(){
        this.$nextTick(function () {
            if(document.querySelector('[data-index]')){
                this.linkBarStyle.width=document.querySelector('[data-index]').offsetWidth+ "px"
            }
        })
    },
    methods:{
        emitClickPane(e){
            this.$emit('clickEvent', e.target)
            this.linkBarStyle.transform=`translate3d(${e.target.offsetLeft}px, 0px, 0px)`
        }
    }
}
</script>
<style lang="scss" scoped>
.tabs-wapper{
    position: relative;
    .tabs-link-bar{
        position:absolute;
        bottom: 0;
        // width: 1rem;
        height: 0.1rem;
        background: #DA1C36;
        transition:transform 1s ease-in-out,-webkit-transform .3s ease-in-out;
    }
}


</style>

