import { useFormik } from "formik";
import CustomInput from "../../../components/ui/custom-inputs/CustomInput";
import Label from "../../../components/ui/custom-inputs/Label";
import FilledButton from "../../../components/ui/buttons/FilledButton";
import { FiSave } from "react-icons/fi";
import ErrorFormik from "../../../components/ui/ErrorFormik";
import { courseSchema } from "../../../utils/forms-schemas";
import ImageUploader from "../../../shared/Image/ImageUploader";
import VideoUploader from "../../../shared/Video/VideoUploader";

const UploadCourse = ({ onCancel, onSave }) => {
  const formik = useFormik({
    initialValues: {
      course_name: "",
      description: "",
      startDate: "",
      endDate: "",
      image: "",
      video: "",
    },
    validationSchema: courseSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  const handleImageSelect = (imageUrl) => {
    formik.setFieldValue("image", imageUrl);
  };

  const handleVideoSelect = (videoUrl) => {
    formik.setFieldValue("video", videoUrl);
  };

  return (
    <div className="max-w-[1980px] rounded-xl bg-white px-4 text-black shadow-lg">
      <div className="mt-4 max-w-[1980px] bg-white p-4 px-4 text-black shadow-lg">
        <h3 className="mb-4 text-xl font-semibold">Upload Course</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <ImageUploader onImageSelect={handleImageSelect} />
            {formik.values.image && (
              <img
                src={formik.values.image}
                alt="Selected"
                className="mt-2  h-auto max-w-full rounded-md"
                style={{ maxHeight: "200px" }}
              />
            )}
            <Label text="Image URL" />
            <CustomInput
              type="text"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={formik.errors.image}
              error={formik.errors.image}
              isTouched={formik.touched.image}
            />
          </div>
          <div className="mb-4">
            <VideoUploader onVideoSelect={handleVideoSelect} />
            {formik.values.video && (
              <video
                src={formik.values.video}
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
              value={formik.values.video}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={formik.errors.video}
              error={formik.errors.video}
              isTouched={formik.touched.video}
            />
          </div>
          {/*
  Repeat the same structure for other form fields 
*/}
          <div className="mb-4">
            <Label text="Course Name" />
            <CustomInput
              type="text"
              name="course_name"
              value={formik.values.course_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={formik.errors.course_name}
              error={formik.errors.course_name}
              isTouched={formik.touched.course_name}
            />
          </div>
          <div className="mb-4">
            <Label text="Description" />
            <CustomInput
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={formik.errors.description}
              error={formik.errors.description}
              isTouched={formik.touched.description}
            />
          </div>
          <div className="mb-4">
            <Label text="Start Date" />
            <CustomInput
              type="date"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={formik.errors.startDate}
              error={formik.errors.startDate}
              isTouched={formik.touched.startDate}
            />
          </div>
          <div className="mb-4">
            <Label text="End Date" />
            <CustomInput
              type="date"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
              withFocus={true}
              shape={3}
            />
            <ErrorFormik
              isError={formik.errors.endDate}
              error={formik.errors.endDate}
              isTouched={formik.touched.endDate}
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
              icon={<FiSave />}
              buttonType="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              width="w-20"
              isDisable={!formik.isValid || formik.isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadCourse;
