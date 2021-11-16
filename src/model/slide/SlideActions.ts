import { Editor } from "../editor/EditorTypes";
import { Element } from "../element/ElementTypes";
import { Figure, Text, Image } from "../element/ElementTypes";
import { Background, Slide } from "./SlideTypes";

// Установка фона для слайда
export function setBackground(
  editor: Editor,
  slideId: number,
  background: Background
): Editor {
  const { presentation } = editor;
  const { slideList } = presentation;

  const newSlideList = slideList.map((slide, index) =>
    index === slideId ? { ...slide, background } : slide
  );

  const newEditor: Editor = {
    ...editor,
    presentation: {
      ...presentation,
      slideList: newSlideList,
    },
  };

  return newEditor;
}

// Очистка фона слайда
export function clearBackground(editor: Editor, slideId: number): Editor {
  const background: Background = {
    color: "#FFFFFF",
  };

  const newSlideList = editor.presentation.slideList.map((slide, index) =>
    index === slideId ? { ...slide, background } : slide
  );

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slideList: newSlideList,
    },
  };
}

// Создание элемента на слайде
export function createElement(
  editor: Editor,
  slideId: number,
  element: Text | Image | Figure
): Editor {
  const newElement: Element = {
    width: 100,
    height: 100,
    position: { x: 0, y: 0 },
    color: "#FFFFFF",
    data: element,
  };

  const { slideList } = editor.presentation;
  const newSlideList = slideList.map((slide, index) => {
    if (index === slideId) {
      const { elementList } = slide;
      return { ...slide, elementList: [...elementList, newElement] };
    }
    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slideList: newSlideList,
    },
  };
}

// Удаление элемента
export function removeElement(
  editor: Editor,
  slideId: number,
  elementId: number
): Editor {
  const { slideList } = editor.presentation;
  const newSlideList = slideList.map((slide, index) => {
    if (index === slideId) {
      const { elementList } = slide;
      return {
        ...slide,
        // ???
        elementList: elementList.filter((element, id) => id !== elementId),
      };
    }
    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slideList: newSlideList,
    },
  };
}

// Удаление элементов
export function removeElements(
  editor: Editor,
  slideId: number,
  elementIds: number[]
) {
  const { slideList } = editor.presentation;
  const newSlideList = slideList.map((slide, index) => {
    if (index === slideId) {
      const { elementList } = slide;
      return {
        ...slide,
        elementList: elementList.filter(
          // ???
          (element, id) => !elementIds.some(() => id)
        ),
      };
    }
    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slideList: newSlideList,
    },
  };
}

// Перемещение элемента
export function moveElement(
  editor: Editor,
  slideId: number,
  elementId: number,
  newPosition: { x: number; y: number }
): Editor {
  const { slideList } = editor.presentation;

  const newSlideList = slideList.map((slide, index) => {
    if (index === slideId) {
      const { elementList } = slide;
      const newElementList = elementList.map((element, id) =>
        id === elementId ? { ...element, position: newPosition } : element
      );
      return { ...slide, elementList: newElementList };
    }
    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slideList: newSlideList,
    },
  };
}

// Изменение размеров элемента
export function resizeElement(
  editor: Editor,
  slideId: number,
  elementId: number,
  newWidth: number,
  newHeight: number
): Editor {
  const { slideList } = editor.presentation;

  const newSlideList = slideList.map((slide, index) => {
    if (index === slideId) {
      const { elementList } = slide;
      const newElementList = elementList.map((element, id) =>
        id === elementId
          ? { ...element, width: newWidth, height: newHeight }
          : element
      );
      return { ...slide, elementList: newElementList };
    }
    return slide;
  });

  return {
    ...editor,
    presentation: {
      ...editor.presentation,
      slideList: newSlideList,
    },
  };
}