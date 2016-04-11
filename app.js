// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
222222222
11111111111111111111
33333333333
44444444
55555555
c3c3
c4c4
c3c3
c4c4
a1a1
a2a2

77777
第一次stash
var widoApp = angular.module('widoApp', [
    'ionic', 'ngCordova', 'pascalprecht.translate', 'ngFileUpload'
]);

widoAppc5c5c5c5a3
    .run(function($ionicPlatform) {
        $ionicPlatform
            .ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins
                        .Keyboard
                        .hideKeyboardAccessoryBar(true);
                    cordova.plugins
                        .Keyboard
                        .disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
    });
widoApp.config(function($translateProvider) {
    $translateProvider.registerAvailableLanguageKeys(['enUS', 'zhCN', 'zhTW'], {
        'en-*': 'enUS',
        'zh-CN*': 'zhCN',
        'zh-TW*': 'zhTW'
    });

    $translateProvider.uniformLanguageTag('bcp47').determinePreferredLanguage();
    //$translateProvider.preferredLanguage('zhTW');
});

widoApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    //配置Office365的Adal验证   'AdalAngular' adalAuthenticationService
    if (localStorage.o365token)
        console.debug('o365 token found ', localStorage.o365token);

    // Before application starts up, check href string  if it contains OAuth callback token and store it into localStorage
    try {
        var qs = String(window.location.href).match(/\?id_token\=[^&#]+/);
        if (qs === null)
            console.debug('no URI encoded auth token found.');
        else {
            localStorage.setItem('o365token', qs[0].replace('?id_token=', ''));
            console.debug('o365 token successfully created', localStorage.o365token);
        }
    } catch (err) {
        console.error(err);
    }

    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        //dashboard
        .state('app.dashboard', {
            url: '/dashboard',
            views: {
                'menuContent': {
                    templateUrl: 'templates/office/dashboard.html',
                }
            }
        })
        //office專區
        .state('app.office', {
            url: '/office',
            views: {
                'menuContent': {
                    templateUrl: 'templates/office/home-office.html',
                    controller: 'officeCtrl'
                }
            }
        })
        //联系人
        .state('app.contact', {
            url: '/contact',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contact/home-contact.html',
                    controller: 'contactCtrl'
                }
            }
        })
        .state('app.sendemail', {
            url: '/sendemail?address',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contact/send-mail.html',
                    controller: 'emailCtrl'
                }
            }
        })
        .state('app.contactdetail', {
            url: '/contactdetail?contactid',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contact/contact-detail.html',
                    controller: 'contactdetailCtrl'
                }
            }
        })
        //档案
        .state('app.archives', {
            url: '/archives',
            views: {
                'menuContent': {
                    templateUrl: 'templates/archives/home-archives.html',
                    controller: 'archivesCtrl'
                }
            }
        })
        .state('app.archives-project', {
            url: '/archives-project',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/archives/archives-project.html',
                    controller: 'archivesProjectCtrl'
                }
            }
        })
        .state('app.archives-workpackage', {
            url: '/archives-workpackage?projectId&projectGroupObjectId',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/archives/archives-workpackage.html',
                    controller: 'archivesWorkPackageCtrl'
                }
            }
        })
        .state('app.archives-task', {
            url: '/archives-task?workPackageId&workPckGroupObjectId&workPackageName',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/archives/archives-task.html',
                    controller: 'archivesTaskCtrl'
                }
            }
        })
        //行事历
        .state('app.calen', {
            url: '/calen',
            views: {
                'menuContent': {
                    templateUrl: 'templates/calen/home-calen.html',
                    controller: 'calenCtrl'
                }
            }
        })
        //邮件
        //.state('app.email', {
        //    url: '/email',
        //    views: {
        //        'menuContent': {
        //            templateUrl: 'templates/email/home-email.html',
        //            controller: 'emailHomeCtrl'
        //        }
        //    }
        //})
        //我的任务
        .state('app.mytask', {
            url: '/mytask/:random',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/home-mytask.html',
                    controller: 'mytaskCtrl'
                }
            }
        })
        // begin   add _xj
        .state('app.addProject', {
            url: '/addProject/:projectID/:random',
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/project/addProject.html',
                    controller: 'projectControl'
                }
            }
        })
        .state('app.addProjectColor', {
            url: '/addProjectColor',
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/project/selectProjectColor.html',
                    controller: 'setProjectColor'
                }
            }
        })
        .state('app.projectList', {
            url: '/projectList?workPackageID&projectId',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/project/projectList.html',
                    controller: 'workPackageControl'
                }
            }
        })
        .state('app.addWorkPackage', {
            url: '/addWorkPackage?addWorkPackageId&projectId&random',
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/project/addWorkPackage.html',
                    controller: 'workPackageControl'

                }
            }
        })

    .state('app.addWorkPackageColor', {
        url: '/addWorkPackageColor',
        views: {
            'menuContent': {
                templateUrl: 'templates/mytask/project/selectProjectColor.html',
                controller: 'setProjectColor'
            }
        }
    })


    .state('app.checklist', {
        cache: false,
        url: '/checklist/:taskId/:workPackageId',
        views: {
            'menuContent': {
                templateUrl: 'templates/mytask/checklist/checkListInfo.html',
                controller: 'checkListControl'
            }
        }
    })

    .state('app.addTaskMember', {
        url: '/addTaskMember?typeId&memberType&faterId&workPackageId&projectId&taskId',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/mytask/taskMember/addNewTaskMember.html',
                controller: 'taskMemberControl'
            }
        }

    })

    .state('app.editTaskMember', {
        url: '/editTaskMember?typeId&memberType&faterId&title',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/mytask/taskMember/editTaskMember.html',
                controller: 'removeMemberControl'
            }
        }

    })

    .state('app.showTaskMember', {
        url: '/showTaskMember?typeId&memberType&faterId&title',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/mytask/taskMember/showTaskMember.html',
                controller: 'showTaskMemberControl'
            }
        }

    })

    //end

    //企业公告栏
    .state('app.notices', {
            url: '/notices',
            views: {
                'menuContent': {
                    templateUrl: 'templates/notices/home-notices.html',
                    controller: 'noticesCtrl'
                }
            }
        })
        .state('app.noticesDetail', {
            url: '/noticesDetail/:groupId/:convId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/notices/notice-detail.html',
                    controller: 'noticeDetailController'
                }
            }
        })
        //问卷调查
        .state('app.questionnaire', {
            url: '/questionnaire',
            views: {
                'menuContent': {
                    templateUrl: 'templates/questionnaire/home-questionnaire.html',
                    controller: 'questionnaireCtrl'
                }
            }
        })

    //设定
    .state('app.setting', {
            url: '/setting',
            views: {
                'menuContent': {
                    templateUrl: 'templates/setting/home-setting.html',
                    controller: 'AppCtrl'
                }
            }
        })
        //投票
        .state('app.vote', {
            url: '/vote',
            views: {
                'menuContent': {
                    templateUrl: 'templates/vote/home-vote.html',
                    controller: 'voteCtrl'
                }
            }
        })
        //任务详情
        .state('app.taskdetail', {
            url: '/taskdetail?taskId&workPackageId&projectId',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/task-detail.html',
                    controller: 'taskdetailCtrl'
                }
            }
        })
        //标签
        .state('app.label', {
            url: '/label?taskId&workPackageId&projectId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/label.html',
                    controller: 'labelCtrl'
                }
            }
        })
        //附件
        .state('app.attachments', {
            url: '/attachments?taskId&workPackageId&projectId',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/attachments-list.html',
                    controller: 'attachmentsCtrl'
                }
            }
        })
        .state('app.addAttachment', {
            url: '/addAttachment?taskId&workPackageId&projectId',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/attachments-add.html',
                    controller: 'addAttachmentCtrl'
                }
            }
        })
        //链接
        .state('app.links', {
            url: '/links?taskId&type&createby&linkid&linkurl&linkdisplayname&workPackageId&projectId',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/links.html',
                    controller: 'linksCtrl'
                }
            }
        })
        //newtask
        .state('app.newtask', {
            url: '/newtask?workPackageId&projectId&type',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/newtask.html',
                    controller: 'newtaskCtrl'
                }
            }
        })
        //Linklist
        .state('app.linklist', {
            url: '/linklist?taskId&workPackageId&projectId',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/linklist.html',
                    controller: 'linklistCtrl'
                }
            }
        })
        //编辑link
        .state('app.editlink', {
            url: '/editlink',
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/editlink.html',
                    controller: 'editlinkCtrl'
                }
            }
        })
        .state('app.allworkpackage', {
            url: '/allworkpackage?workPackageId&projectId&taskId',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/allworkpackage.html',
                    controller: 'allworkpackageCtrl'
                }
            }
        })
        .state('app.updateTaskMember', {
            url: '/updateTaskMember?workPackageId&projectId&taskId',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/updateTaskMember.html',
                    controller: 'updateTaskMemberCtrl'
                }
            }
        })
        .state('app.taskCheckIn', {
            url: '/taskCheckIn?projectId&workPackageId&taskId&actiontype',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/taskCheckIn/taskCheckIn.html',
                    controller: 'taskCheckInCtrl'
                }
            }
        })
        .state('app.taskCheckInHistory', {
            url: '/taskCheckInHistory?projectId&workPackageId&taskId',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'templates/mytask/taskCheckIn/taskCheckInHistory.html',
                    controller: 'taskCheckInHistoryCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/contact');
});

