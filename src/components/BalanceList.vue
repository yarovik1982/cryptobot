<script setup>
	import { ref } from "vue";
	const coinList = ref([
		{ label: "Notcoin", icon: "bi bi-coin" },
		{ label: "Trump", icon: "bi bi-coin" },
		{ label: "Solana", icon: "bi bi-coin" },
		{ label: "Bitcoin", icon: "bi bi-currency-bitcoin" },
		{ label: "Dogecoin", icon: "bi bi-coin" },
		{ label: "Toncoin", icon: "bi bi-coin" },
		{ label: "Etherium", icon: "bi bi-coin" },
		{ label: "Tron", icon: "bi bi-coin" },
		{ label: "Gramm", icon: "bi bi-coin" },
	]);
</script>
<template>
	<div class="balanceList">
		<div class="table-overlay">
			<table class="w-100">
				<tr v-for="coin in coinList" :key="coin.label">
					<td>
						<i :class="coin.icon"></i>
						<!-- <div class="row">icon</div> -->
					</td>
					<td>
						{{ coin.label }}
					</td>
					<td>0.00</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<style scoped>
   table{
      border-collapse: collapse;
   }
	.bi {
		font-size: 50px;
	}
	td {
		padding: 10px 0;
		font-size: 14px;
	}
	td:nth-child(1) {
		width: 50px;
	}
	td:nth-child(2) {
      border-bottom: 1px solid #fff;
		width: calc((100% - 50px) / 2);
		padding-left: 20px;
		text-align: left;
		font-size: 18px;
	}
	td:nth-child(3) {
      border-bottom: 1px solid #fff;
		width: calc((100% - 50px) / 2);
		text-align: right;
		font-size: 18px;
	}
</style>
