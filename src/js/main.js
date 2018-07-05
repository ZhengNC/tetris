/**
 * 获取一个格子对象
 * @param y
 * @param x
 * @returns {Object}
 * @constructor
 */
function Box(y, x) {
  var box = new Object();
  box.x = x;
  box.y = y;
  return box;
}

/**
 * 获取一个旋转状态参数对象
 * @param ay0
 * @param ax0
 * @param ay1
 * @param ax1
 * @param ay2
 * @param ax2
 * @param ay3
 * @param ax3
 * @returns {any}
 * @constructor
 */
function State(ay0, ax0, ay1, ax1, ay2, ax2, ay3, ax3) {
  var state = Object();
  state.y0 = ay0;
  state.x0 = ax0;
  state.y1 = ay1;
  state.x1 = ax1;
  state.y2 = ay2;
  state.x2 = ax2;
  state.y3 = ay3;
  state.x3 = ax3;
  return state;
}

/**
 * 获取一个俄罗斯方块对象
 * @param type 方块类型
 * @returns {Object}
 * @constructor
 */
function TetrisBox(type){
  var tetrisBox = new Object();
  var boxs = new Array(4);
  var states = new Array(4);
  var thismove = "down";// 此俄罗斯方块当前的移动方式
  tetrisBox.boxs = boxs;
  tetrisBox.states = states;
  tetrisBox.type = type;
  tetrisBox.thismove = thismove;
  if(type == 1){ // T
    boxs[0] = Box(0, 4);
    boxs[1] = Box(0, 3);
    boxs[2] = Box(0, 5);
    boxs[3] = Box(1, 4);
    states[0] = State(0, 0, 0, -1, 0, 1, 1, 0);
    states[1] = State(0, 0, -1, 0, 1, 0, 0, -1);
    states[2] = State(0, 0, 0, 1, 0, -1, -1, 0);
    states[3] = State(0, 0, 1, 0, -1, 0, 0, 1);
  }
  if(type == 2){ // L
    boxs[0] = Box(0, 4);
    boxs[1] = Box(0, 3);
    boxs[2] = Box(0, 5);
    boxs[3] = Box(1, 3);
    states[0] = State(0, 0, 0, -1, 0, 1, 1, -1);
    states[1] = State(0, 0, -1, 0, 1, 0, -1, -1);
    states[2] = State(0, 0, 0, 1, 0, -1, -1, 1);
    states[3] = State(0, 0, 1, 0, -1, 0, 1, 1);
  }
  if(type == 3){ // L2
    boxs[0] = Box(0, 4);
    boxs[1] = Box(0, 3);
    boxs[2] = Box(0, 5);
    boxs[3] = Box(1, 5);
    states[0] = State(0, 0, 0, -1, 0, 1, 1, 1);
    states[1] = State(0, 0, -1, 0, 1, 0, 1, -1);
    states[2] = State(0, 0, 0, 1, 0, -1, -1, -1);
    states[3] = State(0, 0, 1, 0, -1, 0, -1, 1);
  }
  if(type == 4){ // I
    boxs[0] = Box(0, 4);
    boxs[1] = Box(0, 3);
    boxs[2] = Box(0, 5);
    boxs[3] = Box(0, 6);
    states[0] = State(0, 0, 0, -1, 0, 1, 0, 2);
    states[1] = State(0, 0, -1, 0, 1, 0, 2, 0);
    states[2] = State(0, 0, 0, -1, 0, 1, 0, 2);
    states[3] = State(0, 0, -1, 0, 1, 0, 2, 0);
  }
  if(type == 5){ // O
    boxs[0] = Box(0, 4);
    boxs[1] = Box(0, 5);
    boxs[2] = Box(1, 4);
    boxs[3] = Box(1, 5);
    states[0] = State(0, 0, 0, 1, 1, 0, 1, 1);
    states[1] = State(0, 0, 0, 1, 1, 0, 1, 1);
    states[2] = State(0, 0, 0, 1, 1, 0, 1, 1);
    states[3] = State(0, 0, 0, 1, 1, 0, 1, 1);
  }
  if(type == 6){ // Z2
    boxs[0] = Box(1, 4);
    boxs[1] = Box(1, 3);
    boxs[2] = Box(0, 4);
    boxs[3] = Box(0, 5);
    states[0] = State(0, 0, 0, -1, -1, 0, -1, 1);
    states[1] = State(0, 0, -1, 0, 0, 1, 1, 1);
    states[2] = State(0, 0, 0, -1, -1, 0, -1, 1);
    states[3] = State(0, 0, -1, 0, 0, 1, 1, 1);
  }
  if(type == 7){ // Z
    boxs[0] = Box(1, 4);
    boxs[1] = Box(0, 3);
    boxs[2] = Box(0, 4);
    boxs[3] = Box(1, 5);
    states[0] = State(0, 0, -1, -1, -1, 0, 0, 1);
    states[1] = State(0, 0, -1, 1, 0, 1, 1, 0);
    states[2] = State(0, 0, -1, -1, -1, 0, 0, 1);
    states[3] = State(0, 0, -1, 1, 0, 1, 1, 0);
  }

  tetrisBox.up = function up() {
    this.thismove = "up";
    move("up");
  }
  tetrisBox.down = function down() {
    this.thismove = "down";
    move("down");
  }
  tetrisBox.left = function left() {
    this.thismove = "left";
    move("left");
  }
  tetrisBox.right = function right() {
    this.thismove = "right";
    move("right");
  }

  function move(move) {

    var canMoveBoolean = canMove();

    if(canMoveBoolean){
      for(var i = 0; i < boxs.length; i++){
        undyeing(boxs[i]);
      }
      for(var i = 0; i < boxs.length; i++){
        if(move == "up"){
          boxs[i].y--;
        }
        if(move == "down"){
          boxs[i].y++;
        }
        if(move == "left"){
          boxs[i].x--;
        }
        if(move == "right"){
          boxs[i].x++;
        }
      }
      for(var i = 0; i < boxs.length; i++){
        dyeing(boxs[i]);
      }
    }

    if(canMoveBoolean == false && move == "down"){//如果不能向下移动就停止并产生新方块
      for(var i = 0; i < boxs.length; i++){
        var classStr = ".x"+boxs[i].x+"y"+boxs[i].y;
        undyeing(boxs[i]);
        $(classStr).addClass("isBox");
      }
      tetrisBoxInit(rndNum());
    }
  }

  var index = 1001;
  tetrisBox.index = index;
  tetrisBox.rotate = function rotate() {
    this.index = index;
    this.thismove = "rotate";
    var canMoveBoolean = canMove();
    if(canMoveBoolean){
      if(boxs[0].x == 0){
        tetrisBox.right();
      }
      if(boxs[0].x == 9){
        tetrisBox.left();
        if(tetrisBox.type = 4){
          tetrisBox.left();
        }
      }
      if(boxs[0].y == 0){
        tetrisBox.down();
      }
      for(var i = 0; i < boxs.length; i++){
        undyeing(boxs[i]);
      }
      var s = states[index % 4];
      index += 1;
      var o = boxs[0];
      var y = o.y;
      var x = o.x;
      boxs[1].y=(y + s.y1);
      boxs[1].x=(x + s.x1);
      boxs[2].y=(y + s.y2);
      boxs[2].x=(x + s.x2);
      boxs[3].y=(y + s.y3);
      boxs[3].x=(x + s.x3);
      for(var i = 0; i < boxs.length; i++){
        dyeing(boxs[i]);
      }
    }
  }

  return tetrisBox;
}


