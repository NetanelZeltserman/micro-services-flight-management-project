import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, Modal } from 'flowbite-react';
import { CircleFlag } from 'react-circle-flags'
import { Flight } from '../pages/HomePage';
import { useState } from 'react';
import { Formik, Form, } from "formik";
import { number, object } from "yup";
import { Input } from './Input';
import UpdateFlight from '../pages/api/flights/UpdateFlight';
import DeleteFlight from '../pages/api/flights/DeleteFlight';
import { ToastContainer, toast } from 'react-toastify';
import Can from './Can';
import { isAuthenticted } from '../pages/api/http';
import { Link, useNavigate } from 'react-router-dom';


export const FlightCard: React.FC<Flight> = ({
    id,
    origin_code,
    origin_city,
    origin_country_name,
    origin_country_code,
    
    destination_code,
    destination_city,
    destination_country_name,
    destination_country_code,

    departure_datetime,
    landing_datetime,
    airline_company,
    airline_company_code,
    ticket_economy_price,
    remaining_tickets
}) => {

    const [showEditModal,    setShowEditModal]    = useState(false);
    const [showDeleteModal,  setShowDeleteModal]  = useState(false);
    const [showSignUpToContinueModal, setShowSignUpToContinueModal] = useState(false);

    const [remainingTickets, setRemainingTickets] = useState(remaining_tickets);
    const [ticketPrice,      setTicketPrice]      = useState(ticket_economy_price);

    const [isFlightDeleted, setIsFlightDeleted]   = useState(false);
    const [isFlightBooked, setIsFlightBooked]     = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    function ToggleEditModal(){
        console.debug('ToggleEditModal triggered for Flight #', id);
        
        // To make sure both modals aren't displayed at the same time *magicaly*
        setShowDeleteModal(false)
        setShowEditModal(!showEditModal)
    }

    function ToggleDeleteModal(){
        console.debug('ToggleDeleteModal triggered for Flight #', id);

        // To make sure both modals aren't displayed at the same time *magicaly*
        setShowEditModal(false)
        setShowDeleteModal(!showDeleteModal)
    }

    function ToggleSignUpToContinueModal(){
        console.debug('ToggleSignUpToContinueModal triggered for Flight #', id);

        // To make sure both modals aren't displayed at the same time *magicaly*
        setShowEditModal(false)
        setShowDeleteModal(false)
        setShowSignUpToContinueModal(!showSignUpToContinueModal)
    }


    function handleFlightEditSubmit(e: any){
        setIsLoading(true);

        console.debug('handleFlightEditSubmit triggered for Flight #', id);
        console.debug('e:', e);

        UpdateFlight(id, e.remaining_tickets, parseInt(e.ticket_price))
        .then((r) => {
            console.debug('UpdateFlight response:', r);

                // Update remaining tickets & price state
                setRemainingTickets(e.remaining_tickets);
                setTicketPrice(e.ticket_price);

                toast.success(`Details updated! 📝`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
            setIsLoading(false);

        })
        .catch((e) => {
            console.error('UpdateFlight error:', e);
            setIsLoading(false);

        })
  
        // On success
        // ToggleEditModal();
    }


    function handleFlightDeleteSubmit(){
        setIsLoading(true);
        console.debug('handleFlightDeleteSubmit triggered for Flight #', id);

        DeleteFlight(id)
            .then((r) => {
                console.debug('UpdateFlight response:', r);
                setIsFlightDeleted(true);
                setIsLoading(false);
            })
            .catch((e) => {
                console.error('UpdateFlight error:', e);
                setIsFlightDeleted(false);
                setIsLoading(false);
            })

    }

    const FlightEditValidation = object().shape({
    remaining_tickets: number()
                        .typeError("The remaining tickets must be a number")
                        .positive("Well that's not possible, I think you should take a break...")
                        .max(1000, "Too high my man, we don't have that many seats...")
                        .min(50, "What are we, a bus company? Seriously?")
                        .required("No tickets? Really? Input 0 then..."),

    ticket_price:      number()
                        .typeError("The price must be a number")
                        .min(100, "What are we, a crapy lower cost company? Seriously?")
                        .required("A price is required, we don't print money out of thin air...")
                        .max(3000, "The price is too high, we don't fly billionaires here...")
                        .positive("The price must be positive, we don't pay you to fly...")
    });

    function onFlightBook() {
        navigate(`/flights/${id}/book`);

        // BookFlight(id)
        //     .then((r) => {
        //         console.debug('BookFlight response:', r);

        //         // Remove 1 ticket from remainingTickets state
        //         setRemainingTickets(remainingTickets - 1);
        //         setIsFlightBooked(true);

        //         toast.success(`Flight booked! ✨`, {
        //           position: "top-right",
        //           autoClose: 5000,
        //           hideProgressBar: false,
        //           closeOnClick: true,
        //           pauseOnHover: true,
        //           draggable: true,
        //           progress: undefined,
        //           theme: "light",
        //         });

        //         setIsLoading(false);
        //     })
        //     .catch((e) => {
        //         console.error('BookFlight error:', e);
        //         setIsFlightBooked(false);

        //         toast.error(`${e.response.data.custom_message || 'Flight book failed!'}`, {
        //           position: "top-right",
        //           autoClose: 5000,
        //           hideProgressBar: false,
        //           closeOnClick: true,
        //           pauseOnHover: true,
        //           draggable: true,
        //           progress: undefined,
        //           theme: "light",
        //         });

        //         setIsLoading(false);
        //     })
    }

    const navigate = useNavigate();


    return (
        <>
        <Modal
            show={showDeleteModal}
            size="md"
            popup={true}
            onClose={() => setShowDeleteModal(false)}
        >
            <Modal.Header />
            <Modal.Body>
            <div className="text-center">
                <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
                One less flight to worry about?
                </h3>
                <div className="flex justify-center gap-4">
                <Button
                    color="failure"
                    className='rounded-none'
                    onClick={() => handleFlightDeleteSubmit()}
                >
                    Yes. Shoot it down.
                </Button>
                <Button
                    color="gray"
                    onClick={() => ToggleDeleteModal()}
                >
                    No, cancel
                </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>


        <Modal
            show={showEditModal}
            size="md"
            popup={true}
            onClose={() => setShowEditModal(false)}
            dismissible={true}
        >
            <Modal.Header />
            <Modal.Body>
            <div className="flex flex-col items-center justify-center text-left">
                <h3 className="mb-5 text-base text-gray-500">
                Editing Flight #{id}...
                </h3>
                <Formik
                    initialValues={{
                        remaining_tickets: remainingTickets,
                        ticket_price:      ticketPrice,
                    }}
                    onSubmit={handleFlightEditSubmit}
                    validationSchema={FlightEditValidation}
                >
                {() => {
                  return (
                    <Form>
                        <div className='text-left text-gray-400'>
                            <Input
                                type="number"
                                id="remaining_tickets"
                                name="remaining_tickets"
                                label="Remaining tickets"
                                placeholder={remaining_tickets}
                                required={true}
                                // className='border-0 focus:ring-2 focus:ring-sky-500'
                            />
                            <Input
                                type="number"
                                id="ticket_price"
                                name="ticket_price"
                                label="Ticket Price (in $)"
                                placeholder={ticket_economy_price}
                                required={true}
                                // className='border-0 focus:ring-2 focus:ring-sky-500'
                            />
                        </div>
                        <Button
                            color="success"
                            type="submit"
                            fullSized={true}
                            className='mt-4 rounded-full'
                        >
                            Save
                        </Button>
                    </Form>
                    );
                }}
                </Formik>
            </div>
            </Modal.Body>
        </Modal>
        <Modal
            show={showSignUpToContinueModal}
            size="md"
            popup={true}
            onClose={() => setShowSignUpToContinueModal(false)}
        >
            <Modal.Header />
            <Modal.Body>
            <div className="flex flex-col items-center justify-center text-center">
                <h3 className="mb-5 text-xl font-medium text-gray-600 dark:text-gray-400">
                    Sign up to book a flight
                </h3>
                <img 
                    className='h-80'
                    src={`${window.location.origin}/undraw_sign_up.svg`} 
                    alt="signup"
                />
                <div className="flex justify-center gap-4">
                <Link to={'/register'}>
                    <Button
                        className='rounded-full bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-sky-400focus:border-0'
                        >
                        Sign me up
                    </Button>
                </Link>
                <Button
                    color="gray"
                    className='text-gray-700 hover:text-gray-700 focus:ring-gray-100 focus:text-gray-700'
                    onClick={() => ToggleSignUpToContinueModal()}
                >
                    No, cancel
                </Button>
                </div>
            </div>
            </Modal.Body>
        </Modal>

        <>
        <div
            key={id}
            className={`p-10 ${isFlightDeleted && 'opacity-25 pointer-events-none'}`}
            >
        {/* <ToastContainer /> */}
        {/* <div className={`${isLoading && 'bg-gray-700 z-50'}`}> */}
        <div
            className={`flex flex-col max-w-full overflow-hidden bg-white rounded shadow-lg ${isLoading && 'bg-gray-700 '}`}
        >
            <div className={`relative flex flex-row items-baseline p-2 px-6 border-b-2 border-gray-100 flex-nowrap `}>
                <svg viewBox="0 0 64 64" data-testid="tripDetails-bound-plane-icon" pointerEvents="all" aria-hidden="true" className="mt-2 mr-1" role="presentation" style={{fill: 'rgb(102, 102, 102)', height: '0.9rem', width: '0.9rem'}}>
                    <path d="M43.389 38.269L29.222 61.34a1.152 1.152 0 01-1.064.615H20.99a1.219 1.219 0 01-1.007-.5 1.324 1.324 0 01-.2-1.149L26.2 38.27H11.7l-3.947 6.919a1.209 1.209 0 01-1.092.644H1.285a1.234 1.234 0 01-.895-.392l-.057-.056a1.427 1.427 0 01-.308-1.036L1.789 32 .025 19.656a1.182 1.182 0 01.281-1.009 1.356 1.356 0 01.951-.448l5.4-.027a1.227 1.227 0 01.9.391.85.85 0 01.2.252L11.7 25.73h14.5L19.792 3.7a1.324 1.324 0 01.2-1.149A1.219 1.219 0 0121 2.045h7.168a1.152 1.152 0 011.064.615l14.162 23.071h8.959a17.287 17.287 0 017.839 1.791Q63.777 29.315 64 32q-.224 2.685-3.807 4.478a17.282 17.282 0 01-7.84 1.793h-9.016z"></path>
                </svg>
                <h1 className="ml-2 font-bold text-gray-500 uppercase">departure {isLoading}</h1>
                <p className="absolute ml-2 font-normal text-gray-500 right-6 bottom-2">{departure_datetime.split(' ')[0]} at {departure_datetime.split(' ')[1]}</p>
            </div>
            <div className="flex flex-wrap mx-6 mt-2 sm:flex-row sm:justify-between">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col p-2">
                    <div className='flex'>
                        <CircleFlag countryCode={origin_country_code.toLowerCase()} height="35" className={'h-10 border-2 rounded-full border-gray-100 mr-2 shadow-sm'} />
                        <div>
                            <p className="font-bold text-gray-600">{departure_datetime.split(' ')[1]}</p>
                            <p className="text-gray-500"><span className="font-medium">{origin_city}</span> ({origin_code})</p>
                            <p className="text-gray-500">{origin_country_name}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-wrap p-2">
                    <div className='flex'>
                        <CircleFlag countryCode={destination_country_code.toLowerCase()} height="35" className={'h-10 border-2 rounded-full border-gray-100 mr-2 shadow-sm'} />
                        <div>
                            <p className="font-bold text-gray-600">{landing_datetime.split(' ')[1]}</p>
                            <p className="text-gray-500"><span className="font-medium">{destination_city}</span> ({destination_code})</p>
                            <p className="text-gray-500">{destination_country_name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative flex flex-row w-full'>
                <div className='w-full place-self-start'>
                    <div className="relative flex flex-row p-2 pt-6 place-items-center">
                        <img alt={airline_company}
                                className="w-10 h-10 rounded-full shadow-md"
                                src={`https://api.dicebear.com/5.x/icons/svg?seed=${airline_company}`} 
                                style={{opacity: '1', transformOrigin: '0% 50% 0px', transform: 'none'}} 
                        />
                        <div className="flex flex-col ml-2">
                            <p className="text-xs font-bold text-gray-500 capitalize">{airline_company}</p>
                            <p className="text-xs text-gray-500 uppercase">{airline_company_code}-{id}</p>
                        </div>
                    </div>
                </div>
                <Can permissionKeys={["change_flight", "delete_flight"]}>
                    <div className='flex-row-reverse items-center justify-center mt-8 min-w-md'>
                        <Dropdown
                            label={
                                <FontAwesomeIcon
                                icon={solid('cog')}
                                    className="text-gray-500 hover:text-gray-600 hover:drop-shadow-md"
                                    size='xl'
                                    />
                                }
                                arrowIcon={false}
                                inline={true}
                                >
                                <Dropdown.Item 
                                    className="text-red-500 hover:text-white hover:bg-red-500"
                                    onClick={() => ToggleDeleteModal()}
                                >
                                    Delete
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item 
                                    onClick={() => ToggleEditModal()}
                                >
                                    Edit
                                </Dropdown.Item>
                        </Dropdown>
                    </div>
                </Can>
            </div>
        </div>

            {/* TODO: If IsBooked, replace wiht a gray cover, with a huge text "BOOKED" in italic font */}
            <div className="relative flex flex-row flex-wrap items-baseline justify-between mt-4 bg-gray-50 md:flex-nowrap">
            <div className="flex flex-row flex-wrap items-center justify-between w-full py-4 mx-6 ">
                <div className='flex flex-row'>
                    <svg className="self-center w-12 h-10 p-2 mx-2 text-white rounded-full fill-current bg-sky-200" viewBox="0 0 64 64" pointerEvents="all" aria-hidden="true" role="presentation"><path d="M43.389 38.269L29.222 61.34a1.152 1.152 0 01-1.064.615H20.99a1.219 1.219 0 01-1.007-.5 1.324 1.324 0 01-.2-1.149L26.2 38.27H11.7l-3.947 6.919a1.209 1.209 0 01-1.092.644H1.285a1.234 1.234 0 01-.895-.392l-.057-.056a1.427 1.427 0 01-.308-1.036L1.789 32 .025 19.656a1.182 1.182 0 01.281-1.009 1.356 1.356 0 01.951-.448l5.4-.027a1.227 1.227 0 01.9.391.85.85 0 01.2.252L11.7 25.73h14.5L19.792 3.7a1.324 1.324 0 01.2-1.149A1.219 1.219 0 0121 2.045h7.168a1.152 1.152 0 011.064.615l14.162 23.071h8.959a17.287 17.287 0 017.839 1.791Q63.777 29.315 64 32q-.224 2.685-3.807 4.478a17.282 17.282 0 01-7.84 1.793h-9.016z"></path></svg>
                    <div className="flex flex-col mx-2 text-sm">
                        <p className="">Standard Ticket</p>
                        <p className="font-bold">${ticketPrice}</p>
                        <p className="text-xs text-gray-500">Price per adult</p>
                    </div>
                </div>
                <div className={`absolute right-0 top-2 ${(isFlightBooked || remainingTickets === 0) && 'cursor-not-allowed'}`}>
                    <button
                        className={`${(isFlightBooked || remainingTickets === 0) && 'pointer-events-none'} flex justify-center w-32 mx-6 mt-2 text-white border border-solid rounded shadow-sm h-9 hover:shadow-md active:shadow-md bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-sky-200 place-items-center`}
                        onClick={() => !isAuthenticted() ? ToggleSignUpToContinueModal() : onFlightBook()}
                    >
                    Book
                    </button>
                    <p className="ml-[1.85rem] mt-1 text-xs text-gray-500"><b>{remainingTickets}</b> Remaining tickets</p>
                </div>
            </div>
            </div>
        </div>
        {/* </div> */}

        </div>
        </>
    </>
    )
}
