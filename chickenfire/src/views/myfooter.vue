<template>
<div class="V2" :style="note">
  <div class="V1">
  <h3>配置要求以及推荐</h3>
  <h5>为了体验绝地求生的真正魅力，感受身临其境的真实生存，建议您使用推荐或更好配置进行游戏（目前仅支持64位系统）</h5>
  </div>
  <el-tabs class="V3" type="card" @tab-click="handClick">
    <el-tab-pane label="最低配置" class="d1" v-model="active">
      <div class="d2" name="first">
        <h4>（最低能运行的配置，可能会卡顿 建议设置较低画质）</h4>
        <p>系统Windows7/Windows10 64位</p>
        <p>内存6GB</p>
        <p>CPUIntel i3-4340/AMD FX-6300</p>
        <p>显卡GTX 660 HD 7850</p>
        <p>硬盘7200转机械硬盘</p>
        <a href="">更多配置和帮助&gt;&gt;</a>
      </div>
    </el-tab-pane>
    <el-tab-pane label="普通配置" class="d1">
      <div class="d2">
        <h4>（体验流畅画面，建议设置中等画质）</h4>
        <p>系统Windows7/Windows10 64位</p>
        <p>内存8GB</p>
        <p>CPUIntel i5-6400/AMD R3-1300X</p>
        <p>显卡GTX 1050 / GTX 960 / GTX 1050TI / RX 570</p>
        <p>硬盘7200转机械硬盘</p>
        <a href="">更多配置和帮助&gt;&gt;</a>
      </div>
    </el-tab-pane>
    <el-tab-pane label="推荐配置" class="d1">
      <div class="d2">
        <h4>（体验高清画质，建议设置较高画质）</h4>
        <p>系统Windows7/Windows10 64位</p>
        <p>内存16GB</p>
        <p>CPUIntel i5-7600K/AMD R5-1500X</p>
        <p>显卡GTX 1060 （荐）/ GTX 970 / RX 580</p>
        <p>硬盘7200转机械硬盘</p>
        <a href="">更多配置和帮助&gt;&gt;</a>
      </div>
    </el-tab-pane>
    <el-tab-pane label="顶级配置" class="d1">
      <div class="d2">
        <h4>（最低能运行的配置，可能会卡顿 建议设置较低画质）</h4>
        <p>系统Windows7/Windows10 64位</p>
        <p>内存16GB及以上</p>
        <p>CPUIntel i7-7700K/AMD R7-1800X</p>
        <p>显卡GTX 1070 / GTX1070TI / GTX 1080 / GTX 1080TI / RX Vega64/ RX Vega56</p>
        <p>固态硬盘</p>
        <a href="">更多配置和帮助&gt;&gt;</a>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
  export default {
    data() {
      return {
         note: {//绑定脚部背景图及样式
            backgroundImage: "url(" + require("../../public/img/foot_car.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "800px auto",
            marginTop: "5px",
            marginLeft:"0px",
            opacity:"0.8",
            backgroundPosition:"right"
          },
        active:'first'
      };
    },
    methods:{
      handClick(tab,event){
        
      }
    }
  };
</script>
<style scoped>
/* 标签容器*/ 
  .d1{
    margin-left:3%;
    height: 500px;
  }
/*配置文字*/
  .d2{
    float: left;
    width: 400px;
    height:400px;
    margin-top: 50px;
    margin-left: 10px;
    color: aliceblue;
    }
  .V1{
    color:aliceblue;
    margin-left: 20px;
  }
  .V2{
    background-color: black;
    border-color: black!important;
		margin-top: -20px !important;
  }
</style>