var tetrisBox;//俄罗斯方块

//定时下落
var time = null;
/**
 * 定时下落
 */
function timeDown() {
  tetrisBox.down();
}

/**
 * 初始化一个俄罗斯方块
 */
function tetrisBoxInit(type) {
  clearLine();// 消除满行
  var myBoolean = muFunction();//判断游戏结束前先执行的方法
  if(myBoolean){
    if(isGameOver()){
      removeDisabledAll();
      $("#score").html("<small>游戏结束！得分："+score+"</small>");
      window.clearInterval(time);
    }else{
      console.log("type="+type);
      tetrisBox = TetrisBox(type);
      dyeing(tetrisBox.boxs[0]);
      dyeing(tetrisBox.boxs[1]);
      dyeing(tetrisBox.boxs[2]);
      dyeing(tetrisBox.boxs[3]);
    }
  }
}

/**
 * 判断游戏是否结束
 * @returns {boolean}
 */
function isGameOver() {
  var isGameOverBoolean = false;
  if($(".x3y0").hasClass("isBox") || $(".x4y0").hasClass("isBox") || $(".x5y0").hasClass("isBox") || $(".x6y0").hasClass("isBox") || $(".x3y1").hasClass("isBox") || $(".x4y1").hasClass("isBox") || $(".x5y1").hasClass("isBox")){
    isGameOverBoolean = true;
  }
  return isGameOverBoolean;
}

