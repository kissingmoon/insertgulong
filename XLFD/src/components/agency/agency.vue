<template>
    <div class="agency-wapper">
        <div class="agency-ImgDocker"></div>
        <div class="agency-ItemCont">
            <div v-for="(v,k) in agencyList" :key="k">
                {{v.name}}
                <i @click="goto(v.comptUrl)" class="icon-arrows-right backIco"></i>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                agencyList:[{
                    name:"代理说明",
                    comptUrl:"/agency/instruction"
                },{
                    name:"代理报表",
                    comptUrl:"/agency/agencyReport"
                },{
                    name:"下级报表",
                    comptUrl:"/agency/subReport"
                },{
                    name:"下级开户",
                    comptUrl:"/agency/subReg"
                },{
                    name:"会员管理",
                    comptUrl:"/agency/memberManger"
                },{
                    name:"投注明细",
                    comptUrl:"/agency/betDetail"
                },{
                    name:"交易明细",
                    comptUrl:"/agency/tradDetail"
                }]
            }
        },
        components:{
        },
        computed: {
        },
        methods:{
            ChooseTab(comptName){
                this.currentTab = comptName;
            },
            goto(infoUrl){
                // const url = this.user_token ? infoUrl:'/login';
                this.$router.push({
                    path:infoUrl
                });
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
    z-index: 100;
    background: $color-bg-gray;
    overflow: auto;
}
 
</style>
