<script setup>
	import { ref, computed, onMounted, watch } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useBalanceListStore } from "@/store/useBalanceList";

	const props = defineProps({
		operationType: {
			type: String,
			required: true,
			validator: (value) => ["deposit", "withdraw"].includes(value),
		},
	});

	const route = useRoute();
	const router = useRouter();
	const balanceListStore = useBalanceListStore();

	// Реактивные переменные
	const walletAddress = ref("");
	const copied = ref(false);
	const transactions = ref([]);
	const addressInput = ref(null);

	// Получаем данные монеты по ID
	const coinData = computed(() => {
		const id = parseInt(route.params.id);
		return balanceListStore.renderDataById(id) || {};
	});

	// Генерируем случайный адрес кошелька
	const generateWalletAddress = () => {
		const chars =
			"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		let address = "";
		const prefix = coinData.value.symbol === "BTC" ? "bc1q" : "0x";

		for (let i = 0; i < 34; i++) {
			address += chars.charAt(Math.floor(Math.random() * chars.length));
		}

		return prefix + address;
	};

	// Копирование адреса в буфер обмена
	const copyAddress = async () => {
		try {
			await navigator.clipboard.writeText(walletAddress.value);
			copied.value = true;
			setTimeout(() => {
				copied.value = false;
			}, 2000);
		} catch (err) {
			console.error("Failed to copy address:", err);
		}
	};

	// Обновление адреса
	const refreshAddress = () => {
		walletAddress.value = generateWalletAddress();
	};

	// Назад к списку
	const goBack = () => {
		router.push(`/${props.operationType}`);
	};

	// Получение названия сети
	const getNetworkName = () => {
		const networks = {
			BTC: "Bitcoin",
			ETH: "Ethereum",
			USDT: "ERC-20",
			BNB: "BSC",
			SOL: "Solana",
			XRP: "Ripple",
			ADA: "Cardano",
			DOT: "Polkadot",
		};

		return networks[coinData.value.symbol] || coinData.value.symbol;
	};

	// Минимальное пополнение/вывод
	const getMinAmount = () => {
		const minAmounts = {
			BTC: 0.001,
			ETH: 0.01,
			USDT: 10,
			BNB: 0.1,
			SOL: 0.1,
			XRP: 10,
			ADA: 10,
			DOT: 1,
		};

		return minAmounts[coinData.value.symbol] || 0.1;
	};

	// Изменение цены за 24ч (фейковые данные)
	const calculate24hChange = () => {
		// Генерируем случайное изменение от -5% до +5%
		return (Math.random() * 10 - 5).toFixed(2);
	};

	// Класс для изменения цены
	const getPriceChangeClass = () => {
		const change = parseFloat(calculate24hChange());
		return change >= 0 ? "positive" : "negative";
	};

	// Укорачивание хэша транзакции
	const shortenHash = (hash) => {
		return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("ru-RU", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getStatusText = (status) => {
		const statuses = {
			completed: "Завершено",
			pending: "В обработке",
			failed: "Ошибка",
		};
		return statuses[status] || status;
	};

	const getOperationTitle = () => {
		return props.operationType === "deposit" ? "Пополнение" : "Вывод";
	};

	const getBackButtonText = () => {
		return props.operationType === "deposit"
			? "Назад к выбору монеты"
			: "Назад к выводу";
	};

	const getAddressHint = () => {
		if (props.operationType === "deposit") {
			return `Отправьте ${coinData.value.symbol} на этот адрес`;
		} else {
			return `Укажите адрес для вывода ${coinData.value.symbol}`;
		}
	};

	const getNetworkInfo = () => {
		if (props.operationType === "deposit") {
			return {
				icon: "bi-exclamation-triangle",
				type: "warning",
				text: `Отправляйте только ${coinData.value.symbol} по сети <span class="network-name">${getNetworkName()}</span>. Отправка других активов приведет к их потере.`,
			};
		} else {
			return {
				icon: "bi-exclamation-circle",
				type: "info",
				text: `Убедитесь, что указали адрес в сети <span class="network-name">${getNetworkName()}</span>. Вывод на адреса других сетей приведет к потере средств.`,
			};
		}
	};

	const loadTransactions = () => {
		if (props.operationType === "deposit") {
			transactions.value = [
				{
					id: 1,
					hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
					amount: 0.5,
					date: "2024-01-15T14:30:00Z",
					status: "completed",
					type: "deposit",
				},
				{
					id: 2,
					hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
					amount: 1.2,
					date: "2024-01-14T10:15:00Z",
					status: "completed",
					type: "deposit",
				},
			];
		} else {
			transactions.value = [
				{
					id: 1,
					hash: "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
					amount: 0.3,
					date: "2024-01-15T16:45:00Z",
					status: "completed",
					type: "withdraw",
				},
				{
					id: 2,
					hash: "0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210",
					amount: 0.8,
					date: "2024-01-14T12:20:00Z",
					status: "pending",
					type: "withdraw",
				},
			];
		}
	};

	const getTransactionHistoryTitle = () => {
		return props.operationType === "deposit"
			? "Последние пополнения"
			: "Последние выводы";
	};

	onMounted(() => {
		walletAddress.value = generateWalletAddress();

		loadTransactions();

		if (!coinData.value.id) {
			router.push(`/${props.operationType}`);
		}
	});

	watch(
		() => route.params.id,
		() => {
			if (coinData.value.id) {
				refreshAddress();
				loadTransactions();
			}
		},
	);
</script>

<template>
	<div class="coin-operation">
		<!-- Хлебные крошки -->
		<div class="breadcrumbs mb-20">
			<router-link :to="`/${operationType}`" class="breadcrumb-link">
				<i class="bi bi-arrow-left"></i> {{ getBackButtonText() }}
			</router-link>
		</div>

		<!-- Шапка с информацией о монете -->
		<div class="min-h overflow-y-auto">
			<div class="coin-header mb-10">
				<div class="row items-center justify-between">
					<div class="col-auto">
						<img
							:src="coinData.images?.x60"
							:alt="coinData.name"
							class="coin-icon-large" />
					</div>
					<div class="col text-right">
						<h1 class="coin-title">{{ getOperationTitle() }} {{ coinData.name }}</h1>
						<p class="coin-symbol">{{ coinData.symbol }}</p>
					</div>
				</div>
			</div>

			<!-- Информация о цене -->
			<div class="price-info mb-10">
				<div class="card">
					<div class="card-body">
						<div class="row justify-between items-center">
							<div class="col">
								<span class="label">Текущая цена:</span>
							</div>
							<div class="col text-right">
								<span class="price-value">
									${{ parseFloat(coinData.price || 0).toFixed(2) }}
								</span>
							</div>
						</div>
						<div class="row justify-between align-center mt-10">
							<div class="col">
								<span class="label">Изменение за 24ч:</span>
							</div>
							<div class="col text-right">
								<span class="price-change" :class="getPriceChangeClass()">
									{{ calculate24hChange() }}%
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Форма операции -->
			<div class="operation-form">
				<div class="card">
					<div class="card-header">
						<h2>
							Детали {{ operationType === "deposit" ? "пополнения" : "вывода" }}
						</h2>
					</div>
					<div class="card-body">
						<!-- Адрес кошелька -->
						<div class="form-group mb-10">
							<label class="form-label">
								{{
									operationType === "deposit"
										? "Адрес для пополнения"
										: "Адрес для вывода"
								}}
							</label>
							<div class="address-container">
								<input
									type="text"
									:value="walletAddress"
									:readonly="operationType === 'deposit'"
									:placeholder="
										operationType === 'withdraw' ? 'Введите адрес для вывода' : ''
									"
									class="address-input"
									ref="addressInput" />
								<button
									class="copy-btn"
									@click="copyAddress"
									:class="{ copied: copied }">
									<i class="bi" :class="copied ? 'bi-check-lg' : 'bi-copy'"></i>
								</button>
							</div>
							<p class="address-hint">{{ getAddressHint() }}</p>
						</div>

						<!-- QR-код (только для депозита) -->
						<div class="qr-section mb-10" v-if="operationType === 'deposit'">
							<label class="form-label">QR-код</label>
							<div class="qr-container">
								<div class="qr-code" ref="qrCode">
									<div class="qr-placeholder">
										<i class="bi bi-qr-code"></i>
										<p>QR-код для {{ coinData.symbol }}</p>
									</div>
								</div>
							</div>
						</div>

						<!-- Информация о сети -->
						<div class="network-info mb-10">
							<div class="info-box" :class="getNetworkInfo().type">
								<i class="bi" :class="getNetworkInfo().icon"></i>
								<div class="info-content" v-html="getNetworkInfo().text"></div>
							</div>
						</div>

						<!-- Минимальная сумма -->
						<div class="min-amount mb-10">
							<div class="info-box">
								<i class="bi bi-info-circle"></i>
								<div class="info-content">
									Минимальная сумма
									{{ operationType === "deposit" ? "пополнения" : "вывода" }}:
									<strong>{{ getMinAmount() }} {{ coinData.symbol }}</strong>
								</div>
							</div>
						</div>

						<!-- Кнопки действий -->
						<div class="action-buttons">
							<button class="btn btn-secondary" @click="goBack">
								<i class="bi bi-arrow-left"></i> Назад
							</button>
							<button class="btn btn-primary" @click="refreshAddress">
								<i class="bi bi-arrow-clockwise"></i>
								{{ operationType === "deposit" ? "Обновить адрес" : "Проверить адрес" }}
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- История транзакций -->
			<div class="transaction-history mt-10" v-if="transactions.length > 0">
				<div class="card">
					<div class="card-header">
						<h2>{{ getTransactionHistoryTitle() }}</h2>
					</div>
					<div class="card-body">
						<div class="transactions-list">
							<div v-for="tx in transactions" :key="tx.id" class="transaction-item">
								<div class="row justify-between items-center">
									<div class="col">
										<div class="tx-info">
											<span class="tx-hash">{{ shortenHash(tx.hash) }}</span>
											<span class="tx-date">{{ formatDate(tx.date) }}</span>
										</div>
									</div>
									<div class="col text-right">
										<span class="tx-amount" :class="tx.status">
											{{ tx.type === "deposit" ? "+" : "-" }}{{ tx.amount }}
											{{ coinData.symbol }}
										</span>
										<span class="tx-status" :class="tx.status">
											{{ getStatusText(tx.status) }}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.min-h {
		height: calc(100vh - 200px);
	}
	.overflow-y-auto {
		overflow-y: auto;
		max-height: calc(100vh - 200px);
	}
	.coin-operation {
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

	.address-input:read-only {
		background: rgba(255, 255, 255, 0.03);
		cursor: not-allowed;
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

	.info-box.info {
		border-left-color: #2196f3;
		background: rgba(33, 150, 243, 0.1);
	}

	.info-box i {
		font-size: 20px;
		color: rgba(255, 255, 255, 0.7);
	}

	.info-box.warning i {
		color: #ff9800;
	}

	.info-box.info i {
		color: #2196f3;
	}

	.info-content {
		flex: 1;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.9);
	}

	.info-content strong {
		color: white;
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
		.coin-operation {
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
