<script setup>
	import { useOverlay } from "@/store/useOverlay";
	import { ref } from "vue";
	import iconQr from "@/assets/icons/qr.svg";
	const overlayStore = useOverlay();
	const username = ref("Олег");
</script>
<template>
	<header class="header mb-20">
		<!-- <div class="px-20"> -->
			<div class="header-row row w-100 justify-between items-center">
				<div class="col flex-row justify-center">
					<div
						class="header-btn header-item hover-filter-drop-shadow"
						@click.stop="overlayStore.open()">
						<!-- <i class="bi bi-qr-code-scan" ></i> -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-qr-code-scan"
							viewBox="0 0 16 16">
							<path
								d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z" />
							<path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
							<path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
							<path
								d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z" />
							<path d="M12 9h2V8h-2z" />
						</svg>
					</div>
				</div>
				<div class="col flex-row justify-center">
					<div class="header-user header-item hover-filter-drop-shadow">
						<div class="header-user-avatar">
							<img src="/img-1.png" alt="avatar" />
						</div>
						<div class="header-user-name">{{ username }}</div>
					</div>
				</div>
				<div class="col flex-row justify-center">
					<div class="header-btn header-item hover-filter-drop-shadow">
						<i class="bi bi-arrow-repeat"></i>
					</div>
				</div>
			<!-- </div> -->
		</div>
	</header>
</template>
<style scoped>
	.col:nth-child(odd){
		width: 25%;
	}
	.col:nth-child(even){
		width: 50%;
	}
	.header-user-name {
		font-size: 16px;
		font-weight: 600;
		color: #888;
	}
	.bi-arrow-repeat {
		font-size: 40px;
		position: relative;
	}
	.header-btn {
		position: relative;
	}
	.header-btn:last-child:after {
		content: "$";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		font-size: 16px;
		font-weight: 600;
		color: gold;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.header-item {
		transition: filter 0.3s ease-in-out;
		cursor: pointer;
	}

	.header-user-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
</style>
