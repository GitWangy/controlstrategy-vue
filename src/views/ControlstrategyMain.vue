<template>
    <div class="el-conrainerMain">
        <el-container>
            <el-header>

                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>王小虎</span>
                <span class="title"> 车控结费系统 </span>
                </el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "controlstrategyMain"
    }
</script>

<style scoped>
    .el-header {
        background-color: #409EFF;
        color: #333;
        line-height: 60px;
    }
    .title {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    .el-container {
        height: 400px;
    }
    .el-conrainerMain  {
        width: 100%;
        height: 100%;
        background: #F2F6FC;
        position: absolute;
    }
</style>