<template>
    <div class="home">
        discount
    </div>
</template>
<script>
    import {setHeader} from 'common/js/param';
    export default {
        data(){
            return{
                header: {
                    title:'优惠活动',
                    service:true,
                    message:true
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
