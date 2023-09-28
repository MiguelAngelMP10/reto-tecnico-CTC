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
    const [search, setSearch] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [states, setStates] = useState({})


    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch(`http://127.0.0.1:8000/api/tasks`);
                const data = await response.json();
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
                setData(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }

        async function getStates() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/states');
                const data = await response.json();
                setStates(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }

        fetchData().then();
        getStates().then();
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

    const deleteRow = (id) => {
        if (confirm("Are you sure about deleting the task?")) {
            fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((dataResponse) => {

                    toast.success(dataResponse.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });


                    const newData = data?.data?.filter((item) => {
                        if (item.id !== id) {
                            return item;
                        }
                    });
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);

                    console.log(newData);

                    setData({data: newData});
                })
                .catch((error) => {
                    toast.error(error.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        className: 'foo-bar'
                    });
                });
        }
    }

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };
    const searchByFilter = async () => {
        let filter = getFilter(search, selectedValue);

        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/api/tasks${filter}`);
            const data = await response.json();
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            setData(data);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    const getFilter = (title, state) => {
        return `?filter[title]=${title}&filter[state]=${state}`;
    }
    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    };
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
                            <th scope="col" className="px-6 py-3 text-center" colSpan={3}>
                                Acciones
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <label htmlFor="default-search"
                                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search"
                                           className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Search by title"
                                           value={search}
                                           onChange={handleInputChange}
                                    />
                                    <button type="button" onClick={searchByFilter}
                                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <i className="fa-solid fa-magnifying-glass"></i> Search
                                    </button>
                                </div>

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="min-w-max">
                                <select value={selectedValue} onChange={handleSelectChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Select an option</option>
                                    {states.data?.map((row) => (
                                        <option key={row.id} value={row.id}>
                                            {row.abbreviation} {row.name}
                                        </option>
                                    ))}
                                </select>

                                <button type="button" onClick={searchByFilter}
                                        className="text-white w-full mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    <i className="fa-solid fa-magnifying-glass"></i> Search
                                </button>

                            </th>
                            <th scope="col" className="px-6 py-3">
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                            <th scope="col" className="px-6 py-3 text-center" colSpan={3}>

                            </th>
                        </tr>
                        </thead>
                        <tbody>

                        {data.data?.map((item, index) => (

                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={index}>
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.id} {item.title}
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
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleClick(item.id)}
                                        disabled={item.disabled}
                                        type="button"
                                        className={item.disabled ? 'text-white bg-blue-100 dark:bg-blue-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-not-allowed ' : 'text-white bg-blue-400 dark:bg-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center '}

                                    ><i className="fa-regular fa-thumbs-up fa-2x"></i>
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {item.number_of_likes === 0 ?
                                        <button
                                            onClick={() => deleteRow(item.id)}
                                            type="button"
                                            className='text-white bg-red-400 dark:bg-red-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center '

                                        ><i className="fa-solid fa-trash fa-2x"></i>
                                        </button> : 'It cannot be deleted because it has likes'
                                    }

                                </td>
                                <td className="px-6 py-4 text-center">

                                    <Link
                                        className="my-5 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-4  dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                                        href={`/Tacks/EditTack/${item.id}`}>
                                        <i className="fa-solid fa-edit fa-2x"></i>
                                    </Link>

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
