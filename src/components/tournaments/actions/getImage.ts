import firebase from "firebase";
import { Id } from "../../../const/structuresConst";
type TGetImageUrl = {
  authorId: Id;
  tournamentId: Id;
  imageName: string;
};
export function getImageUrl({
  authorId,
  tournamentId,
  imageName,
}: TGetImageUrl) {
  return `images/${authorId}/${tournamentId}/${imageName}`;
}

export async function getImage(image: string, authorId: Id, tournamentId: Id) {
  if (image) {
    const url = getImageUrl({
      authorId,
      tournamentId,
      imageName: image,
    });
    const imageId = `${url}${image}`;
    let img = localStorage.getItem(imageId);

    if (!img) {
      const storage = firebase.storage();
      const pathReference = storage.ref(url);
      pathReference
        .getDownloadURL()
        .then((img) => {
          localStorage.setItem(imageId, img);
          return img;
        })
        .catch(function (error) {
          img = getImageJustUploaded(image, authorId);
          return img;
        });
    } else {
      return img;
    }
  }
}

export const getImageJustUploaded = (logoName: string, authorId: Id) => {
  const imageId = `uploaded/${authorId}/${logoName}`;
  return localStorage.getItem(imageId);
};

export const setImageJustUploaded = (
  logoName: string,
  imageUrl: string,
  authorId: Id
) => {
  const imageId = `uploaded/${authorId}/${logoName}`;
  localStorage.setItem(imageId, imageUrl);
};
