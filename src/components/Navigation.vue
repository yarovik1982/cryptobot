<script setup>
	import { RouterLink } from "vue-router";
	import { ref } from "vue";

	const list = ref([
		{ id: 1, to: "/deposit", icon: "bi bi-arrow-down-left", label:"Пополнить" },
		{ id: 2, to: "/withdraw", icon: "bi bi-arrow-up-right", label:"Вывести" },
		{ id: 3, to: "/exchange", icon: "bi bi-arrow-left-right", label:"Обмен" },
		{ id: 4, to: "/trade", icon: "bi bi-graph-up", label:"Биржа" },
	]);
</script>
<template>
	<div class="row w-100 items-center justify-between pt-20 mt-20 ">
      <div class="col w-25" v-for="link in list" :key="link.to">
         <RouterLink class="link"  :to="link.to">
            <div class="link-icon">
               <i :class="link.icon"></i>
            </div>
            <div class="link-label">{{ link.label }}</div>
            
         </RouterLink>
      </div>
	</div>
</template>
<style scoped>
   .link {
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
      align-items: center;
      text-align: center;
      transition: filter .3s;
      color: #fff;
   }
   .link-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255,.1);
   }
   .link-label {
      font-size: 14px;
   }
   .link:hover {
      filter: drop-shadow(0 0 .5em #ddff00aa);
   }
</style>