/**
 * 判断如果移动是否会出边界
 * @returns {boolean}
 */
function isOut(){
  var boxs = tetrisBox.boxs;
  var isOutBoolean = false;
  if(tetrisBox.thismove == "down" && (boxs[0].y+1 == 20 || boxs[1].y+1 == 20 || boxs[2].y+1 == 20 || boxs[3].y+1 == 20)){//下边界
    isOutBoolean = true;
  }
  if(tetrisBox.thismove == "up" && (boxs[0].y-1 == -1 || boxs[1].y-1 == -1 || boxs[2].y-1 == -1 || boxs[3].y-1 == -1)){//上边界
    isOutBoolean = true;
  }
  if(tetrisBox.thismove == "left" && (boxs[0].x-1 == -1 || boxs[1].x-1 == -1 || boxs[2].x -1 == -1 || boxs[3].x-1 == -1)){// 左边界
    isOutBoolean = true;
  }
  if(tetrisBox.thismove == "right" && (boxs[0].x+1 == 10 || boxs[1].x+1 == 10 || boxs[2].x+1 == 10 || boxs[3].x+1 == 10)){// 右边界
    isOutBoolean = true;
  }
  return isOutBoolean;
}

/**
 * 判断如果移动是否会和其它方块重合
 * @returns {boolean}
 */
function isCoin() {
  var tempBoxs = getCopyBoxs();
  function getCopyBoxs() {
    var boxs = new Array(4);
    boxs[0] = Box(tetrisBox.boxs[0].y, tetrisBox.boxs[0].x);
    boxs[1] = Box(tetrisBox.boxs[1].y, tetrisBox.boxs[1].x);
    boxs[2] = Box(tetrisBox.boxs[2].y, tetrisBox.boxs[2].x);
    boxs[3] = Box(tetrisBox.boxs[3].y, tetrisBox.boxs[3].x);
    return boxs;
  }
  var isCoinBoolean = false;
  if(tetrisBox.thismove == "up"){
    for(var i = 0; i < tempBoxs.length; i++){
      tempBoxs[i].y--;
    }
  }
  if(tetrisBox.thismove == "down"){
    for(var i = 0; i < tempBoxs.length; i++){
      tempBoxs[i].y++;
    }
  }
  if(tetrisBox.thismove == "left"){
    for(var i = 0; i < tempBoxs.length; i++){
      tempBoxs[i].x--;
    }
  }
  if(tetrisBox.thismove == "right"){
    for(var i = 0; i < tempBoxs.length; i++){
      tempBoxs[i].x++;
    }
  }
  if(tetrisBox.thismove == "rotate"){//判断旋转后是否出界
    var s = tetrisBox.states[tetrisBox.index % 4];
    var o = tempBoxs[0];
    var y = o.y;
    var x = o.x;
    tempBoxs[1].y=(y + s.y1);
    tempBoxs[1].x=(x + s.x1);
    tempBoxs[2].y=(y + s.y2);
    tempBoxs[2].x=(x + s.x2);
    tempBoxs[3].y=(y + s.y3);
    tempBoxs[3].x=(x + s.x3);
  }

  for(var i = 0; i < tempBoxs.length; i++){
    var classStr = ".x"+tempBoxs[i].x+"y"+tempBoxs[i].y;
    if($(classStr).hasClass("isBox")){
      isCoinBoolean = true;
    }
    // if(tempBoxs[i].x > 9 || tempBoxs[i].x < 0 || tempBoxs[i].y > 19 || tempBoxs[i].y < 0){
    //   isCoinBoolean = true;
    // }
    if(tempBoxs[i].y > 19){
      isCoinBoolean = true;
    }
  }
  return isCoinBoolean;
}

/**
 * 判断俄罗斯方块是否可以移动
 * @returns {boolean}
 */
function canMove() {
  var canMoveBoolean = true;
  if(isOut() || isCoin()){
    canMoveBoolean = false;
  }
  return canMoveBoolean;
}

/**
 * 检查有没有满行，有就消除
 */
