
//canvas settings 
const cellDim = 16; //20
const columns = 60;   //50
const rows = 40; //30
document.getElementById("snakeCanvas").style.width = columns * cellDim + "px";
 
function setCanvas(){
  let grid = "";
  let col = 1;
  let row = 1;
  for(let i=0; i<(columns * rows); i++){
    grid += "<li class='col"+ col +" row" +  row;
    if( row === 1 || col === 1 || col === columns || row === rows){
      grid += " badCell";
    }
    grid += "'></li>";
    col++;
    if(col > columns){
      col = 1;
      row++;
    }
  }
  document.getElementById('snakeCanvas').innerHTML = grid;
  for(let i=0; i<document.getElementsByTagName('li').length; i++){
    document.getElementsByTagName('li')[i].style.height = cellDim + "px";
    document.getElementsByTagName('li')[i].style.width = cellDim + "px";
  }
  ////////////////////////////////////////////////
 
}
  
function editAbleCanvas(){
  let walls = "";
  let startGrowth = "";

  let allCells = document.getElementsByTagName("li");

  for(let i=0; i<allCells.length; i++){
    allCells[i].addEventListener("click", ()=>{ 
      let targ = "[" + allCells[i].classList[0].replace("col", "") + ", " + allCells[i].classList[1].replace("row", "") + "],"; 
      if(allCells[i].classList.contains("badCell")){
        if(allCells[i].classList.contains("growth")){
          allCells[i].classList.remove("badCell");
          allCells[i].classList.remove("growth");
          startGrowth = startGrowth.replace(targ, "");
        }else{
          allCells[i].classList.add("growth");
          walls = walls.replace(targ, "");
          startGrowth = startGrowth + targ;
        }
      }else{
        walls = walls + targ;
        allCells[i].classList.add("badCell"); 
      } 
      document.getElementById("rez").innerHTML = "walls: "+ walls + "<br/>growth: " + startGrowth;
    });
  } 
}

function getCell(col, row){
  let cellCols = document.getElementsByClassName("col" + col);
  for(let i=0; i<cellCols.length; i++){
    if(cellCols[i].classList.contains("row" + row)){
      return(cellCols[i]);
    }
  }
} 
function setSnake(){
  snakePos = [
    [10, 10],
    [10, 9],
    [10, 8],
    [10, 7],
    [10, 6],
    [10, 5]
  ]; 
  for(let i=0; i<snakePos.length; i++){
    getCell(snakePos[i][0], snakePos[i][1]).classList.add("snake"); 
    if(i===0){
      getCell(snakePos[i][0], snakePos[i][1]).classList.add("snakeHead");  
    }
  }
}


setCanvas();
setSnake();
editAbleCanvas();