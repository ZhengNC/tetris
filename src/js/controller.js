
$("#upButton").click(function () {
  if(tetrisBox != null){
    tetrisBox.rotate();
  }
});

$("#downButton").click(function () {
  if(tetrisBox != null){
    tetrisBox.down();
  }
});

$("#leftButton").click(function () {
  if(tetrisBox != null){
    tetrisBox.left();
  }
});

$("#rightButton").click(function () {
  if(tetrisBox != null){
    tetrisBox.right();
  }
});

// $("body").on("swipeleft",function(){
//   if(tetrisBox != null){
//     tetrisBox.left();
//   }
// });

