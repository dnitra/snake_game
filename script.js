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

let speedMode, pixelsX, pixelsY, snake, game

const totalPixels = 300
const initialFood =totalPixels*10
let initialSnakes = totalPixels*2
let score = 0
scoreDiv = document.querySelector(".score").textContent = "Score: "+ score
let gameOver = false
let gameArray =[]
let pathArray =[]
let filledArray = []
let foodArray = []
let oldFood = []
let botVisibility =10
let barrier = 20
let allSnakes = []

const gameSpeedArray = [300,150,120,80,60]
let gameSpeed = gameSpeedArray[0]
const pixelsArray = [150,400,1000]
let gamerPixels = 800
let mode = moveRight
let highestScore = 0
let gameStart = true
let count=0
let gamerFocus = 0
let botFocus =1


restartButton.addEventListener("mousedown",restart)
window.addEventListener("keydown",keyPressed)
sizeButton.addEventListener("click",(e)=>{
    
    let content = e.target.textContent
    
    if(content == "Medium size"){
        e.target.textContent = "Large size"
        gamerPixels = pixelsArray[2]
    }
    if(content == "Large size"){
        e.target.textContent = "Small size"
        gamerPixels = pixelsArray[0]
    }
    if(content == "Small size"){
        e.target.textContent = "Medium size"
        gamerPixels = pixelsArray[1]
    }
    //restart()
})

//restart////////////////////


totalLayout(totalPixels, gameArray)

gamerSnake = [[totalPixels/2,totalPixels/2-2],[totalPixels/2,totalPixels/2-1],[totalPixels/2,totalPixels/2]]
allSnakes.push(gamerSnake)
gamerSnake.forEach(el => {
    pathArray[el[0]].splice(el[1],1,-1)
    gameArray[el[0]].splice(el[1],1,"snake")})
let gamerSnakeHead = gamerSnake[gamerSnake.length-1]

gameArray[gamerSnakeHead[0]].splice([gamerSnakeHead[1]],1,"head")

for(let i=0;i<initialFood;i++){
    foodApear()
}
for(let i=0;i<initialSnakes;i++){
    allSnakes.push(createSnake([]))
}


playGame()

///////////////////////////

function playGame(){
     
    game = setInterval(()=>{
 
       /* if(gameOver){
            gameArray[snake[snake.length-1][0]].splice(snake[snake.length-1][1],1,"headCrash")
            clearInterval(game)
        }*/
    
    count++
    
    for(let i =0;i<20;i++){
        foodApear()
    }
    
    score = allSnakes[0].length-3
    scoreDiv = document.querySelector(".score").textContent = "Score: "+ score
    botFocus=0
    if(score-1 == highestScore){

        
        highestScore = score
        document.querySelector(".highestScore").textContent = "Highest score: "+ highestScore
    }
        
    snakeMovement(allSnakes[0],mode)
            
        
        
        
        
        for(let i=1;i<allSnakes.length;i++){
            botSnakeMovement(allSnakes[i])
        }
        gamerLayout(allSnakes[0][allSnakes[0].length-1])
        
        if(gameOver){container.appendChild(restartButton)}
        
         
      }, gameSpeed)
    
      
}

function totalLayout(pixels,arr){
    for(let x = 0; x<pixels;x++){
        arr.push([])
        pathArray.push([])
        for(let y = 0; y<pixels;y++){
            
            arr[x].length++
            pathArray[x].push(0)
            if(x==0||x==totalPixels-1||y==0||y==totalPixels-1){
                arr[x].splice(y,1,"border")
                pathArray[x].splice(y,1,-barrier)
            }   
        }
    }
    return arr
}



function botSnakeMovement(snakeBot){
    const botHead = snakeBot[snakeBot.length-1]
    const mode = botSearchPath(botHead)
    
    function botSearchPath(botHead){
     
        const searchArray = shuffleArray([[pathArray[botHead[0]+1][botHead[1]],moveDown],[pathArray[botHead[0]][botHead[1]+1],moveRight],[pathArray[botHead[0]-1][botHead[1]],moveUp],[pathArray[botHead[0]][botHead[1]-1],moveLeft]]).sort((a,b)=>b[0]-a[0]) 
        
        
        if(searchArray[0][0]>=0)return searchArray[0][1]
        if(searchArray[1][0]>=0)return searchArray[1][1]
        if(searchArray[2][0]>=-1)return searchArray[2][1]
        return searchArray[3][1]
        
    }
        
    return snakeMovement(snakeBot, mode)
}


