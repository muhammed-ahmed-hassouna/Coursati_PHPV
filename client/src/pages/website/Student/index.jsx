import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePublicContext } from "../../../providers/PublicContextProvider";
import { useQuery } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { getAllCourses } from "../../../queries/getQueryFns";
import Student from "./student";
import Details from "./details";

export default function StudentIndex() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [clickCard, setClickCard] = useState(false);
  const { setIsLoading } = usePublicContext();
  const [selectedDetails, setSelectedDetails] = useState(null);

  const {
    data: allCourses,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allCourses"],
    queryFn: getAllCourses,
  });

  const handleClickCard = (courseData) => {
    setSelectedDetails(courseData);
    setClickCard(true);
  };

  const handleCancelClick = () => {
    setClickCard(false);
  };

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending, setIsLoading]);

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching data");
    }
  }, [isError]);

  // Extract unique teachers from the courses data
  const uniqueTeachers = Array.from(
    new Set(
      allCourses?.data?.map((course) => JSON.stringify(course?.teacher))
    )
  ).map((teacher) => JSON.parse(teacher));

  return (
    <>
      {clickCard ? (
        <Details onCancel={handleCancelClick} data={selectedDetails} />
      ) : (
        <Student
          uniqueTeachers={uniqueTeachers}
          allCourses={allCourses}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
          handleClickCard={handleClickCard}
        />
      )}
    </>
  );
}
