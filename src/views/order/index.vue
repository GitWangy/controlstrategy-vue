<template>
    <div class="order-container">
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑路径导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>运输订单订单大全</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- /面包屑路径导航 -->
            </div>
            <!-- 数据筛选表单 -->
            <el-form ref="form" :model="form" label-width="40px" size="mini">
                <el-form-item label="状态">
                    <el-radio-group v-model="status">
                        <!--
                          el-radio 默认把 label 作为文本和选中之后的 value 值
                         -->
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">细石</el-radio>
                        <el-radio :label="1">尾矿粗砂</el-radio>
                        <el-radio :label="2">尾矿细砂</el-radio>
                        <el-radio :label="3">矿石</el-radio>
                        <el-radio :label="4">尾矿粗中砂</el-radio>
                        <el-radio :label="5">尾矿青粗砂</el-radio>
                        <el-radio :label="6">二矿</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="channelId" placeholder="请选择频道">
                        <el-option
                                label="全部"
                                :value="null"
                        ></el-option>
                        <el-option
                                :label="channel.name"
                                :value="channel.id"
                                v-for="(channel, index) in channels"
                                :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                            v-model="rangeDate"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                    />
                </el-form-item>
                <el-form-item>
                    <!--
                      button 按钮的 click 事件有个默认参数
                      当你没有指定参数的时候，它会默认传递一个没用的数据
                     -->
                    <el-button
                            type="primary"
                            :disabled="loading"
                            @click="loadArticles(1)"
                    >查询</el-button>
                </el-form-item>
            </el-form>
            <!-- /数据筛选表单 -->
        </el-card>
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
              <span>本次共100车，总金额为20万</span>
            </div>
            <!-- 数据筛选表单 -->
            <el-table
                    class = "list-table"
                    :data="tableData"
                    stripe
                    border
                    size = "small"
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
            <!-- /数据筛选表单 -->
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "OrderIndex",
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
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