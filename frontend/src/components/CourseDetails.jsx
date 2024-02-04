import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { filteredAllCourses } from "../store/atoms/courses";
import { useRecoilValue } from "recoil";
import NavItems from "./NavItems";
import { loading } from "../store/atoms/nav";

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

  return (
    <div>
      <NavItems />
      {!loadingValue && (
        <div className="h-50v bg-gray-800 text-white ">
          <div className="h-full p-5 flex flex-row justify-around  content-center items-center">
            {course && (
              <>
                <div className="items-center">
                  <div>
                    <h1 className="text-6xl font-semibold hover:font-bold cursor-pointer">
                      {course.title}
                    </h1>
                    <p>{course.description}</p>
                  </div>
                </div>
                <div className="justify-center content-center ">
                  <div>
                    <img
                      height="300"
                      width="400"
                      src={course.image}
                      alt="image course"
                    />
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
