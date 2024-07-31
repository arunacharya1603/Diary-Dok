import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';

const CompletedDairies = ({ fetchData }) => {
  const [Data, setData] = useState([]);
  const BASE_URL = process.env.BASE_URL;
  const [error, setError] = useState(null);

  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }), []);

  const fetchCompletedData = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v2/get-complete-post`, { headers });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching completed dairies", error);
      setError("Failed to fetch completed dairies. Please try again later.");
    }
  },[headers]);

  useEffect(() => {
    if (headers.id && headers.authorization) {
      fetchCompletedData();
    }
  }, [headers, fetchCompletedData]);

  return (
    <div>
 {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <Cards home={"false"} data={Data} fetchData={fetchCompletedData} />
      )}    </div>
  );
};

export default CompletedDairies;