function gamerLayout(snakeHead){
    let element = document.querySelector(".container_game")
    while (element.firstChild) {
    element.removeChild(element.firstChild);
    }

    
    let width = container_game.clientWidth
    let widthGame =container_game.offsetWidth
    let heightGame = container_game.offsetHeight
    let ratio = widthGame/heightGame
    
    pixelsX =Math.round(Math.sqrt(ratio *gamerPixels))
    pixelsY = Math.round((gamerPixels/pixelsX))

    let startIndex_X = Math.floor(snakeHead[0]-pixelsY/2)
    let startIndex_Y = Math.floor(snakeHead[1]-pixelsX/2)
    

    for(let x =0;x<pixelsY;x++){
        for(let y =0; y<pixelsX;y++){
            
            let square = document.createElement("div")
            square.classList.add("square")
            square.id = "x"+(x+startIndex_X)+"y"+(y+startIndex_Y)
            
            square.style.cssText += 
                `min-width: ${100/pixelsX}%;
                max-height: ${100/pixelsX}`
            container_game.appendChild(square)
            
            if(mode == moveLeft||mode == moveRight){
                if(x<=pixelsY/2){
                    square.classList.add("ArrowUp")
                }
                else {
                    square.classList.add("ArrowDown")
                }
            }
            if(mode == moveUp||mode == moveDown){
                if(y<pixelsX/2){
                    square.classList.add("ArrowLeft")
                }
                else{
                    square.classList.add("ArrowRight")
                } 
            }
            
            if(x+startIndex_X<totalPixels && y+startIndex_Y<totalPixels &&x+startIndex_X>=0&& y+startIndex_Y>=0){
              //  square.textContent = pathArray[x+startIndex_X][y+startIndex_Y]

                switch(gameArray[x+startIndex_X][y+startIndex_Y]){

                    case "snake":
                        square.classList.add("snake")
                        break;
                    
                    case "head":
                        square.classList.add("head")
                        break;
                    case "food":
                            square.classList.add("food")
                    break;
                   
                    case "border":
                            square.classList.add("border")
                    break;
                }
            }
        }
    } 
    
    document.querySelectorAll(".ArrowDown").forEach(arrow => arrow.addEventListener("mousedown",()=>{if(mode!=moveUp){mode= moveDown}}));
    document.querySelectorAll(".ArrowLeft").forEach(arrow => arrow.addEventListener("mousedown",()=>{if(mode!=moveRight){mode= moveLeft}}));
    document.querySelectorAll(".ArrowRight").forEach(arrow => arrow.addEventListener("mousedown",()=>{if(mode!=moveLeft){mode= moveRight}}));
    document.querySelectorAll(".ArrowUp").forEach(arrow => arrow.addEventListener("mousedown",()=>{if(mode!=moveDown){mode= moveUp}}));
    document.querySelectorAll(".square").forEach(arrow => arrow.addEventListener("mousedown",()=>{
        if(!gameStart){
            gameStart = true
            playGame()
        }
    }));
}
function random (min, max) {return Math.floor(Math.random() * (max - min)) + min}

