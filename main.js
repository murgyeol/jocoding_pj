document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/combined_priority_numbers.txt');
    if (!response.ok) {
      throw new Error('데이터 파일을 불러오는 데 실패했습니다.');
    }
    const textData = await response.text();
    const labels = textData.split(',').map(n => n.trim()).sort((a, b) => a - b);
    
    // 임의의 득표수 데이터 생성 (실제 데이터로 교체될 수 있음)
    const data = labels.map(() => Math.floor(Math.random() * 5) + 1); 

    renderInsightChart(labels, data);
  } catch (error) {
    console.error('차트 렌더링 오류:', error);
    const chartElement = document.getElementById('insight-chart');
    if (chartElement) {
      chartElement.outerHTML = '<p style="color: #ff7272; text-align: center;">차트를 불러올 수 없습니다.</p>';
    }
  }
});

function renderInsightChart(labels, data) {
  const ctx = document.getElementById('insight-chart').getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(37, 117, 252, 1)');
  gradient.addColorStop(1, 'rgba(106, 17, 203, 1)');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '득표수',
        data: data,
        backgroundColor: gradient,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 'flex',
      }]
    },
    options: {
      indexAxis: 'y', // 가로 막대 차트
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e0e0e0',
            font: {
              family: "'Pretendard', sans-serif",
              size: 12,
            }
          }
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#e0e0e0',
            font: {
              family: "'Pretendard', sans-serif",
              size: 14,
              weight: 'bold'
            }
          }
        }
      }
    }
  });
}