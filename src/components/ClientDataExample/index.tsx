'use client';
import {useEffect, useState} from "react";

const ClientComponent = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8081/wt/api/nextjs/v1/page_relative_urls/')
            .then((data) => {
                return data.json()
            }).then((result) => {
                setData(result)
            })
    }, []);

    return (
        <div>
            <h2>data from client</h2>
            {data.items && data.items.map((menuItem) => {
                return <p key={menuItem.relative_url}>{menuItem.title}</p>
            })}
        </div>
    )
}

export default ClientComponent
