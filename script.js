const container_game = document.querySelector(".container_game")
const width = container_game.clientWidth
console.log(width)
const restartButton = document.querySelector("#restartButton")
const startButton = document.querySelector("#start")
let scoreDiv = document.querySelector(".score")
let highScoreDiv = document.querySelector(".highestScore")
const square = document.createElement("div")
let foodArray = []
let pixels = 12;
const gameSpeedArray = [140,120,100,90,80]
let speedMode = 0
let gameSpeed = gameSpeedArray[speedMode]
let oldFood = []
let highestScore =0
let score = 0

let snake = [[pixels/2,0],[pixels/2,1],[pixels/2,2]]
let mode = moveRight
let gameOver = false

scoreDiv.textContent = "Score: "+ score
highScoreDiv.textContent = "Highest score: "+ highestScore
restartButton.addEventListener("mousedown",restart)
startButton.addEventListener("mousedown",playGame)






function playGame(){
     
    let game = setInterval(()=>{
 
        if(gameOver){
            
            document.querySelector(`#${"x"+snake[snake.length-1][0]+"y"+snake[snake.length-1][1]}`).classList.add("headCrash")
            clearInterval(game)
        }
        snakeMovement(snake,mode)
         
      }, gameSpeed)
}

window.addEventListener("keydown",(key)=>{ 
    console.log(key.key)
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
            if(gameOver){
                gameOver=false
                document.querySelector(`#${"x"+snake[snake.length-1][0]+"y"+snake[snake.length-1][1]}`).classList.remove("headCrash")
                playGame()
            }
            break;
    }
})

restart()


function layout(){
    for(let x =0;x<pixels;x++){
        for(let y =0; y<pixels;y++){
            foodArray.push([x,y])
            let square = document.createElement("div")
            square.classList.add("square")
            square.id = "x"+x+"y"+y
            square.style.cssText += 
            `min-width: ${100/pixels}%;
            position: relative;
            height: 0;
            padding-bottom: ${100/pixels}%;`
            container_game.appendChild(square)
        }
    }  
    
}

function snakeLayout(snake){
   
    const squares = document.querySelectorAll("square")
    for(let x =0;x<snake.length;x++){
        document.querySelector(`#${"x"+snake[x][0]+"y"+snake[x][1]}`).classList.add("snake")
        
    }
    document.querySelector(`#${"x"+snake[snake.length-1][0]+"y"+snake[snake.length-1][1]}`).classList.add("head")
    
}

function snakeMovement(snake, mode){
    

    let snakeHead = snake[snake.length-1]
    let snakeTail = snake[0]

    let newSnakeHead = mode(snakeHead)

    for(let key =1;key<snake.length;key++){
       
        if(newSnakeHead[0]==snake[key][0]&&newSnakeHead[1]==snake[key][1]
            ){
            gameOver=true
            return
        }
    }
    
    if (newSnakeHead[0]>pixels-1 || newSnakeHead[0]<0 || newSnakeHead[1]>pixels-1 || newSnakeHead[1]<0){
            gameOver=true 
            return
    }
    
    if(!gameOver){
        
        if(newSnakeHead[0] == food[0] && newSnakeHead[1] == food[1]){
            
            oldFood.push(food)
           
            food = foodApear(newSnakeHead)
            
            document.querySelector(`#${"x"+oldFood[oldFood.length-1][0]+"y"+oldFood[oldFood.length-1][1]}`).classList.remove("food")
            document.querySelector(`#${"x"+food[0]+"y"+food[1]}`).classList.add("food")
            
            score++
            scoreDiv = document.querySelector(".score").textContent = "Score: "+ score
            if(score%10 == 0 &&speedMode < gameSpeedArray.length-1) {
                speedMode++
                gameSpeed = gameSpeedArray[speedMode]
            }
            if(score >= highestScore){
                highestScore = score
                document.querySelector(".highestScore").textContent = "Highest score: "+ highestScore
            }
        }
        
        snake.shift()
        document.querySelector(`#${"x"+snakeTail[0]+"y"+snakeTail[1]}`).classList.remove("snake")

        if(oldFood.length>0){
            if( snakeTail[0] == oldFood[0][0] && snakeTail[1] == oldFood[0][1]){
                oldFood.shift()
                snake.unshift([snakeTail[0],snakeTail[1]])
                document.querySelector(`#${"x"+snakeTail[0]+"y"+snakeTail[1]}`).classList.add("snake")
            }
        
        }
       
      
        
        snake.push(newSnakeHead)
        document.querySelector(`#${"x"+snakeHead[0]+"y"+snakeHead[1]}`).classList.remove("head")
        document.querySelector(`#${"x"+newSnakeHead[0]+"y"+newSnakeHead[1]}`).classList.add("snake")
        document.querySelector(`#${"x"+newSnakeHead[0]+"y"+newSnakeHead[1]}`).classList.add("head")
        
    }
    
    return snake
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

function foodApear(sneakHead) {
    let excluded=[sneakHead[0]*pixels+sneakHead[1]]
    const randNum = (min, max, exclude = []) => {
        let num = Math.floor(Math.random() * (max - min + 1 - exclude.length) + min);
        exclude
          .slice()
          .sort((a, b) => a - b)
          .every((exeption) => exeption <= num && (num++, true));
        return num;
      };
    
    let newArray = [...foodArray]
    for(let key in snake){
        excluded.push(snake[key][0]*pixels+snake[key][1])
    }
    let pick = randNum(0,foodArray.length-1,excluded)
    
    return newArray[pick]
}
  
function restart(){
    
    let squares = document.querySelectorAll(".square")
    squares.forEach(square=>  square.remove())
    speedMode=0
    gameSpeed = gameSpeedArray[speedMode]
    score = 0
    scoreDiv = document.querySelector(".score").textContent = "Score: "+ score
    
    oldFood = []
    mode = moveRight
    foodArray = []

    
    layout()
    snake = [[pixels/2,0],[pixels/2,1],[pixels/2,2]]
    gameOver = false
    snakeLayout(snake)
    food = foodApear([pixels/2,pixels/2+2])
    document.querySelector(`#${"x"+food[0]+"y"+food[1]}`).classList.add("food")

  


}

function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}
  

swipedetect(container_game, function(swipedir){
   
    switch(swipedir){
        case "down":
            mode= moveDown
            break;
        case "top":
            mode= moveUp
            break;
        case "left":
            mode= moveLeft
            break;
        case "right":
            mode= moveRight
            break;
        

    }
})

