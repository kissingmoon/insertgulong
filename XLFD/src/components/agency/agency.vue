<template>
    <div class="agency-wapper">
    <Tabs value="name1" class="tab-content" @clickEvent="tabClickedFun">
        <!-- <TabPane label="标签一" name="name1">标签一的内容</TabPane>
        <TabPane label="标签二" name="name2">标签二的内容</TabPane> -->
        <div slot="TabPane" class="tab-pane">标签一的内容</div>
        <div slot="TabPane" class="tab-pane">标签二的内容</div>
        <div slot="TabPane" class="tab-pane">标签3的内容</div>
        <div slot="TabPane" class="tab-pane">标签4的内容</div>
    </Tabs>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                TabPaneOn:'TabPaneOn'
            }
        },
        methods:{
            tabClickedFun(target){
                console.log("当前被电击的元素",target)
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.agency-wapper{ 
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 203;
    background: $color-bg-gray;
    overflow: auto;
    .tab-content{
        display: flex;
        .tab-pane{
            width: 5rem;
            background: red;
        }
        .tab-pane-on{
            background: blue;
        }
    }
}
 
</style>
