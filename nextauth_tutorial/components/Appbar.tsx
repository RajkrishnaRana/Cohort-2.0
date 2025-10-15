"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Appbar = () => {
    const session = useSession();
    return (
        <div>
            <button onClick={() => signIn()}>Sign in</button>
            <button onClick={() => signOut()}>Sign Out</button>
            {JSON.stringify(session)}
        </div>
    );
};

export default Appbar;
