// 分數
let score = 0
// 剩餘秒數
let countdown = 0
// 計時器
let timer = 0

// 這個可以讓綠谷跳起來一下 但不知道怎麼連續跳
// $(document).mousedown(function (event) {
//   to_top();
// });
// $(document).mouseup(function (event) {
//   to_down();
// });
// function to_top() {
//   $("#deku2").css({ 'top': '-=30' });
// }

// 讓綠谷左右移動
// 鍵盤的keycode
$(document).keydown(function (event) {
  if (event.keyCode == 37) {
    $('#deku2').attr('src', './images/deku.gif')
    to_left();
  } else if (event.keyCode == 39) {
    $('#deku2').attr('src', './images/deku.2.gif')
    to_right();
  }
});

// 讓左邊和右邊各做事情
function to_left() {
  let left1 = $("#deku2").css('left');
  $("#deku2").css({ 'left': '-=20' });
  if (parseInt(left1) <= -10) {
    $("#deku2").css({ 'left': -10 + 'px' });
  }
}

function to_right() {
  let left = $("#deku2").css('left');
  $("#deku2").css({ 'left': '+=20' });
  // 把文字去掉轉成數字
  if (parseInt(left) >= 545) {
    $("#deku2").css({ 'left': 545 + 'px' });
  }
}

// 設定讓物體隨機掉落
function addDot() {
  // 圖片陣列
  const URLs = [
    "./images/p1.png",
    "./images/p2.png",
    "./images/p3.png",
    "./images/p4.png",
  ];

  // 圖片長度
  let randomcolor = parseInt(Math.random() * URLs.length);
  // 新增一個div容器
  let add = $("<div></div>");
  // 新增class
  add.attr("class", "peoples");
  // 隨機圖片
  add.css("background-image", "url(" + URLs[randomcolor] + ")");
  // left設定
  let randomL = Math.floor(Math.random() * 550)
  add.css("left", randomL);
  add.animate(
    {
      top: '+=580px',
    },
    8000,
    "linear",
    function () {
      // score++
      // $('#text-score').text(score)
      $(this).remove();
    }
  );
  add.appendTo(".game");
  // 分數計算
  if ($(".peoples").first().offset().top > $("#deku2").offset().top && $("#deku2").offset().left < $(".peoples").first().offset().left) {
    score++
    $('#text-score').text(score)
  }
  // && $(".peoples").first().offset().left < $('#deku2').offset().left + $('#deku').innerWidth()
}

// 點擊遊戲開始
$("#start").on("click", function () {
  // 讓遊戲開始畫面隱藏
  $(".mask").hide();
  Dot = setInterval(function () {
    addDot(); //1秒出現一個隨機角色
  }, 1000);
  // 分數
  score = 0
  $('#text-score').text(score)
  // 倒數計時
  countdown = 60
  $('#time').text(countdown)
  timer = setInterval(function () {
    countdown--
    $('#time').text(countdown)

    // 時間到
    if (countdown === 0) {
      clearInterval(timer)
      clearInterval(Dot)
      Swal.fire({
        icon: 'info',
        title: '時間到',
        text: `你得到${score}分`
      }).then(() => {
        $(".mask").show();
      })
    }
  }, 1000)
});

// 遊戲說明點擊
$("#Introduction").on("click", function () {
  $(".Introduction").toggle();
});

