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
  };

  return (
    <>
      <ImageCard game={game} onClick={handleUpload} />
    </>
  );
};

export default EditGameImage;
