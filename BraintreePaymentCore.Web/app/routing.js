templatingApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$compileProvider',
    function ($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $compileProvider) {

        //console.log('Appt.Main is now running')
        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            }).hashPrefix('!');
        };
        $urlMatcherFactoryProvider.strictMode(false);
        $compileProvider.debugInfoEnabled(false);

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './views/home/home.html',
                controller: 'HomeController'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: './views/home/home.html',
                controller: 'HomeController'
            })
            .state('user', {
                url: '/user',
                templateUrl: './views/user/user.html',
                controller: 'UserController'
            })
            .state('about', {
                url: '/about',
                templateUrl: './views/about/about.html',
                controller: 'AboutController'
            })
            .state('payment', {
                url: '/payment',
                templateUrl: './views/payment/payment.html',
                controller: 'PaymentController'
            });

        $urlRouterProvider.otherwise('/home');
    }]); 
