<template>
    <div class="tabs-wapper" @click="emitClickPane">
        <slot name="TabPane"></slot>
        <div class="tabs-link-bar" :style="linkBarStyle"></div>
    </div>
</template>
<script>
import TabPane from 'base/tabs/pane'
export default {
    data(){
        return{
            linkBarStyle:{
                transform: "translate3d(0px, 0px, 0px)"
            }
        }
    },
    components:{
        TabPane
    },
    props:{
        subPanes:{
            type:Array,
            default:() => []
        }
    },
    mounted(){
        this.$nextTick(()=>{
            console.log(this.$children)
        })
    },
    methods:{
        emitClickPane(e){
            this.$emit('clickEvent', e.target)
            console.dir(e.target.offsetLeft)
            this.linkBarStyle.transform=`translate3d(${e.target.offsetLeft}px, 0px, 0px)`
            // var classVal = e.target.getAttribute("class");
            // classVal = classVal.concat(" tab-pane-on");
            // e.target.setAttribute("class",classVal );
        }
    }
}
</script>
<style lang="scss" scoped>
.tabs-wapper{
    width: 100%;
    height: 3rem;
    position: relative;
    .tabs-link-bar{
        position:absolute;
        bottom: 0;
        width: 1rem;
        height: 0.1rem;
        background: green;
        transition:transform 1s ease-in-out,-webkit-transform .3s ease-in-out;
    }
}


</style>

