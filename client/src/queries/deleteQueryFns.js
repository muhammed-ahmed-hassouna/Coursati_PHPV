import api from "../configs/api";

export async function softDeleteCourse(id) {
  const { data } = await api.delete(`/course/DeleteCourse/${id}`);
  return data;
}
