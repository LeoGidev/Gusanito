document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const boxSize = 20;
  const gridSize = canvas.width / boxSize;
  let snake = [{ x: 10, y: 10 }];
  let food = generateFood();

  let dx = 0;
  let dy = 0;
  let score = 0;
}///