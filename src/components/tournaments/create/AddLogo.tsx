import React from "react";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ClearIcon from "@material-ui/icons/Clear";

import { TournamentCreateLogoTextFieldStyled } from "../../../styled/styledTournamentForm";
import { ButtonRemoveLogoStyled } from "../../../styled/styledButtons";
import { LogoContainerStyled, LogoStyled } from "../../../styled/styledLayout";

type Props = {
  image: any;
  setImage: (image: any) => void;
};

const AddLogo: React.FC<Props> = ({ image, setImage }) => {
  const handleChangeImage = (e: any) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const onRemoveImage = () => {
    setImage(null);
  };

  const getUrl = () => {
    console.log(image);
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
        <LogoStyled src={imgUrl}>
          {imgUrl ? null : <AddAPhotoIcon />}
        </LogoStyled>
      </label>
      {imgUrl ? (
        <ButtonRemoveLogoStyled onClick={onRemoveImage}>
          <ClearIcon fontSize="small" />
        </ButtonRemoveLogoStyled>
      ) : null}
    </LogoContainerStyled>
  );
};

export default AddLogo;
