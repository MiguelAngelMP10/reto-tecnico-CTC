"use client";
import {useEffect, useState} from 'react';
import Menu from "@/app/components/Menu";
import {useParams} from 'next/navigation'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function EditTack() {
    const {id} = useParams();
    const [data, setData] = useState({})
    const [numLikes, setNumLikes] = useState(0)


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setData(data?.data);
                setNumLikes(data?.data?.number_of_likes)
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }

        fetchData().then();
    }, []);

    const handleInputChange = (e) => {
        setNumLikes(e.target.value);
    };

    const editNumLikes = () => {
        fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify({number_of_likes: numLikes}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((dataResponse) => {

                toast.success("The number of likes of the task was edited", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: 'foo-bar'
                });

            })
            .catch((error) => {
                toast.error(error, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: 'foo-bar'
                });
            });

    };

    return (
        <>

            <Menu></Menu>
            <ToastContainer/>
            <main className="m-10">

                <form>
                    <h4 className="text-3xl my-4 font-bold dark:text-white">General</h4>

                    <div className="grid gap-6 mb-6 md:grid-cols-4">
                        <div>
                            <label
                                htmlFor="id"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                id
                            </label>
                            <input
                                type="text"
                                id="id"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.id}
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="title"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <textarea id="title" rows="4" value={data.title} disabled
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="description"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" rows="4" value={data.description} disabled
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                        <div>
                            <label
                                htmlFor="created_at"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Created at
                            </label>
                            <input
                                type="text"
                                id="created_at"
                                value={data.created_at}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                disabled
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="number_of_likes"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Number of likes
                            </label>
                            <input
                                type="number"
                                name='number_of_likes'
                                id="number_of_likes"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={numLikes}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div>
                            <label
                                htmlFor="id"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name of the creator
                            </label>
                            <input
                                type="text"
                                id="id"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.user?.name}
                                disabled
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="id"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                State
                            </label>
                            <input
                                type="text"
                                id="id"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.state?.name}
                                disabled
                            />
                        </div>
                    </div>


                    <button onClick={editNumLikes}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Edit
                    </button>
                    <Link
                        className="ml-5 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        href="/Tacks">
                        <i className="fa-solid fa-list"></i> Tacks
                    </Link>
                </form>

            </main>

        </>

    );
}