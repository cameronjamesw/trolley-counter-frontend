import { createContext, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faCircle,
  faPlay,
  faPlus,
  faWater,
  faHeart,
  faSeedling,
  faCrow,
  faInfinity,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";

export const LabelShapes = createContext();

// ✅ Correctly wrapped as a custom hook
export const useLabelShapes = () => useContext(LabelShapes);

export const LabelShapesProvider = ({ children }) => {
  const shapeLabels = [
    {
      icon: <FontAwesomeIcon icon={faSquare} />,
      shape: "Square",
    },
    {
      icon: <FontAwesomeIcon icon={faCircle} />,
      shape: "Circle",
    },
    {
      icon: <FontAwesomeIcon icon={faPlay} />,
      shape: "Triangle",
    },
    {
      icon: <FontAwesomeIcon icon={faPlus} />,
      shape: "Plus",
    },
    {
      icon: <FontAwesomeIcon icon={faWater} />,
      shape: "Squiggle",
    },
    {
      icon: <FontAwesomeIcon icon={faHeart} />,
      shape: "Heart",
    },
    {
      icon: <FontAwesomeIcon icon={faSeedling} />,
      shape: "Flower",
    },
    {
      icon: <FontAwesomeIcon icon={faCrow} />,
      shape: "Penguin",
    },
    {
      icon: <FontAwesomeIcon icon={faInfinity} />,
      shape: "Infinity",
    },
    {
      icon: <FontAwesomeIcon icon={faPlane} />,
      shape: "Plane",
    },
  ];

  return (
    <LabelShapes.Provider value={shapeLabels}>{children}</LabelShapes.Provider>
  );
};
