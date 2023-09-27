import React from 'react';
import Menu from "@/app/components/Menu";

function NewTack() {
    return (
        <>
            <Menu></Menu>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">

                <div>
                    <h1>add new tack add</h1>
                    <p>This is the content of my new page.</p>
                </div>
            </main>
        </>

    );
}

export default NewTack;
