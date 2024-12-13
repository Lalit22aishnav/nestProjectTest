'use client'
import React from 'react';
import { signOut, useSession } from 'next-auth/react';


const Header = () => {

    const { status } = useSession()

    const logout = async () => {
        await signOut({ callbackUrl: '/login' });
    }

    return (
        <header>
            <h2>KUSHAPP</h2>
            <div>
                {status === "authenticated" && (
                    <button className="btn" onClick={logout}>Logout</button>
                )}
            </div>
        </header>
    );
};

export default Header;
