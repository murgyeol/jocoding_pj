document.addEventListener('DOMContentLoaded', () => {
  const lottoBtn = document.getElementById('lotto-btn');
  const pensionBtn = document.getElementById('pension-btn');
  const lottoResults = document.getElementById('lotto-results');
  const pensionResults = document.getElementById('pension-results');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('.icon');

  // Theme Logic
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

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