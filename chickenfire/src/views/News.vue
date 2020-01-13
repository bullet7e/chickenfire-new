<template>
<!-- 头部背景 -->
  <div :style="note">
    <div class="B1">
      <h2>NEWS</h2>
    </div>
    <!-- 导航栏 -->
    <div class="B2">
      <div>
        <el-tabs class="tabs" v-model="activeName" stretch type="border-card" >
        <el-tab-pane v-for="(item1,j) of kindlist" :key="j" :label="kindlist[j].label" :name="kindlist[j].name">
        	<ul>
        		<li v-for="(item2,j1) in newslist[j].children" :key="j1" @click="jump2(j1)" class="tabli">
        			<router-link :to="`/news/detail/${item2.did}`">[{{item2.dkind}}] {{item2.dtitle}}</router-link><span>{{item2.dtime}}</span>
        		</li>
        	</ul>
        </el-tab-pane>
      </el-tabs>
      </div>
      <div class="B3">
        <div><img src="/img/news1.jpg"></div>
        <div><img src="/img/news2.jpg"></div>
        <div><img src="/img/news3.jpg"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      note: {//绑定脚部背景图及样式
        backgroundImage: "url(" + require("../../public/img/newstitle.jpg") + ")",
        backgroundRepeat: "no-repeat",
        width:"100%",
        height:"200px",
      },
			activeName:"second",
			kindlist:[{label:"公告",name:"second"},{label:"新闻",name:"third"},{label:"活动",name:"fourth"}],
			newslist:[{children:[]},{children:[]},{children:[]}]
    }
	},
	methods:{
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
	}      
}
</script>
<style scoped>
  *{margin:0;padding:0}
  /* 新闻页页头字体样式 */
  .B1{
    color: #e69800;
    font-size: 2.8rem;
    text-align: center;
    line-height: 180px;
  }
  /* 导航栏样式 */
  .el-tabs__item,.el-tabs__nav{
    border:0px solid black !important;
    font-size: 20px !important;
  }
  .B2{
    display: flex;
    justify-content: space-around;
    margin-top: 70px;
  }
  .tabs{
    width:700px;
		height: 590px;
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
		width: 90%;
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
</style>