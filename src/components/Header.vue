<script setup>
    import { ref } from 'vue'

    const username = ref('Олег')
</script>
<template>
	<header class="header mb-20">
		<div class="header-row row w-100 justify-between items-center">
			<div class="header-btn header-item hover-filter-drop-shadow">
            <i class="bi bi-qr-code-scan"></i>
         </div>
			<div class="header-user header-item hover-filter-drop-shadow">
				<div class="header-user-avatar">
                <img src="/img-1.png" alt="avatar">
            </div>
				<div class="header-user-name">{{ username }}</div>
			</div>
			<div class="header-btn header-item hover-filter-drop-shadow">
            <i class="bi bi-arrow-repeat"></i>
         </div>
		</div>
	</header>
</template>
<style scoped>
.bi-arrow-repeat {
   font-size: 40px;
   position: relative;
}
.header-btn{
   position: relative;
}
.header-btn:last-child:after {
   content: '$';
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
.header-item{
   transition: filter 0.3s ease-in-out;
   cursor: pointer;
}
.header-item:hover{
   /* filter: drop-shadow(0 0 2em #ffffffaa); */
}
.header-user-avatar{
   width: 40px;
   height: 40px;
   border-radius: 50%;
}

</style>
