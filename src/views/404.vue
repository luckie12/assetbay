<template>
        <div id="bg-img" :style="{height: height + 'px'}"></div>
</template>

<script>
    //Get window height?
    export default {
        data(){
            return{
                height: ''
            }
        },
        created() {
            this.height = screen.height
        }
    }


</script>

<style>
    #bg-img{
        background: url(http://www.reactiongifs.us/wp-content/uploads/2015/04/nothing_to_see_here_naked_gun.gif) no-repeat center center fixed;
        /* Full height */

        /* Center and scale the image nicely */
        background-size: cover;
    }
</style>