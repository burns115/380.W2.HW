import {useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:3000";

export const useFetch = (url) => {
    const[data, setData] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(undefined);

    useEffect(() => {
        const getData = async () => {

            setError(undefined);

            try {
                const response = await axios.get(`${baseUrl}/${url}`)
                setData(response.data)
            } catch (error) {
                setError(error);
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [url]);

    return { data, loading, error };
}

export default useFetch;