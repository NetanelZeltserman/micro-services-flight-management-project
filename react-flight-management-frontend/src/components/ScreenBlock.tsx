import { Button } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';

interface actionBtnProps {
    text: string;
    to: string;
}

interface ErrorProps {
    title:   string;
    message?: string;
    type:    'notFound' | 'notFound2' | 'flightBooked' | 'welcomeBack' | 'mustBeAUserToContinue' | 'general';
    actionBtn?: actionBtnProps | null;
    noBackground?: boolean;
}


interface ScreenBlockProps {
    title:   string;
    image?:  React.ReactElement;
    message?: string;
    actionBtn?: actionBtnProps | null;
    noBackground?: boolean;
}

export default function ScreenBlock({title, image, message, actionBtn, noBackground}: ScreenBlockProps) {
    return (
        <div
            // There's probably a more elegant way to do this, but I'm tired and this works.
            className={`${noBackground ? 'max-h-36 flex flex-col items-center justify-center' : 'flex flex-col items-center justify-center min-w-[55rem] h-full my-12 p-16 shadow-md text-center text-gray-600 bg-white border border-gray-200 rounded-md'}`}
        >
            {image || null}
            <h1 className={`${noBackground ? 'text-2xl' : 'text-2xl'} font-bold text-gray-600`}>{title}</h1>
            {
                message &&
                <p className="text-base text-gray-600">{message}</p>
            }
            {
                actionBtn
                &&
                <Link to={actionBtn.to}>
                    <Button
                        className={`${noBackground ? 'mt-6' : 'mt-8'} shadow-sm hover:shadow-md w-fit bg-sky-500 hover:bg-sky-600 focus:ring-0 focus:border-0`}
                    >
                    {actionBtn.text}
                    </Button>
                </Link>
            }
        </div>
    )
}


export function ScreenBlockWithImage({title, message, type, actionBtn, noBackground}: ErrorProps) {

    function DecideImgBasedOnType(type: string, noBackground?: boolean): JSX.Element {
        const imgStyle = noBackground ? 'mb-6 h-32' : 'mb-8 h-60';

        switch (type) {
            case 'notFound':
                return <img
                            alt="2 Empty Notepads"
                            className={imgStyle}
                            src={`${window.location.origin}/undraw_no_data.svg`}
                        />

            case 'notFound2':
                return <img
                            alt="A Catto"
                            className={imgStyle}
                            src={`${window.location.origin}/undraw_cat.svg`}
                        />

            case 'welcomeBack':
                return <img
                            alt="Welcome back"
                            className={imgStyle}
                            src={`${window.location.origin}/undraw_welcome_back.svg`}
                        />

            case 'flightBooked':
                return <img
                            alt="Flight booked"
                            className={imgStyle}
                            src={`${window.location.origin}/undraw_confirmed.svg`}
                        />
            
            case 'general':
                return <img
                            alt="2 Empty Notepads"
                            className={imgStyle}
                            src={`${window.location.origin}/undraw_no_data.svg`}
                        />

            case 'mustBeAUserToContinue':
                return <img
                            alt="Welcome back"
                            className={imgStyle}
                            src={`${window.location.origin}/undraw_welcome_back.svg`}
                        />

            default:
                return <img
                            alt="2 Empty Notepads"
                            className={imgStyle}
                            src={`${window.location.origin}/undraw_no_data.svg`}
                        />
        }
    }

  return (
        <ScreenBlock
            title={title}
            message={message}
            image={DecideImgBasedOnType(type, noBackground)}
            actionBtn={actionBtn || null}
            noBackground={noBackground}
        />
  )
}

export function MustBeAUserToContinue() {
    return (
        <ScreenBlock
            title={'You must be a user to continue'}
            message={'Please sign in or sign up to continue'}
        />
    )
}
