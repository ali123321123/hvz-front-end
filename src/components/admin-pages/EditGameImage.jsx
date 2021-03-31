import { updateImage } from "../../services/ImagesAPI";
import ImageCard from "./admin-dashboard/ImageCard";

const EditGameImage = ({ game }) => {
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "debyqnalg",
      uploadPreset: "siwpunif",
    },
    (error, res) => {
      if (!error && res && res.event === "success") {
        console.log(res.info);
        updateImage(game, res.info.public_id);
      }
    }
  );

  const handleUpload = () => {
    myWidget.open();
    console.log("image uploaded");
  };

  return (
    <>
      <ImageCard
        game={game}
        onClick={handleUpload}
        title="Upload Image"
        arrow="true"
      />
    </>
  );
};

export default EditGameImage;
