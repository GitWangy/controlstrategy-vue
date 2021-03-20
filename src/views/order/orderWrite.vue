<template>
    <div class="el_contain">
        <el-card class="filter-card">
            <el-form ref="form" :model="order" label-width="120px" class = "dic_detail" >
                <el-form-item label="运输车牌号" style="width: 60%"  >
                    <el-input v-model="order.licenseNumber"></el-input>
                </el-form-item>
                <el-form-item label="订单日期" style="width: 60%">
                    <el-input v-model="order.orderDate"></el-input>
                </el-form-item>
                <el-form-item label="订单单号" style="width: 60%"  >
                    <el-input v-model="order.orderNumber"></el-input>
                </el-form-item>
                <el-form-item label="供货人" style="width: 60%">
                    <el-input v-model="order.supperlier"></el-input>
                </el-form-item>

                <el-form-item label="类型">
                    <el-select v-model="order.items" placeholder="请选择品目类型">
                        <el-option
                                label="全部"
                                :value="null"
                        ></el-option>
                        <el-option
                                :label="controType.dicName"
                                :value="controType.dicCode"
                                v-for="(controType, index) in controTypes"
                                :key="index"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="站点">
                    <el-select v-model="order.supplierStation" placeholder="请选择站点">
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


                <el-form-item label="净重" style="width: 60%"  >
                    <el-input v-model="order.suttle"></el-input>
                </el-form-item>
                <el-form-item label="单价" style="width: 60%"  >
                    <el-input v-model="order.unitPrice"></el-input>
                </el-form-item>
                <el-form-item label="金额" style="width: 60%"  >
                    <el-input v-model="order.totalAmountOrder"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="margin-right:220px"  @click="onSubmit ">保存</el-button>
                    <el-button class ="el_button" @click="returnSubmit ">返回</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {getAllControDicByType, getControDicById} from "../../api/order"
    import {updateOrInsertTransportOrder} from "../../api/order"
    import {getTransPortOrderById} from "../../api/order"
    export default {
        name: "dicWrite",
        data() {
            return {
                order:{
                    licenseNumber:null,
                    orderDate:null,
                    orderNumber:null,
                    supperlier:null,
                    items:null,
                    supplierStation:null,
                    suttle:null,
                    unitPrice:null,
                    totalAmountOrder:null
                },
                controlDics:[],
                controTypes:[],
            }
        },
        created() {
            this.getDetail();
            this.loadControlDicInfo(1);
            this.loadControlTypeInfo(2);
        },
        methods: {
            onSubmit() {
                if (this.order.licenseNumber == null || this.order.orderDate == null ||
                this.order.orderNumber == null || this.order.supperlier == null || this.order.items == null ||
                this.order.supplierStation == null || this.order.suttle == null || this.order.unitPrice == null ||
                this.order.totalAmountOrder == null ) {
                    alert("请输入全部参数");
                } else {
                    updateOrInsertTransportOrder({
                        supperlier: this.order.supperlier,
                        licenseNumber: this.order.licenseNumber,
                        orderNumber: this.order.orderNumber,
                        items: this.order.items,
                        specification: this.order.specification,
                        roughWeight: this.order.roughWeight,
                        suttle: this.order.suttle,
                        unitPrice: this.order.unitPrice,
                        totalAmountOrder: this.order.totalAmountOrder,
                        reportYear: this.order.reportYear,
                        supplierStation: this.order.supplierStation,
                        orderDate: this.order.orderDate,
                    }).then(res => {
                        alert("保存成功")
                        this.$router.go(-1)
                    })
                }
            },
            loadControlDicInfo(dicType) {
                getAllControDicByType({
                    dicType : dicType
                }).then(res =>{
                    this.controlDics = res.data.data
                })
            },
            loadControlTypeInfo(dicType) {
                getAllControDicByType({
                    dicType : dicType
                }).then(res =>{
                    this.controTypes = res.data.data
                })
            },
            returnSubmit(){
                this.$router.go(-1)
            },
            getDetail() {
                var id = this.$route.query.id
                console.log(id);
                if (id != null) {
                    // 返显
                    getTransPortOrderById({
                        id : id
                    }).then(res =>{
                        this.order = res.data.data
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .filter-card {
        padding: 100px;
        min-width: 400px;
    }
    .dic_detail {
        margin-left: 100px;
    }
</style>