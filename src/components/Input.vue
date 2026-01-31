<script setup>
	import { ref, watch } from "vue";
	import { useBalanceListStore } from "@/store/useBalanceList";

	const props = defineProps({
		type: {
			type: String,
			default: "text",
		},
		isIcon: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: "Поиск монеты",
		},
	});

	const balanceListStore = useBalanceListStore();
	const text = ref("");

	watch(text, (newText) => {
		balanceListStore.getDataCoin(newText);
	});

	const clearSearch = () => {
		text.value = "";
		balanceListStore.resetSearch();
	};

	defineExpose({
		clearSearch,
	});
</script>

<template>
	<div class="search-container">
		<input
			:type="type"
			v-model="text"
			:placeholder="placeholder"
			:style="{ paddingLeft: isIcon ? '44px' : '10px' }"
			class="search-input" />
		<slot v-if="isIcon" name="icon"></slot>

		<!-- Кнопка очистки поиска -->
		<i v-if="text" class="bi bi-x-circle-fill clear-btn" @click="clearSearch"></i>
	</div>
</template>

<style scoped>
	.search-container {
		width: 100%;
		position: relative;
		color: rgba(255, 255, 255, 0.3);
	}

	.search-input {
		width: 100%;
		height: 100%;
		border: 2px solid rgba(255, 255, 255, 0.3);
		outline: none;
		padding: 10px;
		border-radius: 10px;
		background: transparent;
		color: white;
		font-size: 14px;
		transition: border-color 0.3s ease;
	}

	.search-input:focus {
		border-color: rgba(255, 255, 255, 0.7);
	}

	.clear-btn {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
		color: rgba(255, 255, 255, 0.5);
		font-size: 18px;
		transition: color 0.3s ease;
	}

	.clear-btn:hover {
		color: rgba(255, 255, 255, 0.8);
	}
</style>
