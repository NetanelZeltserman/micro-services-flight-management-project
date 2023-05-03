import http, { DJANGO_API_URL } from '../../http';

interface Props {
    name:          string;
    surName:       string;
    email:         string;
    phone:         string;
    address:       string;
    creditCard:    string;
    relatedUserID: number;
}

export default async function AddCustomer(props: Props){

    const { data } = await http.post(`${DJANGO_API_URL}/api/customers/`, {
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
