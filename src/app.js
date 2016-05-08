angular.module('OneApp', ['ngMaterial', 'ngAnimate', 'ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('form', {
                url: '/form',
                templateUrl: 'invite/form.html',
                controller: 'formController'
            })
            .state('form.roomType', {
                url: '/roomType',
                templateUrl: 'invite/formRoomType.html'
            })
            .state('form.reciever', {
                url: '/reciever',
                templateUrl: 'invite/formRecievers.html'
            })
            .state('form.complete', {
                url: '/complete',
                templateUrl: 'invite/formComplete.html',
                controller: function($scope, $rootScope){
                    console.log("$rootScope.appId",$rootScope.appId)
                    gapi.hangout.render('one-button', {
                        'render': 'createhangout',
                        'initial_apps': [{
                            'app_id' : $rootScope.appId,
                            'start_data' : 'dQw4w9WgXcQ',
                            'app_type' : $scope.formData.roomType
                        }],
                        'widget_size': 175,
                        'invites': $scope.formData.recieverList,
                        'hangout_type': 'normal'
                    });
                }
            });

        $urlRouterProvider.otherwise('/form/roomType');
    })

    .controller('formController', function($scope, $state,$window) {
        $scope.roomTypeList = [
            {label:"Room", value:"ROOM_APP"},
            {label:"One On One", value:"LOCAL_APP"},
        ];

            $scope.formData = {
            "recieverList":[]
        };
        $scope.processForm = function() {
            alert('processForm!');
        };
        $scope.addInvite = function(recieverEmail) {
            $scope.formData.recieverList.push({id: recieverEmail, invite_type : 'EMAIL'})
        };
        $scope.resetApp = function(){
            $state.go('form.roomType')
        }
        $scope.nextStep = function () {
           var currentState = $state.current.name;
            switch (currentState){
                case "form.roomType":
                    $state.go('form.reciever');
                    break;
                case "form.reciever":
                    $state.go('form.complete');
                    break;
                default:
                    $state.go('form.roomType');
                    break;
            }
        }


    });


