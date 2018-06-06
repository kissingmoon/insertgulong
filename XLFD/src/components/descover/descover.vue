<template>
    <div class="home">
        descover
    </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    export default {
        data(){
            return{
                header: {
                    title:'精彩发现',
                    back:false,
                    service:true,
                    message:true,
                    rechargeTip:false,
                    time:false,
                    moneyType:false
                }
            }
        },
        created(){
            this.setHeader(this.header);
        },
        methods:{
            ...mapMutations({
                setHeader:'SET_HEADER'
            })
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
.home{
}
</style>
