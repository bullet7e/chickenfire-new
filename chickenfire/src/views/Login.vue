<template>
	<div id="app">
    <LoginContainer :buttonText="buttonText" @buttonClick="login">
      <div class="container-header">登录</div>
      <LoginInput title="用户名:" label="请填写用户名" v-model="un"></LoginInput>
      <LoginInput title="密码:" label="请输入密码" type="password" v-model="up"></LoginInput>
      <template slot="footer">
        <span class="haveno">还没有账号，去</span>
        <router-link :to="{path: '/regist'}" class="toregist">注册</router-link>
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
				un:"",
				up:"",
				buttonText:"登录",
				captcha:'',
				result:'',
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
        }else{
          return true
        }
      },
			login(){
				if(this.validate()){
					var url="login";
					var obj={uname:this.un,upwd:this.up};
					this.axios.post(url,Qs.stringify(obj)).then(res=>{
						if(res.data.code==-1){
							this.showError(res.data.msg);
						}else{
							this.showsuccess(res.data.msg);
							window.sessionStorage.setItem('data',res.data.data[0]);
							this.$router.push("/");
							window.location.reload();
						}
					});
				}
			},
			regist(){
				this.$router.push("/regist")
			}
		}
	};
</script>

<style scoped>
	#app{
	  background: url('/img/loginbg.png') no-repeat center/cover;
	  height:706px;
	}
	#app:before{
	  content: "";
	  display:table
	}
	.input-group-row{
	  display: flex;
	}
	.container-header{color: #C69500;}
	.haveno{color: #0f0;}
	.toregist{font-weight: 700;font-size: 20px;}
	.toregist:hover{text-decoration: underline;}
</style>
