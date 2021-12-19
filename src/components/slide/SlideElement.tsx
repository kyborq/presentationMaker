import { useRef } from "react";
import { Element as ElementType } from "../../model/element/ElementTypes";
import { classnames } from "../../utils";
import { CircleFigure } from "./figures/CircleFigure";
import { SquareFigure } from "./figures/SquareFigure";
import { TriangleFigure } from "./figures/TriangleFigure";
import styles from "./SlideElement.module.css";

type ElementProps = {
  element: ElementType;
  selected?: boolean;
  onClick?: (onCtrl?: boolean) => void;
};

export function SlideElement({ element, selected, onClick }: ElementProps) {
  const elementRef = useRef(null);

  const isText = element.data.hasOwnProperty("font");
  const isImage = element.data.hasOwnProperty("url");
  const isFigure = element.data.hasOwnProperty("type");

  const style = {
    width: element.width,
    height: element.height,
    top: element.position.y,
    left: element.position.x,
    backgroundColor: element.color,
    fontWeight: element.data.bold ? "bold" : "400",
    textDecoration: element.data.underline ? "underline" : "none"
  };
  const resizers = (
    <>
      <span ref={null} className={classnames(styles.resizer, styles.lt)} />
      <span ref={null} className={classnames(styles.resizer, styles.lb)} />
      <span ref={null} className={classnames(styles.resizer, styles.rt)} />
      <span ref={null} className={classnames(styles.resizer, styles.rb)} />
    </>
  );

  return (
    <div
      className={classnames(styles.element, selected && styles.selected)}
      style={style}
      onClick={(event) => {
        event.stopPropagation();
        onClick && onClick(event.ctrlKey);
      }}
      ref={elementRef}
    >
      {!isText && selected && resizers}
      {isText && <p>{element?.data?.content}</p>}
      {isImage && <img src={element.data.url} alt="" />}
      {isFigure && element.data?.type === "circle" && <CircleFigure fill={element.data.fill} width={element.width} height={element.height} />}
      {isFigure && element.data?.type === "sguare" && <SquareFigure fill={element.data.fill} width={element.width} height={element.height} />}
      {isFigure && element.data?.type === "triangle" && <TriangleFigure fill={element.data.fill} width={element.width} height={element.height} />}
    </div>
  );
}