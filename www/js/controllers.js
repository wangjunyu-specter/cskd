angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('login',function($scope,$location,$http,$ionicPopup,locals) {
  $scope.user = {};
  $scope.airplaneMode = true;
  $scope.submit = function() {
    $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=customer_user&event=login',{user:$scope.user})
      .success(function(data){
        if(data.status == 0) {
          locals.set('name',$scope.user.name)
          if($scope.airplaneMode) {
            locals.set('pwd',$scope.user.pwd)
          }
          sessionStorage.user = JSON.stringify(data.user);
          $location.path('/main/content/');
        }else {
          $scope.showAlert(data.result);
        }
      })
      .error(function(data){
        $scope.showAlert(data);
      })
  }
  $scope.showAlert = function(text) {
    var alertPopup = $ionicPopup.alert({
      title: '提示',
      template: text
    });
    alertPopup.then(function(res) {
     return false;
    });
  };
})
  .controller('register',function($scope,$http,$location,$ionicPopup) {
    $scope.user = {};
    $scope.bool = false;
    $scope.fsdx = function() {
      $http.get('')
        .success(function(res) {
          $scope.duanxin = res;
        })
    }
    $scope.$watch('user.dx',function(newVal) {
      if(newVal) {
        $scope.bool = false;
      }
    })
    $scope.enroll = function() {
      //短信验证
      //if (user.dx != $scope.duanxin) {
      //  $scope.bool = true;
      //  return false;
      //}
      $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=customer_user&event=register ',{user:$scope.user})
        .success(function(data) {
          $scope.showAlert(data.result);
        })
        .error(function(data){
          $scope.showAlert(data)
        })
    }
    $scope.showAlert = function(text) {
      var alertPopup = $ionicPopup.alert({
        title: '提示',
        template: text
      });
      alertPopup.then(function(res) {
        if(text == '注册成功') $location.path('/login')
        else return false;
      });
    };
  })
  .controller('forget',function($scope) {
    //$scope.
  })
  .controller('main',function($scope,$http,$location,locals) {
    if(sessionStorage.user) {
      $scope.user = JSON.parse(sessionStorage.user);
    }else {
      $scope.user = {};
      $scope.user.name = locals.get('name','');
      $scope.user.pwd = locals.get('pwd','')
      $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=customer_user&event=login',{user:$scope.user})
        .success(function(res){
          if(res.status == 0) {
            sessionStorage.user = JSON.stringify(res.user);
            $scope.data = res.user;
          }
        })
      //$scope.user = {};
    }

  })
  .controller('content',function($scope,$ionicSideMenuDelegate,$location,$stateParams,$ionicLoading){
    $scope.index = {}
    $ionicLoading.show({
      template: 'Loading...'
    });
    $scope.pagetitle = "城市快道"
    $scope.index.num = '1'
    $scope.toggleLeftSideMenu = function() {
      $ionicSideMenuDelegate.toggleRight();
    };
    $scope.address =$stateParams.chatId || '';
    if($scope.address) {
      $scope.start = JSON.parse($scope.address).start;
      $scope.destination = JSON.parse($scope.address).end;
      $scope.num= sessionStorage.navindex;
      if($scope.num != 0 ) {
        $scope.priceall = JSON.parse($scope.address).priceall;
        $scope.qibu_price = $scope.priceall[0].start_price;
        $scope.gongli_price = $scope.priceall[0].long_price;
        $scope.time_price = $scope.priceall[0].time_price;
        $scope.qibu2_price = $scope.priceall[1].start_price;
        $scope.gongli2_price = $scope.priceall[1].long_price;
        $scope.time2_price = $scope.priceall[1].time_price;
        AMap.service(["AMap.Driving"], function() {
          var map = new AMap.Driving()
          map.search([
            {keyword: $scope.start},
            {keyword: $scope.destination}
          ],function(status,result){
            $scope.time = result.routes[0].time / 60;
            $scope.gongli = result.routes[0].distance / 1000;
            $scope.zongjia = $scope.time * $scope.time_price + $scope.gongli_price * $scope.gongli;
            $scope.price = $scope.zongjia > $scope.qibu_price ? $scope.zongjia : $scope.qibu_price;
            sessionStorage.price = $scope.price;
            $scope.zongjia2 = $scope.time * $scope.time2_price + $scope.gongli2_price * $scope.gongli;
            $scope.price2 = $scope.zongjia2 > $scope.qibu2_price ? $scope.zongjia2 : $scope.qibu2_price;
            sessionStorage.price2 = $scope.price2;
          });
        });
      }
    }

    $scope.myhttp = function(data){
      $location.path('/main/ordersuccess/' + data);
    }

  })
  .controller('shuru',function($scope,$stateParams,$location,$http,$ionicPopup,$ionicLoading) {

    $scope.address = {}
    $scope.bool = true;
    $scope.bool2 = true;
    $scope.token = sessionStorage.user;
    $scope.address.index = '1人'
    $scope.index = sessionStorage.navindex;
    $scope.address.start = sessionStorage.start;
    $scope.goBack = function() {
      history.go(-1)
    };
    $scope.token = JSON.parse(sessionStorage.user).token;
    $scope.position = sessionStorage.position;
    if($scope.index == 0) {
      $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=order&event=scanorder',{
          'start': encodeURIComponent($scope.address.start),
          'token': $scope.token,
          'position': encodeURIComponent($scope.position)
        })
        .success(function(data){
          if(data.status == 0) $scope.result = data.result;
          else $scope.showAlert(data.result);

        })
    }

    $scope.arr = [];
    $scope.$watch('address.end',function(newVal) {
        $scope.bool = true;
        if($scope.arr) {
          $scope.arr.length = 0;
        }
        for (var i = 0; i < $scope.result.length; i++) {
          if ($scope.result[i].target.indexOf(newVal) > -1 || $scope.result[i].parint_target.indexOf(newVal) > -1 ) {
            $scope.arr.push($scope.result[i])
          }
        }
        if($scope.arr.length == 0) {
          $scope.arr =[{target:'暂未开通此路线'}]
        }

    })

    $scope.submit = function() {

      if($scope.address.start.length == 0) {
        return false;
      }
      $ionicLoading.show({
        template: 'Loading...'
      });
      //if($scope.index == 0 && bool2) {
      //  return false;
      //}
      if($scope.index != 0) {
        $scope.address.end = sessionStorage.select;
      }
      if($scope.address.end.length == 0) {
        return false;
      }

      if($scope.index == 0) {
        $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=order&event=scanline',{
          'id':$scope.address.id,
          'token': $scope.token,
        })
          .success(function(data){
            if(data.status == 0) {
              //120.26.110.106
              if(data.result.new_price) $scope.address.price = data.result.new_price;
              else $scope.address.price = data.result.price;
            }else {
              $scope.showAlert(data.result)
            }
            $location.path('/main/content/'+JSON.stringify($scope.address))
          })
      }else{
        $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=order&event=scanline_z_k',{
            'token': $scope.token,
        })
          .success(function(data){
            if(data.status == 0) {
              $scope.address.priceall = data.result;
            }else {
              $scope.showAlert(data.result)
            }
            $location.path('/main/content/'+JSON.stringify($scope.address))
          })
      }
    }
    $scope.showAlert = function(text) {
      var alertPopup = $ionicPopup.alert({
        title: '提示',
        template: text
      });
      alertPopup.then(function(res) {
      });
    };
  })
