<template>
	<div :style="note">
		<div class="B1">
		  <h2>NEWS</h2>
		</div>
		<div class="what">
			<el-breadcrumb separator-class="el-icon-arrow-right" class="bdcb">
				<el-breadcrumb-item :to="{ path: '/' }"><img src="/img/news_home.png" style="vertical-align: bottom;">网站首页</el-breadcrumb-item>
				<el-breadcrumb-item><a href="/news">新闻资讯</a></el-breadcrumb-item>
				<el-breadcrumb-item>{{`${dtitle}`}}</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="dtitle">{{`${dtitle}`}}</div>
			<div class="dadt">
				{{`${dauthor}`}}——{{`${dtime}`}}
			</div>
			<div>
				<div v-html="detail" class="ddetail">{{detail}}</div>
				<div class="detailfoot"><img src="/img/detailfoot.png" ondragstart="return false"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				note: {//绑定脚部背景图及样式
				  backgroundImage: "url(" + require("../../public/img/newstitle.jpg") + ")",
				  backgroundRepeat: "no-repeat",
				  width:"100%",
				  height:"200px",
					marginTop:"-82px"
				},
				dtitle:"",
				dauthor:"",
				dtime:"",
				detail:""
			}
		},
		methods:{
			loadnews(){
				var url="newsdetail";
				var obj={did:this.did};
				this.axios.post(url,Qs.stringify(obj)).then(res=>{
					this.dtitle=res.data.data[0].dtitle;
					this.dauthor=res.data.data[0].dauthor;
					this.dtime=res.data.data[0].dtime;
					this.detail=res.data.data[0].detail;
				})
			}
		},
		props:["did"],
		created(){
			this.loadnews();
		}
	}
</script>

<style scoped>
	.B1{
	  color: #e69800;
	  font-size: 2.8rem;
	  text-align: center;
	  line-height: 180px;
	}
	.dtitle{
		font: 700 38px "microsoft yahei";
		margin: 10px 0;
	}
	.what{
		margin-top: -10px;
		margin-left: 15px;
	}
	.bdcb{
		font-size: 18px;
		display: flex;
		align-items: center;
	}
	.dadt{
		color: #808080;
		font:500 16px "microsoft yahei";
		padding: 5px;
		border-bottom: 1px dashed #808080;
	}
	.ddetail{
		margin: 15px 0;
		padding: 0 5px;
	}
	.ddetail img{
		max-width: 100%;
	}
</style>
