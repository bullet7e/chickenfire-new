<template>
	<div class="container">
		<div class="ihead">
			<img src="/img/header.jpg">
		</div>
		<div class="ibody">
			<!-- 轮播图 -->
			<el-carousel :interval="5000" arrow="always" class="carousel" :height="height">
			  <el-carousel-item  v-for="(item,i) of myurl" :key="i">
			      <!-- <router-link :to=""></router-link> -->
			      <!-- <h3 class="medium">{{ item.my1 }}</h3> -->
			      <h3><img :src="item.image" id="my_img" alt="" @click="jump(i)"></h3>
			  </el-carousel-item>
			</el-carousel>
			<!-- 标签导航 -->
			<el-tabs id="my_news" v-model="activeName" type="border-card" stretch class="tabs">
			  <el-tab-pane v-for="(item1,j) of kindlist" :key="j" :label="kindlist[j].label" :name="kindlist[j].name">
					<ul>
						<li v-for="(item2,j1) in newslist[j].children" :key="j1" @click="jump2(j1)" class="tabli">
							<router-link :to="`/news/detail/${item2.did}`">[{{item2.dkind}}] {{item2.dtitle}}</router-link><span>{{item2.dtime}}</span>
						</li>
					</ul>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="video">
			<h2>精彩视频</h2>
			<div id="P1">
				<div>
					<video width="320" height="240" controls poster="/img/sp1.png" src="/video/特色站解读-紧张刺激.mp4">
					</video>
					<h4>官网宣传视频-紧张刺激</h4>
				</div>
				<div>
					<video width="320" height="240" controls  poster="/img/sp2.png" src="/video/特色站解读-团队配合.mp4">
					</video>
					<h4>官网宣传视频-团队配合</h4>
				</div>
				<div>
					<video width="320" height="240" controls poster="/img/sp4.png" src="/video/特色站解读-真实战术.mp4">
					</video>
					<h4>官网宣传视频-真实战术</h4>
				</div>
			</div>
		</div>
		<myfooter></myfooter>
		<myfooter1></myfooter1>
	</div>
</template>
<script>
// 主页轮播图
import myfooter from "./myfooter.vue"
import myfooter1 from "./myfooter1.vue"
export default {
    data(){
        return{ 
            myurl:[
                {image:require('../../public/img/lunbo1.png')},
                {image:require('../../public/img/lunbo2.png')},
                {image:require('../../public/img/lunbo3.png')},
                {image:require('../../public/img/lunbo4.png')},
                {image:require('../../public/img/lunbo5.png')}
            ],   
            activeName: 'second',
						path:[
							"https://pubg.qq.com/webplat/info/news_version3/33247/33250/33268/m19357/201812/784774.shtml?atm_cl=ad&atm_pos=20083&e_code=457834",
							"https://pubg.qq.com/cp/a20181206pai/index.html?atm_cl=ad&atm_pos=20084&e_code=457835",
							"http://pubg.qq.com/cp/a20180108yjzx/index.shtml?atm_cl=ad&atm_pos=20085&e_code=392357",
							"/",
							"https://pubg.qq.com/act/a20171218lbhg/index.shtml?atm_cl=ad&atm_pos=20672&e_code=450360"
						],
						kindlist:[{label:"公告",name:"second"},{label:"新闻",name:"third"},{label:"活动",name:"fourth"}],
						newslist:[{children:[]},{children:[]},{children:[]}]
        }
     },
		 methods:{
			 jump(i){
				 for(var index in this.path){
					 if(i==index){
							window.open(this.path[index],"_blank")
					 }
				 }
			 },
			 jump2(j){
				 for(var index in this.url){
					 for(var index1 in this.url){
					 		if(j==index1){
					 			window.open(this.url[index][index1],"_blank")
					 		}
					 }
				 }
			 },
			 load(){
				 var url="getnewslist";
				 this.axios.get(url).then(res=>{
					 // console.log(res.data.data[0]);
					 for(var key in res.data.data){
						 for(var key1 in this.kindlist){
						 		if(this.kindlist[key1].label==res.data.data[key].dkind){
						 			this.newslist[key1].children.push({did:res.data.data[key].did,dkind:res.data.data[key].dkind,dtitle:res.data.data[key].dtitle,dtime:res.data.data[key].dtime});
						 		}
						 }
					 }
				 })
			 }
		 },
		 created(){
		 	this.load();
		 },
		 beforeMount(){
		   this.height =window.innerWidth*730/1920 + 'px';
		 },
		 components:{
			 "myfooter":myfooter,
			 "myfooter1":myfooter1
		 }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
    background-repeat: no-repeat;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .my_img{
      width:100%;
      height:100%;
			border-radius:5px;
			background-repeat: no-repeat;
  }
  .el-col {
      border-radius: 4px;
  }
  .grid-content {
      border-radius: 4px;
      min-height: 36px;
  }
	.ihead img{
		width: 100%;
	}
	.ibody{
		display: flex;
		padding: 0 5px;
		margin-top: -4px;
		background: rgba(0,0,0,0.5);
		min-width: 992px;
	}
	.ibody{flex-wrap: nowrap;}
	.carousel{width: 75%;min-width: 1002px;}
	.tabs{width:25%;background: #007BFF;}
	.carousel img{
		width: 100%;
	}
	.video{
		padding: 1px;
		background: linear-gradient(0deg,rgba(230,100,10,0.5),rgba(160,100,50,0.5));
	}
	#P1{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	#P1>div{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		color: #ff4600;
	}
	h2{
		text-indent: 20px;
		color: #ff4600;
	}
	ul{
		list-style-type: none;
		padding: 0;
	}
	.tabli{
		display: flex;
		justify-content: space-between;
		width: 100%;
		font:600 16px 宋体,simhei;
		margin: 15px auto;
		padding-bottom: 10px;
		color: #000;
		border-bottom: 3px dashed #777;
	}
	a{
		color: #000;
		text-decoration: none;
	}
	.tabli>a{
		width: 80%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.tabli>a:hover{
		text-decoration: underline;
		color: #0f0;
	}
	.tabli>span{
		width: 20%;
		text-align: right;
	}
	.el-tabs__item{
		background: linear-gradient(0deg,#0f0,#00f);
		color: #e69800 !important;
		font:bolder 20px 宋体,simhei !important;
		line-height: 38px !important;
	}
	.el-tabs__item.is-active{/* 选中标签 */
		color: #003EFF !important;
		font:bolder 20px 宋体,simhei;
		background: url("/img/tabsbg.jpg ");
	}
	.el-tabs--border-card{
		background: url("/img/tabsbg.jpg ") !important;
		border: 0 solid rgba(255,255,255,0) !important;
	}
</style>
