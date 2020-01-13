<template>
	<div class="linkage">
		<div class="title">
			游戏内枪械载具道具资料
		</div>
		<div class="select">
			<span>选择大体类别</span>
			<el-select v-model="pkind" @change="chosePkind" placeholder="分类">
			  <el-option v-for="item in pkind1" :key="item.id" :label="item.value" :value="item.id"></el-option>
			</el-select>
			<span>选择详细类别</span>
			<el-select v-model="pckind" @change="chosePckind" placeholder="子分类">
			  <el-option v-for="item in pckind1" :key="item.id" :label="item.value" :value="item.id">
			  </el-option>
			</el-select>
			<span>选择道具</span>
			<el-select v-model="pname" @change="chosePname" placeholder="道具">
			  <el-option v-for="item in pname1" :key="item.id" :label="item.value" :value="item.id">
			  </el-option>
			</el-select>
		</div>
		<div class="detail">
			<div class="img">
				<img :src="imgUrl" ondragstart="return false">
			</div>
			<div class="describe"><pre>{{describe}}</pre></div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
	  data () {
	    return {
	      pkind:'',
	      pckind: '',
	      pname: '',
	      pkind1: [],
	      pckind1: [],
				pname1: [],
				imgUrl:"/img/AKM.png",
				describe:"推荐配件——瞄具类:4倍瞄准镜;枪口类:突击步枪枪口补偿器;弹匣类:突击步枪快速扩容弹匣\n无视三级头的狙击枪"
	    }
	  },
	  methods:{
			// 1.axios请求数据
			getData(){
				var url="getdata";
				this.axios.get(url).then(res=>{
					// console.log(res);
					if(res.status==200){
						var data=res.data;
						// console.log(data);
						//分类数据分类
						for(var item in data){
							//pkind1去重
							for(var item1 in this.pkind1){
								if(this.pkind1[item1].value==data[item].pkind){
									this.pkind1.splice(item1,1);
								}
							}
							//设置pkind1
							this.pkind1.push({id:item,value:data[item].pkind,children:[]});
							//pckind1去重
							for(var item2 in this.pckind1){
								if(this.pckind1[item2].value==data[item].pckind){
									this.pckind1.splice(item2,1);
								}
							};
							//设置pckind1
							this.pckind1.push({id:item,value:data[item].pckind,class:data[item].pkind,children:[]});
							//设置pname1
							this.pname1.push({id:item,value:data[item].pname,class:data[item].pckind});
						};
					};
					for(var index in this.pkind1){
						for(var index1 in this.pckind1){
							if(this.pckind1[index1].class==this.pkind1[index].value){
								this.pkind1[index].children.push(this.pckind1[index1]);
							}
						}
					};
					for(var key in this.pckind1){
						for(var key1 in this.pname1){
							if(this.pname1[key1].class==this.pckind1[key].value){
								this.pckind1[key].children.push(this.pname1[key1]);
							}
						}
					};
				}).catch(err=>{});
			},
			//分类选择
			chosePkind(e){
				for(var item3 in this.pkind1){
					if(e==this.pkind1[item3].id){
						this.pckind1=this.pkind1[item3].children;
						this.pckind=this.pkind1[item3].children[0].value;
						this.pname1=this.pkind1[item3].children[0].children;
						this.pname=this.pkind1[item3].children[0].children[0].value;
						this.E=this.pname1[0].id;
						this.axiosget();
					}
				}
			},
			//子分类选择
			chosePckind(e){
				for(var item4 in this.pckind1){
					if(e==this.pckind1[item4].id){
						this.pname1=this.pckind1[item4].children;
						this.pname=this.pckind1[item4].children[0].value;
						this.E=this.pname1[0].id;
						this.axiosget();
					}
				}
			},
			//道具选择
			chosePname(e){
				this.E=e;
				this.axiosget();
			},
			axiosget(){
				var url="getdata";
				this.axios.get(url).then(res=>{
					for(var i in res.data){
						if(i==this.E){
							this.imgUrl=res.data[i].img;
							this.describe=res.data[i].pdetail;
						}
					}
				})
			}
	  },
	  created:function(){
	    this.getData();
			this.$nextTick(() => {
				// 禁用右键
				document.oncontextmenu = new Function("event.returnValue=false");
				// 禁用选择
				document.onselectstart = new Function("event.returnValue=false");
			});
	  }
	}
</script>

<style scoped>
	@keyframes bgcolor{
		0%{background: linear-gradient(0deg,rgba(255,50,50,0.5),rgba(50,255,50,0.5),rgba(50,50,255,0.5));}
		25%{background: linear-gradient(0deg,rgba(50,255,50,0.5),rgba(50,50,255,0.5),rgba(255,50,50,0.5));}
		50%{background: linear-gradient(0deg,rgba(50,50,255,0.5),rgba(255,50,50,0.5),rgba(50,255,50,0.5));}
		75%{background: linear-gradient(0deg,rgba(255,50,50,0.5),rgba(50,255,50,0.5),rgba(50,50,255,0.5));}
		100%{background: linear-gradient(0deg,rgba(50,255,50,0.5),rgba(50,50,255,0.5),rgba(255,50,50,0.5));}
	}
	.linkage{
		display: flex;
		flex-direction: column;
		animation: bgcolor 3s linear infinite;
	}
	@media screen and (min-width:768px){
		.linkage{align-items: center;}
	}
	@media screen and (max-width:767px){
		.linkage{align-items: space-around;}
	}
	.title{
		text-align: center;
		height: 50px;
		line-height: 50px;
		margin:120px auto 30px;
		font:1000 40px 仿宋,simhei;
		color:#e69800;
		text-shadow: 2px 2px 2px #f00;
		cursor: default;
	}
	.select{
		width: 80%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		min-width: 768px;
		font: 800 20px 宋体,simhei;
		padding: 15px;
		background: rgba(49,152,255,0.7);
		border: 1px solid rgba(49,152,255,0.7);
		border-radius: 10px;
	}
	.select span{
		cursor: default;
		color:#ff4600;
	}
	.detail{
		font: 500 20px 黑体,simhei;
		margin-top:20px;
		min-width: 768px;
	}
	.img img{
		width:100%;
	}
	.describe{
		padding: 10px;
		cursor: default;
		color: #ff004b;
		background: rgba(0,255,200,0.8);
		border: 1px solid rgba(0,255,200,0.8);
		border-radius: 8px;
		white-space: pre-line;
	}
	.describe pre{
		width:100%;
		white-space: pre-line;
	}
</style>
