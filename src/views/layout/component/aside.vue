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
            <span slot="title">运输订单大全</span>
        </el-menu-item>
        <el-menu-item index="/dic">
            <i class="el-icon-setting"></i>
            <span slot="title">数据字典维护</span>
        </el-menu-item>
        <el-menu-item index="/dicWrite">
            <i class="el-icon-setting"></i>
            <span slot="title">字典录入</span>
        </el-menu-item>
        <el-menu-item index="/orderWrite">
            <i class="el-icon-setting"></i>
            <span slot="title">订单录入</span>
        </el-menu-item>
        <el-menu-item index="/data">
            <i class="el-icon-setting"></i>
            <span slot="title">跑批错误数据</span>
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