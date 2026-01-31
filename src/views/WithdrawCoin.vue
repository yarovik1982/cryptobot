<script setup>
	import { ref, computed, onMounted, watch } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useBalanceListStore } from "@/store/useBalanceList";
import CoinOperation from "@/components/CoinOperation.vue";

	// const route = useRoute();
	// const router = useRouter();
	// const balanceListStore = useBalanceListStore();

	// // Реактивные переменные
	// const walletAddress = ref("");
	// const copied = ref(false);
	// const transactions = ref([]);
	// const addressInput = ref(null);

	// // Получаем данные монеты по ID
	// const coinData = computed(() => {
	// 	const id = parseInt(route.params.id);
	// 	return balanceListStore.renderDataById(id) || {};
	// });

	// // Генерируем случайный адрес кошелька
	// const generateWalletAddress = () => {
	// 	const chars =
	// 		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	// 	let address = "";
	// 	const prefix = coinData.value.symbol === "BTC" ? "bc1q" : "0x";

	// 	for (let i = 0; i < 34; i++) {
	// 		address += chars.charAt(Math.floor(Math.random() * chars.length));
	// 	}

	// 	return prefix + address;
	// };

	// // Копирование адреса в буфер обмена
	// const copyAddress = async () => {
	// 	try {
	// 		await navigator.clipboard.writeText(walletAddress.value);
	// 		copied.value = true;
	// 		setTimeout(() => {
	// 			copied.value = false;
	// 		}, 2000);
	// 	} catch (err) {
	// 		console.error("Failed to copy address:", err);
	// 	}
	// };

	// // Обновление адреса
	// const refreshAddress = () => {
	// 	walletAddress.value = generateWalletAddress();
	// };

	// // Назад к списку
	// // const goBack = () => {
	// // 	router.push("/deposit");
	// // };

	// // Получение названия сети
	// const getNetworkName = () => {
	// 	const networks = {
	// 		BTC: "Bitcoin",
	// 		ETH: "Ethereum",
	// 		USDT: "ERC-20",
	// 		BNB: "BSC",
	// 		SOL: "Solana",
	// 		XRP: "Ripple",
	// 		ADA: "Cardano",
	// 		DOT: "Polkadot",
	// 	};

	// 	return networks[coinData.value.symbol] || coinData.value.symbol;
	// };

	// // Минимальное пополнение
	// const getMinDeposit = () => {
	// 	const minDeposits = {
	// 		BTC: 0.001,
	// 		ETH: 0.01,
	// 		USDT: 10,
	// 		BNB: 0.1,
	// 		SOL: 0.1,
	// 		XRP: 10,
	// 		ADA: 10,
	// 		DOT: 1,
	// 	};

	// 	return minDeposits[coinData.value.symbol] || 0.1;
	// };

	// // Изменение цены за 24ч (фейковые данные)
	// const calculate24hChange = () => {
	// 	// Генерируем случайное изменение от -5% до +5%
	// 	return (Math.random() * 10 - 5).toFixed(2);
	// };

	// // Класс для изменения цены
	// const getPriceChangeClass = () => {
	// 	const change = parseFloat(calculate24hChange());
	// 	return change >= 0 ? "positive" : "negative";
	// };

	// // Укорачивание хэша транзакции
	// const shortenHash = (hash) => {
	// 	return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
	// };

	// // Форматирование даты
	// const formatDate = (dateString) => {
	// 	return new Date(dateString).toLocaleDateString("ru-RU", {
	// 		day: "2-digit",
	// 		month: "2-digit",
	// 		year: "numeric",
	// 		hour: "2-digit",
	// 		minute: "2-digit",
	// 	});
	// };

	// // Текст статуса
	// const getStatusText = (status) => {
	// 	const statuses = {
	// 		completed: "Завершено",
	// 		pending: "В обработке",
	// 		failed: "Ошибка",
	// 	};
	// 	return statuses[status] || status;
	// };

	// // Загрузка истории транзакций (фейковые данные)
	// const loadTransactions = () => {
	// 	transactions.value = [
	// 		{
	// 			id: 1,
	// 			hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
	// 			amount: 0.5,
	// 			date: "2024-01-15T14:30:00Z",
	// 			status: "completed",
	// 		},
	// 		{
	// 			id: 2,
	// 			hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
	// 			amount: 1.2,
	// 			date: "2024-01-14T10:15:00Z",
	// 			status: "completed",
	// 		},
	// 		{
	// 			id: 3,
	// 			hash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
	// 			amount: 0.8,
	// 			date: "2024-01-13T16:45:00Z",
	// 			status: "pending",
	// 		},
	// 	];
	// };

	// // Инициализация при монтировании
	// onMounted(() => {
	// 	// Генерируем начальный адрес
	// 	walletAddress.value = generateWalletAddress();

	// 	// Загружаем историю транзакций
	// 	loadTransactions();

	// 	// Если монета не найдена, перенаправляем на страницу выбора
	// 	if (!coinData.value.id) {
	// 		router.push("/deposit");
	// 	}
	// });

	// // Следим за изменением ID в маршруте
	// watch(
	// 	() => route.params.id,
	// 	() => {
	// 		if (coinData.value.id) {
	// 			refreshAddress();
	// 			loadTransactions();
	// 		}
	// 	},
	// );
