angular.module('starter.directives', [])

.directive('aMap',function($interval,$location,$http,$ionicLoading){
  return {
    restrict: 'E',
    scope:{
      address:'=',
      myhttp:'&',
      pagetitle:'='
    },
    templateUrl:'templates/map.html',
    link:function(scope,e,attr){
      scope.successorder = true;//map-top-box-one,map-top-box-two
      if(scope.address) {
        scope.start = JSON.parse(scope.address).start;
        scope.destination = JSON.parse(scope.address).end;
        //地理编码
        var endpoint =[];
        AMap.service('AMap.Geocoder',function(){//回调函数
          //实例化Geocoder
          geocoders = new AMap.Geocoder();
          //TODO: 使用geocoder 对象完成相关功能
          geocoders.getLocation(scope.destination, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              //TODO:获得了有效经纬度，可以做一些展示工作
              endpoint.push(result.geocodes[0].location.lng);
              endpoint.push(result.geocodes[0].location.lat);
              sessionStorage.endpoint = JSON.stringify(endpoint);
            }else{
              //获取经纬度失败
            }
          });
        })
      }
      scope.index = sessionStorage.navindex;
      var markers = [];
      scope.show1 = true;
      scope.show1_1 = false;
      scope.show2 = true;
      scope.show2_1 = false;
      scope.show3 = true;
      scope.show3_1 = false;
      scope.show4 = true;
      scope.show4_1 = false;
      scope.xuanze = function(i) {
        if(scope.address) {
          if(scope.index == 0) {
            if(i == 0) {
              scope.topindex = true;
              scope.price = "车费$" + JSON.parse(scope.address).price;
              scope.destination = JSON.parse(scope.address).end;
              var markerpoint = JSON.parse(sessionStorage.markerpoint);
              if(markers.length != 0) markers[0].setMap(null);
                var chatid = {};
                chatid.start = scope.start;
                chatid.end = scope.destination;
                chatid.point = markerpoint;
                chatid.id = JSON.parse(scope.address).id;
                chatid.num = JSON.parse(scope.address).index;
                chatid.price = JSON.parse(scope.address).price;
                var content2= "<a ng-if='topindex' href='#/main/ordersuccess/"+JSON.stringify(chatid)+"'><div class = 'taiwan2'></div></a>";
              var marker = new AMap.Marker({
                content: content2,
                map:map,
                position:[markerpoint[0],markerpoint[1]],
                offset: new AMap.Pixel(-42.25,-83),
              })
              if(markers.length != 0) markers.splice(0,1,marker);
              else markers.push(marker)
            }else if(i == 1) {
              scope.topindex = false;
              scope.destination = "";
              if(markers.length != 0) markers[0].setMap(null);
              //根据坐标点来确定起点
              var markerpoint = JSON.parse(sessionStorage.markerpoint);
              var content= "<div class = 'taiwan'></div>";
              var marker = new AMap.Marker({
                content: content,
                map:map,
                position:[markerpoint[0],markerpoint[1]],
                offset: new AMap.Pixel(-42.25,-83),
              })
              if(markers.length != 0) markers.splice(0,1,marker);
              else markers.push(marker)
            }else if(i == 2) {
              scope.topindex = false;
              scope.destination = "";
              if(markers.length != 0) markers[0].setMap(null);
              //根据坐标点来确定起点
              var markerpoint = JSON.parse(sessionStorage.markerpoint);
              var content= "<div class = 'taiwan'></div>";
              var marker = new AMap.Marker({
                content: content,
                map:map,
                position:[markerpoint[0],markerpoint[1]],
                offset: new AMap.Pixel(-42.25,-83),
              })
              if(markers.length != 0) markers.splice(0,1,marker);
              else markers.push(marker)
            }
          }else {
            if(i == 0) {
              scope.topindex = false;
              scope.destination = '';
              if(markers.length != 0) markers[0].setMap(null);
              //根据坐标点来确定起点
              var markerpoint = JSON.parse(sessionStorage.markerpoint);
              var content= "<div class = 'taiwan'></div>";
              var marker = new AMap.Marker({
                content: content,
                map:map,
                position:[markerpoint[0],markerpoint[1]],
                offset: new AMap.Pixel(-42.25,-83),
              })
              if(markers.length != 0) markers.splice(0,1,marker);
              else markers.push(marker)
            }else if(i == 1) {
              scope.topindex = true;
              scope.destination = JSON.parse(scope.address).end;
              scope.price = sessionStorage.price2;
              if(markers.length != 0) markers[0].setMap(null);
              //根据坐标点来确定起点
              var markerpoint = JSON.parse(sessionStorage.markerpoint);
              var content2= "<div class = 'taiwan2'></div>";
              var marker = new AMap.Marker({
                content: content2,
                map:map,
                position:[markerpoint[0],markerpoint[1]],
                offset: new AMap.Pixel(-42.25,-83),
              })
              marker.on('click',function(){
                http(markerpoint)
              })
              if(markers.length != 0) markers.splice(0,1,marker);
              else markers.push(marker)

            }else if(i == 2) {
              scope.topindex = true;
              scope.price = sessionStorage.price;
              scope.destination = JSON.parse(scope.address).end;
              if(markers.length != 0) markers[0].setMap(null);
              //根据坐标点来确定起点
              var markerpoint = JSON.parse(sessionStorage.markerpoint);
              var content2= "<div class = 'taiwan2'></div>";
              var marker = new AMap.Marker({
                content: content2,
                map:map,
                position:[markerpoint[0],markerpoint[1]],
                offset: new AMap.Pixel(-42.25,-83),
              })
              marker.on('click',function(){
                http(markerpoint)
              })
              if(markers.length != 0) markers.splice(0,1,marker);
              else markers.push(marker)

            }
          }

        }
        sessionStorage.navindex = i;
        if(i == 0) {
          scope.show4 = scope.show3= scope.show2 =scope.show1_1 = true;
          scope.show4_1 = scope.show3_1 = scope.show2_1 = scope.show1 = false;
        }
        if(i == 1) {
          scope.show4 = scope.show3= scope.show2_1 =scope.show1 = true;
          scope.show4_1 = scope.show3_1 = scope.show2 = scope.show1_1 = false;
        }
        if(i == 2) {
          scope.show4 = scope.show3_1 = scope.show2 =scope.show1 = true;
          scope.show4_1 = scope.show3 = scope.show2_1 = scope.show1_1 = false;
        }
        if(i == 3) {
          alert('暂未开通')
          //scope.show4_1 = scope.show3= scope.show2 =scope.show1 = true;
         // scope.show4 = scope.show3_1 = scope.show2_1 = scope.show1_1 = false;
        }

      }
      if(scope.index) {
        scope.xuanze(scope.index)
      }else {
        scope.xuanze(0)
      }

      if(scope.address) {
        scope.start = JSON.parse(scope.address).start;
        scope.destination = JSON.parse(scope.address).end;
        scope.index = sessionStorage.navindex;
        if(scope.index ==0) scope.price = "车费$" + JSON.parse(scope.address).price;
        else if(scope.index ==1){
          var cishu = $interval(function(){
            if(scope.price) {
              $interval.cancel(cishu);
              return false;
            }
            scope.price = sessionStorage.price2;
          },300)
        }
        else if(scope.index ==2){
          var cishu2 = $interval(function(){
            if(scope.price) {
              $interval.cancel(cishu2);
              return false;
            }
            scope.price = sessionStorage.price;
          },300)
        }
        scope.topindex = true;
      }
      var positions = [[116.405467, 39.907761], [116.415467, 39.907761], [116.415467, 39.917761], [116.425467, 39.907761], [116.385467, 39.907761]];
      var map, geolocation;
      var  lnglatXY=[];

      var content= "<div class = 'taiwan'></div>";
      var content2= "<div class = 'taiwan2'></div>";
      var content1="<div class='qiche'></div>";
      //加载地图，调用浏览器定位服务
      map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:14,
      });
      //map.on('moveend', getCity);

      map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 150),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
      });
      //解析定位结果
      function onComplete(data) {
        if(marker) marker=null;
        getCity();
        var str=['定位成功'];
        lnglatXY[0] = data.position.getLng();
        lnglatXY[1] = data.position.getLat()
        $ionicLoading.hide();
        if(scope.address) {
          geocoder(JSON.parse(scope.address).start);

        }else {
          var marker = new AMap.Marker({
            content: content,
            map:map,
            position:[data.position.getLng(),data.position.getLat()],
            draggable:true,
            offset: new AMap.Pixel(-42.25,-83),
            raiseOnDrag:true
          })
        }
        if(!scope.address && markers.length>0) {
            markers[0].setMap(null);
            markers.splice(0,1,marker);
        }
        else markers.push(marker)

        AMap.event.addListener(marker,'dragend',function(e){
          lnglatXY[1] = e.lnglat.lat;
          lnglatXY[0] = e.lnglat.lng;
          regeocoder();
          getCity();
        })
        if(!scope.address) {
          regeocoder()
        }
      }
      for (var i = 0, marker; i < positions.length; i++) {
        marker = new AMap.Marker({
          content: content1,
          map: map,
          position: positions[i],
          offset: new AMap.Pixel(-12.25,-30),
        });
        markers.push(marker)
      }
      //解析定位错误信息
      function onError(data) {
        //document.getElementById('tip').innerHTML = '定位失败';
      }
      function geocoder(text) {
        //根据地址来确定起点
        //AMap.service('AMap.Geocoder',function(){//回调函数
        //  //实例化Geocoder
        //  geocoder = new AMap.Geocoder();
        //  //TODO: 使用geocoder 对象完成相关功能
        //  geocoder.getLocation(text, function(status, result) {
        //    if (status === 'complete' && result.info === 'OK') {
        //      //TODO:获得了有效经纬度，可以做一些展示工作
        //      //比如在获得的经纬度上打上一个Marker
        //      var marker = new AMap.Marker({
        //        content: content2,
        //        map:map,
        //        position:[result.geocodes[0].location.lng,result.geocodes[0].location.lat],
        //        offset: new AMap.Pixel(-42.25,-83),
        //      })
        //      markers[0].setMap(null);
        //      markers.splice(0,1,marker);
        //      marker.on('click',function(){
        //        alert('a')
        //      })
        //    }else{
        //      //获取经纬度失败
        //    }
        //  });
        //})
        //根据坐标点来确定起点
        var markerpoint = JSON.parse(sessionStorage.markerpoint);
        var i = sessionStorage.navindex;
        if(i == 0) {
          var chatid = {};
          chatid.start = scope.start;
          chatid.end = scope.destination;
          chatid.point = markerpoint;
          chatid.id = JSON.parse(scope.address).id;
          chatid.num = JSON.parse(scope.address).index;
          chatid.price = JSON.parse(scope.address).price;
          var content2= "<a ng-if='topindex' href='#/main/ordersuccess/"+JSON.stringify(chatid)+"'><div class = 'taiwan2'></div></a>";
        }else {
          var content2= "<div class = 'taiwan2'></div>"
        }
        var marker = new AMap.Marker({
                  content: content2,
                  map:map,
                  position:[markerpoint[0],markerpoint[1]],
                  offset: new AMap.Pixel(-42.25,-83),
                })
        if(i != 0) {
          marker.on('click',function(){
            http(markerpoint)
          })
        }
        markers[0].setMap(null);
        markers.splice(0,1,marker);
      }
      function regeocoder() {  //逆地理编码
        var geocoder = new AMap.Geocoder();
        sessionStorage.markerpoint = JSON.stringify(lnglatXY);
        geocoder.getAddress(lnglatXY, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            geocoder_CallBack(result);
          }
        });
      }
      function http(point){

        if(!scope.topindex) {
          return false;
        }

        var i = sessionStorage.navindex;
          if(i == 1) var type = 'k';
          else if(i == 2) var type='z';
          $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=order&event=createorder',{
              start: encodeURIComponent(scope.start),
              end:encodeURIComponent(scope.destination),
              token:JSON.parse(sessionStorage.user).token,
              type:type,
              point: point,
              endpoint : endpoint
            })
            .success(function(data){
              if(data.status == 0) {
                scope.pagetitle = '司机正在来接您的路上...'
              }
            })


      }
      function geocoder_CallBack(data) {
        var address = data.regeocode.formattedAddress; //返回地址描述
        document.getElementById('start').value = address;
        scope.start = address;
        sessionStorage.start = address;
      }

      function getCity() {
        map.getCity(function(data) {
          if (data['province'] && typeof data['province'] === 'string') {
            sessionStorage.position = data.district;
            //document.getElementById('info').innerHTML = '城市：' + (data['city'] || data['province']);
          }
        });
      }
      scope.myloading = function(){
        //$ionicLoading.show({
        //  template: 'Loading...'
        //});
      }

    }
  }
})
  .directive('listBox',function(){
    return {
      restrict: 'E',
      scope: {
        iteam: '=',
        addend:'=',
        bool:'=',
        id:'=',
        bool2:'='
      },
      templateUrl:'templates/tplList.html',
      link:function(scope,e,attr) {
        scope.huan = function(text){
          scope.addend = text.parint_target +' '+ text.target;
          scope.bool2 = false;
          scope.bool = false;
          scope.id = text.id;
          setTimeout(function(){
            scope.bool = true;
          },1000)
        }
      }
    }
  })
.directive('mapInput',function(){
  return {
    restrict: 'E',
    scope: {
      end:'='
    },
    template:'<input type="text" id="tipinput" ng-model="end">',
    link:function(scope, e,attr) {

      //输入提示
      var autoOptions = {
        input: "tipinput"
      };
      var auto = new AMap.Autocomplete(autoOptions);
      //注册监听，当选中某条记录时会触发
      AMap.event.addListener(auto, 'select', select)
      function select(e) {
        sessionStorage.select = e.poi.name;
      }
    }
  }
})
