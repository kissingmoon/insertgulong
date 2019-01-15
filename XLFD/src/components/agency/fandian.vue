<template>
    <ul class="fandian-wapper" v-show="hasData" @click.stop>
        <li class="flex flex-pack-justify fandian-header">
           <div class="flex flex-center">返点详情</div> 
           <div class="flex flex-center" @click.stop="closeSelf">X</div>
        </li>
        <li class="flex flex-pack-justify fandian-item" v-for="(v,k) in fandianObj" :key="k" :style="typeof v =='object'?'':hidden">
            <div class="flex flex-center">{{v.name}}</div>
            <div class="flex flex-center">{{v.fandian}}</div>
        </li>
    </ul>
</template>

<script>
import vTable from 'base/v-table/v-table';
import * as network  from './network.js'
import * as dataHandle  from './dataHandle.js'
import * as dataMaker  from './dataMaker.js'
import data  from "./data.js";
import {mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    data(){
        return {
            fandianObj:{},
            hidden:{
                display:"none"
            },
            hasData:false
        }
    },
    props:{
        uID:{
            type:String,
            default:""
        },
        byNetwork:{
            type:Boolean,
            default:false
        },
        fandianData:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            if(this.byNetwork){
                let parm={}
                parm.userId = this.uID
                network.getSubRebate(this,parm)
                .then((res)=>{
                    if(res.data && !res.data.errorCode){
                        this.hasData=true
                        this.fandianObj=dataHandle.createSelfRebate(res)
                    }else{
                        this.$emit('closeFandian')
                    }
                })
            }else{
                this.hasData=true
                this.fandianObj = this.fandianData
            }
        },
        closeSelf(){
            this.$emit('closeFandian')
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.fandian-wapper{
    width: 100%;
    li{
        height: 1.2rem;
    }
    .fandian-header{
        padding: 0 1.5rem 0 0.5rem ;
    }
    .fandian-item{
        padding: 0 1.5rem 0 0.5rem ;
        border-top: 1px solid  #F6F6F6;
    }
}
</style>
