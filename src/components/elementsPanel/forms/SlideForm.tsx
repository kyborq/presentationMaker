import styles from "./Form.module.css";
import { TBackground, TSlide } from "../../../model/slide/SlideTypes";
import { ColorInput } from "../../inputs/ColorInput";
import { Select } from "../../inputs/Select";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { TImage } from "../../../model/element/ImageTypes";
import { loadImage } from "../../../model/element/ImageActions";
import { TElement } from "../../../model/element/ElementTypes";
import { useState } from "react";
import { Modal } from "../../modal/Modal";
import { ImageSearchForm } from "../../forms/ImageSearchForm";

type Props = {
  slide: TSlide;
  allElements: TElement[];
  setBackground: (slide: string, background: TBackground) => void;
};

function SlideForm({ slide, allElements, setBackground }: Props) {
  const [imageModal, setImageModal] = useState(false);

  const allObjects = allElements.map(
    (im) => "image" in im.data && im.data
  ) as TImage[];

  const allImages = allObjects.filter((image) => image);

  const handleBackgroundColor = (value: string) => {
    const background: TBackground = {
      color: value,
    };
    setBackground(slide.id, background);
  };

  const handleLoadBackground = () => {
    loadImage((object) => {
      const background: TBackground = {
        picture: object,
      };
      setBackground(slide.id, background);
    });
  };

  const handleSetBackground = (url: string) => {
    const picture: TImage = {
      image: url,
    };

    const background: TBackground = {
      picture,
    };

    setBackground(slide.id, background);
    setImageModal(false);
  };

  const handleClearBackground = () => {
    const background: TBackground = {
      color: "#FFFFFF",
    };
    setBackground(slide.id, background);
  };

  return (
    <div className={styles.form}>
      {!slide.background.picture && (
        <>
          <div className={styles.formTitle}>Цвет фона</div>
          <div className={styles.formFlex} style={{ flexDirection: "column" }}>
            <ColorInput
              label="HEX"
              value={slide?.background?.color?.toUpperCase()}
              style={{ marginBottom: 8 }}
              onChange={handleBackgroundColor}
            />
          </div>
        </>
      )}
      <div className={styles.formTitle}>Фоновое изображение</div>
      <div className={styles.formFlex} style={{ flexDirection: "column" }}>
        <Select
          items={["Нет фона", "Из интернетика...", "Из файла..."]}
          value={slide.background.picture?.name || "Нет фона"}
          style={{ width: "auto" }}
          onChange={(value) => {
            switch (value) {
              case "Нет фона":
                handleClearBackground();
                break;
              case "Из интернетика...":
                setImageModal(true);
                break;
              case "Из файла...":
                handleLoadBackground();
                break;
              default:
                handleSetBackground(value);
                break;
            }
          }}
        />
      </div>

      {imageModal && (
        <Modal title="Фон из интернетов" onClose={() => setImageModal(false)}>
          <ImageSearchForm onSubmit={handleSetBackground} />
        </Modal>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setBackground: (slide: string, background: TBackground) =>
      dispatch({
        type: "SET_SLIDE_BACKGROUND",
        payload: { slide, background },
      }),
  };
};

const mapStateToProps = (state: RootState) => {
  return {
    allElements: state.presentation.slideList
      .map((slide) => slide.elementList)
      .flat(),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideForm);
