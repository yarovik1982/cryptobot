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
   const labels = ['Пон', 'Вт', 'Ср', 'Чт', 'Пят', 'Суб', 'Вос'];
   const prices = [43200, 43850, 42900, 44100, 44750, 45200, 44900];

   return { labels, prices };
};

// Получаем данные с CoinGecko
// const getDataFromCoinGecko = async () => {
//     try {
//         const response = await fetch(
//             "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily"
//         );

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Данные от CoinGecko:", data);

//         // Преобразуем timestamp в читаемые даты
//         const labels = data.prices.map(item => {
//             const date = new Date(item[0]);
//             return date.toLocaleDateString('ru-RU', { weekday: 'short' });
//         });

//         const prices = data.prices.map(item => item[1]);

//         return { labels, prices };
//     } catch (error) {
//         console.error("Ошибка при получении данных:", error);
//         throw error;
//     }
// };

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
                  pointBackgroundColor: "#6366f1",
                  pointBorderColor: "#ffffff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 3,
                  fill: true,
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
                  pointBackgroundColor: "#6366f1",
                  pointBorderColor: "#ffffff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 3,
                  fill: true,
               }
            ],
         },
         options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
               legend: {
                  display: false,
                  position: 'top',
                  labels: {
                     color: '#374151',
                     font: {
                        size: 14,
                        weight: '500',
                        family: "'Inter', sans-serif"
                     }
                  }
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
                     label: function (context) {
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
                     color: "000",
                     font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                     },
                     callback: function (value) {
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
