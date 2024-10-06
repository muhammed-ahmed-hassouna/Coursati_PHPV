import api from "../configs/api";

export async function updateCourse({ updatedData, id }) {
  console.log("updatedData", updatedData);
  const { data } = await api.patch(`/course/updateCourse/${id}`, updatedData);
  return data;
}
