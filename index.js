//TODO create a method getTxDetails to fetch transaction details based on orderID

const payPalClient = require('./utils');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

async function getOrderDetails(orderID) {
  // 3. Call PayPal to get the transaction details
  let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);
  let order;
  try {
    order = await payPalClient.client().execute(request);
    return order
  } catch (err) {
    console.error(err);
  }
}
async function execute(){
  try{
    let details = await getOrderDetails('8ED09044N0625283B')
    console.log(details)
    console.log(details.result.purchase_units)
  }catch(err){
    console.log(err)
  }
}
 
execute().then(()=>{
  console.log('executed')
})
