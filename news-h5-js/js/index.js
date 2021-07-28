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
// tab选中状态
// $(".tabs ul>li").eq(1).addClass("active")
var type = "top"
// 首页新闻分类
$(".tabs ul>li").click(function(){
    mescroll.lazyLoad()
    // 获取分类参数
    type = $(this).prop("type")
    $(this).addClass("active").siblings().removeClass("active")
    $.ajax({
        type: "get",
        url: "http://localhost:3000/list?key=85b8c5291216fdb30c329eeb5020dc28",
        data: {
            type:type
        },
        dataType: "json",
        success:(res)=>{
            // console.log(res);
            $(".content").empty()
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
                                    <img lazyLoading="${item.thumbnail_pic_s}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    <img lazyLoading="${item.thumbnail_pic_s02}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    <img lazyLoading="${item.thumbnail_pic_s03}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    </div>
                                    <span class="date">${item.author_name}&nbsp;&nbsp;${item.ago}</span>
                                </div>
                            </a>
                        `
                        $(".content").append(html)
                    }else{
                        html += `
                            <a href="javascript:void(0)">
                                <div class="news-brief-tb-layout">
                                    <div class="titile">${item.title}</div>
                                    <div class="news-images">
                                    <img lazyLoading="${item.thumbnail_pic_s}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    <img lazyLoading="${item.thumbnail_pic_s02}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    <img lazyLoading="${item.thumbnail_pic_s03}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    </div>
                                    <span class="date">${item.author_name}&nbsp;&nbsp;${item.ago}</span>
                                </div>
                            </a>
                        `
                        $(".content").append(html)
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
                                    <img lazyLoading="${item.thumbnail_pic_s}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset="" />
                                    </div>
                                </div>
                            </a>
                        `
                        $(".content").append(html)
                    }else{
                        html += `
                            <a href="javascript:void(0)">
                                <div class="news-brief-lr-layout">
                                    <div class="news-title">
                                    <span class="title">${ item.title }</span>
                                    <span class="date">${item.author_name}&nbsp;&nbsp;${ item.ago }</span>
                                    </div>
                                    <div class="news-image">
                                    <img lazyLoading="${item.thumbnail_pic_s}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset="" />
                                    </div>
                                </div>
                            </a>
                        `
                        $(".content").append(html)
                    }
                }
            })
        },
        error:function(err){
            console.log(err);
        }
    });
})

var mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id (1.3.5版本支持传入dom对象)
    //如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
    //解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
 down: {
    use:false,
    callback: downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
 },
 up: {
     callback: upCallback, //上拉加载的回调
     //以下是一些常用的配置,当然不写也可以的.
     page: {
         num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
         size: 30 //每页数据条数,默认10
     },
     htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
     noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
            //  避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
            //  这就是为什么无更多数据有时候不显示的原因.
     toTop: {
         //回到顶部按钮
         src: "https://www.51xuediannao.com/uploads/allimg/140105/1-140105142F5-50.png", //图片路径,默认null,支持网络图
         offset: 1000 //列表滚动1000px才显示回到顶部按钮	
     },
     empty: {
         //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
         warpId: "home", //父布局的id (1.3.5版本支持传入dom元素)
         icon: "../img/mescroll-empty.png", //图标,默认null,支持网络图
         tip: "暂无相关数据~" //提示
     },
     lazyLoad: {
        use: true, // 是否开启懒加载,默认false
        attr: 'lazyLoading', // 标签中网络图的属性名 : <img lazyLoading='网络图  src='占位图''/>
        delay: 300, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
        offset: 400 // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
     }
 }
});
function downCallback(){
    $.ajax({
        url: 'http://localhost:3000/list?key=85b8c5291216fdb30c329eeb5020dc28',
        success: function(data) {
            //联网成功的回调,隐藏下拉刷新的状态;
            mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
            //设置数据
            //setXxxx(data);//自行实现 TODO
        },
        error: function(data) {
            //联网失败的回调,隐藏下拉刷新的状态
            mescroll.endErr();
        }
    });
}
//上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
function upCallback(page) {
    var pageNum = page.num; // 页码, 默认从1开始 如何修改从0开始 ?
    var pageSize = page.size; // 页长, 默认每页10条
    $.ajax({
        url: 'http://localhost:3000/list?page=' + pageNum + "&page_size=" + pageSize +"&key=85b8c5291216fdb30c329eeb5020dc28",
        success: function(res) {
            // var curPageData = data.xxx; // 接口返回的当前页数据列表
            // var totalPage = data.xxx; // 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
            // var totalSize = data.xxx; // 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
            // var hasNext = data.xxx; // 接口返回的是否有下一页 (true/false)
            // console.log(res);
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
                            <a href="detail.html?key=${item.uniquekey}&type=${type?type:"top"}">
                                <div class="news-brief-tb-layout">
                                    <div class="titile">${item.title}</div>
                                    <div class="news-images">
                                    <img lazyLoading="${item.thumbnail_pic_s}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    <img lazyLoading="${item.thumbnail_pic_s02}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    <img lazyLoading="${item.thumbnail_pic_s03}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    </div>
                                    <span class="date">${item.author_name}&nbsp;&nbsp;${item.ago}</span>
                                </div>
                            </a>
                        `
                        $(".content").append(html)
                    }else{
                        html += `
                            <a href="javascript:void(0)">
                                <div class="news-brief-tb-layout">
                                    <div class="titile">${item.title}</div>
                                    <div class="news-images">
                                    <img lazyLoading="${item.thumbnail_pic_s}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    <img lazyLoading="${item.thumbnail_pic_s02}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    <img lazyLoading="${item.thumbnail_pic_s03}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset=""/>
                                    </div>
                                    <span class="date">${item.author_name}&nbsp;&nbsp;${item.ago}</span>
                                </div>
                            </a>
                        `
                        $(".content").append(html)
                    }
                }else{
                    if(item.is_content == "1"){
                        html += `
                            <a href="detail.html?key=${item.uniquekey}&type=${type?type:"top"}">
                                <div class="news-brief-lr-layout">
                                    <div class="news-title">
                                    <span class="title">${ item.title }</span>
                                    <span class="date">${item.author_name}&nbsp;&nbsp;${ item.ago }</span>
                                    </div>
                                    <div class="news-image">
                                    <img lazyLoading="${item.thumbnail_pic_s}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset="" />
                                    </div>
                                </div>
                            </a>
                        `
                        $(".content").append(html)
                    }else{
                        html += `
                            <a href="javascript:void(0)">
                                <div class="news-brief-lr-layout">
                                    <div class="news-title">
                                    <span class="title">${ item.title }</span>
                                    <span class="date">${item.author_name}&nbsp;&nbsp;${ item.ago }</span>
                                    </div>
                                    <div class="news-image">
                                    <img lazyLoading="${item.thumbnail_pic_s}" src="data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAA1BMVEXd3d3u346CAAAADUlEQVR42gECAP3/AAAAAgABUyucMAAAAABJRU5ErkJggg==" alt="" srcset="" />
                                    </div>
                                </div>
                            </a>
                        `
                        $(".content").append(html)
                    }
                }
            })
            
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空,显示empty配置的内容;
            //列表如果无下一页数据,则提示无更多数据,(注意noMoreSize的配置)
            
            //方法一(推荐): 后台接口有返回列表的总页数 totalPage
            //必传参数(当前页的数据个数, 总页数)
            mescroll.endByPage(res.result.data.length, 50);
                    
            //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
            //必传参数(当前页的数据个数, 总数据量)
            //mescroll.endBySize(curPageData.length, totalSize);
                    
            //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
            //必传参数(当前页的数据个数, 是否有下一页true/false)
            //mescroll.endSuccess(curPageData.length, hasNext);
                    
            //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
            //如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
            //如果传了hasNext,则翻到第二页即可显示无更多数据.
            //mescroll.endSuccess(curPageData.length);
            
            //curPageData.length必传的原因:
            // 1. 使配置的noMoreSize 和 empty生效
            // 2. 判断是否有下一页的首要依据: 
            //    当传的值小于page.size时(说明不满页了),则一定会认为无更多数据;
            //    比传入的totalPage, totalSize, hasNext具有更高的判断优先级;
            // 3. 当传的值等于page.size时,才会取totalPage, totalSize, hasNext判断是否有下一页
            // 传totalPage, totalSize, hasNext目的是避免方法四描述的小问题
            
            //设置列表数据
            //setListData(curPageData);//自行实现 TODO
        },
        error: function(e) {
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态
            mescroll.endErr();
        }
    });
}
