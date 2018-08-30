<template>
    <div class="mainwapper flex">
        <scroll>
            <div class="maincontent">
                <h1 class="flex flex-1">dwdwwd</h1>
                <h1 class="flex flex-3">dwdwwd</h1>
            </div>
        </scroll>
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';

export default {
    data(){
        return {
        }
    },
    components:{
        Scroll
    }
}
</script>
<style lang="scss" scoped>
    .mainwapper{
        position: fixed;
        width: 100%;
        top: 1.2rem;
        bottom: 1.44rem;      
            .maincontent{
                height: 200vh;
            }
    }
</style>

