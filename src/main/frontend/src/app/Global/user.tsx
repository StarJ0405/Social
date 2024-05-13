"use client";
import axios from "axios";
import { useState,useEffect } from 'react';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/app/api/UserAPI';

export function Profile() {
    const [user, setUser] = useState({});
    const ACCESS_TOKEN = typeof window === 'undefined' ? null :  localStorage.getItem('accessToken');
    useEffect(() => {
        if (ACCESS_TOKEN) {
            fetchUser()
            .then((response) => {
                setUser(response);
            }).catch((error) => {
                console.log(error);
            });
        } else
            redirect("/account/login");
    }, [ACCESS_TOKEN]);
     const handleLogout = async () => {
            localStorage.clear();
            window.location.href = `/account/login`;
    }
    return (
        <div>{user.nickname}<button onClick={handleLogout}>logout</button></div>
    );
}