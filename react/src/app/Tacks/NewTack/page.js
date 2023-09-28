"use client";
import React, {useState} from 'react';
import Menu from "@/app/components/Menu";

function NewTack() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        let body = JSON.stringify(formObject);

        const response = await fetch('http://127.0.0.1:8000/api/tasks', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        })

    };

    return (
        <>
            <Menu></Menu>
            <div className="flex flex-col items-center">

                <h1 className='text-4xl font-bold text-blue-500 text-center ali'>Add new tack</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Title
                        </label>
                        <input type="text" id="title" name='title'
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                               placeholder="" required/>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Description
                        </label>
                        <input type="text" id="description" name='description'
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                               placeholder="" required/>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="created_at"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Created at
                        </label>


                        <input type="datetime-local" id="created_at" name='created_at'
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Select date"/>
                    </div>


                    <label htmlFor="state_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State of the Republic</label>
                    <select id="state_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>


                    <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name of the creator</label>
                    <select id="user_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a country</option>

                    </select>


                    <button type="submit"
                            className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
                        new account
                    </button>
                </form>
            </div>
        </>

    );
}

export default NewTack;
