<script setup>
const props = defineProps({
   type:{
       type:String,
       default:'text'
   },
   isIcon:{
      type:Boolean,
      default:false
   }
})
</script>
<template>
    <div>
      <input :type="type"
      placeholder="Поиск монеты"
      :style="{paddingLeft:isIcon?'44px':'10px'}">
      <slot v-if="isIcon" name="icon"></slot>
    </div>
</template>
<style scoped >
div{
   width: 100%;
   position: relative;
   color:rgba(255,255,255,.3)
}
input{
   width: 100%;
   height: 100%;
   border: 2px solid rgba(255,255,255,.3);
   outline: none;
   padding:10px 10px;
   border-radius: 10px;
   background: transparent;
}
</style>