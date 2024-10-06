import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/,
      "Invalid password. Password must have 8 characters, with at least 1 number, uppercase, and special character"
    ),
});

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be at most 50 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/,
      "Invalid password. Password must have 8 characters, with at least 1 number, uppercase, and special character"
    )
    .required("Password is required"),
  role: yup.string().min(5).required(),
});

export const courseSchema = yup.object().shape({
  course_name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: yup
    .string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  image: yup.mixed().required("Required"),
  video: yup.mixed().required("Required"),
  startDate: yup.date().required("Required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date must be after start date")
    .required("Required"),
});