widoApp.config(function() {
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function(prefix) {
            return this.slice(0, prefix.length) === prefix;
        };
    }
    if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
});

var _O365Auth = new O365Auth();

var resourceUrl = _O365Auth.config.resourceUrl;
var officeEndpointUrl = _O365Auth.config.officeEndpointUrl;
var appId = _O365Auth.config.clientId;
var authUrl = _O365Auth.config.authUri;
var redirectUrl = _O365Auth.config.redirectUri;

var AuthenticationContext;
var authContext;

//home
widoApp.config(function($httpProvider) {
    if ($httpProvider && $httpProvider.interceptors) {
        $httpProvider.interceptors
            .push('ProtectedResourceInterceptor');
    }
});
// Interceptor for http if needed
widoApp.factory('ProtectedResourceInterceptor', [
    '$q', '$rootScope',
    function($q, $rootScope) {
        return {
            request: function(config) {
                if (config) {
                    var resource = _O365Auth.getResourceForEndpoint(config.url);
                    //非Office365请求
                    if (resource == _O365Auth.config.loginResource) {
                        return config;
                    }
                    var tokenStored = _O365Auth.getCachedToken(resource);
                    if (tokenStored) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + tokenStored;
                    } else {
                        try {
                            // Cancel request if login is starting
                            if (_O365Auth._loginInProgress) {
                                return $q.reject();
                            } else {
                                _O365Auth._loginInProgress = true;
                                // external endpoints
                                // delayed request to return after iframe completes
                                var delayedRequest = $q.defer();
                                authContext.acquireTokenSilentAsync(resource, appId)
                                    .then(function(res) {
                                        _O365Auth._loginInProgress = false;
                                        _O365Auth._saveItem(_O365Auth.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource, res.accessToken);
                                        _O365Auth._saveItem(_O365Auth.CONSTANTS.STORAGE.EXPIRATION_KEY + resource, res.userInfo.passwordExpiresOn || 0);

                                        config.headers = config.headers || {};
                                        config.headers.Authorization = 'Bearer ' + res.accessToken;
                                        delayedRequest.resolve(config);
                                    }, function(err) {
                                        _O365Auth._loginInProgress = false;
                                        delayedRequest.reject(err);
                                    });
                                return delayedRequest.promise;
                            }

                        } catch (e) {
                            _O365Auth._loginInProgress = false;
                        }
                    }
                }
                return config;
            },
            responseError: function(rejection) {
                return $q.reject(rejection);
            }
        };
    }
]);

