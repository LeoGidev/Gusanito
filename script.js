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

  function generateFood() {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#000';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });

    // Draw food
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
      score++;
      food = generateFood();
    } else {
      snake.pop();
    }

    // Check if snake hits walls or itself
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
      gameOver();
      return;
    }

    // Display score
    ctx.fillStyle = '#000';
    ctx.fillText(`Score: ${score}`, 10, 20);

    requestAnimationFrame(draw);
  }

  function gameOver() {
    alert(`Game Over! Your score is ${score}`);
    document.location.reload();
  }

  document.addEventListener('keydown', event => {
    const keyPressed = event.key;

    if (keyPressed === 'ArrowUp' && dy === 0) {
      dx = 0;
      dy = -1;
    } else if (keyPressed === 'ArrowDown' && dy === 0) {
      dx = 0;
      dy = 1;
    } else if (keyPressed === 'ArrowLeft' && dx === 0) {
      dx = -1;
      dy = 0;
    } else if (keyPressed === 'ArrowRight' && dx === 0) {
      dx = 1;
      dy = 0;
    }
  });

  draw();
});

})///