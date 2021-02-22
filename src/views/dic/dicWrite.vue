<template>
    <div class="el_contain">
        <el-card class="filter-card">
        <el-form ref="form" :model="dic" label-width="120px" class = "dic_detail">
            <el-form-item label="字典代码" style="width: 60%" >
                <el-input v-model="dic.dicCode"></el-input>
            </el-form-item>
            <el-form-item label="字典名称" style="width: 60%">
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
                <el-button class ="el_button">返回</el-button>
            </el-form-item>
        </el-form>
        </el-card>
    </div>
</template>

<script>
    import {getControDicById} from "../../api/order"
    export default {
        name: "dicWrite",
        data() {
            return {
                dic: {
                    id: '',
                    dicCode: '',
                    dicName: '',
                    dicType: '',
                    valid: '有效',
                }
            }
        },
    created() {
        this.getDetail();
    },
        methods: {
            onSubmit() {
                var id = this.$route.query.id
                console.log(id);
            },
            getDetail() {
                var id = this.$route.query.id
                console.log(id);
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