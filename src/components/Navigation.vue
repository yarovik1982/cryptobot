<script setup>
	import { RouterLink } from "vue-router";

	import iconDeposit from "@/assets/icons/deposit.svg";
	import iconWithdraw from "@/assets/icons/withdraw.svg";
	import iconExchange from "@/assets/icons/exchange.svg";
	import iconTrade from "@/assets/icons/trade.svg";

	const links = [
		{ to: "/deposit", icon: iconDeposit, label: "Пополнить" },
		{ to: "/withdraw", icon: iconWithdraw, label: "Вывести" },
		{ to: "/exchange", icon: iconExchange, label: "Обмен" },
		{ to: "/trade", icon: iconTrade, label: "Биржа" },
	];
</script>

<template>
	<nav class="nav">
		<RouterLink to="/deposit" class="link" active-class="link--active">
			<div class="link-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-arrow-down-left"
					viewBox="0 0 16 16">
					<path
						fill-rule="evenodd"
						d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0z" />
				</svg>
			</div>
			<span class="link-label"> Пополнить </span>
		</RouterLink>
		<RouterLink to="/withdraw" class="link" active-class="link--active">
			<div class="link-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-arrow-up-right"
					viewBox="0 0 16 16">
					<path
						fill-rule="evenodd"
						d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
				</svg>
			</div>
			<span class="link-label"> Вывести </span>
		</RouterLink>
		<RouterLink to="/exchange" class="link" active-class="link--active">
			<div class="link-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-arrow-down-up"
					viewBox="0 0 16 16">
					<path
						fill-rule="evenodd"
						d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
				</svg>
			</div>
			<span class="link-label"> Обменять </span>
		</RouterLink>
		<RouterLink to="/trade" class="link" active-class="link--active">
			<div class="link-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-graph-up"
					viewBox="0 0 16 16">
					<path
						fill-rule="evenodd"
						d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07" />
				</svg>
			</div>
			<span class="link-label"> Биржа </span>
		</RouterLink>
	</nav>
</template>

<style scoped>
	.nav {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
		/* padding-top: 20px; */
	}

	.link {
		width: 25%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		align-items: center;
		text-align: center;
		color: #fff;
		text-decoration: none;
		transition:
			filter 0.3s,
			transform 0.2s;
	}

	.link-icon {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.link-icon img {
		width: 24px;
		height: 24px;
	}

	.link-label {
		font-size: 14px;
	}

	.link:hover {
		filter: drop-shadow(0 0 0.5em #ddff00aa);
		transform: translateY(-2px);
	}

	.link--active .link-icon {
		background-color: rgba(221, 255, 0, 0.2);
	}
   .bi-arrow-down-up{
      transform: rotate(-90deg);
   }
</style>
