// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);

const ctx = document.getElementById('coinChart');
new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: '<%- JSON.stringify(coinHistory.price) %>',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
});
