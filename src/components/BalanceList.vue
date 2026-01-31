<script setup>
	import { ref, onMounted, computed, watch } from "vue";
	import { useRouter } from "vue-router";
	import { useBalanceListStore } from "@/store/useBalanceList";
	import { apiData } from "@/composables/apiData.js";
	import Input from "./Input.vue";

	const { api_key, api_url } = apiData;
	const isVisible = ref(false);
	const currBalance = ref(500.55);
	const coinList = ref([]);
	const isLoading = ref(true);
	const error = ref(null);

	const router = useRouter();
	const currentRouter = computed(() => router.currentRoute.value.path);

	// Используем store
	const balanceListStore = useBalanceListStore();

	// Получаем данные из store
	const allCoins = computed(() => balanceListStore.getAllCoins);
	const searchResult = computed(() => balanceListStore.getResult);

	// Отслеживаем изменения результатов поиска
	watch(searchResult, (newResults) => {
		if (newResults && newResults.length > 0) {
			coinList.value = newResults;
		} else {
			// Если нет результатов поиска, показываем все монеты
			coinList.value = allCoins.value;
		}
	});

	// Инициализируем coinList при монтировании
	onMounted(() => {
		coinList.value = allCoins.value;
	});

	const mockData = [
		{
			id: 1,
			name: "Bitcoin",
			symbol: "BTC",
			price: 45000,
			images: {
				x60: "https://img.cryptorank.io/coins/60x60.bitcoin1524754012028.png",
			},
			balance: 0.0,
		},
		{
			id: 2,
			name: "Ethereum",
			symbol: "ETH",
			price: 3000,
			images: {
				x60: "https://img.cryptorank.io/coins/60x60.ethereum1765201517428.png",
			},
			balance: 0.0,
		},
		{
			id: 3,
			name: "Tether",
			symbol: "USDT",
			price: 0.998649369164,
			images: {
				x60: "https://img.cryptorank.io/coins/60x60.tether1645007690922.png",
			},
			balance: 500.55,
		},
	];

	function filteredCoinList() {
		if (isVisible.value) {
			coinList.value = mockData.filter((coin) => coin.balance > 0);
			isVisible.value = false;
		} else {
			coinList.value = mockData;
			isVisible.value = true;
		}
	}

	// Функция для получения баланса монеты
	const getCoinBalance = (coin) => {
		if (coin.name === "Tether") {
			return currBalance.value.toFixed(2);
		}
		return "0.00";
	};
</script>
<template>
	<div class="balanceList">
		<div
			class="row w-100 mt-20 justify-between items-center font-14"
			v-show="currentRouter === '/'">
			<div class="col-6 text-left pointer">Мои активы</div>
			<div class="col-6 text-right pointer" @click="filteredCoinList">
				<span v-if="isVisible">Скрыть</span>
				<span v-else> Показать</span>
				мелкие балансы
			</div>
		</div>
		<div class="header" v-if="currentRouter != '/'">
			<div class="row w-100 mt-20">
				<span class="subtitle">
					{{
						currentRouter === "/deposit"
							? "Пополнение"
							: currentRouter === "/withdraw"
								? "Вывод"
								: ""
					}}
					криптовалюты
				</span>
			</div>
			<div class="row w-100 mt-10">
				<Input class="mb-10" type="search" :is-icon="true">
					<template #icon>
						<i class="bi bi-search"></i>
					</template>
				</Input>
			</div>
		</div>
		<div class="table-overlay">
			<div class="table">
				<div
					class="row w-100 hover-bg rounded-16 pointer transition"
					v-for="coin in coinList"
					:key="coin.id"
					@click="
						currentRouter === '/' ? null : $router.push(`${currentRouter}/${coin.id}`)
					">
					<div class="col">
						<img :src="coin.images.x60" :alt="coin.name" />
					</div>
					<div class="col">
						<div class="coin-description flex-column">
							<span class="order-2">
								{{ coin.name }}
							</span>
							<span>
								{{ coin.symbol }}
							</span>
						</div>
					</div>
					<div class="col">
						<div class="cel w-100 text-right">
							<div class="coin-info" v-show="currentRouter === '/'">
								<span class="coin-price order-2">
									{{ parseFloat(coin.price).toFixed(2) }}
								</span>
								<span class="coin-balance">
									{{ getCoinBalance(coin) }}
								</span>
							</div>
							<i
								class="bi bi-chevron-right"
								v-if="
									currentRouter === '/deposit' || currentRouter === '/withdraw'
								"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	/* Ваши стили остаются без изменений */
	.subtitle {
		color: rgba(255, 255, 255, 0.5);
		font-size: 14px;
	}
	.bi-search {
		position: absolute;
		z-index: 10;
		top: 0;
		left: 10px;
		font-size: 24px;
	}
	.table .row {
		position: relative;
	}
	.table .row::before {
		position: absolute;
		content: "";
		left: 15%;
		bottom: 1px;
		width: calc(85% - 8px);
		height: 1px;
		background-color: rgb(255, 255, 255, 0.3);
	}
	.table .row:hover::before {
		opacity: 0;
	}
	.col {
		display: flex;
		align-items: center;
		padding: 10px;
		min-height: 100%;
	}

	.col:nth-child(1) {
		flex: 1 15%;
	}
	.col:nth-child(2) {
		width: calc((85%) / 2);
		padding-left: 20px;
		text-align: left;
		font-size: 18px;
	}
	.col:nth-child(3) {
		width: calc((85%) / 2);
		text-align: right;
		font-size: 18px;
	}
	.col img {
		width: 100%;
		object-fit: contain;
	}
	.coin-info {
		display: flex;
		flex-direction: column;
		gap: 5px;
		text-align: right;
		font-size: 14px;
	}
	.coin-price {
		font-size: 14px;
		color: rgb(92 255 92);
	}
</style>
