<template>
    <table class="sub-Table">
        <!-- <thead class="sub-Table-header">
            <tr class="sub-Table-hetr" align="center" valign="middle">
                <td>账号</td>
                <td>类型</td>
                <td>报表人数</td>
                <td>盈利</td>
            </tr>
        </thead>
        <tbody>
            <tr align="center">
                <td>oppo233</td>
                <td>1级代理</td>
                <td>111</td>
                <td>2222.222222</td>
            </tr>
            <tr align="center">
                <td>aa</td>
                <td>1级代理</td>
                <td>111</td>
                <td>222</td>
            </tr>
        </tbody> -->
        <thead class="sub-Table-header">
            <tr class="sub-Table-hetr" align="center" valign="middle">
                <td v-for="(v,k) in tableHeader" :key="k">{{v.name}}</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(v,k) in tableData" :key="k" align="center">
                <td v-for="(v1,k1) in v" :key="k1">{{v1}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props:{
        tableHeader:{
            type:Array,
            default:()=>[]
        },
        tableData:{
            type:Array,
            default:()=>[]
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';

.sub-Table{
    width: 100%;
    background: #ffffff;
    thead td{
        height: 1.3rem;
    }
    thead,tr{
        width: 100%;
        border-bottom: 1px solid  #F6F6F6;
    }
    td{
        height: 1.1rem;
        vertical-align: middle;
        font-size: $font-size-medium-x;
    }
}
</style>
