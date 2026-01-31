<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useTradeStore } from '@/store/useTrade.js'

const tradeStore = useTradeStore()
const canvasRef = ref(null)
const chartInstance = ref(null)
const isLoading = ref(false)
const error = ref(null)
const selectedPeriod = ref('7d')
const chartData = ref(null)

const btnData = [
  { id: '24h', label: 'День' },
  { id: '7d', label: 'Неделя' },
  { id: '30d', label: 'Месяц' },
]

// Функция для обновления данных графика
const updateChartData = (period) => {
  const prices = tradeStore.getPriceData(period)
  
  chartData.value = {
    prices,
    labels: prices.map((_, index) => {
      if (period === '24h') return `${index}:00`
      if (period === '7d') return `День ${index + 1}`
      if (period === '30d') return `${index + 1}`
      return index.toString()
    })
  }
}

// Функция для создания/обновления графика
const renderOrUpdateChart = () => {
  if (!canvasRef.value || !chartData.value) {
    console.error('Canvas или данные не готовы')
    return
  }
  
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) {
    console.error('Не удалось получить контекст canvas')
    return
  }
  
  // Если график уже существует - уничтожаем его
  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = null
  }
  
  try {
    // Создаем градиент для заливки
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasRef.value.height)
    gradient.addColorStop(0, 'rgba(0, 150, 255, 0.3)')
    gradient.addColorStop(1, 'rgba(0, 150, 255, 0.05)')
    
    // Передаем данные в store для рендеринга
    chartInstance.value = tradeStore.renderChart(selectedPeriod.value, ctx, {
      prices: chartData.value.prices,
      backgroundColor: gradient
    })
  } catch (err) {
    console.error('Ошибка при создании графика:', err)
    error.value = 'Не удалось создать график'
  }
}

// Обработчик выбора периода
const handlePeriodChange = (id) => {
  console.log('Выбран период:', id)
  selectedPeriod.value = id
}

// Инициализация компонента
const initChart = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Даем время на монтирование DOM
    await nextTick()
    
    // Имитация загрузки данных
    setTimeout(() => {
      updateChartData(selectedPeriod.value)
      renderOrUpdateChart()
      isLoading.value = false
    }, 300)
  } catch (err) {
    console.error('Ошибка при инициализации:', err)
    error.value = 'Ошибка загрузки данных'
    isLoading.value = false
  }
}

// Наблюдаем за изменением периода
watch(selectedPeriod, (newPeriod) => {
  if (chartInstance.value) {
    updateChartData(newPeriod)
    renderOrUpdateChart()
  }
})

// Наблюдаем за изменением размеров окна
const handleResize = () => {
  if (chartInstance.value) {
    chartInstance.value.resize()
  }
}

// Жизненный цикл компонента
onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
  window.removeEventListener('resize', handleResize)
})
</script>
<template>
	<div class="chart-container">
		<div class="chart-header">
			<h3>BTC/USD</h3>
			<div class="row justify-between pt-20">
				<button
					class="btn"
					v-for="item in btnData"
					:key="item.id"
					@click="handlePeriodChange(item.id)"
					:class="{ 'btn-active': selectedPeriod === item.id }">
					{{ item.label }}
				</button>
			</div>
			<div v-if="error" class="error-message">
				<span class="error-icon">!</span>
				<span>{{ error }}</span>
			</div>
			<div v-if="isLoading" class="loading-state">
				<div class="spinner"></div>
				<span>Загрузка данных...</span>
			</div>
		</div>

		<div class="chart-area">
			<!-- Canvas для графика -->
			<canvas
				ref="canvasRef"
				v-show="!isLoading && chartInstance"
				class="chart-canvas"></canvas>

			<!-- Состояние загрузки -->
			<div v-if="isLoading" class="loading-placeholder">
				<div class="placeholder-content">
					<div class="placeholder-spinner"></div>
					<p>Загрузка данных...</p>
				</div>
			</div>

			<!-- Состояние ошибки/нет данных -->
			<div v-if="!isLoading && !chartInstance && !error" class="no-chart-message">
				<p>График недоступен. Обновите страницу.</p>
			</div>
		</div>

		<!-- Информация о данных -->
		<div v-if="chartData && !isLoading" class="chart-info">
			<div class="info-grid">
				<div class="info-item">
					<span class="info-label">Текущая цена:</span>
					<span class="info-value">
						${{
							chartData.prices[chartData.prices.length - 1]?.toLocaleString("en-US", {
								minimumFractionDigits: 0,
								maximumFractionDigits: 0,
							}) || "0"
						}}
					</span>
				</div>
				<div class="info-item">
					<span class="info-label">Максимум за период:</span>
					<span class="info-value">
						${{
							Math.max(...chartData.prices).toLocaleString("en-US", {
								minimumFractionDigits: 0,
								maximumFractionDigits: 0,
							}) || "0"
						}}
					</span>
				</div>
				<div class="info-item">
					<span class="info-label">Минимум за период:</span>
					<span class="info-value">
						${{
							Math.min(...chartData.prices).toLocaleString("en-US", {
								minimumFractionDigits: 0,
								maximumFractionDigits: 0,
							}) || "0"
						}}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.chart-container {
		    background: rgb(1, 49, 49);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		display: flex;
		flex-direction: column;
		font-family: "Inter", sans-serif;
	}

	.chart-header {
		margin-bottom: 20px;
		flex-shrink: 0;
	}

	.chart-header h3 {
		margin: 0 0 8px 0;
		color: #111827;
		font-size: 18px;
		font-weight: 600;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.justify-between {
		justify-content: space-between;
	}

	.pt-20 {
		padding-top: 20px;
	}

	.btn {
		background: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: white;
		padding: 8px 16px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.2s ease;
		min-width: 80px;
		text-align: center;
	}

	.btn:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-1px);
	}

	.btn-active {
		background: rgba(255, 255, 255, 0.4);
		border-color: rgba(255, 255, 255, 0.6);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.loading-state {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #6b7280;
		font-size: 14px;
		margin-top: 4px;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid #e5e7eb;
		border-top: 2px solid #6366f1;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #dc2626;
		font-size: 14px;
		background-color: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 6px;
		padding: 8px 12px;
		margin-top: 8px;
	}

	.error-icon {
		background-color: #dc2626;
		color: white;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: bold;
	}

	.chart-area {
		flex-grow: 1;
		position: relative;
		min-height: 300px;
		width: 100%;
	}

	.chart-canvas {
		width: 100% !important;
		height: 100% !important;
		display: block;
	}

	.loading-placeholder {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: teal;
		border-radius: 8px;
	}

	.placeholder-content {
		text-align: center;
		color: white;
	}

	.placeholder-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(255, 255, 255, 0.3);
		border-top: 3px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 12px auto;
	}

	.placeholder-content p {
		margin: 0;
		font-size: 14px;
	}

	.no-chart-message {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #6b7280;
		font-size: 14px;
		background-color: #f9fafb;
		border-radius: 8px;
	}

	.chart-info {
		margin-top: 20px;
		padding-top: 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.3);
		flex-shrink: 0;
	}

	.info-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.info-label {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
        flex: 1 auto;
	}

	.info-value {
		font-size: 16px;
		font-weight: 600;
		color: white;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/* Адаптивность */
	@media (max-width: 768px) {
		.chart-container {
			padding: 16px;
			height: auto;
			min-height: 450px;
		}

		.info-grid {
			grid-template-columns: 1fr;
			gap: 12px;
		}

		.chart-area {
			min-height: 250px;
		}

		.btn {
			min-width: 70px;
			padding: 6px 12px;
			font-size: 13px;
		}
	}
</style>
