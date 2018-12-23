<template>
    <div class="sub-reg">
        <div class="reg-register flex">
            <div class="reg-register-item flex-1 flex flex-center">下级开户</div>
            <div class="reg-register-item flex-1 flex flex-center">邀请码</div>
        </div>
        <div class="reg-code">
            <div class="sub-reg-type flex">
                <div class="sub-reg-item flex-2 flex flex-align-center">开户类型</div>
                <div class="sub-reg-item flex-3 flex flex-align-center">
                    <div class="sub-reg-circle">
                        <div class="sub-circle-center"></div>
                    </div>
                    <span>&nbsp;代理类型</span>
                </div>
                <div class="sub-reg-item flex-3 flex flex-align-center">
                    <div class="sub-reg-circle">
                        <div class=""></div>
                    </div>
                    <span>&nbsp;玩家类型</span>
                </div>
            </div>
            <div class="sub-reg-type flex flex-align-center">
                请先为下级设置返点，<b style="color:#DA1C36">点击查看返点赔率表</b>
            </div>
        </div>
        <div class="reb-table">
            <v-table :tableHeader="tableHeader" :tableData="tableData"></v-table>
        </div>
        <div class="fandian-list">
            <div></div>
        </div>
    </div>
</template>
<script>
import vTable from 'base/v-table/v-table';
export default {
    data(){
        return{
            tableHeader:[{
                name:"邀请码",
                field:"linkcode",
                style:""
            },{
                name:"生成时间",
                field:"createtime",
                style:""
            },{
                name:"状态",
                field:"state",
                style:""
            }],
            tableData:[{
                linkcode:"100",
                createtime:"2018-11-11 13:20:41",
                state:"注册(8)"
            },{
                linkcode:"-100",
                createtime:"2018-11-11 13:20:41",
                state:"注册(8)"
            }]
        }
    },
    components:{
        vTable,
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.sub-reg{
    height: 100%;
    width: 100%;
    background: #F2F2F2;
    position:absolute;
    top:0;
    .reg-register{
        padding: 0.3rem 0.5rem;
        .reg-register-item{
            background: #ffffff;
            font-size: $font-size-medium-x;
            height: 0.99rem;
            &:first-child{
                border-radius: 0.2rem 0 0 0.2rem;
            }
            &:last-child{
                border-radius: 0 0.2rem 0.2rem 0;
            }
            &.active{
                background: #DA1C36;
                color: #ffffff;
            }
        }
    }
    .reg-code{
        .sub-reg-type{
            background: #ffffff;
            height: 1.2rem;
            font-size: $font-size-medium-x;
            padding-left: 0.5rem;
            .sub-reg-circle{
                border-radius:50%; 
                border:1px solid  #DA1C36;
                width: 0.3rem;
                height: 0.3rem;
                padding: 0.08rem;
                .sub-circle-center{
                    background: #DA1C36;
                    width: 100%;
                    height: 100%;
                    border-radius:50%;
                }
            }
        }
    }
    .reb-table{
        margin-top: 0.3rem;
    }
}
</style>
