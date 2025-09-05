// -- (1) 레이블과 데이터
    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const data   = [3,6,5,8,7,9,6,7,8,5,4,6];

    // -- (2) 캔버스 2D 컨텍스트 가져오기
    const ctx = document.getElementById('salesChart').getContext('2d');

    // -- (3) Chart.js 인스턴스 생성
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales (k)',
          data: data,
          borderColor: '#3C507D',
          backgroundColor: 'rgba(60,80,125,0.2)',
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#3C507D',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 6,
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#4b5563' }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { color: '#4b5563' }
          }
        }
      }
    });