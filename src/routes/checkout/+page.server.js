
import Chapa from 'chapa';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

let myChapa = new Chapa('Bearer CHASECK_TEST-UgRRxH2RDEb0ksa1Y7dxnHxs6DZJpBWg')


export const actions = {
    paymentInit: async ({ request }) => {
      let { firstName,lastName,email,city,subCity,description } = Object.fromEntries(
        await request.formData(),
      );
       const customerInfo =  {
        amount: '100',
        currency: 'ETB',
        email: email,
        first_name: firstName,
        last_name: lastName,
        callback_url: 'https://chapa.co',
        return_url: 'https://the-binger.vercel.app/',
        customization: {
            title: 'I love e-commerce',
            description: 'It is time to pay'
        }
        
        }
        
        let txnReference,url;
        // myChapa.initialize(customerInfo, { autoRef: true }).then(response => {
        //    // console.log(response)
        //     txnReference = response.tx_ref;
        //     url = response.js;
        // }).catch(e => {console.log(e)})
        
        
        let response = await myChapa.initialize(customerInfo, { autoRef: true })
        txnReference = response["tx_ref"];
        url = response["data"]["checkout_url"];
    

        redirect(302, url)

        //let response = await myChapa.verify('txn-reference')
    }
}