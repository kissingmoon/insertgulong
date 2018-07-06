<template>
    <parcel>
        <div class="nick">
            <ul class="nick-wrapper">
                <li>
                    <p class="txt-con border-bottom-1px">
                        <input type="text" v-model="nick_name" autocomplete="off" class="input-txt red" maxlength="6" >
                    </p>
                </li>
                <li>
                    <button class="nick-btn" @click="editNick">保存</button>
                </li>
            </ul>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapGetters,mapActions,mapMutations} from 'vuex';
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                header: {
                    title:'修改昵称',
                    back:true
                },
                nick_name:''
            }
        },
        components:{
            Parcel
        },
        created() {
            this.setNickName();
        },
        computed: {
            ...mapGetters([
                'account'
            ])
        },
        methods: {
            editNick(){
                let nick={nick_name:this.nick_name};
                this.$axios.postRequest(httpUrl.info.editNick,nick)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.setTip('修改成功')
                        this.getUser();
                        this.$router.back();
                    };
                });
            },
            setNickName(){
                setTimeout(() =>{
                    this.nick_name=this.account.nick_name;
                },200)
            },
            ...mapActions([
                'getUser'
            ]),
            ...mapMutations({
                setTip:'SET_TIP',
            })
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.nick{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 201;
    background: $color-bg;
    .nick-wrapper{
        padding:0.56rem;
        .txt-con{
            height: auto;
            overflow: hidden;
            @include border-bottom-1px(solid,$color-border-gray);
            .input-txt{
                height:1rem;
                width:100%;
                line-height: 1rem;
                font-size: $font-size-medium-x;
            }
            .input-txt::placeholder{
                font-size: $font-size-small-x;
            }

        }
        .nick-btn{
            height:1.17rem;
            width:100%;
            text-align: center;
            background:$color-red;
            color: #fff;
            font-size: $font-size-large;
            border-radius: 0.1rem;
            border:0;
            margin-top: 0.6rem;
        }
    }
}
</style>