</script>

<template>
	<coin-operation></coin-operation>
</template>

<style scoped>
	.min-h {
		height: calc(100vh - 200px);
	}
	.overflow-y-auto {
		overflow-y: auto;
		max-height: calc(100vh - 200px);
	}
	.deposit-coin {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}

	.breadcrumbs {
		font-size: 14px;
	}

	.breadcrumb-link {
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		transition: color 0.3s ease;
	}

	.breadcrumb-link:hover {
		color: rgba(255, 255, 255, 1);
	}

	.coin-header {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 16px;
		padding: 20px;
	}

	.coin-icon-large {
		width: 60px;
		height: 60px;
		object-fit: contain;
	}

	.coin-title {
		font-size: 24px;
		font-weight: 600;
		margin: 0 0 5px 0;
		color: white;
	}

	.coin-symbol {
		font-size: 16px;
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
	}

	.card {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		overflow: hidden;
	}

	.card-header {
		padding: 20px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.card-header h2 {
		margin: 0;
		font-size: 18px;
		font-weight: 600;
		color: white;
	}

	.card-body {
		padding: 20px;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-label {
		display: block;
		margin-bottom: 8px;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.8);
	}

	.address-container {
		position: relative;
		display: flex;
	}

	.address-input {
		flex: 1;
		padding: 12px 50px 12px 15px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		color: white;
		font-size: 14px;
		font-family: monospace;
	}

	.copy-btn {
		position: absolute;
		right: 5px;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.1);
		border: none;
		border-radius: 6px;
		color: white;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.copy-btn:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.copy-btn.copied {
		background: rgba(76, 175, 80, 0.2);
		color: #4caf50;
	}

	.address-hint {
		margin-top: 8px;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.5);
	}

	.qr-container {
		display: flex;
		justify-content: center;
		padding: 20px;
		background: white;
		border-radius: 8px;
		max-width: 200px;
		margin: 0 auto;
	}

	.qr-placeholder {
		text-align: center;
		color: #333;
	}

	.qr-placeholder i {
		font-size: 100px;
		margin-bottom: 10px;
		color: #333;
	}

	.qr-placeholder p {
		margin: 0;
		font-size: 14px;
	}

	.info-box {
		display: flex;
		gap: 12px;
		padding: 15px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		border-left: 4px solid rgba(255, 255, 255, 0.2);
	}

	.info-box.warning {
		border-left-color: #ff9800;
		background: rgba(255, 152, 0, 0.1);
	}

	.info-box i {
		font-size: 20px;
		color: rgba(255, 255, 255, 0.7);
	}

	.info-box.warning i {
		color: #ff9800;
	}

	.info-content {
		flex: 1;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.9);
	}

	.network-name {
		color: #4caf50;
		font-weight: 600;
	}

	.action-buttons {
		display: flex;
		gap: 15px;
		margin-top: 30px;
	}

	.btn {
		flex: 1;
		padding: 12px 20px;
		border-radius: 8px;
		border: none;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		transition: all 0.3s ease;
	}

	.btn-secondary {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	.btn-secondary:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.btn-primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
	}

	.transaction-item {
		padding: 15px 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.transaction-item:last-child {
		border-bottom: none;
	}

	.tx-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.tx-hash {
		font-family: monospace;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.9);
	}

	.tx-date {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.5);
	}

	.tx-amount {
		font-size: 16px;
		font-weight: 600;
		display: block;
	}

	.tx-amount.completed {
		color: #4caf50;
	}

	.tx-amount.pending {
		color: #ff9800;
	}

	.tx-amount.failed {
		color: #f44336;
	}

	.tx-status {
		font-size: 12px;
		display: block;
		margin-top: 4px;
	}

	.tx-status.completed {
		color: rgba(76, 175, 80, 0.8);
	}

	.tx-status.pending {
		color: rgba(255, 152, 0, 0.8);
	}

	.tx-status.failed {
		color: rgba(244, 67, 54, 0.8);
	}

	.label {
		color: rgba(255, 255, 255, 0.7);
		font-size: 14px;
	}

	.price-value {
		font-size: 18px;
		font-weight: 600;
		color: white;
	}

	.price-change {
		font-size: 16px;
		font-weight: 600;
	}

	.price-change.positive {
		color: #4caf50;
	}

	.price-change.negative {
		color: #f44336;
	}

	@media (max-width: 768px) {
		.deposit-coin {
			padding: 15px;
		}

		.action-buttons {
			flex-direction: column;
		}

		.qr-container {
			max-width: 150px;
		}

		.qr-placeholder i {
			font-size: 70px;
		}
	}
</style>
