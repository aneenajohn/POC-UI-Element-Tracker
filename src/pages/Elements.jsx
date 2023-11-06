import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Loader from '../components/Loader'
import { demoData } from "../MockData";
import {
  BUTTON_INITIAL_VALUES,
  INPUT_INITIAL_VALUES,
  BASE_URL,
  API,
} from "../constants";
import Alert from "../components/Alert";

export const Elements = () => {
  const [showModal, handleShowModal] = useState(false);
  const [loader, handleLoader] = useState(false);
  const [alert, handleAlert] = useState(false);
  const [data, setData] = useState([]);
  const [elementId, setElementId] = useState("");

  const getData = async () => {
    try {
      handleLoader(true);
      const response = await API.get("/");
      console.log("Resp: ", response.data);
      setData(response.data);
      handleLoader(false)
      setTimeout(() => {
        handleAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleEdit = () => {
    console.log("handle edit");
  };

  const handleClickDelete = (e, id) => {
    handleShowModal(true);
    setElementId(id);
    console.log("handle edit", id);
  };
  const handleDelete = async (e) => {
    handleShowModal(false);
    handleLoader(true);
    console.log(elementId);
    const response = await API.delete(`/${elementId}`);
    if (response.data.status === "SUCCESS") {
      handleAlert(true);
    }
    
    getData();
  };

  return (
    <>
   
    {loader ? <Loader/> : ""}
      {alert ? <Alert /> : ""}
      {showModal ? (
        <Modal
          show={loader}
          handleShowModal={handleShowModal}
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}
      <h5 className="mb-2 text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
        Pages and Elements
      </h5>
      <div className="flex gap-2 w-full flex-wrap justify-center text-center font-medium py-6">
        {data?.data?.map((value) => {
          return (
            <div
              className="block w-52 p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              key={value._id}
            >
              <div className="flex flex-row justify-between">
                <span className="cursor-pointer" onClick={handleEdit}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>
                <span
                  className="cursor-pointer"
                  onClick={(e) => handleClickDelete(e, value._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>
              </div>

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {Array.isArray(value.data)
                  ? value.data[0].pageName
                  : "No page "}
              </h5>
              <div className="font-normal text-gray-700 dark:text-gray-400">
                <h6 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
                  Elements
                </h6>
                <ul className="my-4 ">
                  {Array.isArray(value.data)
                    ? value.data.map((ele) => {
                        return <li>{ele?.elements[0]?.locator?.name || ""}</li>;
                      })
                    : null}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
