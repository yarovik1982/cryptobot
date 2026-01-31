<script setup>
   import { ref } from "vue";
   import Balance from "@/components/Balance.vue";
	// import HelloWorld from './components/HelloWorld.vue'
	import Header from "@/components/Header.vue";
	import Navigation from "@/components/Navigation.vue";
import Banner from "@/components/Banner.vue";
import BalanceList from "@/components/BalanceList.vue";
import Overlay from "@/components/Overlay.vue";


</script>
<template>
	<Overlay/>
	<Header />
	<Balance class="flex-column w-100 justify-center items-center" />
	<Navigation />
   <Banner/>
   
   <BalanceList/>
</template>
<style scoped></style>
