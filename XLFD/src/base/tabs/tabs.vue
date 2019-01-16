<template>
    <div class="tabs-wapper" @click="emitClickPane" >
        <slot name="TabPane" style="transform: translate3d(-207px, 0px, 0px)" class="my"></slot>
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
            },
            grandStyle:{
                transform: "translate3d(-207px, 0px, 0px)"
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
    updated(){
        if(document.querySelector('[data-index]')){
            this.linkBarStyle.width=document.querySelector('[data-index]').offsetWidth+ "px"
        }
    },
    methods:{
        emitClickPane(e){
            this.$emit('clickEvent', e.target)
            // console.log(e.target )
            // console.log(e.target.offsetLeft )
            // console.log(e.target.parentNode.childNodes )
            //console.log(e.target.offsetWidth )
            // console.dir(e.target.parentNode.parentNode)
            // console.log(e.target.parentNode.parentNode.scrollLeft )
            // console.log(e.target.parentNode.parentNode.offsetWidth )
            // console.dir(e.target.parentNode )
            // console.log(e.target.parentNode.offsetWidth )
            // e.target.parentNode.scrollTo(-100,0)
            let grandWidth= e.target.parentNode.parentNode.offsetWidth
            let offsetLeft = e.target.parentNode.offsetWidth-e.target.parentNode.parentNode.offsetWidth
            let liList = e.target.parentNode.childNodes
            let current_indx =  e.target.getAttribute('data-index')
            let center_x = e.target.offsetWidth/2
            for(let i=0;i<current_indx;i++){
                center_x +=liList[i].offsetWidth
            }
            console.dir(e.target.parentNode)
            if(center_x>grandWidth/2){
                //这个是scrollTo使用的滚动距离
                // e.target.parentNode.parentNode.scrollTo(center_x-grandWidth/2,0)
                //这是transform使用的距离
                // let offset =center_x-grandWidth/2
                // e.target.parentNode.parentNode.style.transform= `translate3d(-${offset}px, 0px, 0px)`
            }else{
                // e.target.parentNode.parentNode.scrollTo(0,0)
            }
            console.log(e.target.parentNode.offsetLeft)
            this.linkBarStyle.transform=`translate3d(${e.target.offsetLeft}px, 0px, 0px)`
        },
        scrollAnimation(ele,currentY, targetY) {
            // 计算需要移动的距离
            // let needScrollTop = targetY - currentY
            // let _currentY = currentY
            setTimeout(() => {
                // 一次调用滑动帧数，每次调用会不一样
                const dist = Math.ceil(needScrollTop / 10)
                _currentY += dist
                ele.scrollTo(_currentY, currentY)
                // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
                if (needScrollTop > 10 || needScrollTop < -10) {
                    scrollAnimation(_currentY, targetY)
                    }
                else {
                    ele.scrollTo(_currentY, targetY)
                }
            }, 1)
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

