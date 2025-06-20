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
    1: <FontAwesomeIcon icon={faSquare} />,
    2: <FontAwesomeIcon icon={faCircle} />,
    3: <FontAwesomeIcon icon={faPlay} />,
    4: <FontAwesomeIcon icon={faPlus} />,
    5: <FontAwesomeIcon icon={faWater} />,
    6: <FontAwesomeIcon icon={faHeart} />,
    7: <FontAwesomeIcon icon={faSeedling} />,
    8: <FontAwesomeIcon icon={faCrow} />,
    9: <FontAwesomeIcon icon={faInfinity} />,
    10: <FontAwesomeIcon icon={faPlane} />,
  };

  return (
    <LabelShapes.Provider value={shapeLabels}>
      {children}
    </LabelShapes.Provider>
  );
};
