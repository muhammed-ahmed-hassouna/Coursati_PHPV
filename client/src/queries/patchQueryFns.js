import api from "../configs/api";

export async function updateCourse({ updatedData, id }) {
  const { data } = await api.patch(`/course/updateCourse/${id}`, updatedData);
  return data;
}
