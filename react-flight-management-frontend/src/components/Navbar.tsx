/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react"
import { createElement, useState } from "react"
import { Link, redirect } from "react-router-dom";
import { isAuthenticted } from "../pages/api/http";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function NavbarComponent(){

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isAuthenticted());

  const [username, setUsername] = useState('test');
  const [email,    setEmail]    = useState('test@gmail.com');



  return (
    <Navbar
      fluid={true}
      rounded={true}  
    >
      <Link to="/">
        <Navbar.Brand className={'pl-16'}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Airplane_ballonicon2.svg/1280px-Airplane_ballonicon2.svg.png"
            className="mr-3 h-6 sm:h-9"
            alt="AeroThree Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            AeroThree
          </span>
        </Navbar.Brand>
      </Link>
      {
        isUserLoggedIn ?
        <div className="flex md:order-2 pr-16">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${username}`} rounded={true}/>}
            >
            <Dropdown.Header>
              <span className="block text-sm capitalize">
                {username}
              </span>
              <span className="block truncate text-sm font-medium">
                {email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              Lookup a flight
            </Dropdown.Item>
            <Dropdown.Item>
              My flights
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
        :
        // Two buttons, register and login
        <div className="flex md:order-2 pr-16">
          <Link to="/register">
            <Button
              className="mr-4 shadow-sm hover:shadow-md bg-sky-500 hover:bg-sky-600 focus:ring-0 focus:border-0"
              pill={true}>
              Get started
            </Button>
          </Link>

        <Link to="/login">
          <Button color="light"
            pill={true}
            className="shadow-sm hover:shadow-md focus:ring-0 focus:border-0"
            >
            Login
          </Button>
        </Link>
        </div>
      }
      <Navbar.Toggle />

      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          active={true}
          theme={{base: 'text-gray-600 hover:text-sky-500', active: {on: 'text-sky-500'}}}
        >
          Home
        </Navbar.Link>
        <Navbar.Link theme={{active: {off: 'text-gray-600 hover:text-sky-500'}}} href="/navbars">
          About
        </Navbar.Link>
        <Navbar.Link theme={{active: {off: 'text-gray-600 hover:text-sky-500'}}} href="/navbars">
          Services
        </Navbar.Link>
        <Navbar.Link theme={{active: {off: 'text-gray-600 hover:text-sky-500'}}} href="/navbars">
          Pricing
        </Navbar.Link>
        <Navbar.Link theme={{active: {off: 'text-gray-600 hover:text-sky-500'}}} href="/navbars">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    )
}