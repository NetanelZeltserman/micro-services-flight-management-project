import http, { DJANGO_API_URL } from '../../http';

interface Props {
    customerID:    number;
    name:          string;
    surName:       string;
    email:         string;
    phone:         string;
    address:       string;
    creditCard:    string;
    relatedUserID: number;
}

export default async function UpdateCustomer(props: Props){

    const { data } = await http.put(`${DJANGO_API_URL}/api/customers/${props.customerID}/`, {
        name:        props.name,
        surname:     props.surName,
        email:       props.email,
        address:     props.address,
        phone:       props.phone,
        credit_card: props.creditCard,
        user:        props.relatedUserID
    });

    return data;
};
