import { useState } from "react"
import Datepicker from "tailwind-datepicker-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

interface Props{
    title?: string,
    onChange: any,
    defaultValue: Date
}

export const DatePickerInput = ({...props}: Props) => {
    const options = {
        title: props.title || "Select a date",
        autoHide: true,
        todayBtn: false,
        clearBtn: false,
        // 30 days from today
        maxDate: new Date(new Date().getTime()+(30*24*60*60*1000)), 
        // Starting from a week from today's date, can't select previous dates
        // because can't depart from the past
        minDate: new Date(new Date().getTime()+(7*24*60*60*1000)), 
        theme: {
            background: "dark:bg-white",
            todayBtn: "bg-sky-400 hover:bg-sky-500 hover:shadow-md focus:ring-4 focus:ring-sky-200",
            clearBtn: "focus:ring-4 focus:ring-sky-200",
            icons: "hidden",
            text: "text-gray-800",
            disabledText: "hidden text-gray-100",
            input: "border-2 border-gray-200 dark:bg-white bg-white focus:ring-0",
            inputIcon: "",
            selected: "bg-sky-500 hover:bg-sky-600 hover:shadow-md",
        },
        icons: {
            prev: () => <FontAwesomeIcon icon={solid('left-long')} />,
            next: () => <FontAwesomeIcon icon={solid('right-long')} />,
        },
        datepickerClassNames: "top-12",
        defaultDate: props.defaultValue,
        language: "en",
    }

    const [show, setShow] = useState <boolean>(false)
	const handleClose = (state: boolean) => {
		setShow(state)
	}

	return (
			<Datepicker classNames="bg-white" options={options} onChange={props.onChange} show={show} setShow={handleClose} />
	)
}