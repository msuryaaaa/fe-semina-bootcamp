import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import NavLink from '../NavLink';

export default function SNavbar() {
	return (
		<>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Nav className='me-auto'>
						<Navbar.Brand href='#home'>Logo</Navbar.Brand>
						<NavLink to='/'>Home</NavLink>
						<NavLink to='/categories'>Categories</NavLink>
						<NavLink to='/talents'>Talents</NavLink>
						<NavLink to='/events'>Events</NavLink>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}
