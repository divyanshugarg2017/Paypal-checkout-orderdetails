'use strict';

/**
 *
 * PayPal Node JS SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

const PAYPAL_CLIENT = 'AYv6tTrByXOLMG6mkPTPQGIdlQ8TqpKrYEblBMom26z_YJ12ZRV4QcJMboGVLr0SOP-5xotTQifORR0g';
const PAYPAL_SECRET = 'EEThdvUTryKp_g5yuKC--_33ws3TT8zszeSGQ0F8613Usilu59DVBDQgo-dBnQPvyqKVjCGV8yOuzzcJ';
// 1b. Point your server to the PayPal API
const PAYPAL_OAUTH_API = 'https://api-m.sandbox.paypal.com/v1/oauth2/token/';
const PAYPAL_ORDER_API = 'https://api-m.sandbox.paypal.com/v2/checkout/orders/';

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID || PAYPAL_CLIENT;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || PAYPAL_SECRET;

    return new checkoutNodeJssdk.core.SandboxEnvironment(
        clientId, clientSecret
    );
}

async function prettyPrint(jsonData, pre=""){
    let pretty = "";
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (let key in jsonData){
        if (jsonData.hasOwnProperty(key)){
            if (isNaN(key))
              pretty += pre + capitalize(key) + ": ";
            else
              pretty += pre + (parseInt(key) + 1) + ": ";
            if (typeof jsonData[key] === "object"){
                pretty += "\n";
                pretty += await prettyPrint(jsonData[key], pre + "    ");
            }
            else {
                pretty += jsonData[key] + "\n";
            }

        }
    }
    return pretty;
}

module.exports = {client: client, prettyPrint:prettyPrint};