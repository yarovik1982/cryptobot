<script setup>
import { ref } from 'vue';

const counter = ref(3);
const activeIndex = ref(0);
const innerText = ref([
   {bg:"teal",text:"Very long text 1"},
   {bg:"green",text:"Very long text 2"},
   {bg:"yellow",text:"Very long text 3"},
])
</script>
<template>
   <div class="mt-20">
      <div :class="['banner w-100',innerText[activeIndex].bg]">
         <div class="banner-inner">
            {{innerText[activeIndex].text}}
         </div>
      </div>
      <div class="row mt-10 justify-center">
         <span :class="['dot',{ active:activeIndex === index}]" v-for="(_, index) in counter" :key="index" @click="activeIndex = index"></span>
      </div>
      <div class="row justify-center"></div>
   </div>
</template>
<style scoped >
.banner{
   display: flex;
   align-items: center;
   height: 70px;
   border-radius: 10px;
   background-color: teal;
   position: relative;
   font-size: 14px;
   overflow: hidden;
   /* padding-left:  20px; */
   /* text-align: left; */
}
.banner-inner {
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
}
.teal{
   background-color: teal;
}
.green{
   background-color: green;
}
.yellow{
   background-color: yellow;
}
.banner-inner::before{
   position: absolute;
   content: '';
   background-color: #fff;
   width: 8px;
   height: 100%;
   top: 0;
   left: 0px;
   /* transform: translate(0,-50%); */
}
.dot{
   width: 10px;
   height: 10px;
   border-radius: 50%;
   background-color: rgba(255, 255, 255,.5);
   margin: 0 10px;
   transition: background-color .3s ease-in-out;
   cursor: pointer;
}
.dot.active{
   background-color: rgba(255, 255, 255,1);
}
</style>