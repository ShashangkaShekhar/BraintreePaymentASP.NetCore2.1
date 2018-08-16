
templatingApp.controller('PaymentController', ['$scope', '$http', function ($scope, $http) {
    $scope.title = "Braintree Payment";
    $scope.paymentresult = null;
    $scope.cartmodel = {
        FirstName: "Shashangka",
        LastName: "LastName",
        Email: "shashangka@gmail.com",
        Street: "Bejpara, Jessore",
        Price: 50
    };

    //Generate Token PaymentGateway
    PaymentGateway();
    function PaymentGateway() {

        $http({
            method: 'GET',
            url: '/api/Payments/GenerateToken'
        }).then(function successCallback(response) {
            //console.log(response.data);
            var client_token = response.data;

            //Generate View
            braintree.dropin.create({
                authorization: client_token,
                container: '#dropin',
                card: {
                    overrides: {
                        styles: {
                            input: {
                                color: 'blue',
                                'font-size': '18px'
                            },
                            '.number': {
                                'font-family': 'monospace'
                            },
                            '.invalid': {
                                color: 'red'
                            }
                        },
                        fields: {
                            number: {
                                //placeholder: 'Card Number',
                                formatInput: true // Turn off automatic formatting
                            }
                        }
                    }
                }

            }, function (createErr, instance) {
                //Checkout Submit
                document.getElementById("checkout").addEventListener('click', function () {
                    //event.preventDefault();
                    instance.requestPaymentMethod(function (err, payload) {
                        if (err) {
                            console.log('Error', err);
                            return;
                        }
                        //Token Braintree
                        $scope.cartmodel.PaymentMethodNonce = payload.nonce;
                        $scope.checkOut();
                    });
                });
            });

        }, function errorCallback(response) {
            console.log(response);
        });
    };

    //CheckOut
    $scope.checkOut = function () {
        console.log($scope.cartmodel);
        $http({
            method: 'POST',
            url: '/api/Payments/Checkout',
            data: $scope.cartmodel
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.paymentresult = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    };

}]);
