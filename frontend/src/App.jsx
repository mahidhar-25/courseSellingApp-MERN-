import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import LandingPage from "./components/LandingPage";
import { RecoilRoot } from "recoil";
import PurchasedCourses from "./components/PurchasedCourses";
import NavItems from "./components/NavItems";
import MyCourses from "./components/MyCourses";
// import SignUp from "./components/authentication/SignUp";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <div className="w-4/5 justify-center items-center mx-auto">
            <NavItems />
          </div>
          <Routes>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/home" element={<LandingPage />}></Route>
            <Route path="/myLearnings" element={<PurchasedCourses />}></Route>
            <Route path="myCourses" element={<MyCourses />}></Route>

            {/* <Route path="/signup" element={<SignUp />}></Route> */}
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
export default App;
