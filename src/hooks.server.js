import {FireFunc} from './lib/firebase/firebase'
export async function handle({ event, resolve }) {
	if(event.url.pathname.startsWith('/confirmMoney')){
		FireFunc.addProduct("LOG")
		return new Response("diick")
	}else{
		return resolve(event)
	}
}