import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='w-full h-16 p-4 bg-primary text-white font-bold'>
        <nav className='flex justify-between items-baseline'>
            <Link to="/" className="logo">
                Logo
            </Link>
            <div>
                <ul className="flex gap-x-6">
                    <li>
                        <Link to="/">Library</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}
