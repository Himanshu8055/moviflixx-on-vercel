"use client"
import React, { useState, useRef } from 'react';
import Styles from '@/app/styles/input.module.css';
import { useRouter, usePathname } from 'next/navigation'; // Correct import for usePathname

const Input: React.FC = () => {
    let [search, setSearch] = useState("");
    const router = useRouter(); // Use useRouter hook correctly
    let pathname = usePathname().toString();

    if (pathname.startsWith("/trending")) {
        pathname = "/trending";
    } else if (pathname.startsWith("/bollywood")) {
        pathname = "/bollywood";
    } else if (pathname.startsWith("/hollywood")) {
        pathname = "/hollywood";
    } else if (pathname.startsWith("/south")) {
        pathname = "/south";
    } else if (pathname.startsWith("/series")) {
        pathname = "/series";
    } else {
        pathname = "";
    }

    
    // Localhost
    // const searchResult = `http://localhost:3000${pathname}/${search}`;

    // Main
    const searchResult = `http://moviflixx.vercel.app${pathname}/${search}`;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(searchResult); // Correct usage of router.push
        setSearch('')
    }


    return (
        <form onSubmit={handleSubmit} className='mt-0'>
            <div className={Styles.form__group}>
                <input type="input" className={Styles.form__field} placeholder="Search Here..." onChange={(e) => {setSearch(e.target.value)}}/>
                <label htmlFor="name" className={Styles.form__label}>Search Here...</label>
            </div>
        </form>
    );
}

export default Input;