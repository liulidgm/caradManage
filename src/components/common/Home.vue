<template>
    <div class="wrapper">
        <v-head :userName="userName"></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    export default {
        data(){
            return{
                userName:''
            }
        },
        mounted(){
            this.userName = this.$route.query.userName;
        },
        components:{
            vHead, vSidebar
        }
    }
</script>
