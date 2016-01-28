var data = {
  colList: [],
  finished: []
}

// coordinates generator for initial column placement and tracking of column
var randCoor = function(){
  var width = $(window).innerWidth();
  var height = $(window).innerHeight();
  var y = Math.floor(Math.random()*height-18);
  // var y = 0;
  var x = Math.floor(Math.random()*width-10);
  
  return {
    x: x,
    y: y,
    handler: null
  }
}

var initializeCol = function(coord){
  var newDiv = $('<div style="position:static;"></div>');
  $('body').append(newDiv);
  return newDiv;
}

// provides random number for printing on screen
var randNum = function(){
  return Math.floor(Math.random()*10);
}

// prints random number and adjusts the y value of the coordiate object
var printer = function(coord, divHandle){
  var num = randNum();
  divHandle.append('<div style="position:absolute; top:'+coord.y+'px; left:'+coord.x+'px;">'+num+'</div>');
  coord.y = coord.y + 16;

  if(coord.handler !== null && coord.y > 668){
    clearInterval(coord.handler);
    data.finished.push(divHandle);
    if(data.finished.length > 1){
      var done = data.finished.shift()
      removeCol(done);
    }
    newCol();
  }
}

var removeCol = function(column){
  var children = column.children();
  console.log(column[0].childNodes);
  if(column[0].childNodes.length > 0){
    var child = column[0].firstChild;
    child.remove();
    return setTimeout(removeCol.bind(null, column), 200);
  }else{
    return true
  }
}

var newCol = function(){
  var column = new randCoor();
  var div = initializeCol(column);
  var handler = setInterval(printer.bind(null, column, div), 200);
  column.handler = handler;
  data.colList.push(div);
}

var main = function(num){
  for (var i=0; i<num; i++){
    newCol();
  }
}

main(10);