import firebase from "firebase";
import { Id } from "../../../const/structuresConst";

export const getImage = (image: string, authorId: Id) => {
  if (image) {
    const url = `images/${authorId}/`;
    const imageId = `${url}${image}`;
    let img = localStorage.getItem(imageId);
    if (!img) {
      img = getImageJustUploaded(image, authorId);
    }

    if (!img) {
      const storage = firebase.storage();
      const pathReference = storage.ref(url);
      pathReference
        .child(image)
        .getDownloadURL()
        .then((img) => {
          localStorage.setItem(imageId, img);
          return img;
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      return img;
    }
  }
};

const getImageJustUploaded = (logoName: string, authorId: Id) => {
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
