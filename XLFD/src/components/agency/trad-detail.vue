<template>
    <div class="trad-detail-wapper">
        <Tabs value="name1" class="tab-content" @clickEvent="tabClickedFun">
        <ul slot="TabPane" class="tab-pane flex">
            <li class="flex flex-center flex-1" v-for="(v,k) in tabList" :key="k" :data-index="k"  :class="{ active: k==activeTabIndex}">{{v.name}}</li>
        </ul>
        </Tabs>
        <select-time v-if="show_time" @setTimeType="setTimeType" :selectOption='selectOption'></select-time>
    </div>
</template>
<script>
import {headerConfig} from 'common/js/map';
import {mapGetters,mapMutations,mapActions} from 'vuex';
import SelectTime from 'base/select-time/select-time';

export default {
    data(){
            return{
                TabPaneOn:'TabPaneOn',
                tabList:[
                    {
                        name:"所有类型"
                    },
                    {
                        name:"提现记录"
                    },
                    {
                        name:"充值记录"
                    }
                ],
                activeTabIndex:0,
                selectOption:{
                    itemList:headerConfig['/agency/betDetail'].filterConfig.name,
                    eleClass:"text-center",
                    parent:"agency"
                }
            }
        },
         computed: {
            ...mapGetters([
                'show_time'
            ])
        },
        components:{
            SelectTime,
        },
        mounted(){
        },
        methods:{
            tabClickedFun(target){
                this.activeTabIndex=target.dataset.index;
            },
            setTimeType(type){
            
            },
        }
}
</script>
<style lang="scss" scoped>
.trad-detail-wapper{
    min-height: 100%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .tab-content{
        background: #ffffff;
        .tab-pane{
            height: 1.3rem;
            .active{
                color: #DA1C36;
            }
        }
    }
}
</style>
