import { useEffect, useState } from "react";
import {
  getImage,
  getImageJustUploaded,
} from "../components/tournaments/actions/getImage";

type TUseLogo = {
  tournamentId: string;
  logo: string;
};

export const useLogo = ({ logo, tournamentId }: TUseLogo) => {
  console.log("logo, tournamentId", logo, tournamentId);
  const [src, setSrc] = useState<any>(null);

  useEffect(() => {
    console.log("logo", logo);
    if (logo) {
      getImage(logo, tournamentId)
        .then((image) => {
          let img = image;
          console.log("image", image, logo);
          if (!image && logo) {
            img = getImageJustUploaded(logo, tournamentId) ?? undefined;
          }
          setSrc(img);
        })
        .catch((err) => console.log("err", err));
    }
  }, [logo, tournamentId]);

  console.log("src", src);

  return {
    src,
  };
};
