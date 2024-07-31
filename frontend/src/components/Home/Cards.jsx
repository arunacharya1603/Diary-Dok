import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdOutlineFolderDelete } from "react-icons/md";
import { FcAddDatabase } from "react-icons/fc";
import axios from "axios";

const Cards = ({ home, setInput, data, setUpdatedData, fetchData }) => {
  // const [importantBtn, setImportantBtn] = useState("Incomplete");

  const URL = process.env.REACT_APP_BASE_URL;
  const headers = () => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const handleCompleteDairy = async (id) => {
    try {
      await axios.put(
        `${URL}/api/v2/update-complete-post/${id}`,
        {},
        { headers: headers() }
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportant = async (id) => {
    try {
      await axios.put(
        `${URL}/api/v2/update-imp-post/${id}`,
        {},
        { headers: headers() }
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    setInput("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const deleteDairy = async (id) => {
    try {
      await axios.delete(`${URL}/api/v2/delete-post/${id}`, {
        headers: headers(),
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between shadow-lg p-4 h-[16em] w-[18em] border-2 border-[rgba(48,27,73,0.5)] rounded-[1.5em] bg-gradient-to-br from-[#c8c9e4] to-[rgba(57,78,102,0.01)] text-black font-nunito"
            >
              <div>
                <h1 className="text-2xl font-semibold">{item.title}</h1>
                <p className="text-sm">{item.desc}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleCompleteDairy(item._id)}
                  className={` ${
                    item.complete === false
                      ? "bg-red-300"
                      : "bg-custom-gradient1"
                  } group flex items-center justify-start w-11 h-11 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1`}
                >
                  <div class="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                    <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div class="absolute right-1 transform translate-x-full opacity-0 text-white text-md font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    {item.complete === true ? "Completed" : "Incomplete"}
                  </div>
                </button>

                <div className="flex items-center w-3/6 text-2xl justify-around">
                  <button
                    onClick={() => handleImportant(item._id)}
                    className="hover:text-4xl transition-all duration-300"
                  >
                    {item.important === false ? (
                      <CiHeart />
                    ) : (
                      <FaHeart className="text-red-800" />
                    )}
                  </button>
                  {home !== "false" && (
                    <button
                      onClick={() =>
                        handleUpdate(item._id, item.title, item.desc)
                      }
                      className="hover:text-4xl transition-all duration-300"
                    >
                      <CiEdit />
                    </button>
                  )}

                  <button
                    onClick={() => deleteDairy(item._id)}
                    className="hover:text-4xl transition-all duration-300"
                  >
                    <MdOutlineFolderDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}

        {home === "true" && (
          <button
            onClick={() => setInput("fixed")}
            className="flex flex-col justify-center items-center hover:scale-105 hover:cursor-pointer transition-all duration-300 shadow-lg p-4 h-[16em] w-[18em] border-2 border-[rgba(48,27,73,0.5)] rounded-[1.5em] bg-gradient-to-br from-[#c8c9e4] to-[rgba(57,78,102,0.01)] text-black font-nunito"
          >
            <FcAddDatabase className="text-6xl" />
            <h1 className="text-2xl font-semibold mt-2">Add task</h1>
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
