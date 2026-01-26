<script setup>
	import { useRoute, useRouter, RouterView } from "vue-router";

	import { computed } from "vue";

	const route = useRoute();
	const router = useRouter();
	const currRoute = computed(() => route.path);
	
	
</script>

<template>
	<div class="page">
		<div
			:class="['page-title ', { expand: currRoute != '/' }]"
			@click="router.back()">
			<div class="page-title-wrap row items-center hover-filter-drop-shadow">
				<div class="page-title-arrow">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						class="bi bi-arrow-left hover-filter-drop-shadow"
						viewBox="0 0 16 16">
						<path
							fill-rule="evenodd"
							d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
					</svg>
				</div>
				<h1 class="hover-filter-drop-shadow">Крипто Бот</h1>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<style scoped>
	.page-title {
		display: flex;
		align-items: center;
		padding: 20px 0;
		gap: 10px;
		cursor: pointer;
		transition: filter .3s ease-in-out;
		position: relative;
		z-index: 110;
		background: #242424;
	}
	/* .page-title:hover{
		filter: drop-shadow(0 0 2em #ffffffaa);
	} */
	.page-title h1 {
		font-size: 30px;
		/* text-align: left; */
		padding: 0;
		margin: 0;
		line-height: 31px;
		margin-left: -24px;
		transition: all 0.3s ease-in-out;
	}
	.page-title-arrow {
		display: flex;
		transform: scale(0);
		transform-origin: right;
		transition: transform 0.3s ease-in-out;
	}
	.page-title.expand .page-title-arrow {
		transform: scale(1);
	}
	.page-title.expand h1 {
		margin-left: 0;
	}
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.vue:hover {
		filter: drop-shadow(0 0 2em #42b883aa);
	}
</style>
