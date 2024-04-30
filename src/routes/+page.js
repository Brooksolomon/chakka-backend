import { redirect } from '@sveltejs/kit';

export const load = async(event)=>{
        redirect(303,'/essential-oils')

}