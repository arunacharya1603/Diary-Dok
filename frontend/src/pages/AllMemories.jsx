import React, { useState, useEffect, useMemo, useCallback } from "react";
import Cards from "../components/Home/Cards";
import { FcAddDatabase } from "react-icons/fc";
import InputData from "../components/Home/InputData";
import axios from "axios";

const AllMemories = () => {
  const BASE_URL = process.env.BASE_URL;
  const [input, setInput] = useState("hidden");
  const [Data, setData] = useState();
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const headers = useMemo(
    () => ({
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    []
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v2/get-all-post`,
        { headers }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [headers]);

  useEffect(() => {
    if (headers.id && headers.authorization) {
      fetchData();
    }
  }, [headers, fetchData]);

  const handleAddButtonClick = () => {
    setInput("fixed");
    setUpdatedData({ id: "", title: "", desc: "" }); // Resetting updatedData
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-end lg:px-4 md:px-4 py-2">
          <button onClick={handleAddButtonClick}>
            <FcAddDatabase className="text-4xl hover:scale-105 transition-all duration-300" />
          </button>
        </div>
        {Data && (
          <Cards
            home={"true"}
            setInput={setInput}
            data={Data.dairy}
            setUpdatedData={setUpdatedData}
            fetchData={fetchData}
          />
        )}
      </div>
      <InputData
        input={input}
        setInput={setInput}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
        fetchData={fetchData}
      />
    </>
  );
};

export default AllMemories;
