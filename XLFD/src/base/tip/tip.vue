<template>
  <div class="tip" v-show="showTip">
    <span v-if="tipIsString" class="desc" :style="optionalStyle" v-html="tip"></span>
    <div v-if="!tipIsString" class="desc-icon">
    <div  class="tip-icon" :class="tipBg"></div>
    <div  class="tip-text" v-html="tip.message"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    import {mapGetters,mapMutations} from 'vuex';
    export default {
        data(){
            return{
                tiem:5000,
                showTip:false,
                optionalStyle:{
                    fontSize:'0.43rem'
                },
                tipIsString:true,
                tipBg:""
            }
        },
        computed: {
            ...mapGetters([
                'tip',
            ])
        },
        methods:{
            ...mapMutations({
                setTip:'SET_TIP',
            }),

        },
        watch:{
            tip(newVue){
                console.log("newVue")
                console.log(newVue)
                let _this = this;
                
                this.tipIsString=(typeof newVue == "string");
                console.log(this.tipIsString)
                if((this.tipIsString&&newVue.length > 0)||!this.tipIsString){
                    if(!this.tipIsString){
                        this.tipBg="tip-bg-image"+newVue.flag;
                    }
                    this.showTip = true;
                    setTimeout(() => {
                        this.showTip = false;
                        this.setTip('');
                    },3000);
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "common/scss/variable.scss";
    @import "common/scss/mixin.scss";
    .tip{
        position: fixed;
        text-align: center;
        width:100%;
        z-index: 10000;
        top:40%;
        .desc{
            display: inline-block;
            max-width: 70%;
            padding:0.2rem 0.4rem;
            border-radius: 0.2rem;
            // background: #fff;
            background: rgba(90,90,90,0.7);
            color: #ffffff;
            box-shadow: 0rem 0.07rem 0.1rem rgba(0,0,0,.2);
            line-height: 0.7rem;
            font-size: $font-size-large;
        } 
        .desc-icon{
            background: rgba(90,90,90,0.7);
            min-width: 3.8rem;
            min-height: 3.2rem;
            max-width: 4.9rem;
            margin: 0 auto;
            border-radius: 0.2rem; 
            .tip-bg-image0{
                @include bg-image('fail');
            }
            .tip-bg-image1{
                @include bg-image('success');
            }
            .tip-bg-image2{
                @include bg-image('warning');
            }
            .tip-icon{
                width: 1.5rem;
                height: 1.5rem;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                display: inline-block;
                margin-top:0.5rem;
            }
            .tip-text{
                margin-top:0.1rem;
                color: #ffffff;
                font-size: $font-size-medium-x;
                padding: 0.2rem;
                line-height: 0.55rem;
            }
        }
    }

</style>
