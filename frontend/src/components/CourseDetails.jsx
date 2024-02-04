import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filteredAllCourses } from "../store/atoms/courses";
import { useRecoilValue } from "recoil";
import NavItems from "./NavItems";
import { loading } from "../store/atoms/nav";
import { Rating, Typography } from "@material-tailwind/react";

function CourseDetails() {
  const { courseTitle } = useParams();
  const AllCourses = useRecoilValue(filteredAllCourses);
  const [course, setCourse] = useState(undefined);
  const loadingValue = useRecoilValue(loading);
  useEffect(() => {
    if (!loadingValue) {
      const title = courseTitle.replaceAll("_", " ");
      AllCourses.forEach((course) => {
        if (course.title === title) {
          setCourse(course);
          console.log(course);
        }
      });
    }
  }, [loadingValue]);

  const showCourse = () => {
    return JSON.stringify(course);
  };

  const getDateMonthYearFormatString = useCallback((dateString) => {
    const dateObject = new Date(dateString);
    const month = dateObject.getUTCMonth() + 1; // Adding 1 because months are zero-indexed
    const year = dateObject.getUTCFullYear();
    const day = dateObject.getUTCDate();

    const newDate = `${day}/${month}/${year}`;
    return newDate;
  }, []);
  return (
    <div>
      <NavItems />
      {!loadingValue && (
        <div className="h-50v bg-gray-800 text-white ">
          <div className="h-full px-5 py-2 flex flex-row justify-around content-center items-center">
            {course && (
              <>
                <div className="items-center">
                  <div className="mx-auto">
                    <h1 className="text-6xl font-semibold hover:font-bold cursor-pointer">
                      {course.title}
                    </h1>
                    <p className="my-3 text-wrap">
                      {course.description.length > 300
                        ? course.description.slice(0, 300) + "..."
                        : course.description}
                    </p>
                    <div className="flex items-center gap-2 font-bold text-white m-2">
                      {course.details.rating}

                      <Rating
                        value={Math.floor(course.details.rating)}
                        readonly
                        className="my-2"
                      />
                      <Typography
                        color="white"
                        className="font-medium text-white-gray-500"
                      >
                        <span
                          className=" text-blue-400 
                   hover:text-rose-900 text-sm my-2"
                        >
                          ({course.details.noOfPeopleRated} ratings)
                        </span>
                        {course.details.noOfPeoplePurchased}students
                      </Typography>
                    </div>

                    <p className="my-2 text-md">
                      price :{" "}
                      <span className="text-bold text-yellow-200">
                        ${course.price}
                      </span>
                    </p>
                    <p className="my-2">
                      creator :{" "}
                      <a
                        href="#"
                        className="underline text-blue-400 
                   hover:text-rose-900 
                   visited:text-rose-700"
                      >
                        {course.creatorUsername}
                      </a>
                    </p>
                    <p className="text-sm my-2">
                      <span>
                        last updated{" "}
                        {getDateMonthYearFormatString(
                          course.details.lastUpdatedOn
                        )}
                        ,
                      </span>
                      <span className="mx-3 ">
                        {""}
                        created on{" "}
                        {getDateMonthYearFormatString(course.details.createdOn)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="justify-center content-center ">
                  <div className="">
                    <img src={course.image} alt="image course" />
                  </div>
                </div>
              </>
            )}

            {!course && <h3>There is no such course</h3>}
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;
