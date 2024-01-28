import { Chapa } from 'chapa-nodejs';

const chapa = new Chapa({
    secretKey: 'Bearer CHASECK_TEST-UgRRxH2RDEb0ksa1Y7dxnHxs6DZJpBWg',
  });
  
  const tx_ref = await chapa.generateTransactionReference(); 
  
  const response = await chapa.initialize({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@gmail.com',
      currency: 'ETB',
      amount: '200',
      tx_ref: tx_ref,
      callback_url: 'https://example.com/',
      return_url: 'https://the-binger.vercel.app/',
      customization: {
        title: 'Test Title',
        description: 'Test Description',
      },
    });
    const verify = await chapa.verify({
        tx_ref: 'TX-XYSNRPFD6SJRE2U',
      });
    console.log(response)
    console.log(tx_ref)
    console.log(verify)



// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer CHASECK_TEST-UgRRxH2RDEb0ksa1Y7dxnHxs6DZJpBWg");
// myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "amount": "100",
//   "currency": "ETB",
//   "email": "abebech_bekele@gmail.com",
//   "first_name": "Bilen",
//   "last_name": "Gizachew",
//   "phone_number": "0912345678",
//   "tx_ref": "chewatatesta-9",
//   "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
//   "return_url": "https://the-binger.vercel.app/",
//   "customization[title]": "Payment for my favourite merchant",
//   "customization[description]": "I love online payments"
// });

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("https://api.chapa.co/v1/transaction/initialize", requestOptions)
//   .then(response => response.json().sta)
//   .then(result => {console.log(result["data"]["checkout_url"]); console.log(result);})
//   .catch(error => console.log('error', error));