.controller('ordersuccess',function($scope,$http,$stateParams,$location,$ionicPopup,$interval){
  $scope.data = JSON.parse($stateParams.chatId) || {};
  $scope.title = '3';
  $scope.ordernum = '0';
  $scope.bool = true;
  $scope.token = JSON.parse(sessionStorage.user).token;
  $scope.data.start1 = encodeURIComponent($scope.data.start);
  $scope.data.end1 = encodeURIComponent($scope.data.end);
  $scope.data.endpoint = JSON.parse(sessionStorage.endpoint);
  $scope.submit = function() {

    $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=order&event=createorder',{
      user: $scope.data,
      token:$scope.token,
      type:'p'
    })
      .success(function(data){
        if(data.status == 0) {
          $scope.bool = false;
          myhttp();
        }else {
          $scope.showAlert(data.result)
        }
      })
      .error(function(data) {
        $scope.showAlert(data)
      })
  }
  function myhttp(){
    $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=order&event=scanPO',{
      token:$scope.token
    })
      .success(function(data) {
        if(data.status == 0) {
          $scope.ordernum = data.result;
          $scope.title = 3 - $scope.ordernum;
          if($scope.title == 0) {
            $interval.cance(set)
          }
        }
      })
    var set = $interval(myhttp,3000)
  }
  $scope.showAlert = function(text) {
    var alertPopup = $ionicPopup.alert({
      title: '提示',
      template: text
    });
    alertPopup.then(function(res) {
      $scope.bool = true;
    });
  };
  $scope.cancel = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: '提示',
      template: '确定取消订单?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.bool =true;
        sessionStorage.address = '';
        sessionStorage.navindex = '';
        $location.path('/main/content/');
      } else {
        console.log('You are not sure');
      }
    })
  }
})
  .controller('end',function($scope,$stateParams){
    $scope.user=JSON.parse($stateParams.chatId);
    $scope.tousu = function () {

    }
  })
.controller('history',function($scope,$http){

})
.controller('modify',function($scope,$http,$location){
  $scope.user = {};
  $scope.token = JSON.parse(sessionStorage.user).token;
  $scope.subyzm = function(){
    $http.post('http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=order&event=yzm',{
      tel: $scope.tel,
      token: $scope.token,
    })
      .success(function(data) {
        if(data.status == 0) {
          $scope.resyzm = data.result;
        }
      })
  }
  $scope.submit = function(){
    $http.post("http://cskd.eltcn.cn/app/index.php?i=5&c=home&a=order&event=yzm",{
      user:$scope.user,
      token: $scope.token
    })
      .success(function(data){
        if(data.status == 0) {
          $scope.showAlert("注册成功");
        }else {
          $scope.showAlert(data.result);
        }
      })
  }
  $scope.showAlert = function(text) {
    var alertPopup = $ionicPopup.alert({
      title: '提示',
      template: text
    });
    alertPopup.then(function(res) {
      if(res == '注册成功'){
        locals.set('name',$scope.user.name);
        sessionStorage.user = JSON.stringify(data.user);
        $location.path('/main/content/');
      }else {
        return false;
      }
    });
  };
})
