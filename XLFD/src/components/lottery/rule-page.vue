<template>
    <parcel>
        <div class="rule-content">
            <div class="rule-header">
                <div class="back" @click="close"><i class="icon-arrows-left"></i></div>
                <h1 class="title">{{ruleTitle}}</h1>
            </div>
            <div class="rule-main">
                <m-iframe :url="ruleUrl"></m-iframe>
            </div>
        </div>
    </parcel>
</template>

<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import MIframe from 'base/m-iframe/m-iframe';

  export default {
    data() {
      return {
      }
    },
    props: {
        ruleUrl:{
            type: String,
            default: null
        },
        ruleTitle:{
            type: String,
            default: '规则说明'
        }
    },
    components:{
        Parcel,
        MIframe
    },
    mounted() {
    },
    methods: {
        close(){
            this.$emit('close','ruleShow');
        }
        
    }
  }
</script>

<style scoped lang="scss">
    @import "common/scss/variable.scss";
    @import 'common/scss/mixin.scss';
    .rule-content{
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3000;
        background:#fff;
        .rule-header{
            position:relative;
            height:1.2rem;
            line-height: 1.3rem;
            text-align: center;
            color:#fff;
            background:$color-red;
            
            .back{
                position:absolute;
                height:1.2rem;
                line-height: 1.4rem;
                padding: 0 0.5rem 0 0.3rem;
                font-size: 0.52rem;
                font-size: $font-size-large-x;
            }
            .title{
                display: inline-block;
                height:1.2rem;
                line-height: 1.2rem;
                vertical-align: top;
                padding: 0 2.4rem;
                font-size: $font-size-large-m;
                @include no-wrap();
            }
        }
        .rule-main{
            height:calc(100% - 1.2rem);
            overflow: hidden;
        }
    }

</style>