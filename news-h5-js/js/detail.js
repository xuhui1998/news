// 获取key请求详情接口
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
// 获取时间戳
function timeCheckFun(startTime,endTime){
    var t = endTime-startTime;
    //获取年数时间差
    var year=parseInt((t/(1000*60*60*24))/365);
    //获取月数时间差
    var month=parseInt((t/(1000*60*60*24))/30);
    //获取天数时间差
    var days=parseInt(t/(1000*60*60*24));
    //获取小时时间差
    var HH=parseInt(t/(1000*60*60));
    //获取分钟时间差
    var mm=parseInt(t/(1000*60));
    //获取秒时间差
    var ss=parseInt(t/(1000));
    var gaidongtime;
    if(days<=1){
      if(ss<=60){
        gaidongtime="刚刚";
      }else if(ss>60&&ss<=60*60){
        gaidongtime=mm+"分钟前";
      }else if(ss>60*60&&ss<=60*60*24){
        gaidongtime=HH+"小时前";
      }else{
        gaidongtime=days+"天前";
      }
    }else if(days<30&&days>1){
      gaidongtime=days+"天前";
    }else if(days>=30&&days<365){
      var days1=parseInt(days/30);
      gaidongtime=days1+"月前";
    }else if(days>=365){
      var days2=parseInt(days/365);
      gaidongtime=days2+"年前";
    }else{
      gaidongtime="历史很久远";
    }
    return gaidongtime;
}

var key = getQueryVariable("key");
var type = getQueryVariable("type");

$.ajax({
  type: "get",
  url: "http://localhost:3000/detail?key=85b8c5291216fdb30c329eeb5020dc28",
  data: {
    uniquekey: key,
  },
  dataType: "json",
  success: (res) => {
    // console.log(res);
    var newsDetail = res.result
    document.title = newsDetail.detail.title
    $(".title").html(newsDetail.detail.title);
    $(".date").html(newsDetail.detail.date);
    $(".author").html(newsDetail.detail.author_name);
    $(".content").html(newsDetail.content);
  },
  error: function (err) {
    console.log(err);
  },
});

$.ajax({
    type: "get",
    url: "http://localhost:3000/list?key=85b8c5291216fdb30c329eeb5020dc28",
    data: {
        type:type,
        page:1,
        page_size:10
    },
    dataType: "json",
    success:(res)=>{
        res.result.data.forEach((item) => {
            if (
              item.thumbnail_pic_s &&
              item.thumbnail_pic_s02 &&
              item.thumbnail_pic_s03
            ) {
              item.imgNum = 3;
              item.ago = timeCheckFun(new Date(item.date).getTime(),new Date().getTime())
            } else if (item.thumbnail_pic_s && item.thumbnail_pic_s02) {
              item.imgNum = 2;
              item.ago = timeCheckFun(new Date(item.date).getTime(),new Date().getTime())
            } else {
              item.imgNum = 1;
              item.ago = timeCheckFun(new Date(item.date).getTime(),new Date().getTime())
            }
        });
        res.result.data.forEach(item=>{
            let html = ""
            if(item.imgNum == 3){
                if(item.is_content == "1"){
                    html += `
                        <a href="detail.html?key=${item.uniquekey}&type=${type}">
                            <div class="news-brief-tb-layout">
                                <div class="titile">${item.title}</div>
                                <div class="news-images">
                                <img src="${item.thumbnail_pic_s}" alt="" srcset=""/>
                                <img src="${item.thumbnail_pic_s02}" alt="" srcset=""/>
                                <img src="${item.thumbnail_pic_s03}" alt="" srcset=""/>
                                </div>
                                <span class="date">${item.author_name}&nbsp;&nbsp;${item.ago}</span>
                            </div>
                        </a>
                    `
                    $(".recReading ul").append(html);
                }else{
                    html += `
                        <a href="javascript:void(0)">
                            <div class="news-brief-tb-layout">
                                <div class="titile">${item.title}</div>
                                <div class="news-images">
                                <img src="${item.thumbnail_pic_s}" alt="" srcset=""/>
                                <img src="${item.thumbnail_pic_s02}" alt="" srcset=""/>
                                <img src="${item.thumbnail_pic_s03}" alt="" srcset=""/>
                                </div>
                                <span class="date">${item.author_name}&nbsp;&nbsp;${item.ago}</span>
                            </div>
                        </a>
                    `
                    $(".recReading ul").append(html);
                }
            }else{
                if(item.is_content == "1"){
                    html += `
                        <a href="detail.html?key=${item.uniquekey}&type=${type}">
                            <div class="news-brief-lr-layout">
                                <div class="news-title">
                                <span class="title">${ item.title }</span>
                                <span class="date">${item.author_name}&nbsp;&nbsp;${ item.ago }</span>
                                </div>
                                <div class="news-image">
                                <img src="${item.thumbnail_pic_s}" alt="" srcset="" />
                                </div>
                            </div>
                        </a>
                    `
                    $(".recReading ul").append(html);
                }else{
                    html += `
                        <a href="javascript:void(0)">
                            <div class="news-brief-lr-layout">
                                <div class="news-title">
                                <span class="title">${ item.title }</span>
                                <span class="date">${item.author_name}&nbsp;&nbsp;${ item.ago }</span>
                                </div>
                                <div class="news-image">
                                <img src="${item.thumbnail_pic_s}" alt="" srcset="" />
                                </div>
                            </div>
                        </a>
                    `
                    $(".recReading ul").append(html);
                }
            }
        })
    },
    error:function(err){
        console.log(err);
    }
});

function back(){
    history.go(-1)
}
