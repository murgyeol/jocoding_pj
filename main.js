document.addEventListener('DOMContentLoaded', async () => {
  // Insight Chart Rendering
  try {
    const response = await fetch('/combined_priority_numbers.txt');
    if (!response.ok) throw new Error('데이터 파일을 불러오는 데 실패했습니다.');
    const textData = await response.text();
    const labels = textData.split(',').map(n => n.trim()).sort((a, b) => parseInt(a) - parseInt(b));
    const data = labels.map(() => Math.floor(Math.random() * 5) + 1);
    renderInsightChart(labels, data);
  } catch (error) {
    console.error('차트 렌더링 오류:', error);
    document.getElementById('insight-chart').outerHTML = '<p class="error-message">차트를 불러올 수 없습니다.</p>';
  }

  // Game Mode Selection Logic
  const gameModeCards = document.querySelectorAll('.game-mode-card');
  gameModeCards.forEach(card => {
    card.addEventListener('click', () => {
      const modeTitle = card.querySelector('h3').textContent;
      alert(`'${modeTitle}' 모드를 선택하셨습니다. 곧 기능이 추가될 예정입니다!`);
    });
  });

  // League Section Data Rendering
  try {
    const response = await fetch('/league_data.json');
    if (!response.ok) throw new Error('성적 데이터를 불러오는 데 실패했습니다.');
    const leagueData = await response.json();
    renderLeagueSection(leagueData);
  } catch (error) {
    console.error('League 섹션 렌더링 오류:', error);
    document.getElementById('league').innerHTML = '<p class="error-message">성적 데이터를 불러올 수 없습니다.</p>';
  }

  // Annuity Number Generation Logic
  const generateAnnuityBtn = document.getElementById('generate-annuity-btn');
  generateAnnuityBtn.addEventListener('click', () => {
    const annuityNumbers = generateAnnuityNumbers();
    displayAnnuityNumbers(annuityNumbers);
  });
});

function renderInsightChart(labels, data) {
  const ctx = document.getElementById('insight-chart').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.clientHeight);
  gradient.addColorStop(0, 'rgba(37, 117, 252, 0.8)');
  gradient.addColorStop(1, 'rgba(106, 17, 203, 0.8)');

  new Chart(ctx, {
    type: 'bar', data: { labels, datasets: [{ label: '득표수', data, backgroundColor: gradient, borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderRadius: 8 }] },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#e0e0e0' }, grid: { color: 'rgba(255,255,255,0.1)' } }, y: { ticks: { color: '#e0e0e0', font: { weight: 'bold' } }, grid: { display: false } } } }
  });
}

function renderLeagueSection(data) {
  const hofDetails = document.getElementById('hof-details');
  hofDetails.textContent = `축하합니다! ${data.hallOfFame.modelName}이(가) ${data.hallOfFame.achievement}을(를) 달성했습니다.`;

  const tableBody = document.getElementById('league-table-body');
  tableBody.innerHTML = '';
  data.modelsPerformance.forEach(model => {
    const row = document.createElement('tr');
    const matchedNumbersHtml = model.predictedNumbers.map(num => data.lastWeekWinningNumbers.includes(num) ? `<span class="matched-number">${num}</span>` : num).join(', ');
    row.innerHTML = `<td>${model.rank}</td><td>${model.modelName}</td><td>${matchedNumbersHtml}</td><td>${model.matchCount}개</td>`;
    tableBody.appendChild(row);
  });
}

function generateAnnuityNumbers() {
  // "로기의 전략": 6자리 숫자는 중복 없음
  const group = Math.floor(Math.random() * 5) + 1; // 1~5조
  
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // Fisher-Yates shuffle
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [digits[i], digits[j]] = [digits[j], digits[i]];
  }
  
  const numbers = digits.slice(0, 6).join('');
  
  return { group, numbers };
}

function displayAnnuityNumbers({ group, numbers }) {
  const displayArea = document.getElementById('annuity-numbers');
  displayArea.innerHTML = ''; // 기존 내용 삭제
  displayArea.classList.remove('annuity-numbers-placeholder');

  const groupSpan = document.createElement('span');
  groupSpan.className = 'annuity-digit-group';
  groupSpan.textContent = `${group}조`;

  const numbersSpan = document.createElement('span');
  numbersSpan.textContent = numbers;

  displayArea.appendChild(groupSpan);
  displayArea.appendChild(numbersSpan);
}
