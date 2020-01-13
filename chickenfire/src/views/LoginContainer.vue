<template>
    <div class="container">
        <div class="container-body">
            <slot/>
            <button class="button" @click="handleClick">
                {{buttonText}}
            </button>
        </div>
        <div class="container-footer">
            <slot name="footer"/>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:false
        }
    },
    props:{
        buttonText:String
    },
    methods:{
        handleClick(){
            this.$emit('buttonClick')
            this.loading=true
        }
    }
}
</script>

<style scoped>
    .container{
        width: 410px;
        overflow: hidden;
        background-color:rgba(0,0,0,.3);
        border-radius: 10px;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top:7%;  
    }
    .container-header{
        font-size: 40px;
        margin-top: 38px;
        color: black;
        text-align: center;
        line-height: 1;
    }
    .container-body{
        padding: 0 30px;
    }
    .button{
        width: 100%;
        height: 50px;
        line-height: 50px;  
        color: #ffffff;
        font-size: 18px;
        background-color: rgba(244, 22, 7, 0.7);
        border: 0;
        outline: none;
        margin-top: 20px;
        cursor: pointer;
        text-align: center;
    }
    .container-footer{
        text-align: center;
        line-height: 1;
        margin-top: 10px;
        margin-bottom: 20px;
        color: #BABABA;
        font-size: 15px;
    }
    .container-footer a{
        color: rgba(244, 22, 7, 0.7);
        text-decoration: none;
    }
</style>

