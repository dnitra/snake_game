const container_game = document.querySelector(".container_game")
let scoreDiv = document.querySelector(".score")
const square = document.createElement("div")
let pixels = 16;
const gameSpeed = 100
let oldFood = [-1,-1]
let score = 0
scoreDiv = document.querySelector(".score").textContent = "Score: "+ score


let snake = [[pixels/2,pixels/2-1],[pixels/2,pixels/2],[pixels/2,pixels/2+1]]


let mode = moveRight
let gameOver = false
function playGame(){
    let game = setInterval(()=>{
 
        if(gameOver){
            clearInterval(game)
        }
        snakeMovement(snake,mode)
         
      }, gameSpeed)
    }
playGame()


window.addEventListener("keydown",(key)=>{
    
    switch(key.key){
        case "ArrowDown":
            mode= moveDown
            break;
        case "ArrowUp":
            mode= moveUp
            break;
        case "ArrowLeft":
            mode= moveLeft
            break;
        case "ArrowRight":
            mode= moveRight
            break;
        case "Escape":
            gameOver=true 
            break;
        case "Enter":
            playGame()
            break;
  
        
    }
})

layout()
snakeLayout(snake)
let food = foodApear([pixels/2,pixels/2])

function layout(){
    for(let x =0;x<pixels;x++){
        for(let y =0; y<pixels;y++){
            let square = document.createElement("div")
            square.classList.add("square")
            square.id = "x"+x+"y"+y
            square.style.cssText += `width: ${600/pixels}px;`
            square.style.cssText += `height: ${600/pixels}px;`
            container_game.appendChild(square)
        }
    }  
}

function snakeLayout(snake){
   
    const squares = document.querySelectorAll("square")
    for(let x =0;x<snake.length;x++){
        document.querySelector(`#${"x"+snake[x][0]+"y"+snake[x][1]}`).classList.add("snake")
    }
    
}

function snakeMovement(snake, mode){
    

    let snakeHead = snake[snake.length-1]
    let snakeTail = snake[0]

    let newSnakeHead = mode(snakeHead)

    for(let key =0;key<snake.length;key++){

        if(newSnakeHead[0]==snake[key][0]&&newSnakeHead[1]==snake[key][1]){
            gameOver=true
            return
        }
    }
    if(newSnakeHead[0] == food[0] && newSnakeHead[1] == food[1]){
        oldFood = food
        food = foodApear(food)
        score++
        scoreDiv = document.querySelector(".score").textContent = "Score: "+ score
    }
    if (newSnakeHead[0]>pixels-1||
        newSnakeHead[0]<0||
        newSnakeHead[1]>pixels-1||
        newSnakeHead[1]<0
        ){
        gameOver=true 
        return
        }
    
    snake.push(newSnakeHead)
    document.querySelector(`#${"x"+newSnakeHead[0]+"y"+newSnakeHead[1]}`).classList.add("snake")
    if(snakeTail[0] == oldFood[0] && snakeTail[1] == oldFood[1]){
        oldFood = [-1,-1]
    }
    else{
        snake.shift()
        document.querySelector(`#${"x"+snakeTail[0]+"y"+snakeTail[1]}`).classList.remove("snake")
   }
    
    return snake
}

function foodApear(food){
    
    let rndIntX = randomIntFromInterval(0, pixels-1)
    let rndIntY = randomIntFromInterval(0, pixels-1)
    let newFood = [rndIntX,rndIntY]

    
    if(rndIntX==food[0]&&rndIntY==food[1]){foodApear(food)}
    document.querySelector(`#${"x"+food[0]+"y"+food[1]}`).classList.remove("food")
    document.querySelector(`#${"x"+rndIntX+"y"+rndIntY}`).classList.add("food")
    for(let key =0;key<snake.length;key++){

        if(newFood[0]==snake[key][0]&&newFood[1]==snake[key][1]){
            foodApear(newFood)
        }
    }
    return food = newFood
}

function moveRight([x,y]){
    return [x,y+1]
}
function moveLeft([x,y]){
    return [x,y-1]
}

function moveDown([x,y]){
    return [x+1,y]
}

function moveUp([x,y]){
    return [x-1,y]
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  

