document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
  
    const boxSize = 20;
    const gridSize = canvas.width / boxSize;
    let snake = [{ x: 10, y: 10 }];
    let food = generateFood();
  
    let dx = 1;
    let dy = 0;
    let score = 0;
    let lastDirection = 'right'; //ultima direccion
  
    let gameSpeed = 500; 
    let gameInterval; 
  
    function generateFood() {
      return {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // mueve el gusano
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  
      // Revisa si el gusano se choca así mismo a en las paredes
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
      }
  
      // Dibuja el gusano
      snake.unshift(head);
  
      // Reisa si el gusano come un cuaadro
      if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
      } else {
        snake.pop();
      }
  
      // Dibuja cuadros comida
      ctx.fillStyle = '#f00';
      ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
  
      // Dibuja gusano
      ctx.fillStyle = '#000';
      snake.forEach(segment => {
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
      });
  
      // Muestra el score
      ctx.fillStyle = '#000';
      ctx.fillText(`Score: ${score}`, 10, 20);
    }
  
    function startGame() {
      gameInterval = setInterval(() => {
        draw();
      }, gameSpeed);
    }
  
    function stopGame() {
      clearInterval(gameInterval);
    }
  
    function gameOver() {
      stopGame();
      alert(`Game Over! Your score is ${score}`);
      document.location.reload();
    }
  
    document.addEventListener('keydown', event => {
      const keyPressed = event.key;
  
      if (keyPressed === 'ArrowUp' && lastDirection !== 'down') {
        dx = 0;
        dy = -1;
        lastDirection = 'up';
      } else if (keyPressed === 'ArrowDown' && lastDirection !== 'up') {
        dx = 0;
        dy = 1;
        lastDirection = 'down';
      } else if (keyPressed === 'ArrowLeft' && lastDirection !== 'right') {
        dx = -1;
        dy = 0;
        lastDirection = 'left';
      } else if (keyPressed === 'ArrowRight' && lastDirection !== 'left') {
        dx = 1;
        dy = 0;
        lastDirection = 'right';
      }
    });
  
    startGame(); // Inicia el juego
  });
  