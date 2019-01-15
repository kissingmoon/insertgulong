<template>
    <div class="agency-wapper">
        <div class="agency-ImgDocker">
            <img class="agency-link" src="./agency-link.png" alt="">
        </div>
        <div class="agency-ItemCont">
            <div class="agency-Item flex flex-align-center flex-pack-justify" v-for="(v,k) in agencyList" :key="k" @click="goto(v.comptUrl)">
                {{v.name}}
                <i  class="icon-arrows-right backIco"></i>
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
    // position: fixed;
    position:absolute;
    width: 100%;
    top: 0;
    bottom: 0rem;
    z-index: 100;
    background: #ffffff;
    overflow: auto;
    .agency-ImgDocker{
        height: 4.7rem;
        .agency-link{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .agency-ItemCont{
        padding: 0 0 0 0.5rem;
        .agency-Item{
            height: 1.4rem;
            padding: 0 0.5rem 0 0;
            font-size: $font-size-medium-x;
            border-bottom: 1px solid  #F6F6F6;
            .backIco{
                color: rgb(175, 175, 174);
            }
        }
    }
    
}
 
</style>

