import FilledButton from "../../../components/ui/buttons/FilledButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FiCalendar, FiDelete, FiEdit } from "react-icons/fi";
import { ReactTyped } from "react-typed";
import imageSrc from "../../../assests/Images/image.png";

const Teacher = ({
  data,
  handleUploadClick,
  handleDeleteCard,
  handleEditClick,
}) => {
  return (
    <div>
      <div className="p-20 w-full flex">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <div className="lg:w-1/2">
            <ReactTyped
              strings={["Welcome "]}
              typeSpeed={100}
              cursorChar="!"
              className="text-5xl break-words"
            />
            <div className="break-words overflow-hidden text-xl mt-4 lg:w-2/3 h-36">
              <ReactTyped
                strings={[
                  "Ready to share your expertise with eager learners.",
                  "Begin your journey of enriching minds by uploading your courses.",
                  "Inspire curiosity, spark creativity, and empower others to reach their full potential through your teachings.",
                ]}
                typeSpeed={50}
                backSpeed={25}
                loop
                showCursor
                cursorChar="|"
              />
            </div>
          </div>
          <div className="w-full h-96 mb-4 lg:ml-4">
            <img
              className="w-full h-full object-cover rounded-md drop-shadow-2xl shadow-2xl"
              src={imageSrc}
              alt="Teaching"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <FilledButton
          text="Upload A new Course"
          buttonType="submit"
          isButton={true}
          onClick={handleUploadClick}
          className="w-1/3 cursor-pointer rounded-lg border border-black bg-[#fbbf24] p-4 text-black hover:bg-opacity-80"
        />
      </div>
      <hr className="border border-black w-full mt-2" />
      <div className="flex flex-row flex-wrap gap-10 justify-center my-10">
        {data?.data?.map((card, index) => (
          <div key={card?.id}>
            <Card
              sx={{
                opacity: 50,
                maxWidth: 345,
                height: 400,
                m: 1,
                border: "1px solid black",
                borderRadius: "8px",
                transition: "background-color 0.7s, border-color 0.7s",
                "&:hover": {
                  borderColor: "#fbbf24",
                },
              }}
            >
              <CardMedia
                className="h-56 object-cover"
                component="img"
                height="200"
                image={card?.image}
                alt="No Image"
              />
              <CardContent>
                <div>
                  <div>
                    <Typography gutterBottom variant="h5" component="div">
                      {card?.course_name}
                    </Typography>
                  </div>
                  <div className="my-2">
                    <p className="text-sm rounded-lg flex items-center">
                      Start:{" "}
                      {card?.startDate
                        ? new Date(card.startDate).toLocaleDateString("en-CA")
                        : ""}
                      <FiCalendar className="ml-2" />
                    </p>
                  </div>
                  <div>
                    <span className="text-sm rounded-lg flex items-center">
                      End:{" "}
                      {card?.endDate
                        ? new Date(card.endDate).toLocaleDateString("en-CA")
                        : ""}
                      <FiCalendar className="ml-2" />
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardActions>
                <button
                  onClick={() => handleEditClick(card)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                  <FiEdit className="ml-4" />
                </button>
                <button
                  onClick={() => handleDeleteCard(card?.id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete
                  <FiDelete className="ml-4" />
                </button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teacher;
