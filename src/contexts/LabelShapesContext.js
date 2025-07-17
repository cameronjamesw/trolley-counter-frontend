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
  const shapeLabels = {
    1: {
      icon: <FontAwesomeIcon icon={faSquare} />,
      shape: "Square"},
    2: {
      icon: <FontAwesomeIcon icon={faCircle} />,
      shape: "Circle"},
    3: {
      icon: <FontAwesomeIcon icon={faPlay} />,
      shape: "Triangle"},
    4: {
      icon: <FontAwesomeIcon icon={faPlus} />,
      shape: "Plus"},
    5: {
      icon: <FontAwesomeIcon icon={faWater} />,
      shape: "Squiggle"},
    6: {
      icon: <FontAwesomeIcon icon={faHeart} />,
      shape: "Heart"},
    7: {
      icon: <FontAwesomeIcon icon={faSeedling} />,
      shape: "Flower"},
    8: {
      icon: <FontAwesomeIcon icon={faCrow} />,
      shape: "Penguin"},
    9: {
      icon: <FontAwesomeIcon icon={faInfinity} />,
      shape: "Infinity"},
    10: {
      icon: <FontAwesomeIcon icon={faPlane} />,
      shape: "Plane"},
  };

  return (
    <LabelShapes.Provider value={shapeLabels}>
      {children}
    </LabelShapes.Provider>
  );
};
