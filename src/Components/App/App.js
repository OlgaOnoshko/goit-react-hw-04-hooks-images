import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import Searchbar from "../Searchbar/Searchbar";
import getImages from "../../service-api/getImages";
import LoadMoreBtn from "../Button/Button";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";

function App() {
  const [searchField, setSearchField] = useState("");
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    if (searchField === "") {
      return;
    }
    if (page === 1) {
      setImages([]);
    }
    setLoading(true);
    getImages(searchField, page)
      .then((res) => {
        const images = res.data.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return {
              id,
              tags,
              webformatURL,
              largeImageURL,
            };
          }
        );
        if (searchField.trim().length) {
          setImages((prevImages) => [...prevImages, ...images]);
          scrollDown();
        }
        if (images.length === 0) {
          alert(`Nothing found on request`);
        }
      })
      .catch((err) => {
        return Promise.reject(err(`Nothing found on request`));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchField, page]);

  const handleFormSubmit = (searchField) => {
    setSearchField(searchField);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const getModalImage = (largeImageURL, alt) => {
    setModalImage(largeImageURL);
    setAlt(alt);
    toggleModal();
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const scrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length > 0 && (
        <ImageGallery getModalImage={getModalImage} images={images} />
      )}

      {loading ? (
        <Loader />
      ) : (
        images.length > 0 &&
        images.length % 12 === 0 && <LoadMoreBtn onClick={onLoadMore} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt={alt} />
        </Modal>
      )}
    </div>
  );
}

export default App;
