import React, { useCallback, useEffect } from "react";
import { filterToSearch, showNav } from "../store/atoms/nav";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  allCourses,
  myCourses,
  myPurchasedCourses,
} from "../store/atoms/courses";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const buttonClassText =
  "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2";

const allNavFalse = {
  allCourses: false,
  myLearnings: false,
  myCourses: false,
  addNewCourse: false,
};
function NavItems() {
  const navigate = useNavigate();
  const setFilter = useSetRecoilState(filterToSearch);
  const setPurchasedCourses = useSetRecoilState(myPurchasedCourses);
  const setAllCourses = useSetRecoilState(allCourses);
  const setMyCourses = useSetRecoilState(myCourses);

  const setNavBarSign = useSetRecoilState(showNav);
  const getAllCourses = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:3000/creator/courses`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(response.data);

      setAllCourses(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPurchasedCourses = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:3000/creator/purchasedCourses`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(response.data.purchasedCourses);

      setPurchasedCourses(response.data.purchasedCourses);
    } catch (e) {
      console.log(e);
    }
  };

  const getMyCourses = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:3000/creator/createdCourses`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      console.log(response.data.createdCourses);

      setMyCourses(response.data.createdCourses);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("i am use effect renendered");
    getAllCourses();
    getPurchasedCourses();
    getMyCourses();
  }, []);

  return (
    <div className="mt-4 ms-12 ps-10">
      <div className="max-w-md mb-3 shadow">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search something.."
          />
        </div>
      </div>
      <button
        type="button"
        className={buttonClassText}
        onClick={() => {
          setNavBarSign({ ...allNavFalse, allCourses: true });
          navigate("/home");
        }}
      >
        All Courses
      </button>
      <button
        type="button"
        className={buttonClassText}
        onClick={() => {
          setNavBarSign({ ...allNavFalse, myLearnings: true });
          navigate("/myLearnings");
        }}
      >
        My Learning
      </button>
      <button
        type="button"
        className={buttonClassText}
        onClick={() => {
          setNavBarSign({ ...allNavFalse, myCourses: true });
          navigate("/myCourses");
        }}
      >
        My Courses
      </button>

      <button type="button" className={buttonClassText}>
        Add new Course
      </button>
    </div>
  );
}

export default NavItems;
