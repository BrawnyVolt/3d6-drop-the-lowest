// import '_' from 'lodash';
/// roll 4 d6, drop lowest, sum, then add to matrix (6x6)

let d6Array = []
let d6matrix
let rowArray = []
let columnArray = []
let mainDiagonalTotal = 0
let counterDiagonalTotal = 0


function getD6Array() {
  for(let i=0; d6Array.length < 36; i++) {
  // get 4 rolls, get sum - lowest value
    // const d6Total = () => {
      let FourD6Rolls = []
      i=0
      while(i<4) {
        FourD6Rolls.push(Math.floor(Math.random() * 6) + 1)
        i++
      }  
      let lowest = Math.min(...FourD6Rolls)
      let total = FourD6Rolls.reduce((a,b) => a + b, 0) - lowest  
    // }
  // add to array
  d6Array.push(total)
  }
}

// split array into chunks
function chunkArray(arr) { 
  return _.chunk(arr, 6)
}

// get matrix total of values by row
function totalByRow(matrix) {
  for(let i=0; i<6; i++) {
    let sum = matrix[i].reduce((a,b) => a+b, 0)
    rowArray.push(sum)
  }
  console.log(`sum of rows: ${rowArray}`)
  console.table(rowArray)
}

// get matrix total of values by column
function totalByColumn(matrix) {
  for(let i=0; i<6; i++) {
    let sum = 0
    for(let j=0; j<6; j++) {
    sum += matrix[j][i]
    }
    columnArray.push(sum)
  }
  console.log(`sum of cols: ${columnArray}`)
  console.table([columnArray])
}

// get total of main diagonal values 
function totalByMainDiagonal(matrix) {  
  for(let i=0; i<6; i++) {
    mainDiagonalTotal += matrix[i][i]
  } 
  console.log(`sum of main diagonal \\ : ${mainDiagonalTotal}`)
}

// get total of counter diagonal values 
function totalByCounterDiagonal(matrix) {
  counterDiagonalTotal = matrix[0][5] + matrix[1][4] + matrix[2][3] + matrix[3][2] + matrix[4][1] + matrix[5][0]
  console.log(`sum of counter diagonal / : ${counterDiagonalTotal}`)
}

function gatherTotals(matrix) {
  totalByRow(matrix)
  totalByColumn(matrix)
  totalByMainDiagonal(matrix)
  totalByCounterDiagonal(matrix)
}


getD6Array()
d6matrix = chunkArray(d6Array)
console.table(d6matrix)
gatherTotals(d6matrix)

function makeTable (tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
      //assigns each cell an id based on the cellData. Should probably be class instead, but it works as is -steve
      cell.setAttribute("id", `${cellData}`);
      
    });
    tableBody.appendChild(row);
  });
//*****steves additions*****

//unneeded----------------
  // function addingRowSums(){
    
  //     let idLocations = document.querySelectorAll('*[id]') ;
  //       let sumCell = document.createElement('td');
  //       for (let i = 5; j = 0, i < idLocations.length; i+=6, j++) {
  //         sumCell.appendChild(document.createTextNode(rowArray[j]));
  //         idLocations[i].appendChild(sumCell);

  //       // idLocations[i].appendChild(rowArray[j]);
  //     }
  //   }
  //---------------------

  function addingCells() {
    let rowLocations = document.querySelectorAll('tr') ;
    //adding right-most cells
    for (let i = 0; i < rowLocations.length; i++) {
        let row = rowLocations[i];
        let x = row.insertCell();
        x.innerHTML = `${rowArray[i]}`;
      }

      var table = document.querySelector("table");
      var row = table.insertRow(-1);
    
    //adding bottom cells
    for (let i = 0; i < 6; i++) {
      var newCell = row.insertCell(-1);
      newCell.innerText = `${columnArray[i]}`;
    }
    
    //adding corner cells
    let bottomCornerCell = row.insertCell(-1);
    bottomCornerCell.innerText = mainDiagonalTotal
    var topRow = table.insertRow(0);
    
    //making blank cells
        for (let i = 0; i < 6; i++) {
    let topCornerCell = topRow.insertCell(-1);
        }
    
    // upper corner sum
    let topCornerCell = topRow.insertCell(-1);
    topCornerCell.innerText = counterDiagonalTotal
  }

  //unneeded------------------
  //   function borderMaker(){
  //   //grabs all ids and puts their NODES in an array
  // let idLocations = document.querySelectorAll('*[id]') ;

  //     //loops through the node array looking for something
  //    for (let i = 0; i < idLocations.length; i++) {
  //    //the conditional that changes their border
  //       if (idLocations[i].id > 17){
  //       //the border change
  //         idLocations[i].style.border = '.2em solid gold';
  //       } else if(idLocations[i].id){
  //         idLocations[i].style.border = '.1em solid black';

          
  //       }
  //     }
  //   }
  //----------------------------
  
      function borderMakerTwo(){

        let locations = document.querySelectorAll("table td");
        for (let i = 0; i < locations.length; i++) {
     //the conditional that changes their border
          if (locations[i].id > 17){
        //the border change
            locations[i].style.border = '.2em solid gold';
          } else if(locations[i].id){
            locations[i].style.border = '.15em solid black';
          } else if(parseInt(locations[i].innerText, 10) > 75){ 
            locations[i].style.color = 'red'
          } else {
            locations[i].style.color = 'dimgrey'

          }
      }
    }

  //*****end of steve*****
 

  
  table.appendChild(tableBody);
  document.body.appendChild(table);

  //***more steve***
  addingCells();
  borderMakerTwo();
  //***end again***
}

makeTable(d6matrix)

