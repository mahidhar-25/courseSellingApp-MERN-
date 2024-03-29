import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import LandingPage from "./components/LandingPage";
import { RecoilRoot, useRecoilValue } from "recoil";
import PurchasedCourses from "./components/PurchasedCourses";
import NavItems from "./components/NavItems";
import MyCourses from "./components/MyCourses";
import CourseDetails from "./components/CourseDetails";
// import SignUp from "./components/authentication/SignUp";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>

            <Route path="/home" element={<LandingPage />}></Route>
            <Route path="/myLearnings" element={<PurchasedCourses />}></Route>
            <Route path="myCourses" element={<MyCourses />}></Route>
            <Route
              path="/course/:courseTitle"
              element={<CourseDetails />}
            ></Route>

            {/* <Route path="/signup" element={<SignUp />}></Route> */}
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
export default App;
