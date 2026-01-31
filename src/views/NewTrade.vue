<script setup></script>
<template>
	<div class="container">
		<div class="header">
			<div class="pair">BTC / USDT</div>
		</div>

		<div class="stats">
			<div>
				Изменение за 24ч<br /><span class="negative">-4 700 (-5.40%)</span>
			</div>
			<div>Объём за 24ч<br />3 373.19 USDT</div>
		</div>

		<div class="actions">
			<button class="buy">Купить</button>
			<button class="sell">Продать</button>
		</div>

		<div class="block">
			<div class="row">
				<span>Цена (USDT)</span>
			</div>
			<input value="82 300" />
		</div>

		<div class="block">
			<div class="row">
				<span>Сумма (BTC)</span>
			</div>
			<input value="0.00000585" />
		</div>

		<div class="block">
			<div class="row">
				<span>Всего (USDT)</span>
				<span>0.481455</span>
			</div>
			<div class="row">
				<span>Доступно</span>
				<span>0.481822 USDT</span>
			</div>
		</div>

		<div class="orderbook">
			<div class="price red">88 499.9</div>
			<div>0.00064</div>
			<div class="price red">87 998.9</div>
			<div>0.06723</div>
			<div class="price red">87 998</div>
			<div>0.00387</div>
			<div class="price green">82 300</div>
			<div>0.00080</div>
			<div class="price green">81 000.4</div>
			<div>0.01456</div>
			<div class="price green">80 985</div>
			<div>0.00100</div>
		</div>

		<button class="submit">Купить BTC</button>

		<div class="footer">
			<span>Открытые ордера</span>
			<span>История ордеров</span>
			<span>Сделки</span>
		</div>
	</div>
</template>
<style scoped>
	.container {
		
		background: #24323d;
		padding: 16px;
		border-radius: 10px;
      height: 100%;
	}

	.header {
		margin-bottom: 10px;
	}

	.pair {
		font-weight: 600;
		font-size: 16px;
	}

	.stats {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		margin-bottom: 12px;
		opacity: 0.9;
	}

	.negative {
		color: #ef4444;
	}
	.positive {
		color: #22c55e;
	}

	.actions {
		display: flex;
		gap: 8px;
		margin-bottom: 12px;
	}

	.actions button {
		flex: 1;
		padding: 10px;
		border-radius: 6px;
		border: none;
		cursor: pointer;
		font-weight: 600;
	}

	.buy {
		background: #22c55e;
		color: #04210f;
	}

	.sell {
		background: #374151;
		color: #9ca3af;
	}

	.block {
		background: #1f2a33;
		padding: 10px;
		border-radius: 6px;
		margin-bottom: 10px;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 6px;
		font-size: 13px;
	}

	.row input {
		width: 100%;
		background: #111827;
		border: 1px solid #374151;
		border-radius: 4px;
		padding: 8px;
		color: #e5e7eb;
		margin-top: 4px;
	}

	.orderbook {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 6px;
		font-size: 13px;
		margin: 12px 0;
	}

	.price.red {
		color: #ef4444;
	}
	.price.green {
		color: #22c55e;
	}

	.submit {
		width: 100%;
		padding: 12px;
		border-radius: 8px;
		border: none;
		background: #22c55e;
		color: #04210f;
		font-weight: 700;
		font-size: 15px;
		cursor: pointer;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		margin-top: 12px;
		opacity: 0.8;
	}
</style>
