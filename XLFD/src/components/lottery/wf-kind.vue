<template>
    <parcel>
        <div class="kind-content">
            <div class="kind-title-content">
                <div class="back" @click="close"><i class="icon-arrows-left"></i></div>
                <router-link tag="div" :to="{path:'/service',query:{flag:'customer_service_url'}}"  class="service"><i class="icon-diamond"></i><span>客服</span></router-link>
                <h1 class="title">玩法选择</h1>
            </div>
            <scroll ref="scroll" class="scroll-content" :data="data">
                <div class="kind-wrapper">
                    <div class="kind-item" v-for="(item,i) in data">
                        <div class="item-title">{{item.name}}</div>
                        <div class="sub-main">
                            <div class="sub" v-for="(sub,s) in item.wf" @click="selectWf(i,s)">
                                {{sub.name}}
                            </div>
                        </div>
                    </div>
                </div>
            </scroll>
        </div>
    </parcel>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex';
  import Scroll from 'base/scroll/scroll';
  import Parcel from 'base/parcel/parcel';

  export default {
    data() {
      return {
      }
    },
    props: {
        data:{
            type: [Array,Object,String],
            default: null
        }
    },
    components:{
        Scroll,
        Parcel
    },
    mounted() {
        setTimeout(() => {
            this.$refs.scroll.refresh();
        }, 20)
    },
    activated() {
    },
    methods: {
        close(){
            this.$emit('close','wfKindShow');
        },
        selectWf(i,s){
            console.log(1245);
            this.$emit('selectWf',i,s);
        },
        
    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">
    @import "common/scss/variable.scss";
    @import 'common/scss/mixin.scss';
    .kind-content{
        position: fixed;
        width: 100%;
        top: 0rem;
        bottom: 0rem;
        z-index: 503;
        @include bg-image('bg-lottery-deep');
        background-size: 1rem;
        .kind-title-content{
            position:relative;
            height:1.2rem;
            line-height: 1.2rem;
            text-align: center;
            color:#fff;
            @include bg-image('bg-lottery-title');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            
            .back{
                position:absolute;
                height:1.2rem;
                line-height: 1.4rem;
                padding: 0 0.5rem 0 0.3rem;
                font-size: 0.52rem;
                font-size: $font-size-large-x;
            }
            .service{
                position:absolute;
                height:1.2rem;
                line-height: 1.35rem;
                font-size:$font-size-large-x;
                padding-right: 0.4rem;
                vertical-align: bottom;
                color:$color-yellow;
                right: 0;
                span{
                    font-size:$font-size-small-x;
                }
            }
            .title{
                display: block;
                height:1.2rem;
                line-height: 1.2rem;
                vertical-align: top;
                padding: 0 2.4rem;
                font-size: $font-size-large-m;
                @include no-wrap();
            }
        }
        .scroll-content{
            height:calc( 100% - 1.2rem);
            overflow: hidden;
            .kind-wrapper{
                height:auto;
                overflow: hidden;
                .kind-item{
                    height:auto;
                    overflow: hidden;
                    color: #fff;
                    .item-title{
                        height:0.8rem;
                        line-height: 0.8rem;
                        text-align: center;
                        @include bg-image('bg-lottery-deep');
                        background-size: 0.8rem;
                    }
                    .sub-main{
                        height:auto;
                        overflow: hidden;
                        padding-left:0.3rem;
                        @include bg-image('bg-lottery-shallow');
                        background-size: 1rem;
                        .sub{
                            float: left;
                            margin:0.3rem 0.3rem 0.3rem 0;
                            height:0.9rem;
                            width:2.87rem;
                            line-height: 0.9rem;
                            text-align: center;
                            overflow: hidden;
                            border:1px solid $color-border-num;
                            border-radius: 0.8rem;
                            @include bg-image('bg-num-shallow');
                            background-size: 2rem;
                        }
                    }
                }
            }
        }
    }

</style>