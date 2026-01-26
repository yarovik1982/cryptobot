<script setup>
	import { ref, computed } from "vue";

	const currensyes = ref([
		{ base: "BTC", quote: "USDT" },
		{ base: "TON", quote: "USDT" },
	]);

	const currentIndex = ref(0);

	function swapDirection(index) {
		const pair = currensyes.value[index];
		[pair.base, pair.quote] = [pair.quote, pair.base];
	}

	const fromCurrency = computed(() => currensyes.value[currentIndex.value].base);
	const toCurrency = computed(() => currensyes.value[currentIndex.value].quote);
</script>
<template>
    <div class="header">
        <div class="row" id="push">
            <div class="col flex-column items-start">
                <span>Вы отправляете</span>
                <span>{{ fromCurrency }}</span>
            </div>
        </div>

        <div class="row w-100 items-center">
            <hr class="different-left" />
            <div class="icon rounded-50 flex-row justify-center items-center"
                 @click="swapDirection(currentIndex)">
                <i class="bi bi-arrow-down-up"></i>
            </div>
            <hr class="different-right" />
        </div>

        <div class="row" id="pull">
            <div class="col flex-column items-start">
                <span>Вы получаете</span>
                <span>{{ toCurrency }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
	.row:nth(2) {
		gap: 10px;
	}
	.icon {
		/* top: 50%;
    left: 50%; */
		width: 40px;
		height: 40px;
		background-color: rgb(107, 107, 109);
		color: rgba(255, 255, 255, 0.7);
		/* transform: translate(-50%,-50%); */
	}
	.different-left {
		width: calc(50% - 50px);
		border: none;
		border-top: 2px solid rgb(107, 107, 109);
	}
	.different-right {
		width: calc(50% - 50px);
		border: none;
		border-top: 2px solid rgb(107, 107, 109);
	}
</style>
