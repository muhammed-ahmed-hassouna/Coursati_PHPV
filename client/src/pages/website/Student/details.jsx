import { FiArrowRight, FiCalendar } from "react-icons/fi";

const Details = ({ onCancel, data }) => {
  console.log("data", data);
  return (
    <>
      <div className="p-20 flex flex-col">
        <div className="flex-1">
          <div
            className="cursor-pointer p-2 flex items-center bg-[#fbbf24] bg-opacity-55 w-fit rounded-lg mb-2  hover:bg-opacity-80 transition ease-out duration-500"
            onClick={onCancel}
          >
            <FiArrowRight className="mr-2" />
            <span>Go Back</span>
          </div>
          <div className="w-full h-96 mb-4">
            <img
              className="w-full h-full object-cover rounded-md"
              src={data?.image}
              alt="NoImage"
            />
          </div>
          <div>
            <p className="text-5xl break-words mt-4">{data?.course_name}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-1 lg:gap-4 sm:gap-6">
            <div>
              <p className="text-sm bg-[#fbbf24] rounded-lg w-fit p-1">
                Teacher: {data?.teacher?.username}
              </p>
            </div>
            <div>
              <p className="text-sm bg-[#fbbf24] rounded-lg w-fit p-1 flex items-center">
                Start:{" "}
                {data?.startDate
                  ? new Date(data?.startDate).toISOString().split("T")[0]
                  : ""}
                <FiCalendar className="ml-2" />
              </p>
            </div>
            <div>
              <p className="text-sm bg-[#fbbf24] rounded-lg w-fit p-1 flex items-center">
                End:{" "}
                {data?.endDate
                  ? new Date(data?.endDate).toISOString().split("T")[0]
                  : ""}
                <FiCalendar className="ml-2" />
              </p>
            </div>
          </div>
          <div>
            <p className="break-words overflow-hidden text-xl mt-2 lg:w-2/3">
              {data?.description}
            </p>
          </div>
        </div>
        <div className="flex-1 mt-8">
          <div className="w-full h-96">
            <video
              src={data?.video}
              className="w-full h-full object-cover rounded-md"
              controls
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
