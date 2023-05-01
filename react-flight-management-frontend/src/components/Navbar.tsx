/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom";
import http, { isAuthenticted } from "../pages/api/http";
import { ApplicationStore } from "../state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import SpinnerComponent from "./Spinner";
import logout from "../pages/api/auth/logout";
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';

export default function NavbarComponent(){

  
  const username = useStoreState((state: ApplicationStore) => state!.user!.data)?.username;
  const email    = useStoreState((state: ApplicationStore) => state!.user!.data)?.email;

  
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isAuthenticted());
  const updateUserData  = useStoreActions((actions: Actions<ApplicationStore>) => actions.user.updateUserData);

  useEffect(() => {

    console.debug('Username & Email changed!');
    setIsUserLoggedIn(isAuthenticted());

  }, [username, email, isUserLoggedIn])
  

  function handleLogout(){

      // Send logout request w/ refresh token
      logout(localStorage.getItem("refresh_token"))
      .then((res) => {
          console.debug('Logout response:', res);
      
          // Remove tokens from local storage
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');

          // Remove Authorization header from http client (axios)
          http.defaults.headers['Authorization'] = null;

          // set updateUserData to empty object
          updateUserData({})

          // navigate('/');
      })
      .catch((err) => {
          console.error('Logout error:', err);

          // If the status code is 400 and the custom_message field is "Token is blacklisted"
          if (err.response.status === 400 
              && err.response.data.custom_message === "Token is blacklisted") {
              // Remove tokens from local storage
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');

              // Remove Authorization header from http client (axios)
              http.defaults.headers['Authorization'] = null;

              // set updateUserData to empty object
              updateUserData({})
              console.debug('Logout successful! GOTGUUU BITCHHS');

              // navigate('/');
          }
      });
  }

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
        // If the username or email are null, show a spinner
        // If the username or email are not null, show the avatar and username
        email || username ? (
          <div className="flex md:order-2 pr-16">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <>
                <Avatar alt="User settings" img={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${username}`}
                rounded={true}/>
                <p className="ml-3 capitalize font-medium text-gray-500">{username}</p>
                <FontAwesomeIcon 
                  className="text-gray-400 ml-3" 
                  icon={solid('caret-down')} 
                  size="sm"
                />
              </>
            }
              >
              <Dropdown.Header>
                <span className="block text-sm capitalize">
                  {username}
                </span>
                <span className="block truncate text-sm font-medium">
                  {email}
                </span>
              </Dropdown.Header>
              {/* TODO: Add <Link> here to redircet using react-router-dom */}
              <Dropdown.Item>
                Lookup a flight
              </Dropdown.Item>
              <Dropdown.Item>
                My flights
              </Dropdown.Item>
              <Dropdown.Divider />
              {/* It was possible to link it to a page but this is the simplest way */}
                <Dropdown.Item onClick={() => handleLogout()}>
                  Sign out
                </Dropdown.Item>
            </Dropdown>
          </div>
        )
        :
        <>
        <div className="flex md:order-2 pr-24">
          <SpinnerComponent />
        </div>
        </>
        :
        // Two buttons, register and login
        <div className="flex md:order-2 pr-16">
          <Link to="/register">
            <Button
              className="mr-4 shadow-sm hover:shadow-md bg-sky-500 hover:bg-sky-600 focus:ring-0 focus:border-0"
              pill={true}>
              Sign up
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
        <Navbar.Link>
          <NavLink 
            to="/" 
            className={({ isActive }) =>
                        isActive ? 'text-sky-500' : 'hover:text-sky-500'}
          >
            Home
          </NavLink>
        </Navbar.Link>

        <Navbar.Link>
          <NavLink
            to="/about" 
            className={({ isActive }) =>
                        isActive ? 'text-sky-500' : 'hover:text-sky-500'}
          >
            About
          </NavLink>
        </Navbar.Link>

        {
          <Navbar.Link>
            <NavLink
              to="/admin" 
              className={({ isActive }) =>
              isActive ? 'text-sky-500' : 'hover:text-sky-500'}
              >
              Admin Area
            </NavLink>
        </Navbar.Link>
        }
      </Navbar.Collapse>
    </Navbar>
    )
}