<template>
    <el-container class = "container">
        <el-aside class="aside" width="auto">
            <AppAside class = "aside-menu" :is-collapse="isCollapse"/>
        </el-aside>
        <el-container>
            <el-header class = "header">
                <div>
                    <i :class="{
              'el-icon-s-fold': isCollapse,
              'el-icon-s-unfold': !isCollapse
            }" @click="isCollapse = !isCollapse"></i>
                    <span>后台管理</span>
                </div>
                <el-dropdown>
                    <div class="el-wrap">
                        <img class="warp-image" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2290325873,1283429441&fm=26&gp=0.jpg" alt="">
                        <span>{{user.userName}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main class = "main">
                <!--子路由出口-->
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import AppAside from "./component/aside";
    import {getUserProfile} from "../../api/user"
    export default {
        name: "index",
        components: {AppAside},
        props: {},
        data () {
            return {
                user: {}, // 当前登录用户信息
                isCollapse: false // 侧边菜单栏的展示状态
            }
        },
        computed: {},
        watch: {},
        created () {
            // 组件初始化好，请求获取用户资料
            this.loadUserProfile()

            // 注册自定义事件
            // 当这个事件发布以后，这个注册函数就会被调用到
/*            globalBus.$on('update-user', (data) => {
                // this.user = data // 注意：不要这么做，对象之间赋值的是引用，会导致相互影响的问题
                this.user.name = data.name
                this.user.photo = data.photo
            })*/
        },
        mounted () {},
        methods: {
            // 除了登录接口，其它所有接口都需要授权才能请求使用
            // 或者说，除了登录接口，其它接口都需要提供你的身份令牌才能获取数据
            loadUserProfile () {
                console.log(getUserProfile())
                getUserProfile().then(res => {
                    this.user = res.data.data
                })
            },

            onLogout () {
                this.$confirm('确认退出吗？', '退出提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 把用户的登录状态清除
                    window.localStorage.removeItem('user')
                    window.localStorage.removeItem('jwt')
                    // 跳转到登录页面
                    this.$router.push('/login')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .aside-menu {
        height: 100%;
    }
    .header {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }
    .container {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .el-wrap {
        display: flex;
        align-items: center;
    }
    .warp-image{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>