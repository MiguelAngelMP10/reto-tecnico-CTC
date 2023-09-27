"use client";
import {useEffect, useState} from 'react';
import {PacmanLoader} from "react-spinners";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Menu from "@/app/components/Menu";

export default function Index() {

    let [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch('http://127.0.0.1:8000/api/tasks');
                const data = await response.json();
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
                setData(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }

        fetchData().then();
    }, []);

    function handleClick(id) {
        setLoading(true);

        fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((dataResponse) => {

                const rowUpdate = data?.data?.map((item) => {
                    if (item.id === id) {
                        return {...dataResponse.data, disabled: true};
                    }
                    return item;
                });
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
                toast.success("Your like was added!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: 'foo-bar'
                });

                setData({data: rowUpdate});
            })
            .catch((error) => {
                console.error('Error:', error);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            });

    }

    return (
        <>
            <Menu></Menu>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">

                <PacmanLoader color="#36d7b7" size={50} loading={loading}/>
                <ToastContainer/>
                <div className="my-5">
                    <Link
                        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        href="/Tacks/NewTack">
                        <i className="fa-solid fa-plus"></i> Add new tack
                    </Link>
                </div>
                <div className="relative overflow-x-auto">

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Titulo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha de creación
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estado de la república
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre del creador
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Número de likes
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>

                        {data.data?.map((item, index) => (

                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={index}>
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.title}
                                </th>
                                <td className="px-6 py-4">
                                    {item.description}
                                </td>
                                <td className="px-6 py-4">
                                    {item.created_at}
                                </td>
                                <td className="px-6 py-4">
                                    {item.state.abbreviation} {item.state.name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.user.name}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {item.number_of_likes}
                                </td>
                                <td className="px-6 py-4 text-right">

                                    <button
                                        onClick={() => handleClick(item.id)}
                                        disabled={item.disabled}
                                        type="button"
                                        className={item.disabled ? 'text-white bg-blue-100 dark:bg-blue-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-not-allowed ' : 'text-white bg-blue-400 dark:bg-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center '}

                                    ><i className="fa-regular fa-thumbs-up fa-2x"></i>
                                    </button>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


            </main>
        </>

    )
}
