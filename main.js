// $('body').append('hello');

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

var randNum = function(){
  return Math.floor(Math.random()*10);
}

var printer = function(coord){
  var num = randNum();
  $('body').append('<div style="position:absolute; top:'+coord.y+'px;left:'+coord.x+'px;">'+num+'</div>');
  coord.y = coord.y + 16;

  if(coord.handler !== null && coord.y > 668){
    clearInterval(coord.handler);
  }
}

var terminate = function(coord, handler){
  var heigth = $(window).innerHeight();
  if(coord.y > 668){
    clearInterval(handler);
  }
}

var main = function(num){

  for (var i=0; i<num; i++){
    var column = new randCoor();
    var handler = setInterval(printer.bind(null, column), 200);
    column.handler = handler;
  }
}

main(10);