
import Chapa from 'chapa';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import {FireFunc} from'../../lib/firebase/firebase.js'
import cartStore from '../../stores/cartStore.js';

let myChapa = new Chapa('Bearer CHASECK_TEST-UgRRxH2RDEb0ksa1Y7dxnHxs6DZJpBWg')


export const actions = {
    paymentInit: async ({ request }) => {
      let { firstName,lastName,email,city,subCity,description,price} = Object.fromEntries(
        await request.formData(),
      );
       const customerInfo =  {
        amount: price,
        currency: 'ETB',
        email: email,
        first_name: firstName,
        last_name: lastName,
        callback_url: 'https://chakkawebhook.onrender.com/chapa',
        return_url: 'https://the-binger.vercel.app/',
        customization: {
            title: 'I love e-commerce',
            description: 'It is time to pay'
        }
        
        }
        
        let txnReference,url;
        let response = await myChapa.initialize(customerInfo, { autoRef: true })
        txnReference = response["tx_ref"];
        url = response["data"]["checkout_url"];
        //$cartStore.cartProducts
        let authed = false;
        cartStore.subscribe(v => {
            authed = v.cartProducts
        })
        console.log(authed)
       // FireFunc.addToPending(txnReference,firstName,lastName,email,city,subCity,description,)

        
        redirect(302, url)
    }
}