import { useFormik } from "formik";
import CustomInput from "../../../components/ui/custom-inputs/CustomInput";
import Label from "../../../components/ui/custom-inputs/Label";
import FilledButton from "../../../components/ui/buttons/FilledButton";
import { FiSave } from "react-icons/fi";
import ErrorFormik from "../../../components/ui/ErrorFormik";
import { courseSchema } from "../../../utils/forms-schemas";
import ImageUploader from "../../../shared/Image/ImageUploader";
import VideoUploader from "../../../shared/Video/VideoUploader";

const UpdateCourse = ({ data, onCancel, onSave }) => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setValues,
    values,
    isValid,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      course_name: data?.course_name || "",
      description: data?.description || "",
      startDate: data?.startDate
        ? new Date(data.startDate).toISOString().split("T")[0]
        : "",
      endDate: data?.endDate
        ? new Date(data.endDate).toISOString().split("T")[0]
        : "",
      image: data?.image || "",
      video: data?.video || "",
    },
    validationSchema: courseSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  const handleImageSelect = (imageUrl) => {
    setFieldValue("image", imageUrl);
  };

  const handleVideoSelect = (videoUrl) => {
    setFieldValue("video", videoUrl);
  };

  return (
    <div className="max-w-[1980px] rounded-xl bg-white px-4 text-black shadow-lg">
      <div className="mt-4 max-w-[1980px] bg-white p-4 px-4 text-black shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Update Course</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <ImageUploader onImageSelect={handleImageSelect} />
            {values?.image && (
              <img
                src={values?.image}
                alt="Selected"
                className="mt-2  h-auto max-w-full rounded-md"
                style={{ maxHeight: "200px" }}
              />
            )}
            <Label text="Image URL" />
            <CustomInput
              type="text"
              name="image"
              value={values?.image}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={errors?.image}
              error={errors?.image}
              isTouched={touched?.image}
            />
          </div>
          <div className="mb-4">
            <VideoUploader onVideoSelect={handleVideoSelect} />
            {values?.video && (
              <video
                src={values?.video}
                alt="Selected"
                className="mt-2 h-auto max-w-full rounded-md"
                style={{ maxHeight: "200px" }}
                controls
              />
            )}
            <Label text="Video URL" />
            <CustomInput
              type="text"
              name="video"
              value={values?.video}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={errors?.video}
              error={errors?.video}
              isTouched={touched?.video}
            />
          </div>
          <div className="mb-4">
            <Label text="Course Name" />
            <CustomInput
              type="text"
              name="course_name"
              value={values?.course_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={errors?.course_name}
              error={errors?.course_name}
              isTouched={touched?.course_name}
            />
          </div>
          <div className="mb-4">
            <Label text="Description" />
            <CustomInput
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={errors?.description}
              error={errors?.description}
              isTouched={touched?.description}
            />
          </div>
          <div className="mb-4">
            <Label text="Start Date" />
            <CustomInput
              type="date"
              name="startDate"
              value={values?.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={errors?.startDate}
              error={errors?.startDate}
              isTouched={touched?.startDate}
            />
          </div>
          <div className="mb-4">
            <Label text="End Date" />
            <CustomInput
              type="date"
              name="endDate"
              value={values?.endDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={errors?.endDate}
              error={errors?.endDate}
              isTouched={touched?.endDate}
            />
          </div>
          <div className="flex justify-end">
            <FilledButton
              text="Cancel"
              isButton={true}
              onClick={onCancel}
              buttonType="button"
              className="mr-2 rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
              width="w-20"
            />
            <FilledButton
              text="Save"
              isButton={true}
              onClick={onSave}
              icon={
                <div className="m-1">
                  <FiSave />
                </div>
              }
              buttonType="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              width="w-20"
              isDisable={!isValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateCourse;
