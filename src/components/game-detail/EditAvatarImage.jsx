import React from "react";
import { updateImage } from "../../services/ImagesAPI";
import AvatarImage from "./AvatarImage";

const EditAvatarImage = ({ player, game }) => {
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
    <div>
      <AvatarImage player={player} onClick={handleUpload} />
    </div>
  );
};

export default EditAvatarImage;
