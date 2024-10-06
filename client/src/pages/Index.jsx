import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ui/ScrollToTop";
import Login from "./website/login";
import UnAuthorized from "./website/Unauthorized";
import NotFound from "./website/NotFound";
import SignUp from "./website/signup";
import TopNav from "../shared/TopNav";
import TeacherIndex from "./website/Teacher";
import ProtectedRoute from "./../providers/ProtectedRoute";
import StudentIndex from "./website/Student";

export default function Index() {
  return (
    <>
      <ScrollToTop />
      <TopNav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
          <Route path="/" element={<StudentIndex />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Teacher"]} />}>
          <Route path="/teacher" element={<TeacherIndex />} />
        </Route>
      </Routes>
    </>
  );
}
