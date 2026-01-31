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
		@click.self="overlayStore.close()">
		<div class="dialog" style="">
			<div :class="['dialog-content']" ref="dialogContentRef">
				<div class="dialog-header row w-100 items-center pt-10">
					<div class="col flex-row"></div>
					<div class="col flex-row flex-grow-auto justify-center font-14">Выберите способ оплаты</div>
					<div class="col flex-row">
						<button class="btn btn-close rounded-50 hover-filter-drop-shadow ">&times;</button>
					</div>
				</div>
				<div class="dialog-body">
					<label forHtml="inp-qr" >
						<div class="row px-20 items-center gap-20">
							<input type="file" id="inp-qr" style="display: none;">
							<div class="col">
								<div class="col-icon">
									<i class="bi bi-3-circle-fill"></i>
								</div>
							</div>
							<div class="col flex-row flex-grow-auto h-100 py-20" style="border-bottom: 1px solid #fff;">
								<div class="flex-column items-start">
									<span>Сканировать из файла</span>
									<span>Загрузить файл с QR-кодом</span>
								</div>
							</div>
						</div>
						
					</label>
					<div class="row p-20 items-center gap-20">
						<div class="row-icon">
							<i class="bi bi-3-circle-fill"></i>
						</div>
						<div class="row-info">ccccccccccccc</div>
					</div>
					<div class="row p-20 items-center gap-20">
						<div class="row-icon">
							<i class="bi bi-3-circle-fill"></i>
						</div>
						<div class="row-info">cccccccccccc</div>
					</div>
				</div>
			</div>
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
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		background: teal;
		transition: transform 0.3s 0.1s ease-in-out;
	}
	.dialog-content.expand {
		transform: translateY(-100%);
	}
	.col:nth-child(odd){
		width: 10%;
	}
	.btn-close{
		width: 30px;
		height: 30px;
		font-size: 24px;
	}
</style>
