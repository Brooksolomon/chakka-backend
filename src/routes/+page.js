import { redirect } from '@sveltejs/kit';

export const load = async(event)=>{
        redirect(303,'/biodiverse-oils')

}