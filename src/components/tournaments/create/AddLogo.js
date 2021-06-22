import React from "react";
import imageCompression from "browser-image-compression";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ClearIcon from "@material-ui/icons/Clear";

import { TournamentCreateLogoTextFieldStyled } from "../../../styled/styledTournamentForm";
import { ButtonRemoveLogoStyled } from "../../../styled/styledButtons";
import { LogoContainerStyled, LogoStyled } from "../../../styled/styledLayout";

const AddLogo = ({ oldImage, deleteOldImage, image, setImage }) => {
  const handleChangeImage = async (e) => {
    const image = e.target.files[0];
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(image, options);
      setImage(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveImage = () => {
    if (oldImage) {
      deleteOldImage();
    } else {
      setImage(null);
    }
  };

  const getUrl = () => {
    if (image) {
      return URL.createObjectURL(image);
    } else {
      return undefined;
    }
  };

  const imgUrl = getUrl();
  return (
    <LogoContainerStyled>
      <TournamentCreateLogoTextFieldStyled
        type="file"
        name="file"
        id="file"
        onChange={handleChangeImage}
      />
      <label htmlFor="file">
        <LogoStyled src={oldImage ?? imgUrl}>
          {oldImage || imgUrl ? null : <AddAPhotoIcon />}
        </LogoStyled>
      </label>
      {oldImage || imgUrl ? (
        <ButtonRemoveLogoStyled onClick={onRemoveImage}>
          <ClearIcon fontSize="small" />
        </ButtonRemoveLogoStyled>
      ) : null}
    </LogoContainerStyled>
  );
};

export default AddLogo;
