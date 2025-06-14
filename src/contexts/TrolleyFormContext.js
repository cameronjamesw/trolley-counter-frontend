import React, { createContext, useState, useContext } from "react";

const TrolleyFormContext = createContext();
export const useTrolleyForm = () => useContext(TrolleyFormContext);

export const TrolleyFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    totes_count: 1,
    in_use: 0,
    notes: "",
    front_labels: Array(8)
      .fill()
      .map(() => ({ shape: "" })),
    back_labels: Array(8)
      .fill()
      .map(() => ({ shape: "" })),
  });

  // Update full field
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Toggle switch (for in_use)
  const toggleInUse = (checked) => {
    setFormData((prev) => ({
      ...prev,
      in_use: checked ? 1 : 0,
    }));
  };

  // Update tote count and regenerate labels accordingly
  const updateToteCount = (value) => {
    const count = value === 2 ? 10 : 8; // adjust according to your UI logic
    setFormData((prev) => ({
      ...prev,
      totes_count: value,
      front_labels: Array(count)
        .fill()
        .map(() => ({ shape: "" })),
      back_labels: Array(count)
        .fill()
        .map(() => ({ shape: "" })),
    }));
  };

  // Replace all label objects on a given side
  const updateAllLabels = (labels, side) => {
    const field = side === "front" ? "front_labels" : "back_labels";
    setFormData((prev) => ({
      ...prev,
      [field]: labels,
    }));
  };

  return (
    <TrolleyFormContext.Provider
      value={{
        formData,
        updateField,
        toggleInUse,
        updateToteCount,
        updateAllLabels,
      }}
    >
      {children}
    </TrolleyFormContext.Provider>
  );
};