function clearLine() {
  var clearLineNum = 0;//本次消除的行数ss
  for(var i = 19; i >= 0; i--){
    var clearBoolean = true;//是否消除这一行
    for(var j = 0; j <= 9; j++){
      var classStr = ".x"+j+"y"+i;
      if($(classStr).hasClass("isBox") == false){
        clearBoolean = false;
      }
    }
    if(clearBoolean){
      for(var j = 0; j <= 9; j++){
        var classStr = ".x"+j+"y"+i;
        $(classStr).removeClass("isBox");
      }
      for(var k = i; k >= 1; k--){
        for(var j = 0; j <= 9; j++){
          var classStr1 = ".x"+j+"y"+k;
          var classStr2 = ".x"+j+"y"+(k-1);
          if($(classStr2).hasClass("isBox")){
            $(classStr1).addClass("isBox");
          }else{
            $(classStr1).removeClass("isBox");
          }
        }
      }
      i++;
      for(var j = 0; j <= 9; j++){
        var classStr = ".x"+j+"y0";
        $(classStr).removeClass("isBox");
      }
      clearLineNum++;
      clearLineNumTotal++;
    }
  }
  if (clearLineNum > 0){// 开始计分
    if (clearLineNum == 1){
      score += 1;
    }
    if (clearLineNum == 2){
      score += 3;
    }
    if (clearLineNum == 3){
      score += 6;
    }
    if (clearLineNum == 4){
      score += 10;
    }
    if (clearLineNum > 4){
      score += clearLineNum * 2 + 2;
    }
    $("#score").html("得分："+score);
    addLevel();// 根据总分改变难度(改变方块的下落速度)
  }
}


/**
 * 给方块染色
 * @param x
 * @param y
 */
function dyeing(box) {
  var classStr = ".x"+box.x+"y"+box.y;
  $(classStr).addClass("isMoveBox");
}

/**
 * 给方块消除染色
 * @param x
 * @param y
 */
function undyeing(box) {
  var classStr = ".x"+box.x+"y"+box.y;
  $(classStr).removeClass("isMoveBox");
}

/**
 * 初始化表格面板
 */
function tableInit() {
  level = 1000;
  if (time != null){
    window.clearInterval(time);
  }
  $("#panel").removeClass("tableWhite");
  $("#panel").addClass("table");
  $("td").html("<div class='box'></div>");
  $('#panel tr').each(function(i){                   // 遍历 tr
    $(this).children('td').each(function(j){  // 遍历 tr 的各个 td
      var classStr = "x"+j+"y"+i;
      $(this).addClass(classStr);
    });
  });
}

/**
 * 清空面板并初始化参数
 */
function clearPanel() {
  score = 0;
  clearLineNumTotal = 0;
  $("#score").html("");
  for(var i = 0; i < 20; i++){
    for(var j = 0; j < 10; j++){
      var classStr = ".x"+j+"y"+i;
      $(classStr).removeClass("isBox");
      $(classStr).removeClass("isMoveBox");
    }
  }
}

/**
 * 监听键盘
 */
$(document).keydown(function(event){
  console.log(event.keyCode);
  if(event.keyCode == 13){
    console.log('你按下了 回车');
    startGame();
  }
  if(tetrisBox != null){
    if(event.keyCode == 38){
      console.log('你按下了 上');
      tetrisBox.rotate();
    }
    if(event.keyCode == 98){
      console.log('你按下了 2');
      tetrisBox.down();
    }
    if(event.keyCode == 37 || event.keyCode == 97){
      console.log('你按下了 左');
      tetrisBox.left();
    }
    if(event.keyCode == 39 || event.keyCode == 99){
      console.log('你按下了 右');
      tetrisBox.right();
    }
    if(event.keyCode == 101){
      console.log('你按下了 5');
      tetrisBox.up();
    }
  }
});

/**
 * 监听空格键和方向下键按下
 */
$(document).keydown(function(event){
    if(tetrisBox != null){
        if(event.keyCode == 32 || event.keyCode == 40){
            window.clearInterval(time);
            time = window.setInterval(timeDown, 25);
        }
    }
});
/**
 * 监听空格键和方向下键松开
 */
$(document).keyup(function(event){
    if(tetrisBox != null){
        if(event.keyCode == 32 || event.keyCode == 40){
            window.clearInterval(time);
            time = window.setInterval(timeDown, level);
        }
    }
});



/**
 * 产生一个1到7的随机整数
 * @returns {number}
 */
function rndNum() {
  var r = 0;
  while (true){
    r = Math.floor(Math.random()*10);
    if(r > 0 && r < 8){
      return r;
    }
  }
}
