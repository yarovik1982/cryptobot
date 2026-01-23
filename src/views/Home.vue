<script setup>
   import { ref } from "vue";
   import Balance from "@/components/Balance.vue";
	// import HelloWorld from './components/HelloWorld.vue'
	import Header from "@/components/Header.vue";
	import Navigation from "@/components/Navigation.vue";
import Banner from "@/components/Banner.vue";
import BalanceList from "@/components/BalanceList.vue";

const isVisible = ref(true);
</script>
<template>
	
	<Header />
	<Balance class="flex-column w-100 justify-center items-center mt-20" />
	<Navigation />
   <Banner/>
   <div class="row w-100 mt-20 justify-between items-center font-14">
      <div class="col-6 text-left pointer">Мои активы</div>
      <div class="col-6 text-right pointer" @click="isVisible=!isVisible">
         <span v-if="isVisible">Скрыть</span>
         <span v-else> Показать</span>
         мелкие балансы
      </div>
   </div>
   <BalanceList/>
</template>
<style scoped></style>
