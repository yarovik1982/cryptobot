<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { apiData } from "@/composables/apiData.js";
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

// Простая регистрация - без TimeScale
Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    Filler,
);

const { api_key, api_url } = apiData;
const canvasRef = ref(null);
const chartInstance = ref(null);
const isLoading = ref(true);
const error = ref(null);
const chartData = ref(null);

// Демо-данные
const generateDemoData = () => {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const prices = [43200, 43850, 42900, 44100, 44750, 45200, 44900];
    
    return { labels, prices };
};

// Получаем данные с CoinGecko
const getDataFromCoinGecko = async () => {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily"
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Данные от CoinGecko:", data);
        
        // Преобразуем timestamp в читаемые даты
        const labels = data.prices.map(item => {
            const date = new Date(item[0]);
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        });
        
        const prices = data.prices.map(item => item[1]);
        
        return { labels, prices };
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        throw error;
    }
};

// Инициализация графика (упрощенная версия)
const initChart = () => {
    console.log("Инициализация графика...");
    
    if (!canvasRef.value) {
        console.error("Canvas ref не найден");
        return;
    }
    
    // Уничтожаем предыдущий график если есть
    if (chartInstance.value) {
        console.log("Уничтожаем предыдущий график с ID:", chartInstance.value.id);
        chartInstance.value.destroy();
        chartInstance.value = null;
    }
    
    const ctx = canvasRef.value.getContext("2d");
    
    if (!ctx) {
        console.error("Не удалось получить контекст canvas");
        return;
    }
    
    try {
        // Проверяем данные
        if (!chartData.value || !chartData.value.labels || !chartData.value.prices) {
            console.error("Нет данных для графика");
            chartData.value = generateDemoData();
        }
        
        console.log("Создаем новый график с данными:", chartData.value);
        
        chartInstance.value = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartData.value.labels,
                datasets: [
                    {
                        label: "День",
                        data: "",
                        backgroundColor: "rgba(200, 200, 241, .25)",
                        borderColor: "blue",
                        borderWidth: 3,
                        tension: 0,
                        poinRadius: 3,
                        pointBackgroundColor:"#6366f1",
                        pointBorderColor:"#ffffff",
                        pointBorderWidth:1,
                        pointHoverRadius:3,
                        fill:true,
                    },
                    {
                        label: "Неделя",
                        data: chartData.value.prices,
                        borderWidth: 3,
                        tension: 0,
                        backgroundColor: "rgb(107, 107, 109)",

                        borderColor: "green",
                        pointRadius: 3,
                        pointBackgroundColor: "#6366f1",
                        pointBorderColor: "#ffffff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 3,
                        fill: true,
                    },
                    {
                        
                        data: "",
                        backgroundColor: "rgba(0, 250, 241, .25)",
                        borderColor: "yellow",
                        borderWidth: 3,
                        tension: 0,
                        poinRadius: 3,
                        pointBackgroundColor:"#6366f1",
                        pointBorderColor:"#ffffff",
                        pointBorderWidth:1,
                        pointHoverRadius:3,
                        fill:true,
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                        // position: 'top',
                        // labels: {
                        //     color: '#374151',
                        //     font: {
                        //         size: 14,
                        //         weight: '500',
                        //         family: "'Inter', sans-serif"
                        //     }
                        // }
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#6366f1',
                        borderWidth: 1,
                        cornerRadius: 6,
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return `$${context.parsed.y.toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                })}`;
                            }
                        }
                    },
                },
                scales: {
                    x: {
                        // Используем CategoryScale вместо TimeScale
                        grid: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.3)',
                            drawBorder: false,
                        },
                        ticks: {
                            color: '#000',
                            font: {
                                size: 12,
                                family: "'Inter', sans-serif"
                            }
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.3)',
                            drawBorder: false,
                        },
                        ticks: {
                            // color: '#6b7280',
                            color:"000",
                            font: {
                                size: 12,
                                family: "'Inter', sans-serif"
                            },
                            callback: function(value) {
                                if (value >= 1000) {
                                    return `$${(value / 1000).toFixed(0)}k`;
                                }
                                return `$${value}`;
                            }
                        }
                    },
                },
                interaction: {
                    intersect: false,
                    mode: 'nearest',
                },
                // elements: {
                //     point: {
                //         hoverBackgroundColor: '#fff',
                //         hoverBorderColor: '#6366f1',
                //         hoverBorderWidth: 3,
                //     }
                // }
            },
        });
        
        console.log("График успешно создан с ID:", chartInstance.value.id);
    } catch (err) {
        console.error("Критическая ошибка при создании графика:", err);
        error.value = "Ошибка при создании графика: " + err.message;
    }
};

