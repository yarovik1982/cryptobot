<script setup>
	import { useOverlay } from "@/store/useOverlay";
	import { storeToRefs } from "pinia";
	import { watch, ref, nextTick } from "vue";

	const overlayStore = useOverlay();
	const isOpen = storeToRefs(overlayStore).isOpen;
	const dialogContentRef = ref(null);
	watch(isOpen, (newVal) => {
		if (newVal) {
			// Ждем следующего тика, чтобы DOM обновился
			nextTick(() => {
				// Даем небольшую задержку для запуска анимации
				setTimeout(() => {
					if (dialogContentRef.value) {
						dialogContentRef.value.classList.add("expand");
					}
				}, 10); // Минимальная задержка для корректной анимации
			});
		} else {
			// Убираем класс при закрытии
			if (dialogContentRef.value) {
				dialogContentRef.value.classList.remove("expand");
			}
		}
	});
</script>

<template>
	<div
		:class="['overlay', { active: isOpen }]"
		v-if="isOpen"
		@click="overlayStore.close()">
		<div class="dialog" style="">
			<div :class="['dialog-content']" ref="dialogContentRef"></div>
		</div>
	</div>
</template>
<style scoped>
	.overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(8px);
		z-index: 100;
		display: none;
	}
	.overlay.active {
		display: flex;
	}
	.dialog {
		margin: 0 auto;
		max-width: 480px;
		width: 100%;
		height: 100%;
	}
	.dialog-content {
		position: relative;
		top: 100%;
		width: 100%;
		height: 500px;
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
		background: teal;
		transition: transform 0.3s 0.1s ease-in-out;
	}
	.dialog-content.expand {
		transform: translateY(-100%);
	}
</style>
