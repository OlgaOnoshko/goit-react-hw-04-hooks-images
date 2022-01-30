import React from "react";
import PropTypes from "prop-types";
import { Picture } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({ image, getModalImage }) => {
  const { webformatURL, largeImageURL, tags, id } = image;

  return (
    <li key={id}>
      <Picture
        onClick={() => getModalImage(largeImageURL, tags)}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  getModalImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
