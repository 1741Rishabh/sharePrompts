"use client"

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from "react";
const Navbar = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, settoggleDropdown] = useState(false);

    useEffect( () => {
        async function check() {
            const setUpProviders = async () => {
                const response = await getProviders();
                setProviders(response);
            }
            setUpProviders()
        }
        check()


    }, [])
    
    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image className="object-contain" src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} />
                <p className="logo_text">Promptopia </p>
            </Link>


            {/* {desktop mobile device} */}
            <div className="sm:flex hidden">
                {session?.user ?
                    <div className="flex gap-3 ">
                        <Link href='/create-prompt' className="black_btn">Create Post</Link>
                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" />
                        </Link>
                    </div> : (<>
                        {providers && Object.values(providers).map((provider) => (<button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                            Sign In
                        </button>))}
                    </>)}
            </div>
            {/* {mobile Navigation} */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex ">   <Image src={session?.user.image} width={37} height={37} className="rounded-full hover:cursor-pointer" alt="profile" onClick={() => {
                        return settoggleDropdown((pre) => !pre)
                    }} />
                        {toggleDropdown && (<div className="dropdown">
                            <Link href='/profile' className="dropdown_link" onClick={() => settoggleDropdown(false)}> My Profile</Link>
                            <Link href='/create-prompt' className="dropdown_link" onClick={() => settoggleDropdown(false)}> Create Promot</Link>
                            <button type="button" onClick={() => { settoggleDropdown(false); signOut(); }} className="mt-5 w-full black_btn"> Sign Out</button>
                        </div>)}
                    </div>) : ((<>
                        {providers && Object.values(providers).map((provider) => (<button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                            Sign In
                        </button>))}
                    </>))}

            </div>

        </nav>
    );
}

export default Navbar;
