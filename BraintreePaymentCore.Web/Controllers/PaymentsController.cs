using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Braintree;
using BraintreePaymentCore.Web.Utility.PaymentGateway;
using BraintreePaymentCore.Web.Models;

namespace BraintreePaymentCore.Web.Controllers
{
    [ApiController, Route("api/[controller]"), Produces("application/json")]
    public class PaymentsController : ControllerBase
    {
        public IBraintreeConfiguration config = new BraintreeConfiguration();

        public static readonly TransactionStatus[] transactionSuccessStatuses =
            {
                TransactionStatus.AUTHORIZED,
                TransactionStatus.AUTHORIZING,
                TransactionStatus.SETTLED,
                TransactionStatus.SETTLING,
                TransactionStatus.SETTLEMENT_CONFIRMED,
                TransactionStatus.SETTLEMENT_PENDING,
                TransactionStatus.SUBMITTED_FOR_SETTLEMENT
            };

        [HttpGet, Route("GenerateToken")]
        public object GenerateToken()
        {
            var gateway = config.GetGateway();
            var clientToken = gateway.ClientToken.Generate();
            return clientToken;
        }

        [HttpPost, Route("Checkout")]
        public object Checkout(vmCheckout model)
        {
            string paymentStatus = string.Empty;
            var gateway = config.GetGateway();

            var request = new TransactionRequest
            {
                Amount = model.Price,
                PaymentMethodNonce = model.PaymentMethodNonce,
                Options = new TransactionOptionsRequest
                {
                    SubmitForSettlement = true
                }
            };

            Result<Transaction> result = gateway.Transaction.Sale(request);
            if (result.IsSuccess())
            {
                paymentStatus = "Succeded";

                //Do Database Operations Here
            }
            else
            {
                string errorMessages = "";
                foreach (ValidationError error in result.Errors.DeepAll())
                {
                    errorMessages += "Error: " + (int)error.Code + " - " + error.Message + "\n";
                }

                paymentStatus = errorMessages;
            }

            return paymentStatus;
        }
    }
}
