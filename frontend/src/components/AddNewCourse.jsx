import React, { useCallback, useRef } from "react";
import axios from "axios";
function AddNewCourse({ setAddNewCourse }) {
  const courseTitleRef = useRef("");
  const courseDescriptionRef = useRef("");
  const coursePriceRef = useRef(0);
  const courseImageUrlRef = useRef("");

  const addNewCourse = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log({
      title: courseTitleRef.current.value,
      description: courseDescriptionRef.current.value,
      price: parseInt(coursePriceRef.current.value),
      image: courseImageUrlRef.current.value,
    });
    try {
      const response = await axios.post(
        `http://localhost:3000/creator/createCourse`,
        {
          title: courseTitleRef.current.value,
          description: courseDescriptionRef.current.value,
          price: parseInt(coursePriceRef.current.value),
          image: courseImageUrlRef.current.value,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      courseTitleRef.current.value = "";
      courseDescriptionRef.current.value = "";
      coursePriceRef.current.value = 0;
      courseImageUrlRef.current.value = "";
      console.log(response.data);
      setAddNewCourse((value) => !value);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div>
      <form
        className="max-w-md mx-auto"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            ref={courseTitleRef}
            type="text"
            name="courseTitle"
            id="courseTitle"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label
            htmlFor="courseTitle"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            ref={courseDescriptionRef}
            type="text"
            name="description"
            id="description"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            ref={coursePriceRef}
            type="number"
            min="0"
            step="1"
            name="price"
            id="price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="price"
            className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Price
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            ref={courseImageUrlRef}
            type="text"
            name="imageUrl"
            id="imageUrl"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="imageUrl"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Image Url
          </label>
        </div>
        <button
          onClick={addNewCourse}
          className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddNewCourse;
