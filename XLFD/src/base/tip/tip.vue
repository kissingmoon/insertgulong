<template>
  <div class="tip" v-show="showTip">
    <span class="desc" v-html="tip"></span>
  </div>
</template>
<script type="text/ecmascript-6">
    import {mapGetters,mapMutations} from 'vuex';
    export default {
        data(){
            return{
                tiem:5000,
                showTip:false
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
                let _this = this;
                if(newVue.length > 0){
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
    .tip{
        position: fixed;
        text-align: center;
        width:100%;
        z-index: 10000;
        top:40%;
        .desc{
            display: inline-block;
            max-width: 50%;
            padding:0.1rem 0.3rem;
            border-radius: 0.4rem;
            background: #fff;
            box-shadow: 0rem 0.07rem 0.1rem rgba(0,0,0,.2);
            line-height: 0.5rem;
            font-size: $font-size-small-x;
        } 
    }

</style>