widoApp.controller('loginCtrl', function($scope, $state, $log) {});

widoApp.controller('AppCtrl', function($scope, $ionicPopup, $ionicModal, $rootScope, $state, $log, $cordovaInAppBrowser, $ionicLoading, archivesFactory, $cordovaAppVersion, MyInfoPO) {
    if (localStorage.getItem("IsTeached")) {
        $scope.firstEnter = false;
    } else {
        $scope.firstEnter = true;
    }
    $scope.teaching = true;
    $scope.home = false;
    // For browser development, skip tutorial
    if (ionic.Platform.isDebugMode) {
        $log.debug('No mobile platform information found', 'use debug setting');
        localStorage.setItem('IsTeached', true);
        $state.go('app.dashboard');
    }

    $scope.goMytask = function() {
        $state.go("app.mytask", {
            "random": Math.random()
        });
    }

    $scope.tipbox = function(tipcontent) {
        var alertPopup = $ionicPopup.alert({
            template: tipcontent
        });
    };

    $scope.loadingShow = function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
    }

    $scope.loadingHide = function() {
        $ionicLoading.hide();
    }

    //登陆后跳转
    function responseCallback(res) {
        var currentPlatform = ionic.Platform.platform();
        // alert(ionic.Platform.isIPad());
        // alert(currentPlatform);
        switch (currentPlatform) {
            case 'android':
                //android
                $scope.platforms = 2;
                break;
            case 'ios':
                if (ionic.Platform.isIPad()) {
                    //ipad
                    $scope.platforms = 3;
                } else {
                    //iphone
                    $scope.platforms = 1;
                };
                break;
            case 'windowsphone':
                //WindowsPhone
                $scope.platforms = 4;
                break;
        };
        // alert($scope.platforms);
        //得到当前运行程序的版本号
        $cordovaAppVersion.getVersionNumber().then(function(version) {
            //版本号
            $scope.appversion = version;

        });
        // alert(JSON.stringify(res));
        _O365Auth._saveItem(_O365Auth.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resourceUrl, res.accessToken);
        //expireson的时间
        _O365Auth._saveItem(_O365Auth.CONSTANTS.STORAGE.EXPIRATION_KEY + resourceUrl, res.userInfo.passwordExpiresOn || 0);
        _O365Auth._saveItem(_O365Auth.CONSTANTS.STORAGE.USER_ID, res.userInfo.userId);
        //获取用户信息
        archivesFactory.getUserInfoOfMe()
            .then(function(res1) {

                _O365Auth._saveItem(_O365Auth.CONSTANTS.STORAGE.DISPLAYABLE_ID, res1.data.displayName);
                $scope.username = res1.data.displayName;
                //登陆后台，调用addAPPUser接口
                archivesFactory.addAppUser($scope.platforms, res.userInfo.userId, $scope.username, res.userInfo.uniqueId, $scope.appversion)
                    .then(function(res2) {
                        //保存tenant_id
                        _O365Auth._saveItem(_O365Auth.CONSTANTS.STORAGE.TENANT_ID, res2.data.tenantId);
                        _O365Auth._saveItem(_O365Auth.CONSTANTS.STORAGE.APPUSER_ID, res2.data.data);
                        //跳转页面
                        if (res2.data.isOverDue == 1) {
                            $scope.loadingHide();
                            $scope.tipbox("你所安裝的測試版已過期！");
                        } else {
                            $scope.teaching = false;
                            $scope.home = true;
                            MyInfoPO.setInfo(res2);
                            $state.go("app.dashboard");
                            $scope.loadingHide();
                        };
                    }, function(err) {
                        $scope.loadingHide();
                        alert("無法連接伺服器");
                    });
            }, function(err) {
                $scope.loadingHide();
                alert("登陸失敗");
            });
    }

    $scope.enter = function() {
        _O365Auth._loginInProgress = false;
        $scope.loadingShow();
        //設置關閉教程
        localStorage.setItem("IsTeached", "true");
        // for ionic serve debug
        try {
            Microsoft === undefined;
        } catch (err) {
            console.debug('ADAL authentication module not found, skip login and use mock token.');
            $scope.teaching = false;
            $scope.home = true;
            $state.go("app.dashboard");
            $scope.loadingHide();
            return;
        }

        try {
            AuthenticationContext = Microsoft.ADAL.AuthenticationContext;
            authContext = new AuthenticationContext(authUrl);
            //如果有ACCESS_TOKEN，刷新token
            if (_O365Auth._getItem(_O365Auth.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resourceUrl)) {
                authContext
                    .acquireTokenSilentAsync(resourceUrl, appId)
                    .then(responseCallback, function() {
                        // We require user credentials so triggers authentication dialog
                        authContext
                            .acquireTokenAsync(resourceUrl, appId, redirectUrl)
                            .then(responseCallback, function(err) {
                                $scope.loadingHide();
                            });
                    });
            } else {
                authContext
                    .acquireTokenAsync(resourceUrl, appId, redirectUrl)
                    .then(responseCallback, function(err) {
                        $scope.loadingHide();
                    });
            }
        } catch (e) {
            $scope.loadingHide();
            alert(JSON.stringify(e.message));
        }
    };

    $scope.register = function() {
        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'yes'
        };
        $cordovaInAppBrowser.open("http://www.chinabyte.com/w/h/edm/201309026_microsoft/reg/reg.shtml", '_blank', options)
            .then(function(event) {
                // success
            })
            .catch(function(event) {
                // error
            });
    }

    $scope.logout = function() {
        _O365Auth.clearCache();
        localStorage.setItem("IsTeached", "true");
        $scope.teaching = false;
        $scope.home = true;
        window.location.reload();
    }

    $ionicModal.fromTemplateUrl("templates/login/serviceView.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modal1 = modal;
    });

    $ionicModal.fromTemplateUrl("templates/login/privacyView.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modal2 = modal;
    });

    $scope.view_service = function() {
        $scope.modal1.show();
    }

    $scope.closeService = function() {
        $scope.modal1.hide();
    }

    $scope.view_privacy = function() {
        $scope.modal2.show();
    }

    $scope.closePrivacy = function() {
        $scope.modal2.hide();
    }
});


function showErr(errorInfo, except) {
    if (errorInfo) {
        alert(errorInfo, except);
    }
}
