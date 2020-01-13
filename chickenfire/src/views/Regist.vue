<template>
	<div id="app">
    <LoginContainer :buttonText="buttonText" @buttonClick="regist">
      <div class="container-header">注册</div>
			<LoginInput title="用户名:" label="请填写用户名" v-model="un"/>
			<LoginInput title="密码:" label="请设置登录密码（支持数字、字母、不区分大小写）" type="password" v-model="up" />
      <LoginInput title="重复密码:" label="请再输入一次您设置的密码" type="password"  v-model="uped"/>
      <LoginInput title="邮箱:" label="请输入您的邮箱" v-model="em"/>
      <template slot="footer">
        <span class="ishaveno">已有账号，去</span>
        <router-link :to="{path: '/login'}" class="tologin">登录</router-link>
      </template>
    </LoginContainer>
  </div>
</template>

<script>
	import axios from "axios";
	import LoginContainer from './LoginContainer';
	import LoginInput from './LoginInput';
	export default {
		data() {
			return {
				buttonText:"立即注册",
				un:"",
				up:"",
				uped:"",
				em:"",
				radio:"male"
			};
		},
		components:{
      LoginContainer,
      LoginInput
    },
		methods: {
			showError (message) {
        this.$message.error({
          message,
        })
      },
      showsuccess (message) {
        this.$message({
          message,
           type: 'success'
        })
      },
      validate () {
        if (this.un === '') {
          return this.showError('用户名不能为空')
        } else if (this.up === '') {
          return this.showError('密码不能为空')
        } else if (this.up !== this.uped) {
          return this.showError('两次密码不一致')
        }else if(!/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(this.em)){
          return this.showError('邮箱格式不正确')
        }else {
          return true
        }
      },
			regist(){
				if(this.validate()){
					var url="regist";
					var obj={uname:this.un,upwd:this.up,email:this.em,gender:this.radio};
					this.axios.post(url,Qs.stringify(obj)).then(res=>{
						// console.log(5);
						// console.log(res);
						if(res.data.code==-1){
							this.$alert('该用户已存在,请勿重复注册', '请注意', {
								confirmButtonText: '确定',
							});
						}else if(res.data.code==1){
							window.sessionStorage.setItem('data',res.data.data[0]);
							this.$alert('恭喜你注册成功', '消息', {
								confirmButtonText: '确定',
							});
							this.$router.push("/");
							window.location.reload();
						}
					});
				}
			}
		}
	};
</script>

<style scoped>
	#app{
	  background: url('/img/registbg.jpg') no-repeat center/cover;
	  height:706px;
	}
	#app:before{
	  content: "";
	  display:table
	}
	.container-header{color: #C69500;}
	.ishaveno{color: #0f0;}
	.tologin{font-weight: 700;font-size: 20px;}
	.tologin:hover{text-decoration: underline;}
</style>
