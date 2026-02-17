document.addEventListener('DOMContentLoaded', () => {
  const lottoBtn = document.getElementById('lotto-btn');
  const pensionBtn = document.getElementById('pension-btn');
  const lottoResults = document.getElementById('lotto-results');
  const pensionResults = document.getElementById('pension-results');

  // Lotto 6/45 Generator
  lottoBtn.addEventListener('click', () => {
    lottoResults.innerHTML = ''; // Clear previous results
    
    for (let i = 0; i < 5; i++) {
      const numbers = generateLottoNumbers();
      const row = document.createElement('div');
      row.className = 'lotto-row';
      
      numbers.forEach(num => {
        const ball = createBall(num);
        row.appendChild(ball);
      });
      
      lottoResults.appendChild(row);
    }
  });

  // Pension Lottery 720+ Generator
  pensionBtn.addEventListener('click', () => {
    pensionResults.innerHTML = ''; // Clear previous results
    
    for (let i = 0; i < 5; i++) {
      const group = Math.floor(Math.random() * 5) + 1;
      const numbers = Array.from({length: 6}, () => Math.floor(Math.random() * 10));
      
      const row = document.createElement('div');
      row.className = 'pension-row';
      
      const groupSpan = document.createElement('span');
      groupSpan.className = 'pension-group';
      groupSpan.textContent = `${group}조`;
      row.appendChild(groupSpan);
      
      numbers.forEach(num => {
        const ball = createBall(num, true); // true for pension colors
        row.appendChild(ball);
      });
      
      pensionResults.appendChild(row);
    }
  });

  function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }

  function createBall(number, isPension = false) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.textContent = number;
    
    // Color Logic
    if (isPension) {
      // Pension lottery uses different logic or just random colors?
      // Real pension lottery balls have specific colors per position, but for simplicity
      // let's reuse the lotto colors based on number value 0-9 for variety
      // Or we can just cycle through colors.
      // Let's use the standard lotto colors for consistency based on the number.
      if (number <= 1) ball.classList.add('yellow'); // 0, 1
      else if (number <= 3) ball.classList.add('blue'); // 2, 3
      else if (number <= 5) ball.classList.add('red'); // 4, 5
      else if (number <= 7) ball.classList.add('grey'); // 6, 7
      else ball.classList.add('green'); // 8, 9
    } else {
      // Lotto 6/45 Colors
      if (number <= 10) ball.classList.add('yellow');
      else if (number <= 20) ball.classList.add('blue');
      else if (number <= 30) ball.classList.add('red');
      else if (number <= 40) ball.classList.add('grey');
      else ball.classList.add('green');
    }
    
    return ball;
  }
});
