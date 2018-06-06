<template>
    <parcel>
        <div class="nick">
            <ul class="nick-wrapper">
                <li>
                    <p class="txt-con border-1px">
                        <input type="text" autocomplete="off" class="input-txt red">
                    </p>
                </li>
                <li>
                    <button class="nick-btn">保存</button>
                </li>
            </ul>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {setHeader} from 'common/js/param';
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                header: {
                    title:'修改昵称',
                    back:true
                }
            }
        },
        components:{
            Parcel
        },
        created() {
            setHeader(this.header);
        },
        methods: {
        }
    }
</script>
<style lang="scss">
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
            @include border-1px($color-border-gray);
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
            background:$color-bg-theme;
            color: #fff;
            font-size: $font-size-large;
            border-radius: 0.1rem;
            border:0;
            margin-top: 0.6rem;
        }
    }
}
</style>

