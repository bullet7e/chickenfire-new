<template>
    <div class="input-group">
        <div class="input-title">{{title}}</div>
        <label class="input-label">
            <input :type="type" class="input-control" :placeholder="label" v-model="model">
        </label>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    props:{
        title:String,
        label: String,
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: String,
            default: ''
      },
    },
    computed: {
      model: {
        get () {
          return this.value
        },
        set (to) {
          this.$emit('input', to)
        }
      }
    }
}
</script>

<style scoped>
    .input-group{
        margin-top:20px;
    }
    .input-title{
        font-size: 15px;
        line-height: 1;
        color: #e8e8e8;
    }
    .input-label{
        position: relative;
        display: block;
    }
    .input-control{
        position: relative;
        display: block;
        width: 100%;
        height: 40px;
        border: 0;
        border-bottom: 1px solid #DDDDDD;
        color: #585858;
        font-size: 16px;
        outline: none;
        transition: border-bottom-color .3s;
        padding: 0;
        box-sizing: border-box;
        background-color: #ffffff;
        z-index: 2;
        padding-left:5px;
        font-size: 14px;
        margin-top: 5px;
    } 
</style>

