import { jwtDecode } from "jwt-decode";

export const setTokenTimestamp = (access) => {
  try {
    const decoded = jwtDecode(access);
    localStorage.setItem("tokenTimestamp", decoded.exp);
  } catch (err) {
    console.error("Failed to decode token:", err);
  }
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("tokenTimestamp");
};

export const shouldRefreshToken = () => {
  const timestamp = localStorage.getItem("tokenTimestamp");
  if (!timestamp) return false;

  const buffer = 60; // seconds before actual expiry
  const now = Math.floor(Date.now() / 1000);
  return now >= timestamp - buffer;
};

export const handleLocalStorage = (
  prev,
  index,
  side,
  submit = false,
  unmount = false
) => {
  if (submit || unmount) {
    // Remove all localStorage entries for both sides
    const sides = ["front", "back"];
    sides.forEach((s) => {
      for (let i = 0; i < 20; i++) {
        const key = `${s}-${i}-btnIndex`;
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
        }
      }
    });
    return;
  }

  if (prev.includes(index)) {
    localStorage.removeItem(`${side}-${index}-btnIndex`);
  } else {
    localStorage.setItem(`${side}-${index}-btnIndex`, index);
  }
};

export const handleLabelsMount = (labels) => {
  const { front, back } = labels;
  front.forEach((label, idx) => {
      if (label.checked) {
        localStorage.setItem(`front-${idx}-btnIndex`, idx);
      };
  });
  back.forEach((label, idx) => {
    if (label.checked) {
      localStorage.setItem(`back-${idx}-btnIndex`, idx);
    };
});
};
