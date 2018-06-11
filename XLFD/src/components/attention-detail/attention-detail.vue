<template>
    <parcel>
        <div class="attention-detail" :class="!order.finish_status? 'bottom-2rem':''">
            <div class="author-wrapper">
                <attention-list :data="author"></attention-list>
            </div>
            <scroll ref="scroll" class="scroll-content" :data="order">
                <div class="order-wrapper">
                    <order-list :data="order"></order-list>
                </div>
            </scroll>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import OrderList from 'base/order-list/order-list';
    import AttentionList from 'base/attention-list/attention-list';
    import {httpUrl,betType} from 'common/js/map';
    export default {
        data() {
            return{
                author:[],
                order:[],
            }
        },
        components:{
            Parcel,
            Scroll,
            AttentionList,
            OrderList
        },
        created() {
            this.getDetail();
        },
        methods: {
            getDetail(){
                const user_flag = this.$router.history.current.query.flag;
                this.$axios.postRequest(httpUrl.info.attentionDatail,{user_flag})
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.author.push(res.data.ds_info);
                        this.order=res.data.gd_list;
                    };
                });
            }
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.attention-detail{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 300;
    background: $color-bg;
    .author-wrapper{
    }
    .scroll-content{
        height:calc(100% - 2rem);
        overflow: hidden;
        .order-wrapper{
            height:auto;
            overflow: hidden;
        }
    }
}
</style>
