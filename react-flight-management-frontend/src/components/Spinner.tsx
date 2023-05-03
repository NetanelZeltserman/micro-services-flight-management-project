import { Spinner } from "flowbite-react";

interface Props {
    white?: boolean;
}


export default function SpinnerComponent({ white }: Props){
    return (
        <Spinner
            aria-label="Large spinning spinner"
            className={`fill-sky-500 ${white && 'text-white'}`}
            light={true}
            size="xl"
        />
    )
}