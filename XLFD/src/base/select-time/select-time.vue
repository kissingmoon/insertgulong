<template>
    <div class="time-content">
        <div class="time-background" @click="timeHide"></div>
        <div class="time-main">
            <div class="time-wrapper clearfix">
                <ul>
                    <li class="item-wrapper border-bottom-1px" @click="selectTimeType(1)">
                        今天
                    </li>
                    <li class="item-wrapper border-bottom-1px" @click="selectTimeType(2)">
                        最近三天
                    </li>
                    <li class="item-wrapper border-bottom-1px" @click="selectTimeType(3)">
                        最近一周
                    </li>
                    <li class="item-wrapper border-bottom-1px" @click="selectTimeType(4)">
                        最近一月
                    </li>
                </ul>
            </div>
            <div class="time-close" @click="timeHide">
                取消
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'

  export default {
    props: {
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    activated() {
    },
    methods: {
        selectTimeType(type){
            this.$emit('setTimeType',type);
            this.timeHide();
        },
        ...mapMutations({
            setShowTime:'SET_SHOW_TIME',
        }),
        timeHide(){
            this.setShowTime(false);
        }
        
    }
  }
</script>

<style scoped lang="scss">
    @import "common/scss/variable.scss";
    @import 'common/scss/mixin.scss';
    .time-background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 5000;
        background:$color-bg-shade-a5;
    }
    .time-main{
        position:fixed;
        z-index:5001;
        width:100%;
        height:auto;
        overflow: hidden;
        bottom:0;
        background:#fff;
        .time-wrapper{
            height:auto;
            overflow: hidden;
            .item-wrapper{
                height:1.3rem;
                line-height: 1.3rem;
                overflow: hidden;
                padding: 0 0.3rem;
                @include border-bottom-1px(solid,$color-border-gray);
                font-size: $font-size-medium-x;
            }
        }
        .time-close{
            position:relative;
            height:1.2rem;
            text-align: center;
            line-height: 1.2rem;
            font-size: $font-size-medium;
            color:$color-text-gray;
        }
    }

</style>