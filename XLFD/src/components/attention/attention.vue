<template>
    <parcel>
        <div class="attention">
            <scroll ref="scroll" class="scroll-content" >
                <attention-list></attention-list>
            </scroll>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import attentionList from 'base/attention-list/attention-list';
    import {httpUrl} from 'common/js/map';
    export default{
        data() {
            return{
            }
        },
        components:{
            Parcel,
            Scroll,
            attentionList
        },
        created() {
        },
        methods: {
        
        }
    }
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.attention{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .scroll-content{
        height:100%;
        overflow: hidden;
    }
}
</style>
