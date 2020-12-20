<template>
    <div class = "login-container">
        <div class="login-form-wrap">
            <div class="login-head">
                <div class="logo"></div>
            </div>
<!-- 表单验证 绑定表单对象 ： model  需要验证的属性需绑定prop  :rules 验证的规则-->
            <el-form  class = "login-form" ref="form" :model="user" :rules = "formRules" >
                <el-form-item prop ="userName">
                    <el-input
                            v-model="user.userName"
                            placeholder = "请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item prop ="password">
                    <el-input
                            v-model="user.password"
                            placeholder = "请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item prop ="agree">
                    <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <el-form-item >
                    <el-button class = "login—btn" :loading="loginLoading" type="primary" @click="onLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {login} from "../../api/user"
    export default {
        data() {
            return {
                user: {
                    userName: '',
                    password: '',
                    agree: false // 是否同意协议
                },
                // checked: false, // 是否同意协议的选中状态
                loginLoading: false, // 登录的 loading 状态
                formRules: { // 表单验证规则配置
                    // 要验证的数据名称：规则列表[]
                    userName: [
                        // trigger 用来配置触发校验的时机，有两个选项，change 是当输入的内容发送变化的时候，blur 当失去焦点的时候
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                       /* { pattern: /^\d{6}$/, message: '请输入正确的用户名格式', trigger: 'blur' }*/
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        /*{ pattern: /^\d{6}$/, message: '请输入正确的密码', trigger: 'blur' }*/
                    ],
                    agree: [
                        {
                            // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
                            // 验证通过：callback()
                            // 验证失败：callback(new Error('错误消息'))
                            // validator 验证函数不是你来调用的，而是当 element 表单触发验证的时候它会自己内部调用
                            // 所以你只需要提供校验函数处理逻辑就可以了
                            //   通过：callback()
                            validator: (rule, value, callback) => {
                                if (value) {
                                    // 验证通过
                                    callback()
                                } else {
                                    // 验证失败
                                    callback(new Error('请同意用户协议'))
                                }
                            },
                            // message: '请勾选同意用户协议',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            onLogin () {
                // 获取表单数据（根据接口要求绑定数据）
                // const user = this.user
                // 表单验证
                // validate 方法是异步的
                this.$refs['form'].validate(valid => {
                    // 如果表单验证失败，停止请求提交
                    if (!valid) {
                        return
                    }
                    // 验证通过，请求登录
                    this.login()
                })
            },

            login () {
                // 开启登陆中 loading...
                this.loginLoading = true

                // 对于代码中的请求操作
                // 1、接口请求可能需要重用
                // 2、实际工作中，接口非常容易变动，改起来麻烦
                // 我们建议的做法是把所有的请求都封装成函数然后统一的组织到模块中进行管理
                // 这样做的好处就是：管理维护更方便，也好重用
                login(this.user).then(res => {

                    const jwt = res.headers['authorization']
                    window.localStorage.setItem('jwt', jwt)
                    // console.log(res)
                    // 登录成功
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    })

                    // 关闭 loading
                    this.loginLoading = false

                    // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
                    // 本地存储只能存储字符串
                    // 如果需要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
                    window.localStorage.setItem('user', JSON.stringify(res.data.data))

                    // 跳转到首页
                    // this.$router.push('/')

                    this.$router.push("/")
                }).catch(err => { // 登录失败
                    console.log('登录失败', err)
                    this.$message.error('登录失败，手机号或验证码错误')
                    // 关闭 loading
                    this.loginLoading = false
                })
            }
        }
    }
</script>

<style scoped>

    .login-container {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: url("./login_bg.jpg") no-repeat;
        background-size: cover;
    }
    .login-form {
        background-color: #ffffff;
        padding: 50px;
        min-width: 300px;
    }
    .login—btn {
        width: 100%;
    }
    .login-head {
        display: flex;
        justify-content: center;
    }
    .logo {
        width: 300px;
        height: 47px;
        left:60px;
        background: url("./login_logo.jpg") no-repeat;
        background-size: contain;
    }
    .login-form-wrap {
        min-width: 300px;
        padding: 30px 50px 10px;
        background-color: #fff;
    }
</style>