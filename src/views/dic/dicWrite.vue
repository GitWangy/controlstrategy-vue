<template>
    <div class="el_contain">
        <el-card class="filter-card">
        <el-form ref="form" :model="dic" label-width="120px" class = "dic_detail" :rules = "formRules">
            <el-form-item label="字典代码" style="width: 60%" prop = "dicCode" >
                <el-input v-model="dic.dicCode"></el-input>
            </el-form-item>
            <el-form-item label="字典名称" style="width: 60%" prop = "dicName">
                <el-input v-model="dic.dicName"></el-input>
            </el-form-item>
            <el-form-item label="字典类型" >
                <el-select v-model="dic.dicType" placeholder="请选择字典类型">
                    <el-option label="品目" value="2"></el-option>
                    <el-option label="站点" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否有效">
                <el-select v-model="dic.valid" placeholder="请选择是否生效">
                    <el-option label="有效" value="1"></el-option>
                    <el-option label="无效" value="0"></el-option>
                </el-select>
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
    import {getControDicById} from "../../api/order"
    import {updateControDicByParam} from "../../api/order"
    export default {
        name: "dicWrite",
        data() {
            return {
                dic: {
                    id: '',
                    dicCode: '',
                    dicName: '',
                    dicType: '1',
                    valid: '1',
                },
                formRules: {
                    dicCode: [
                        { required: true, message: '请输入字典代码', trigger: 'blur' },
                    ],
                    dicName: [
                        { required: true, message: '请输入字典名称', trigger: 'blur' },
                    ]
                }
            }
        },
    created() {
        this.getDetail();
    },
        methods: {
            onSubmit() {
                if (this.dic.dicCode == null || this.dic.dicName == null || this.dic.dicName == "" || this.dic.dicCode == "") {
                    alert("请输入数据，否则无法保存")
                } else {
                    updateControDicByParam({
                        id: this.dic.id,
                        dicCode: this.dic.dicCode,
                        dicName: this.dic.dicName,
                        dicType: this.dic.dicType,
                        valid: this.dic.valid,
                    }).then(res => {
                        alert("保存成功")
                        this.$router.go(-1)
                    })
                }
            },
            returnSubmit(){
                this.$router.go(-1)
            },
            getDetail() {
                var id = this.$route.query.id
                if (id != null) {
                    // 返显
                    getControDicById({
                        id : id
                    }).then(res =>{
                        this.dic = res.data.data
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .filter-card {
        padding: 150px;
        min-width: 400px;
    }
    .dic_detail {
        margin-left: 100px;
    }
</style>