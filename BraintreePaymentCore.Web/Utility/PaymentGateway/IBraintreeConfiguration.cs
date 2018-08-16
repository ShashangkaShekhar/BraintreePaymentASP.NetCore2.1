using Braintree;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BraintreePaymentCore.Web.Utility.PaymentGateway
{
    public interface IBraintreeConfiguration
    {
        IBraintreeGateway CreateGateway();
        IBraintreeGateway GetGateway();
    }
}