import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';

const ImportantMemories = () => {
  const [Data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }), []);

  const fetchCompletedData = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v2/get-imp-post`, { headers });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching important memories", error);
    }
  }, [headers, BASE_URL]);

  useEffect(() => {
    if (headers.id && headers.authorization) {
      fetchCompletedData();
    }
  }, [headers, fetchCompletedData]);

  return (
    <div>
      <Cards home={"false"} data={Data} fetchData={fetchCompletedData} />
    </div>
  );
};

export default ImportantMemories;
