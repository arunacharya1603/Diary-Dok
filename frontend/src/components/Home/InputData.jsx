import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { GiCrossMark } from "react-icons/gi";


const InputData = ({
  
  input,
  setInput,
  updatedData,
  setUpdatedData,
  fetchData,
}) => {



  const headers = useMemo(()=>({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }), []);

  const [Data, setData] = useState({ title: "", desc: "" });
  const BASE_URL = process.env.BASE_URL;

  useEffect(() => {
    setData({ title: updatedData.title, desc: updatedData.desc });
  }, [updatedData]);

  useEffect(() => {
    if (input === "hidden") {
      setUpdatedData({ id: "", title: "", desc: "" });
      setData({ title: "", desc: "" });
    }
  }, [input, setUpdatedData]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("Please fill all the fields");
    } else {
      await axios.post(`${BASE_URL}/api/v2/create-post`, Data, {
        headers,
      });
      setData({ title: "", desc: "" });
      setInput("hidden");
      fetchData();
    }
  };

  const updateDairy = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("Please fill all the fields");
    } else {
      await axios.put(
        `${BASE_URL}/api/v2/update-post/${updatedData.id}`,
        Data,
        {
          headers,
        }
      );
      setUpdatedData({
        id: "",
        title: "",
        desc: "",
      });
      setData({ title: "", desc: "" });
      setInput("hidden");
      fetchData();
    }
  };

  return (
    <>
      <div
        className={` ${input === "fixed" ? "fixed" : "hidden"} top-0 left-0 bg-custom-gradient opacity-50 h-screen w-full`}
      ></div>
      <div
        className={` ${input === "fixed" ? "fixed" : "hidden"} top-0 left-0 flex lg:items-center md:items-center lg:justify-center md:justify-center justify-end items-center h-screen w-full`}
      >
        <div className="lg:w-2/6 md:w-2/6 w-10/12 bg-custom-gradient1 p-4 rounded">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setInput("hidden");
                setUpdatedData({
                  id: "",
                  title: "",
                  desc: "",
                });
              }}
              className="hover:scale-105 transition-all duration-300"
            >
              <GiCrossMark className="text-2xl cursor-pointer" />
            </button>
          </div>
          <input
            value={Data.title}
            onChange={change}
            type="text"
            placeholder="title"
            name="title"
            className="px-3 py-2 rounded w-full mt-2"
          />

          <textarea
            value={Data.desc}
            onChange={change}
            name="desc"
            id=""
            placeholder="Enter the memo..."
            cols="30"
            rows="10"
            className="px-3 py-2 rounded w-full my-3"
          ></textarea>
          {updatedData.id === "" ? (
            <button
              onClick={submitData}
              className="px-3 py-2 shadow-lg font-semibold rounded bg-custom-gradient1 text-slate-300"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={updateDairy}
              className="px-3 py-2 shadow-lg font-semibold rounded bg-custom-gradient1 text-slate-300"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;