// Загрузка данных
const loadData = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
        console.log("Начинаем загрузку данных...");
        const data = await getDataFromCoinGecko();
        chartData.value = data;
        console.log("Данные успешно загружены:", chartData.value);
    } catch (err) {
        console.error("Ошибка загрузки данных, используем демо:", err);
        error.value = "Используем демо-данные";
        chartData.value = generateDemoData();
    } finally {
        isLoading.value = false;
        console.log("Загрузка завершена, isLoading:", isLoading.value);
    }
};

// Основной процесс инициализации
onMounted(async () => {
    console.log("Компонент Trade.vue монтирован");
    
    // Загружаем данные
    await loadData();
    
    // Ждем обновления DOM
    await nextTick();
    
    console.log("Canvas ref:", canvasRef.value);
    
    // Если canvas уже доступен, инициализируем график
    if (canvasRef.value) {
        console.log("Canvas доступен, инициализируем график");
        initChart();
    } else {
        console.log("Canvas еще не доступен, ждем...");
        // Ждем немного и пробуем снова
        setTimeout(() => {
            if (canvasRef.value) {
                initChart();
            } else {
                console.error("Canvas так и не стал доступен");
                error.value = "Не удалось инициализировать график";
            }
        }, 100);
    }
});

onBeforeUnmount(() => {
    console.log("Компонент размонтируется");
    if (chartInstance.value) {
        console.log("Уничтожаем график с ID:", chartInstance.value.id);
        chartInstance.value.destroy();
        chartInstance.value = null;
    }
});
</script>

<template>
    <div class="chart-container">
        <div class="chart-header">
            <h3>BTC/USD</h3>
            <div class="row justify-between pt-20">
                <button class="btn">День</button>
                <button class="btn">Неделя</button>
                <button class="btn">Месяц</button>
            </div>
            <!-- <div v-if="isLoading" class="loading-state">
                <div class="spinner"></div>
                <span>Loading chart data...</span>
            </div> -->
            <div v-if="error" class="error-message">
                <span class="error-icon">!</span>
                <span>{{ error }}</span>
            </div>
        </div>
        
        <div class="chart-area">
            <!-- Простой canvas без ключа -->
            <canvas 
                ref="canvasRef" 
                v-show="!isLoading"
                class="chart-canvas"
            ></canvas>
            
            <!-- Состояние загрузки -->
            <div v-if="isLoading" class="loading-placeholder">
                <div class="placeholder-content">
                    <div class="placeholder-spinner"></div>
                    <p>Loading Bitcoin price data...</p>
                </div>
            </div>
            
            <!-- Состояние ошибки/нет данных -->
            <div v-if="!isLoading && !chartInstance" class="no-chart-message">
                <p>Chart is not available. Try refreshing the page.</p>
            </div>
        </div>
        
        <!-- Информация о данных -->
        <div v-if="chartData && !isLoading" class="chart-info">
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Текущая цена:</span>
                    <span class="info-value">
                        ${{ chartData.prices[chartData.prices.length - 1]?.toLocaleString('en-US', {minimumFractionDigits: 0}) }}
                    </span>
                </div>
                <div class="info-item">
                    <span class="info-label">Максимум за неделю:</span>
                    <span class="info-value">
                        ${{ Math.max(...chartData.prices).toLocaleString('en-US', {minimumFractionDigits: 0}) }}
                    </span>
                </div>
                <div class="info-item">
                    <span class="info-label">Минимум за неделю:</span>
                    <span class="info-value">
                        ${{ Math.min(...chartData.prices).toLocaleString('en-US', {minimumFractionDigits: 0}) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chart-container {
    background: rgb(0, 186, 186);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    height: 500px;
    display: flex;
    flex-direction: column;
    font-family: 'Inter', sans-serif;
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
    color: #6b7280;
}

.placeholder-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e7eb;
    border-top: 3px solid #6366f1;
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
    border-top: 1px solid #e5e7eb;
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
    color: #111;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.info-value {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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
}
</style>