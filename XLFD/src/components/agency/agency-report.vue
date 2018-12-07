<template>
    <div class="report-wapper">
        <search-input></search-input>
        <div class="report-List flex">
            <div class="report-item flex flex-v flex-center" v-for="(v,k) in reportList" :key="k">
                <div class="report-item-count">{{v.count}}</div>
                <div class="report-item-name">{{v.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import searchInput from './search-input';
export default {
    data(){
        return {
            reportList:[{
                count:"￥30",
                name:"投注金额"
            },{
                count:"￥30",
                name:"投注金额"
            },{
                count:"￥30",
                name:"投注金额"
            },{
                count:"￥30",
                name:"投注金额"
            },{
                count:"￥30",
                name:"投注金额"
            },{
                count:"￥30",
                name:"投注金额"
            },]
        }
    },
    components:{
        searchInput,
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';

.report-wapper{
    height: 100%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .report-List{
        flex-wrap:wrap;
        .report-item{
            flex: 0 0 33%;
            background: #ffffff;
            height: 3.3rem;
            box-sizing: border-box;
            font-size: $font-size-medium-x;
            &>div:first-child{
                padding-bottom: 0.3rem;
            }
            .report-item-count{
                color: #CD9E62;
            }
        }
    }
}
</style>
