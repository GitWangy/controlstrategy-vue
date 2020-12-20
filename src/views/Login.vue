<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2"
                 status-icon
                 ref="ruleForm2"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="userName">
                <el-input type="text"
                          v-model="ruleForm2.userName"
                          auto-complete="off"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          v-model="ruleForm2.password"
                          auto-complete="off"
                          placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-checkbox
                    v-model="checked"
                    class="rememberme"
            >记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return {
                logining: false,
                ruleForm2: {
                    userName: '',
                    password: '',
                },
                rules2: {
                    userName: [{required: true, message: '请输入账号', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                },
                checked: false
            }
        },
        methods: {
            handleSubmit(event){
                this.$refs.ruleForm2.validate((valid) => {
                    if(valid){
                        const _this=this;
                        this.$axios.post('http://localhost:8081/login', this.ruleForm2).then(res => {
                            const jwt = res.headers['authorization']
                            const userInfo = res.data.data
                            const status = res.data.code
                            const message = res.data.message
                            _this.$router.push("/main")
                            _this.$store.commit("SET_TOKEN",jwt)
                            _this.$store.commit("SET_USERINFO",userInfo)
                        })
                    }else{
                        console.log('error submit!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login-container {
        width: 100%;
        height: 100%;
        background: #4373a5;
        position: absolute;
        /* 登录框上下对齐 */
        display: flex;
        align-items: center;
    }
    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin:0px auto;
        width: 350px;
        padding: 20px 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: left;
    }
</style>