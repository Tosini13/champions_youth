import firebase from "firebase";
import { Id } from "../../../const/structuresConst";
type TGetImageUrl = {
  tournamentId: Id;
  imageName: string;
};
export function getImageUrl({ tournamentId, imageName }: TGetImageUrl) {
  return `images/${tournamentId}/${imageName}`;
}

export async function getImage(image: string, tournamentId: Id) {
  if (image) {
    const url = getImageUrl({
      tournamentId,
      imageName: image,
    });
    const imageId = `${url}${image}`;
    let img = localStorage.getItem(imageId);

    if (!img) {
      const storage = firebase.storage();
      const pathReference = storage.ref(url);
      try {
        const firebaseImg = await pathReference.getDownloadURL();
        localStorage.setItem(imageId, firebaseImg);
        return firebaseImg;
      } catch (error) {
        console.error("error when getting logo", error);
        img = getImageJustUploaded(image, tournamentId);
        return img;
      }
    } else {
      return img;
    }
  }
}

export const getImageJustUploaded = (logoName: string, id: Id) => {
  const imageId = `uploaded/${id}/${logoName}`;
  return localStorage.getItem(imageId);
};

export const setImageJustUploaded = (
  logoName: string,
  imageUrl: string,
  id: Id
) => {
  const imageId = `uploaded/${id}/${logoName}`;
  localStorage.setItem(imageId, imageUrl);
};
