const container_game = document.querySelector(".container_game")
const container = document.querySelector(".container")

const helpButton =document.querySelector("#help-content") 
const user = window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

if(user()){ 
    helpButton.innerHTML = 
    `<p>Click on size button to change the layout!</p> 
    <p>Use display to start and navigate the snake!</p> 
    <img src='display_touch_area.png'>`
}
else{
    helpButton.innerHTML = 
    `<p>Click on size button to change the layout!</p>
    <p>Use keyboard arrows to start and navigate the snake!</p>`
}

const restartButton = document.createElement("button") 
restartButton.id = "restartButton"
restartButton.textContent = "Restart"





const startButton = document.querySelector("#start")
const sizeButton = document.querySelector("#size")
let scoreDiv = document.querySelector(".score")
let highScoreDiv = document.querySelector(".highestScore")

let speedMode, gameSpeed, foodArray, pixelsX, pixelsY, oldFood, score, snake, gameOver


const gameSpeedArray = [200,150,120,80,60]
const pixelsArray = [150,400,1000]
let totalPixels = pixelsArray[1] 
let mode = moveRight
let highestScore = 0
let gameStart = false

restartButton.addEventListener("mousedown",restart)
window.addEventListener("keydown",keyPressed)
sizeButton.addEventListener("click",(e)=>{
    
    let content = e.target.textContent
    
    if(content == "Medium size"){
        e.target.textContent = "Large size"
        totalPixels = pixelsArray[2]
    }
    if(content == "Large size"){
        e.target.textContent = "Small size"
        totalPixels = pixelsArray[0]
    }
    if(content == "Small size"){
        e.target.textContent = "Medium size"
        totalPixels = pixelsArray[1]
    }
    restart()
})

restart()

function playGame(){
     
    let game = setInterval(()=>{
 
        if(gameOver){
            
            document.querySelector(`#${"x"+snake[snake.length-1][0]+"y"+snake[snake.length-1][1]}`).classList.add("headCrash")
            clearInterval(game)
        }
        snakeMovement(snake,mode)
        if(gameOver){container.appendChild(restartButton)}
        
         
      }, gameSpeed)
      
}

function layout(){
    let width = container_game.clientWidth
    let widthGame =container_game.offsetWidth
    let heightGame = container_game.offsetHeight
    let ratio = widthGame/heightGame
    
    pixelsX =Math.round(Math.sqrt(ratio *totalPixels))
    pixelsY = Math.round((totalPixels/pixelsX))

    for(let x =0;x<pixelsY;x++){
        for(let y =0; y<pixelsX;y++){
            foodArray.push([x,y])
            let square = document.createElement("div")
            square.classList.add("square")
            
            if(x>pixelsY/4&&y>=pixelsX/2&&x<pixelsY*(3/4)){
                square.classList.add("ArrowRight")
            }  
            else if(x<=pixelsY/4){
                square.classList.add("ArrowUp")
            }
            else if(x>pixelsY/4&&y<pixelsX/2&&x<pixelsY*(3/4)){
                square.classList.add("ArrowLeft")
            }
            else {
                square.classList.add("ArrowDown")
            }
            square.id = "x"+x+"y"+y
            square.style.cssText += 
                `min-width: ${100/pixelsX}%;
                max-height: ${100/pixelsX}`
            container_game.appendChild(square)
        }
    }  
    document.querySelectorAll(".ArrowDown").forEach(arrow => arrow.addEventListener("mousedown",()=>mode= moveDown));
    document.querySelectorAll(".ArrowLeft").forEach(arrow => arrow.addEventListener("mousedown",()=>mode= moveLeft));
    document.querySelectorAll(".ArrowRight").forEach(arrow => arrow.addEventListener("mousedown",()=>mode= moveRight));
    document.querySelectorAll(".ArrowUp").forEach(arrow => arrow.addEventListener("mousedown",()=>mode= moveUp));
    document.querySelectorAll(".square").forEach(arrow => arrow.addEventListener("mousedown",()=>{
        if(!gameStart){
            gameStart = true
            playGame()
        }
    }));
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
    
    if (newSnakeHead[0]>pixelsY-1 || newSnakeHead[0]<0 || newSnakeHead[1]>pixelsX-1 || newSnakeHead[1]<0){
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
    let excluded=[sneakHead[0]*pixelsX+sneakHead[1]]
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
        excluded.push(snake[key][0]*pixelsX+snake[key][1])
    }
    let pick = randNum(0,foodArray.length-1,excluded)
    
    return newArray[pick]
}
  
function restart(){
    if(gameOver){
        let node = document.getElementById("restartButton");
        if (node.parentNode) {
        node.parentNode.removeChild(node);
        }
    }
    
    let squares = document.querySelectorAll(".square")

    scoreDiv.textContent = "Score: "+ score
    highScoreDiv.textContent = "Highest score: "+ highestScore
    squares.forEach(square=>  square.remove())
    speedMode=0
    gameSpeed = gameSpeedArray[speedMode]
    score = 0
    scoreDiv = document.querySelector(".score").textContent = "Score: "+ score
    
    oldFood = []
    mode = moveRight
    foodArray = []

    
    layout()
    snake = [[Math.floor(pixelsY/2),0],[Math.floor(pixelsY/2),1],[Math.floor(pixelsY/2),2]]
    gameOver = false
    gameStart= false
    snakeLayout(snake)
    food = foodApear([pixelsY/2,pixelsY/2+2])
    document.querySelector(`#${"x"+food[0]+"y"+food[1]}`).classList.add("food")

}

function keyPressed (key){
    if(!gameStart){
        gameStart = true
        playGame()
    }
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
    }
}
//test
