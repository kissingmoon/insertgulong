<template>
    <div class="member-wapper">
        <div class="sub-Table_Docker">
            <table class="sub-Table">
                <thead class="sub-Table-header">
                    <tr class="sub-Table-hetr" align="center" valign="middle">
                        <td>账号</td>
                        <td>类型</td>
                        <td>登陆时间</td>
                        <td>下级人数</td>
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
                </tbody>
            </table>
        </div>
        <div class="no-record-div">
            <img src="./no-record.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.member-wapper{
    height: 100%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .sub-Table_Docker{
        width: 100%;
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
    }
    .no-record-div{
        overflow: hidden;
        img{
            display: block;
            margin: 0 auto;
            width: 4.8rem;
            height: 3.2rem;
        }
    }
}
</style>
