import { Button, Paper } from "@material-ui/core";
import { useState } from "react";
import { updateImage } from "../../services/ImagesAPI";
import { Tooltip } from "@material-ui/core";
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
      <Tooltip
        arrow
        placement={"bottom"}
        aria-label="Upload image"
        title="Upload Image"
      >
        <Button onClick={handleUpload}>
          <ImageCard game={game} />
        </Button>
      </Tooltip>
    </>
  );
};

export default EditGameImage;