function createSnake(){
    
    let randomX = random(2,totalPixels-2)
    let randomY = random(4,totalPixels-2)

   
    if(gameArray[randomX][randomY]== undefined&&gameArray[randomX][randomY-1]== undefined&&gameArray[randomX][randomY-2]== undefined){
        let snakeArr = [[randomX,randomY-2],[randomX,randomY-1],[randomX,randomY]]
        snakeArr.forEach(el => {
            pathArray[el[0]].splice(el[1],1,-1)
            gameArray[el[0]].splice(el[1],1,"snake")})
        let snakeHead = snakeArr[snakeArr.length-1]
        
        gameArray[snakeHead[0]].splice([snakeHead[1]],1,"head")
        return snakeArr
    }

    else{
        
        return createSnake([])
    }
    
    
}
function snakeMovement(snake, mode){
 
    let isSnakeDead = false
    let snakeHead = snake[snake.length-1]
    let snakeTail = snake[0]

    let newSnakeHead = mode(snakeHead)
    
    

    if(newSnakeHead[0]>totalPixels-2 || newSnakeHead[0]<1 || newSnakeHead[1]>totalPixels-2 || newSnakeHead[1]<1||gameArray[newSnakeHead[0]][newSnakeHead[1]]=="snake"||gameArray[newSnakeHead[0]][newSnakeHead[1]]=="head"){
        
        for(let key of snake){
            gameArray[key[0]].splice(key[1],1,"food")
            pathArray[key[0]].splice(key[1],1,botVisibility)
            generatePathToFood([key[0],key[1]])
            deleteSnake(snakeHead)
            
        }
        allSnakes.push(createSnake())
        isSnakeDead = true
            
    }
    snake.shift()
    gameArray[snakeTail[0]].splice(snakeTail[1],1,undefined)
    
    if(!isSnakeDead){
        
        
        pathArray[newSnakeHead[0]].splice([newSnakeHead[1]],1,-1)
        pathArray[snakeTail[0]].splice(snakeTail[1],1,0)
        if(gameArray[newSnakeHead[0]][newSnakeHead[1]]== "food"){
            
            //foodApear()

            snake.unshift([snakeTail[0],snakeTail[1]])
            gameArray[snakeTail[0]].splice(snakeTail[1],1,"snake")
            pathArray[snakeTail[0]].splice(snakeTail[1],1,-1)
            
            gameArray[snakeHead[0]].splice([snakeHead[1]],1,"snake")
            gameArray[newSnakeHead[0]].splice([newSnakeHead[1]],1,"head")
            
            for(let x = 0;x<=botVisibility;x++){
                for(let y = 0;y<=botVisibility;y++){
                   
                    
                    if(newSnakeHead[0]+x<totalPixels-1&&newSnakeHead[0]-x>1&&newSnakeHead[1]+y<totalPixels-1&&newSnakeHead[1]-y>1){
                      
                        if(pathArray[newSnakeHead[0]+x][newSnakeHead[1]+y]>0){
                            pathArray[newSnakeHead[0]+x].splice([newSnakeHead[1]+y],1,0)
                        }
                        if(pathArray[newSnakeHead[0]-x][newSnakeHead[1]-y]>0){
                            pathArray[newSnakeHead[0]-x].splice([newSnakeHead[1]-y],1,0)
                        }
                        if(pathArray[newSnakeHead[0]+x][newSnakeHead[1]-y]>0){
                            pathArray[newSnakeHead[0]+x].splice([newSnakeHead[1]-y],1,0)
                        }
                        if(pathArray[newSnakeHead[0]-x][newSnakeHead[1]+y]>0){
                            pathArray[newSnakeHead[0]-x].splice([newSnakeHead[1]+y],1,0)
                        }
                    }
                }
            }
            
            for(let x = 0;x<=botVisibility*2;x++){
                for(let y = 0;y<=botVisibility*2;y++){

                    if(newSnakeHead[0]+x<totalPixels-1&&newSnakeHead[0]-x>1&&newSnakeHead[1]+y<totalPixels-1&&newSnakeHead[1]-y>1){
                       
                        if(gameArray[newSnakeHead[0]+x][newSnakeHead[1]+y]=="food"){
                            generatePathToFood([newSnakeHead[0]+x,newSnakeHead[1]+y])
                        }
                        if(gameArray[newSnakeHead[0]-x][newSnakeHead[1]-y]=="food"){
                            generatePathToFood([newSnakeHead[0]-x,newSnakeHead[1]-y])
                        }
                        if(gameArray[newSnakeHead[0]+x][newSnakeHead[1]-y]=="food"){
                            generatePathToFood([newSnakeHead[0]+x,newSnakeHead[1]-y])
                        }
                        if(gameArray[newSnakeHead[0]-x][newSnakeHead[1]+y]=="food"){
                            generatePathToFood([newSnakeHead[0]-x,newSnakeHead[1]+y])
                        }
                    }
                }
            }
        }
       
        gameArray[snakeHead[0]].splice([snakeHead[1]],1,"snake")
        gameArray[newSnakeHead[0]].splice([newSnakeHead[1]],1,"head")
      
        
        for(let x = 0;x<=botVisibility;x++){
            for(let y = 0;y<=botVisibility;y++){

                if(snakeTail[0]+x<totalPixels-1&&snakeTail[0]-x>1&&snakeTail[1]+y<totalPixels-1&&snakeTail[1]-y>1){
                    if(gameArray[snakeTail[0]+x][snakeTail[1]+y]=="food"){

                        generatePathToFood([snakeTail[0]+x],[snakeTail[1]+y])
                    }
                    if(gameArray[snakeTail[0]-x][snakeTail[1]-y]=="food"){
                        
                        generatePathToFood([snakeTail[0]-x,snakeTail[1]-y])
                    }
                    if(gameArray[snakeTail[0]+x][snakeTail[1]-y]=="food"){
                        
                        generatePathToFood([snakeTail[0]+x,snakeTail[1]-y])
                    }
                    if(gameArray[snakeTail[0]-x][snakeTail[1]+y]=="food"){
                        
                        generatePathToFood([snakeTail[0]-x,snakeTail[1]+y])
                    }
                }
            }
        }
        
        snake.push(newSnakeHead)
    
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

function foodApear() {
    
   
    let randomX = random(1,totalPixels-1)
    let randomY = random(1,totalPixels-1)
 
    if(gameArray[randomX][randomY]== undefined){
        
        generatePathToFood([randomX,randomY])
        gameArray[randomX].splice(randomY,1,"food")
        return 
    }

    else{
        
        return foodApear()
    }
    
    
    

    
}
  
function restart(){
    if(gameOver){
        let node = document.getElementById("restartButton");
        if (node.parentNode) {
        node.parentNode.removeChild(node);
        }
    }
}

function keyPressed (key){
    if(!gameStart){
        gameStart = true
        playGame()
    }
    switch(key.key){
        case "ArrowDown":
            if(mode!=moveUp){
                mode= moveDown
            }
            break;
        case "ArrowUp":
            if(mode!=moveDown){
                mode= moveUp
            }
            break;
        case "ArrowLeft":
            if(mode!=moveRight){
                mode= moveLeft
             }
            break;
        case "ArrowRight":
            if(mode!=moveLeft){
                mode= moveRight
            }
            break;
        case "Escape":
            clearInterval(game)
            break;
        case "Enter":
            playGame()
            break;
    }
}

function generatePathToFood ([foodX,foodY]){
    
    for(let x = 0;x<=botVisibility;x++){
        for(let y = 0;y<=botVisibility;y++){
        
        
            if(foodX+x<totalPixels-1&&foodX-x>1&&foodY+y<totalPixels-1&&foodY-y>1){
            
                if(pathArray[foodX+x][foodY+y]>=0 && gameArray[foodX+x][foodY+y]!="snake"){
                
                    if(pathArray[foodX+x][foodY+y]<botVisibility-x-y){
                        pathArray[foodX+x].splice([foodY+y],1,botVisibility-x-y)
                    }
                }
                if(pathArray[foodX-x][foodY-y]>=0 && gameArray[foodX-x][foodY-y]!="snake"){
                    if(pathArray[foodX-x][foodY-y]<botVisibility-x-y){
                        pathArray[foodX-x].splice([foodY-y],1,botVisibility-x-y)
                    }
                }
                if(pathArray[foodX+x][foodY-y]>=0 && gameArray[foodX+x][foodY-y]!="snake"){
                
                    if(pathArray[foodX+x][foodY-y]<botVisibility-x-y){
                        pathArray[foodX+x].splice([foodY-y],1,botVisibility-x-y)
                    }
                }
                if(pathArray[foodX-x][foodY+y]>=0 && gameArray[foodX-x][foodY+y]!="snake"){
                
                    if(pathArray[foodX-x][foodY+y]<botVisibility-x-y){
                        pathArray[foodX-x].splice([foodY+y],1,botVisibility-x-y)
                    }
                }
            }
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function deleteSnake(snakeHead) {
    for (let i = 0; i < allSnakes.length; i++) {
        
        if (allSnakes[i][allSnakes[i].length-1][0] == snakeHead[0] && allSnakes[i][allSnakes[i].length-1][1] == snakeHead[1]) {
            return allSnakes.splice(i,1)
             
        }
    }
    return  
}