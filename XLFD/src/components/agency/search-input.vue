<template>
    <div class="search-docker">
            <input :placeholder="placText" class="search-input" type="text" v-model="uName" maxlength="11">
            <span class="arrow-ele flex flex-center" @click="searchClick">
                <i style="color:#ffffff;font-size:0.5rem;" class="icon-arrows-right"></i>
            </span>
        </div>
</template>
<script>
export default {
    data(){
        return {
            uName:""
        }
    },
    props:{
        userName:{
            type:String,
            default:""
        },
        placText:{
            type:String,
            default:""
        }
    },
    // computed:{
    //     uName(){
    //         return this.userName
    //     }
    // },
    created(){
        this.uName=this.userName
    },
    watch:{
        uName(newValue,oldValue){
            console.log(oldValue)
            console.log(newValue)
            if(newValue==""){
                this.$emit('searchEvent',"")
            }
        }
    },
    methods:{
        searchClick(){
            this.$emit('searchEvent',this.uName)
        }
    }
}
</script>
<style lang="scss" scoped>
.search-docker{
        padding: 0.5rem 0.7rem;
        height: 1rem;
        .search-input{
            border-radius:0.2rem; 
            width: 100%;
            height: 100%;
            padding-left:0.2rem ;
        }
        .arrow-ele{
            width: 0.7rem;
            height: 0.7rem;
            background-color: #DA1C36;
            border-radius:0.05rem; 
            position:absolute;
            right: 1rem;
            top:0.65rem;
        }
    }
</style>

