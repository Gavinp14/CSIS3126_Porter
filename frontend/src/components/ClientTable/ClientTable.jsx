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
                const response = await axios.get(
                    `http://127.0.0.1:5000/api/v1/trainer_clients/${userId}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log("Full API Response:", response.data);
                
                // Check if the response contains the clients array
                if (response.data && response.data.clients) {
                    setClientData(response.data.clients);
                } else {
                    console.warn("Unexpected API response structure:", response.data);
                    setClientData([]);
                }
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching clients:", error);
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
                    clientData.map((client) => {
                        // Debugging: Log each client object
                        console.log("Client object:", client);
                        
                        return (
                            <ClientCard
                                key={client.id || client.client_id} // Use whichever exists
                                client_id={client.id || client.client_id}
                                first_name={client.first_name}
                                last_name={client.last_name}
                                age={client.age}
                                gender={client.gender}
                                hometown={client.hometown}
                                fitness_goals={client.fitness_goals}
                            />
                        );
                    })
                ) : (
                    <p>No clients assigned yet</p>
                )}
            </div>
        </div>
    );
}

export default ClientTable;