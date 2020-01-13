<template>
  <div class="container">
    <div class="logo">
			<!-- 右侧logo图标 -->
			<div>
				<img src="/img/logos.png">
			</div>
			<!-- 中间一级导航项 -->
			<ul class="nav">
			  <li v-for="(item,i) of list" :key="i">
					<router-link :to="path[i]" class="a">
						<img :src="'/img/head'+item.value" @mouseover="changenew" @mouseout="changeold" :ref="item.name">
					</router-link>
				</li>
			</ul>
		</div>
		<!-- 右侧用户登录状态 -->
		<div class="login">
			<div class="hello"><div class="username">{{user}}</div>用户,你好!</div>
			<div>
				<router-link to="/login" @click.native="exit" class="infobtn">{{str}}</router-link>
			</div>
		</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
		return{
			list:[{value:'oldt1.png',show:false,name:"lista"},{value:'oldt2.png',show:false,name:"lista"},{value:'oldt3.png',show:false,name:"lista"}],
			new:[{value:'newt1.png',show:false},{value:'newt2.png',show:false},{value:'newt3.png',show:false}],
			lists:[[],["公告","新闻","活动"],[]],
			path:["/","/news","/material"],
			user:"",
			str:"登录",
		}
	},
	methods:{
		changenew(e){
			for(var i in this.list){
				if(this.list[i].value==e.target.src.slice(-9)){
					e.target.src="/img/head"+this.new[i].value;
					this.list[i].show=!this.list[i].show;
				}
			}
		},
		changeold(e){
			for(var i in this.new){
				if(this.new[i].value==e.target.src.slice(-9)){
					e.target.src="/img/head"+this.list[i].value;
					this.list[i].show=!this.list[i].show;
				}
			}
		},
		isLogin(){
			var userName=window.sessionStorage.getItem("data");
			this.user=userName;
			if(userName){
				this.str="退出"
			}else{
				this.str="登录"
			}
		},
		exit(){
			var userName=window.sessionStorage.getItem("data");
			if(userName){
				window.sessionStorage.removeItem("data");
				this.user="";
				this.str="登录";
			}
		}
	},
	created(){
		this.isLogin();
	}
}
</script>

<style scoped>
	.container{
		display: flex;
		background: url("/img/headbg.png");
		background-size: cover;
		height: 120px;
		justify-content: space-between;
		align-items: center;
		min-width: 980px;
	}
	.logo{
		display: flex;
		width: 80%;
		min-width: 770px;
	}
	.login{
		margin-right: 15px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		min-width: 200px;
	}
	.nav{
		display: flex;
		list-style-type:none;
		justify-content: space-around;
		width: 60%;
	}
	.a img{
		margin-left: 15px;
	}
	.li{
		position: relative;
	}
	.infobtn{
		text-decoration: none;
		font-size: 18px;
		color:#e69800;
		font-weight: bold;
		display: block;
		background: rgba(230,152,0,0.4);
		padding: 10px;
		border-radius: 3px;
		text-align: center;
		min-width: 50px;
	}
	.infobtn:hover{
		color:#f00;
		background: rgba(230,152,0,0.7);
	}
	.hello{
		color: #fff;
		font:17px SimHei;
		text-align: center;
		white-space: nowrap;
		max-width: 150px;
		display: flex;
		cursor: default;
	}
	.username{
		max-width: 65px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
