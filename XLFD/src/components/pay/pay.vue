<template>
    <div class="home">
        pay
    </div>
</template>
<script>
    import {setHeader} from 'common/js/param';
    export default {
        data(){
            return{
                header: {
                    title:'充值',
                    service:true,
                    rechargeTip:true
                }
            }
        },
        created(){
            setHeader(this.header);
        },
        methods:{
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
.home{
}
</style>
