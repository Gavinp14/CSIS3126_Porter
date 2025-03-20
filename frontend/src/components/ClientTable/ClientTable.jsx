import React, { useState, useEffect } from 'react';
import "./clienttable.css";
import ClientCard from '../ClientCard/ClientCard';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";

function ClientTable() {
    const [clientData, setClientData] = useState([]);
    const { getUserId, getToken } = useAuth();
    const userId = getUserId();
    const token = getToken();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:5000/api/v1/trainer_clients/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                console.log("API Response:", response.data); // Inspect the data
                // Access the 'clients' array from the response data
                setClientData(response.data.clients);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching clients:", error);
                console.log("userId:", userId, "token:", token); // Inspect userId and token
                setLoading(false);
            }
        };

        fetchClients();
    }, [userId, token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className='container d-flex justify-content-center flex-wrap py-5 client-table'>
                {clientData && clientData.length > 0 ? (
                    clientData.map((client) => (
                        <ClientCard
                            key={client.id}
                            first_name={client.first_name}
                            last_name={client.last_name}
                            age={client.age}
                            gender={client.gender}
                            hometown={client.hometown}
                            fitness_goals={client.fitness_goals}
                        />
                    ))
                ) : (
                    <p>No clients assigned yet</p>
                )}
            </div>
        </div>
    );
}

export default ClientTable;