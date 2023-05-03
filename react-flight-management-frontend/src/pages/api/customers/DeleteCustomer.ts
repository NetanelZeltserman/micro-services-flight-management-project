import http, { DJANGO_API_URL } from '../http';

export default async function DeleteCustomer(customer_id: number){
    const { data } = await http.delete(`${DJANGO_API_URL}/api/customers/${customer_id}/`);

    return data;
};
