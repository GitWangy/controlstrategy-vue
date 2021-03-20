<template>
    <div class="order-container">
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑路径导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>运输订单大全</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- /面包屑路径导航 -->
            </div>
            <!-- 数据筛选表单 -->
            <el-form ref="form" :model="form" label-width="40px" size="mini">
                <el-form-item label="状态">
                    <el-radio-group v-model="items">
                        <!--
                          el-radio 默认把 label 作为文本和选中之后的 value 值
                         -->
                        <el-radio :label="null">全部</el-radio>
                        <el-radio label="t001">细石</el-radio>
                        <el-radio label="t002">尾矿粗砂</el-radio>
                        <el-radio label="t003">尾矿细砂</el-radio>
                        <el-radio label="t004">矿石</el-radio>
                        <el-radio label="t005">尾矿粗中砂</el-radio>
                        <el-radio label="t006">尾矿青粗砂</el-radio>
                        <el-radio label="t007">二矿</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="站点">
                    <el-select v-model="supplierStation" placeholder="请选择站点">
                        <el-option
                                label="全部"
                                :value="null"
                        ></el-option>
                        <el-option
                                :label="controlDic.dicName"
                                :value="controlDic.dicCode"
                                v-for="(controlDic, index) in controlDics"
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
                            @click="loadOrderBasicInfo(1)"
                    >查询</el-button>
                </el-form-item>
            </el-form>
            <!-- /数据筛选表单 -->
        </el-card>
        <el-card class="filter-card">
            <div slot="header" class="clearfix">
                <el-button
                        type="primary"
                        :disabled="loading"
                        @click="clickTotalAmount()"
                >点击查看当前总金额</el-button>
                <el-button
                        type="primary"
                        :disabled="loading"
                        @click="exportO()"
                >导出</el-button>
            </div>
            <!-- 数据筛选表单 -->
            <el-table
                    class = "list-table"
                    :data="orders"
                    stripe
                    size = "small"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="订单id"
                >
                </el-table-column>
                <el-table-column
                        prop="items"
                        label="类型"
                >
                </el-table-column>
                <el-table-column
                        prop="licenseNumber"
                        label="运输车牌号"
                >
                </el-table-column>
                <el-table-column
                    prop="orderDate"
                    label="订单日期"
            >
            </el-table-column>
                <el-table-column
                    prop="orderNumber"
                    label="订单单号"
            >
            </el-table-column>
                <el-table-column
                    prop="supplierStation"
                    label="站点"
            >
            </el-table-column>
                <el-table-column
                    prop="supperlier"
                    label="供货人"
            >
            </el-table-column>
                <el-table-column
                        prop="suttle"
                        label="净重"
                >
                </el-table-column>
                <el-table-column
                        prop="unitPrice"
                        label="单价"
                >
                </el-table-column>
                <el-table-column
                        prop="totalAmountOrder"
                        label="金额"
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
                    current-page = "currentPage"
                    @current-change="onCurrentChange"
                    layout="prev, pager, next"
                    :total="totalCount">
            </el-pagination>
            <!-- /数据筛选表单 -->
        </el-card>
    </div>
</template>

<script>
    import {getAllOrderBasicInfo} from "../../api/order";
    import {getAllControDicByType} from "../../api/order"
    import {updateOrInsertTransportOrder,exportMethod,exportOrderInfo} from "../../api/order"
    import requset from "../../utils/request";
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
                orders:[],
                controlDics:[],
                totalCount:0,
                items:null,
                supplierStation:null,
                rangeDate:[],
                currentPage:1,
                totalAmount : null
            }
        },
        created() {
            this.loadOrderBasicInfo(1)
            this.loadControlDicInfo(1);
        },
        methods: {
            loadControlDicInfo(dicType) {
                getAllControDicByType({
                dicType : dicType
            }).then(res =>{
                this.controlDics = res.data.data
            })
            },
            loadOrderBasicInfo (page) {
                getAllOrderBasicInfo({
                    offset:page,
                    limit:5,
                    startDate:this.rangeDate[0],
                    endDate:this.rangeDate[1],
                    orderNumber:null,
                    supplierStation:this.supplierStation,
                    items : this.items
                }).then(
                    res=>{
                        this.orders = res.data.data.list
                        this.totalCount = res.data.data.total
                        this.totalAmount = res.data.data.list[0].totalAmount
                        this.currentPage = res.data.data.currentPage
                })
            },
            exportO(){
                exportMethod({
                    startDate:this.rangeDate[0],
                    endDate:this.rangeDate[1],
                    orderNumber:null,
                    supplierStation:this.supplierStation,
                    items : this.items,
                    filename : '订单统计'
                })
            },
            handleDetailClick(id){
                this.$router.push({path:'/orderWrite',query: {id:id}})
            },
            handleClick(id){
                updateOrInsertTransportOrder(
                    {
                        id:id,
                        valid : 0
                    }
                ).then(
                    this.loadOrderBasicInfo(1),
                    this.currentPage = 1
                )
            },
            onCurrentChange(page){
                this.loadOrderBasicInfo(page)
            },
            clickTotalAmount () {
                alert("本次车数共："+this.totalCount+"车 "+"总计金额共："+this.totalAmount+"元")
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