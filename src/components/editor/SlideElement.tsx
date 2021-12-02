import { RefObject, useEffect, useRef, useState } from "react";
import { dispatch } from "../../editor";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useResize } from "../../hooks/useResize";
import { Element as ElementType } from "../../model/element/ElementTypes";
import { setText } from "../../model/element/TextActions";
import { moveElement } from "../../model/slide/SlideActions";
import styles from "./SlideElement.module.css";

type ElementProps = {
  slideId?: number;
  id?: number;

  element: ElementType;
  selected?: boolean;
  onClick?: (onCtrl?: boolean) => void;
};

export function SlideElement({
  element,
  selected,
  id,
  slideId,
  onClick,
}: ElementProps) {
  const [isEditMode, setEditMode] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isMulti, setMuli] = useState(false);

  const elementRef = useRef(null);
  const tlRef = useRef(null);
  const trRef = useRef(null);
  const blRef = useRef(null);
  const brRef = useRef(null);

  // const position = useDragAndDrop(elementRef, element.position, (state) => {
  //   setIsMoving(state);
  //   state && onClick && onClick(isMulti);
  // });

  const size = useResize(
    elementRef,
    element.position,
    {
      width: element.width,
      height: element.height,
    },
    tlRef,
    trRef,
    blRef,
    brRef
  );

  useEffect(() => {
    // selected && dispatch(moveElement, slideId, id, position);
  }, [isMoving]);

  return (
    <div
      className={`${styles.element} ${selected && styles.selected} ${
        isMoving && styles.moving
      }`}
      style={{
        // width: element.width < 0 ? "auto" : element.width,
        // height: element.height < 0 ? "auto" : element.height,
        width: size.width,
        height: size.height,
        top: element.position.y,
        left: element.position.x,
      }}
      onClick={(event) => {
        event.stopPropagation();
        onClick && onClick(event.ctrlKey);
        setMuli(event.ctrlKey);
      }}
      ref={elementRef}
    >
      {selected && (
        <>
          <span ref={tlRef} className={`${styles.resizer} ${styles.lt}`} />
          <span ref={blRef} className={`${styles.resizer} ${styles.lb}`} />
          <span ref={trRef} className={`${styles.resizer} ${styles.rt}`} />
          <span ref={brRef} className={`${styles.resizer} ${styles.rb}`} />
        </>
      )}
      {element?.text && (
        <p
          onDoubleClick={() => setEditMode(true)}
          contentEditable={isEditMode}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              dispatch(setText, slideId, id, "e.");
              setEditMode(false);
            }
          }}
        >
          {element?.text?.content}
        </p>
      )}
    </div>
  );
}
