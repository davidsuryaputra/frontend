//frontend routing
rentalkika.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'pages/main.html',	
		title: "Home"
	})
	.when('/contact', {
		templateUrl : 'pages/contact.html',
		controller : 'ContactController',
		title: "Hubungi Kami"
	})
	.when('/register', {
		templateUrl : 'pages/register.html',
		controller: 'RegisterController',
		title: "Register Member"
	})
	.when('/register_partner', {
		templateUrl : 'pages/register_partner.html',
		controller: 'RegisterPartnerController',
		title: "Register Partner"
	})
	.when('/dashboard', {
		templateUrl : 'pages/backend/dashboard.html'
		//controller : 'DashboardController'
	})
	//order sewa mobil
	.when('/sewa_mobil', {
		templateUrl : 'pages/sewa_mobil.html',
		controller : 'FilterController',
		title: "Sewa Mobil"	
	})
	.when('/order_sewa_mobil/:license_plate', {
		templateUrl: 'pages/order_sewa_mobil.html',
		controller : 'OrderSewaMobilController',
		title: "Atur order anda"	
	})
	.otherwise({redirectTo : '/'});
	
});

//backend routing
rentalkika.config(function ($routeProvider) {
	$routeProvider
	.when('/admin/login', {
		title: "Admin Page",
		template: "haloxxx"
	});
});