<template>
  <div ref="wrapper" class="better-scroll-root">  
    <div class="better-scroll-container" :class="{'kuai3BG':isKuai3}">  
        <div v-if="pulldown" class="pulldown-tip">
            <i class="pull-icon icon-arrows-below-wire " :class="[pulldownTip.rotate]"></i>
            <span class="tip-content">{{pulldownTip.text}}</span>
        </div>
        <div v-if="pullup" class="pullup-tip">
            <i v-show="!isAllData" class="pull-icon icon-arrows-up-wire" :class="[pullupTip.rotate]"></i>
            <span class="tip-content">{{pullupTip.text}}</span>
        </div>
        <transition name="refresh">
            <div v-show="refreshStatus" class="refresh-pos">
                <div class="refresh-container">
                    <div class="cube">
                        <div class="side side1"></div>
                        <div class="side side2"></div>
                        <div class="side side3"></div>
                        <div class="side side4"></div>
                        <div class="side side5"></div>
                        <div class="side side6"></div>
                    </div>
                </div>
                <span class="refresh-connecting">刷新中...</span>
            </div>
        </transition>
        <transition name="loading">
            <div v-show="loadStatus" class="loading-pos">
                <div class="loading-container">
                    <div class="cube">
                        <div class="side side1"></div>
                        <div class="side side2"></div>
                        <div class="side side3"></div>
                        <div class="side side4"></div>
                        <div class="side side5"></div>
                        <div class="side side6"></div>
                    </div>
                </div>
                <span class="loading-connecting">加载中...</span>
            </div>
        </transition>
        <slot></slot>
    </div>
