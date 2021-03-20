<template>
    <div class="order-container">
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑路径导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>跑批错误数据</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- /面包屑路径导航 -->
            </div>
            <!-- 数据筛选表单 -->
            <el-button
                    type="primary"
                    :disabled="loading"
                    @click="onSubmit()"
            >校验数据正确性</el-button>
            <!-- /数据筛选表单 -->
        </el-card>
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <span>本次输入的错误数据</span>
            </div>
            <!-- 数据筛选表单 -->
            <el-table
                    class = "list-table"
                    :data="data"
                    stripe
                    size = "small"
                    style="width: 100%">
                <el-table-column
                        prop="transportId"
                        label="错误的订单号"
                >
                </el-table-column>
                <el-table-column
                        prop="transportErrAmount"
                        label="错误的金额(元)"
                >
                </el-table-column>
                <el-table-column
                        prop="transportOkAmount"
                        label="修改后的金额（元）"
                >
                </el-table-column>
            </el-table>
            <!-- /数据筛选表单 -->
        </el-card>
    </div>
</template>

<script>
    import {getErrDate,batchRunningData} from "../../api/order"
    export default {
        name: "DataIndex",
        data() {
            return {
              data : null
            }
        },
    created() {
            this.loadErrData()
    },
        methods: {
            loadErrData() {
                getErrDate({
                }).then(res =>{
                    this.data = res.data.data
                })
            },
            onSubmit() {
                batchRunningData({}).then(res=>{
                    alert("跑批结束")
                })
            }
        }
    }
</script>

<style scoped>
    .filter-card {
        margin-bottom: 30px;
    }
    .list-table{
        margin-bottom: 20px;
    }
</style>