var score = 0;// 得分
var level = 1000;// 下落速度
var clearLineNumTotal; // 消除的总行数

/**
 * 页面初始化
 */
$(function () {
  tableInit();
});

function muFunction() {
  var myFunctionBoolean = true;

  var userName = $("#userName").val();
  if (userName == "chaonan" || userName == "nianchao"){//如果符合就执行彩蛋
    if(score >= 2){
      tetrisBox = null;
      window.clearInterval(time);
      clearPanel();
      addLove();
      removeDisabledAll();
      myFunctionBoolean = false;
    }
  }
  return myFunctionBoolean;
}

/**
 * 监听开始按钮
 */
$("#startGame").click(function () {
  startGame();
});

/**
 * 开始游戏
 */
function startGame() {
  tableInit();
  clearPanel();
  disabledAll();
  tetrisBoxInit(rndNum());
  time = window.setInterval(timeDown, level);
}

/**
 * 禁用元素(开始按钮、输入框)
 */
function disabledAll() {
  $("#startGame").attr("disabled","disabled");//禁用开始按钮
  $("#userName").attr("disabled","disabled");//禁用输入框
}
/**
 * 解除禁用元素(开始按钮、输入框)
 */
function removeDisabledAll() {
  $("#startGame").removeAttr("disabled");//解除禁用开始按钮
  $("#userName").removeAttr("disabled");//解除禁用输入框
}

/**
 * 更新下落速度
 */
function  updateLevel() {
  window.clearInterval(time);
  time = window.setInterval(timeDown, level);
}

/**
 * 改变游戏难度
 */
function addLevel() {
  if (score < 10){
    level = 1000;
  }else if (score < 30){
    level = 800;
  }else if (score < 50){
    level = 500;
  }else if (score < 80){
    level = 200;
  }else {
    level = 100;
  }
  updateLevel();
}


function addLove(){
  $(".table").addClass("tableWhite");
  $(".box").addClass("boxWhite");

  $(".tableWhite").removeClass("table");
  $(".boxWhite").removeClass("box");

  $(".x4y17").addClass("isLove");
  $(".x4y17").html("<div class='love'></div>");
  $(".x5y17").addClass("isLove");
  $(".x5y17").html("<div class='love'></div>");
  $(".x3y16").addClass("isLove");
  $(".x3y16").html("<div class='love'></div>");
  $(".x2y15").addClass("isLove");
  $(".x2y15").html("<div class='love'></div>");
  $(".x1y14").addClass("isLove");
  $(".x1y14").html("<div class='love'></div>");
  $(".x1y13").addClass("isLove");
  $(".x1y13").html("<div class='love'></div>");
  $(".x6y16").addClass("isLove");
  $(".x6y16").html("<div class='love'></div>");
  $(".x7y15").addClass("isLove");
  $(".x7y15").html("<div class='love'></div>");
  $(".x8y14").addClass("isLove");
  $(".x8y14").html("<div class='love'></div>");
  $(".x8y13").addClass("isLove");
  $(".x8y13").html("<div class='love'></div>");
  $(".x7y12").addClass("isLove");
  $(".x7y12").html("<div class='love'></div>");
  $(".x6y12").addClass("isLove");
  $(".x6y12").html("<div class='love'></div>");
  $(".x2y12").addClass("isLove");
  $(".x2y12").html("<div class='love'></div>");
  $(".x3y12").addClass("isLove");
  $(".x3y12").html("<div class='love'></div>");
  $(".x4y13").addClass("isLove");
  $(".x4y13").html("<div class='love'></div>");
  $(".x5y13").addClass("isLove");
  $(".x5y13").html("<div class='love'></div>");
}