</div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
    props: {
        /**
         * 1 滚动的时候会派发scroll事件，会截流。
         * 2 滚动的时候实时派发scroll事件，不会截流。
         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
         */
        probeType: {
            type: Number,
            default: 1
        },
        /**
         * 点击列表是否派发click事件
         */
        click: {
            type: Boolean,
            default: true
        },
        /**
         * 是否开启横向滚动
         */
        scrollX: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发滚动事件
         */
        listenScroll: {
            type: Boolean,
            default: false
        },
        /**
         * 列表的数据
         */
        data: {
            type: [Array,Object,String],
            default: null
        },
        /**
         * 是否派发滚动到底部的事件，用于上拉加载
         */
        pullup: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发顶部下拉的事件，用于下拉刷新
         */
        pulldown: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发列表滚动开始的事件
         */
        beforeScroll: {
            type: Boolean,
            default: false
        },
        /**
         * 当数据更新后，刷新scroll的延时。
         */
        refreshDelay: {
            type: Number,
            default: 20
        },
        // 是否显示刷新中提示
        refreshStatus: {
            type: Boolean,
            default: false
        },
        // 是否显示加载中提示
        loadStatus: {
            type: Boolean,
            default: false
        },
        // 是否已加载全部数据
        isAllData: {
            type: Boolean,
            default: false
        },
        /**
         * 是否启用下拉刷新的交互
         */
        pulldownUI: {
            type: Boolean,
            default: false
        },
        /**
         * 是否启用上拉加载的交互
         */
        pullupUI: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            pulldownTip: {
                text: '下拉刷新',     // 松开立即刷新
                rotate: ''    // icon-rotate
            },
            pullupTip: {
                text: '上拉加载',     // 松开立即加载
                rotate: ''    // icon-rotate
            },
            isKuai3:true,
        };
    },
    mounted() {
        // 保证在DOM渲染完毕后初始化better-scroll
        setTimeout(() => {
            this._initScroll()
        }, 100)
    },
    methods: {
        _initScroll() {
            if (!this.$refs.wrapper) {
                return;
            }
            // better-scroll的初始化
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX
            });

            // 是否派发滚动事件
            if (this.listenScroll || this.pulldown || this.pullup) {
                let me = this;
                this.scroll.on('scroll', (pos) => {
                    if (this.listenScroll) {
                        me.$emit('scroll', pos);
                    }

                    if (this.pulldown) {
                        // 下拉动作
                        if (pos.y > 50) {
                            this.pulldownTip = {
                                text: '立即刷新',
                                rotate: 'icon-rotate'
                            }
                        } else {
                            this.pulldownTip = {
                                text: '下拉刷新',     // 松开立即刷新
                                rotate: ''    // icon-rotate
                            }
                        }
                    }

                    if (this.pullup) {
                        // 上拉动作
                        if(!this.isAllData){
                            if (this.scroll.y <= (this.scroll.maxScrollY - 50)) {
                                this.pullupTip = {
                                    text: '立即加载',
                                    rotate: 'icon-rotate'
                                }
                            } else {
                                this.pullupTip = {
                                    text: '上拉加载',     // 松开立即加载
                                    rotate: ''    // icon-rotate
                                }
                            }
                        }
                    }
                })
            }


            // 是否派发顶部下拉事件，用于下拉刷新
            if (this.pulldown) {
                this.scroll.on('touchend', (pos) => {
                    // 下拉动作
                    if (pos.y > 50) {
                        setTimeout(() => {
                            // 重置提示信息
                            this.pulldownTip = {
                                text: '下拉刷新',     // 松开立即刷新
                                rotate: ''    // icon-rotate
                            }
                        },600);
                        this.$emit('pulldown');
                    }
                });
            }

            // 是否派发滚动到底部事件，用于上拉加载
            if (this.pullup) {
                this.scroll.on('touchend', () => {
                    // 滚动到底部
                    if(!this.isAllData){
                        if (this.scroll.y <= (this.scroll.maxScrollY - 50)) {
                            setTimeout(() => {
                                // 重置提示信息
                                if(!this.isAllData){
                                    this.pullupTip = {
                                        text: '上拉加载',     // 松开立即加载
                                        rotate: ''    // icon-rotate
                                    }
                                }
                            },600);
                            this.$emit('pullup');
                        }
                    }
                });
            }
            // 是否派发列表滚动开始的事件
            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScroll')
                });
            }
        },
        disable() {
            // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable();
        },
        enable() {
            // 代理better-scroll的enable方法
            this.scroll && this.scroll.enable();
        },
        refresh() {
            // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement() {
            // 代理better-scroll的scrollToElement方法
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    watch: {
        // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
        data() {
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay);
        },
        isAllData(){
            if(this.isAllData){
                this.pullupTip = {
                    text: '没有更多数据',
                    rotate: ''
                }
            }else{
                this.pullupTip = {
                    text: '上拉加载',
                    rotate: ''
                }
            }
            
        }
    }
}
</script>
<style scoped lang="scss" rel="stylesheet/scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.better-scroll-root {
    &::-webkit-scrollbar{
        display: none
    }
    .better-scroll-container{
        position: relative;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        min-height: 101%;
        background-color: #fff;
        &.kuai3BG{
            background-color: transparent;
        }
        &::-webkit-scrollbar{
            display: none
        }
    }
    .pulldown-tip {
        position: absolute;
        left: 0;
        width: 100%;
        color: $color-text-gray;
        text-align: center;
        top: -1.34rem;
        height: 1.34rem;
        line-height: 1.34rem;
        z-index: 1;
    }
    .pullup-tip {
        position: absolute;
        left: 0;
        width: 100%;
        color: $color-text-gray;
        text-align: center;
        bottom: -1.34rem;
        height: 1.34rem;
        line-height: 1.34rem;
        z-index: 1;
    }
    .pull-icon {
        position: absolute;
        top: 0.42rem;
        left: 3.7rem;
        color: #a5a1a1;
        font-size: $font-size-medium-x;
        transition: all 0.15s ease-in-out;
    }
    .pull-icon.icon-rotate {
        transform:rotate(180deg);
    }

    .refresh-enter-active, .refresh-leave-active{
        transition: all 0.3s;
    }
    .refresh-enter, .refresh-leave-to{
        transform: translate3d(0, -0.94rem, 0);
    }
    .loading-enter-active, .loading-leave-active{
        transition: all 0.3s;
    }
    .loading-enter, .loading-leave-to{
        transform: translate3d(0, 0.94rem, 0);
    }
    .refresh-pos,.loading-pos {
        background-color: $color-bg-shade-a3;
        position: absolute;
        width: 100%;
        height: 0.94rem;
        color: #fff;
        text-align: center;
        z-index: 2000;
            .refresh-container,.loading-container {
                position: absolute;
                height: 0.27rem;
                width: 0.27rem;
                left: 35%;
                top: 50%;
                transform: translate(-50%, -50%);
                perspective: 1.07rem;
            }
            .refresh-connecting,.loading-connecting {
                line-height: 0.94rem;
            }
    }
    .loading-pos{
        bottom:0;
    }
    .cube{
        height:0.27rem;
        width:0.27rem;
        transform-origin:50% 50%;
        transform-style:preserve-3d;
        animation:rotate 3s infinite ease-in-out;
        .side{
            position:absolute;
            height:0.27rem;
            width:0.27rem;
            border-radius:50%;
            &.side1{
                background: #4bc393;
                transform:translateZ(0.27rem);
            }
            &.side2{
                background:#FF884D;
                transform:rotateY(90deg) translateZ(0.27rem);
            }
            &.side3{
                background:#32526E;
                transform:rotateY(180deg) translateZ(0.27rem);
            }
            &.side4{
                background: #c53fa3;
                transform:rotateY(-90deg) translateZ(0.27rem);
            }
            &.side5{
                background:#FFCC5C;
                transform:rotateX(90deg) translateZ(0.27rem);
            }
            &.side6{
                background:#FF6B57;
                transform:rotateX(-90deg) translateZ(0.27rem);
            }
        }
    }
    @keyframes rotate{
        0%{
            transform:rotateX(0deg) rotateY(0deg);
        }
        50%{
            transform:rotateX(360deg) rotateY(0deg);
        }
        100%{
            transform:rotateX(360deg) rotateY(360deg);
        }
    }
}
</style>
