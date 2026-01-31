import { Chart, registerables } from 'chart.js'
import { defineStore, acceptHMRUpdate } from 'pinia'

// Регистрируем все необходимые компоненты Chart.js
Chart.register(...registerables)

const dataPrice = {
   "priceHistory24h": [
      86200, 86350, 86400, 86500, 86650, 86580, 86420, 86300, 86250, 86380, 86455, 86520, 86600, 86550, 86480, 86400, 86320, 86280, 86350, 86430, 86480, 86510, 86470, 86455
   ],
   "priceHistory7d": [
      84500, 85000, 85500, 86000, 86200, 86300, 86455
   ],
   "priceHistory30d": [
      82000, 82500, 83000, 83500, 84000, 84500, 85000, 85500, 86000, 86200, 86300, 86400, 86500, 86600, 86500, 86400, 86300, 86200, 86100, 86000, 85900, 85800, 85900, 86000, 86100, 86200, 86300, 86400, 86450, 86455
   ],
}

export const useTradeStore = defineStore('useTrade', {
   state: () => ({
      dataPrice: dataPrice,
   }),

   getters: {
      // Геттер для получения данных по периоду
      getPriceData: (state) => (period) => {
         const dataMap = {
            '24h': 'priceHistory24h',
            '7d': 'priceHistory7d',
            '30d': 'priceHistory30d'
         }

         const key = dataMap[period] || 'priceHistory7d'
         return state.dataPrice[key] || []
      },

      // Геттер для получения меток по периоду
      getLabels: () => (period) => {
         const dataMap = {
            '24h': 'priceHistory24h',
            '7d': 'priceHistory7d',
            '30d': 'priceHistory30d'
         }

         const key = dataMap[period] || 'priceHistory7d'
         const data = dataPrice[key] || []

         return data.map((_, index) => {
            if (period === '24h') return `${index}:00`
            if (period === '7d') return `День ${index + 1}`
            if (period === '30d') return `${index + 1}`
            return index.toString()
         })
      }
   },

   actions: {
      getConfig() {
         return {
            type: 'line',
            options: {
               responsive: true,
               maintainAspectRatio: false,
               interaction: {
                  mode: 'index',
                  intersect: false,
               },
               plugins: {
                  legend: {
                     display: false,
                  },
                  tooltip: {
                     backgroundColor: 'rgba(0, 0, 0, 0.7)',
                     titleColor: '#fff',
                     bodyColor: '#fff',
                     borderColor: 'rgba(255, 255, 255, 0.2)',
                     borderWidth: 1,
                     callbacks: {
                        label: function (context) {
                           
                           return `${context.parsed.y.toLocaleString('ru-Ru', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                           })}`
                        }
                     }
                  }
               },
               scales: {
                  x: {
                     type: 'category',
                     grid: {
                        display: true,
                        color: 'rgba(255,255,255, 0.1)',
                        drawBorder: true,
                     },
                     ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                           size: 11
                        }
                     }
                  },
                  y: {
                     type: 'linear',
                     grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: true,
                     },
                     ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                           size: 11
                        },
                        callback: function (value) {
                           return '$' + value.toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                           })
                        }
                     }
                  }
               }
            },
         }
      },

      renderChart(period, ctx, data) {
         // Получаем метки из геттера
         const labels = this.getLabels(period)

         const config = {
            type: 'line',
            data: {
               labels: labels,
               datasets: [{
                  label: 'BTC/USD',
                  data: data.prices,
                  borderColor: '#0096ff',
                  backgroundColor: data.backgroundColor || 'rgba(0, 150, 255, 0.1)',
                  borderWidth: 3,
                  fill: true,
                  tension: 0,
                  pointRadius: 0,
                  pointHoverRadius: 6,
                  pointBackgroundColor: '#0096ff',
                  pointBorderColor: 'white',
                  pointBorderWidth: 2
               }]
            },
            options: this.getConfig().options
         }

         return new Chart(ctx, config)
      },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useTradeStore, import.meta.hot))
}