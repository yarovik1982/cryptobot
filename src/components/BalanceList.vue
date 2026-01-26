<script setup>
	import { ref, onMounted, computed } from "vue";
	import { useRouter } from "vue-router";
	import { apiData } from "@/composables/apiData.js";
	import { list } from "@/store/useBalanceList";
	import Input from "./Input.vue";

	const { api_key, api_url } = apiData;
	const isVisible = ref(false);
	const currBalance = ref(500.55);
	const coinList = ref([]);
	const isLoading = ref(true);
	const error = ref(null);
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
	// onMounted(() => {filteredCoinList()})
	const router = useRouter();
	const currentRouter = computed(() => router.currentRoute.value.path);
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
				<span class="subtitle"> {{ currentRouter === '/deposit' ? 'Пополнение': currentRouter === '/withdraw'? 'Вывод': '' }} криптовалюты </span>
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
				<div class="row w-100 hover-bg rounded-16 pointer transition" v-for="coin in list" :key="coin.id">
					<div class="col">
						<img :src="coin.images.x60" :alt="coin.name" >
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
									{{ coin.price }}
								</span>
								<span class="coin-balance">
									{{ coin.name==='Tether'? currBalance:'0.00' }}
								</span>
							</div>
							<i class="bi bi-chevron-right" v-if="currentRouter === '/deposit' || currentRouter === '/withdraw'"></i>
						</div>
					</div>	

				</div>
			</div>
			
		</div>
	</div>
</template>
<style scoped>
	.subtitle {
		color: rgba(255, 255, 255, 0.5);
		font-size: 14px;
	}
	.bi-search{
		position: absolute;
		z-index: 10;
		top: 0;
		left: 10px;
		font-size: 24px;
	}
	.table .row{
		position: relative;
		
	}
	.table .row::before{
		position: absolute;
		content: '';
		left: 15%;
		bottom: 1px;
		width: calc(85% - 8px);
		height: 1px;
		background-color: rgb(255, 255, 255,.3);
	}
	.table .row:hover::before{
		opacity: 0;
	}
	.col{
		display: flex;
		align-items: center;
		padding: 10px ;
		min-height: 100%;
	}
	
	.col:nth-child(1) {
		flex:1 15%;
	}
	.col:nth-child(2) {
		/* border-bottom: 1px solid #fff; */
		width: calc((85%) / 2);
		padding-left: 20px;
		text-align: left;
		font-size: 18px;
	}
	.col:nth-child(3) {
		/* border-bottom: 1px solid #fff; */
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
		/* order: 2; */
	}
</style>
