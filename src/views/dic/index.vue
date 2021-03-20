<template>
    <div class="order-container">
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑路径导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>数据字典维护</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- /面包屑路径导航 -->
            </div>
            <!-- 数据筛选表单 -->
            <el-form ref="form" :model="form" label-width="80px" size="mini">
                <el-form-item label="字典类型">
                    <el-radio-group v-model="dicType">
                        <!--
                          el-radio 默认把 label 作为文本和选中之后的 value 值
                         -->
                        <el-radio :label="null">全部</el-radio>
                        <el-radio label="1">站点</el-radio>
                        <el-radio label="2">品目</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="有效字典">
                    <el-radio-group v-model="valid">
                        <!--
                          el-radio 默认把 label 作为文本和选中之后的 value 值
                         -->
                        <el-radio :label="null">全部</el-radio>
                        <el-radio label="1">有效</el-radio>
                        <el-radio label="0">无效</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <!--
                      button 按钮的 click 事件有个默认参数
                      当你没有指定参数的时候，它会默认传递一个没用的数据
                     -->
                    <el-button
                            type="primary"
                            :disabled="loading"
                            @click="loadDicBasicInfo(1)"
                    >查询</el-button>
                </el-form-item>
            </el-form>
            <!-- /数据筛选表单 -->
        </el-card>
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
            </div>
            <!-- 数据筛选表单 -->
            <el-table
                    class = "list-table"
                    :data="dic"
                    stripe
                    size = "small"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="字典id"
                >
                </el-table-column>
                <el-table-column
                        prop="dicCode"
                        label="字典代码"
                >
                </el-table-column>
                <el-table-column
                        prop="dicName"
                        label="字典中文名称"
                >
                </el-table-column>
                <el-table-column
                        prop="dicType"
                        label="字典类型"
                >
                </el-table-column>
                <el-table-column
                        prop="valid"
                        label="是否有效"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.id)" type="text" size="small">删除</el-button>
                        <el-button @click="handleDetailClick(scope.row.id)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                    background
                    :page-size="5"
                    @current-change="onCurrentChange"
                    layout="prev, pager, next"
                    :total="totalCount">
            </el-pagination>
            <!-- /数据筛选表单 -->
        </el-card>
    </div>
</template>

<script>
    import {getControDicByParam} from "../../api/order"
    import {updateControDicByParam} from "../../api/order"
    export default {
        name: "DicIndex",
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
                dic:[],
                totalCount:0,
                dicType:null,
                valid:null,
                size:null
            }
        },
        created() {
            this.loadDicBasicInfo(1);
        },
        methods: {
            loadDicBasicInfo (page) {
                getControDicByParam({
                    offset:page,
                    limit:5,
                    dicType : this.dicType,
                    valid: this.valid
                }).then(
                    res=>{
                        this.dic = res.data.data.list
                        this.totalCount = res.data.data.total
                       // this.size = this.totalCount/5
                    })
            },
            handleClick(id){
                updateControDicByParam({
                    id : id,
                    valid : 0
                }).then(
                    this.loadDicBasicInfo(1)
                )
            },
            handleDetailClick(id){
                this.$router.push({path:'/dicWrite',query: {id:id}})
            },
            onSubmit() {
                console.log('submit!');
            },
            onCurrentChange(page){
                this.loadDicBasicInfo(page)
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