import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import loginStore from '../../stores/loginStore.js';

export const load = async(event)=>{
    let authed = false;
        loginStore.subscribe(v => {
            authed = v.login
        })
       if(authed==false)
       {
        console.log("mo")
        redirect(303,'/login')
       }
       
}