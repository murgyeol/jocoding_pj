document.addEventListener('DOMContentLoaded', async () => {
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
