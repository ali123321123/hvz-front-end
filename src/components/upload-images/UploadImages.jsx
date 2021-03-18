import React from "react";
import { Cloudinary } from "cloudinary-core";
import { updateImage } from "../../services/ImagesAPI";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { Photo } from "@material-ui/icons";

function UploadImages({ game }) {
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
      {/* BTN: Upload image */}
      <article>
        <Tooltip
          arrow
          placement={"bottom"}
          aria-label="edit image"
          title="Edit Image"
        >
          <ListItem button onClick={handleUpload}>
            <ListItemIcon>
              <Photo />
            </ListItemIcon>
            <ListItemText primary="Edit Image" />
          </ListItem>
        </Tooltip>
      </article>
    </>
  );
}

export default UploadImages;
