import React from 'react';
import {
    useSession, signIn, signOut
} from 'next-auth/client';
import Link from 'next/link'
const user = (props) => {
    const [session, loading] = useSession()

    const getMenu = () => {
        if (session) {
            return <>
                <Link href="/collections">
                    <button className="btn btn-primary">Collections</button>
                </Link>
                <Link href="/favourites">
                    <button className="btn btn-primary  mx-2">Favourites</button>
                </Link>
                <button className="btn btn-primary" onClick={() => signOut()}>Log Out</button>
            </>
        } else {
            return <>
                <button className="btn btn-primary" onClick={() => signIn()}>Sign in</button>
            </>
        }
    }
    return (
        <div>
            <div className="main-content">
                <div className="card nav-card">
                    <nav class="navbar navbar-light bg-light justify-content-between">
                        <Link href="/">
                            <a class="navbar-brand">
                                <img src="/picit_logo.png" height="60px" alt="Vercel Logo" />
                            </a>
                        </Link>
                        <div className="">
                            {getMenu()}
                        </div>
                    </nav>
                </div>
                {props.children}
            </div>
        </div>
    );
}

export default user;
