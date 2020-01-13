<template>
  <div id="app">
    <my-header></my-header>
    <router-view class="routerView"></router-view>
  </div>
</template>

<script>
	import Canvas from '@/assets/js/canvas-nest.min.js'
	export default {
	  name: 'App',
	  components: {
	    Canvas
	  }
	}
</script>

<style scoped>
	.routerView{
		margin-top: -26px;
	}
</style>
