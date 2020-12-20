<template>
    <el-menu
            default-active="2"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :collapse="isCollapse"
    >
        <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/order">
            <i class="el-icon-setting"></i>
            <span slot="title">运输订单订单大全</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">信息列表</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">信息发布</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">信息发布</span>
        </el-menu-item>
        <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">信息发布</span>
        </el-menu-item>
        <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">信息发布</span>
        </el-menu-item>
        <el-menu-item index="7">
            <i class="el-icon-setting">个人设置</i>
            <span slot="title"></span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "AppAside",
        components: {},
        props: ['is-collapse'],
        data () {
            return {
                // isCollapse: true
            }
        },
        computed: {},
        watch: {},
        created () {},
        mounted () {},
        methods: {}
    }
</script>

<style scoped>

</style>