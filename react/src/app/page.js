"use client";
import {useEffect, useState} from 'react';

export default function list() {

    let [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/tasks');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }

        fetchData().then();
    }, []);


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                      <span
                                          className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                <i className="fa-regular fa-thumbs-up "></i>
                                      </span>
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>



        </main>
    )
}
