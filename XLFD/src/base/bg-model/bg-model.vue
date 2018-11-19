<template>
    <div class="bg-grey" @click="closeList"></div>
</template>
<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';

export default {
    data(){
        return {
            MutationObj:{
            }
        }
    },
    props:{
        close:{
            type: Array,
            default:[]
        }
    },
    methods:{
        closeList(){
            this.close.map((v,k)=>{
                this.MutationObj["set"+k] = v;
                this.$store.commit(this.MutationObj["set"+k],false)
            })
        }
    }
    
}
</script>
<style lang="scss" scoped>
.bg-grey{
    position: fixed;
    top: 1.2rem;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background-color: #000;
    opacity: .7;
    overflow: hidden;
}
</style>
