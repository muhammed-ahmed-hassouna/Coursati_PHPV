import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePublicContext } from "../../../providers/PublicContextProvider";
import { useQuery, useMutation } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { getCourseByTeacherId } from "../../../queries/getQueryFns";
import Teacher from "./teacher";
import { uploadCourse } from "../../../queries/postQueryFns";
import UploadCourse from "./uploadcourse";
import { softDeleteCourse } from "../../../queries/deleteQueryFns";
import UpdateCourse from "./updatecourse";
import { updateCourse } from "../../../queries/patchQueryFns";

export default function TeacherIndex() {
  const [onClickEdit, setOnClickEdit] = useState(false);
  const [onUploadClick, setOnUploadClick] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const { setIsLoading, userId } = usePublicContext();

  const {
    data: coursesData,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["coursesData"],
    queryFn: () => getCourseByTeacherId(userId),
  });

  const { mutateAsync: addCourseMutate } = useMutation({
    mutationFn: uploadCourse,
    onSuccess: (data) => {
      setOnUploadClick(false);
      toast.success("Course added successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error("Error adding course. Please try again.");
      console.error("Error adding course:", error);
    },
  });

  const { mutateAsync: DeleteCardMutate } = useMutation({
    mutationFn: softDeleteCourse,
    onSuccess: () => {
      toast.success("Course Deleted successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error("Error Deleting course. Please try again.");
      console.error("Error Deleting course:", error);
    },
  });

  const { mutateAsync: updateCourseMutate, isSuccess } = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      setOnClickEdit(false);
      refetch();
    },
    onError: (error) => {
      toast.error("Error updating Course. Please try again.");
      console.error("Error updating Course:", error);
    },
  });

  const handleUploadClick = () => {
    setOnUploadClick(true);
  };

  const handleCancelUpload = () => {
    setOnUploadClick(false);
  };

  const handleEditClick = (details) => {
    setSelectedDetails(details);
    setOnClickEdit(true);
  };

  const handleCancelEdit = () => {
    setSelectedDetails(null);
    setOnClickEdit(false);
  };

  const handleSaveUpload = async (newData) => {
    const serializableData = {
      course_name: newData.course_name,
      description: newData.description,
      startDate: newData.startDate,
      endDate: newData.endDate,
      image: newData.image,
      video: newData.video,
    };

    try {
      await addCourseMutate({
        formData: serializableData,
      });
      refetch();
      setOnUploadClick(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSaveUpdate = async (updatedData) => {
    const serializableData = {
      course_name: updatedData.course_name,
      description: updatedData.description,
      startDate: updatedData.startDate,
      endDate: updatedData.endDate,
      image: updatedData.image,
      video: updatedData.video,
    };

    try {
      await updateCourseMutate({
        id: selectedDetails?.id,
        updatedData: serializableData,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleDeleteCard = async (id) => {
    try {
      await DeleteCardMutate(id);
      refetch();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending, setIsLoading]);

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching data");
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully!");
    }
  }, [isSuccess]);
  return (
    <>
      {onUploadClick ? (
        <UploadCourse onCancel={handleCancelUpload} onSave={handleSaveUpload} />
      ) : onClickEdit ? (
        <UpdateCourse
          data={selectedDetails}
          onCancel={handleCancelEdit}
          onSave={handleSaveUpdate}
        />
      ) : (
        <Teacher
          data={coursesData}
          handleUploadClick={handleUploadClick}
          handleDeleteCard={handleDeleteCard}
          handleEditClick={handleEditClick}
        />
      )}
    </>
  );
}
