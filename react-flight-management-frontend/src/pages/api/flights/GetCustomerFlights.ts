import http, { DJANGO_API_URL } from '../http';

export default async function GetCustomerFlights(){

    const { data } = await http.get(`${DJANGO_API_URL}/api/customers/myflights/`);
    return data;
};
