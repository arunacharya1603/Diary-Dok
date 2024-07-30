import React, { useEffect, useState, useMemo, useCallback } from "react";
import { CgNotes } from "react-icons/cg";
import { AiOutlineFileDone } from "react-icons/ai";
import { TbNotesOff } from "react-icons/tb";
import { MdLabelImportant } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logout as logOut } from "../../store/auth";

const SideBar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All memories",
      icons: <CgNotes />,
      link: "/",
    },
    {
      title: "Completed Diaries",
      icons: <AiOutlineFileDone />,
      link: "/completeddairies",
    },
    {
      title: "Incompleted Diaries",
      icons: <TbNotesOff />,
      link: "/incompleteddairies",
    },
    {
      title: "Important Memories",
      icons: <MdLabelImportant />,
      link: "/importantmemories",
    },
  ];

  const [Data, setData] = useState();

  const logout = () => {
    dispatch(logOut());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };

  // useEffect(() => {
  //   const headers = {
  //     id: localStorage.getItem("id"),
  //     authorization: `Bearer ${localStorage.getItem("token")}`,
  //   };

  //   const fetch = async () => {
  //     const response = await axios.get("http://localhost:1000/api/v2/get-all-post", { headers });
  //     setData(response.data.data);
  //   };

  //   if (headers.id && headers.authorization) {
  //     fetch();
  //   }
  // }, []);

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
        "http://localhost:1000/api/v2/get-all-post",
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

  // useEffect(() => {
  //   const fetch = async () => {
  //     const response = await axios.get("http://localhost:1000/api/v2/get-all-post", { headers });
  //     setData(response.data.data);
  //   };
  //   if (headers.id && headers.authorization) {
  //     fetch();
  //   }
  // }, [headers]);

  return (
    <>
      {Data && (
        <div>
          <h2 className="lg:text-2xl md:text-xl text-sm lg:font-semibold md:font-semibold font-bold">
            {Data.username}
          </h2>
          <h4 className="md:my-2 lg:text-gray-900 md:text-gray-950 md:block lg:block hidden">
            {Data.email}
          </h4>
          <hr className="my-5" />
        </div>
      )}
      <div className="">
        <h2 className="text-xl hidden lg:block md:block font-semibold">
          Diaries
        </h2>
        <ul className="my-2">
          {data.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="my-2 flex items-center text-gray-900 hover:bg-sky-700 p-1 rounded transition-all duration-300 w-full"
            >
              <span className="block my-12 text-4xl lg:hidden">{item.icons}</span>
              <span className="hidden lg:flex items-center">
                {item.icons}&nbsp; {item.title}
              </span>
            </Link>
          ))}
        </ul>
      </div>
      <div>
        <button
          onClick={logout}
          className="group flex items-center justify-start w-11 h-11 bg-custom-gradient1 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
        >
          <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Logout
          </div>
        </button>
      </div>
    </>
  );
};

export default SideBar;
