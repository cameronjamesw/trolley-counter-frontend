import { jwtDecode } from "jwt-decode";

/**
 * This function sets the token timestamp using the
 * JSON web token for session authentication.
 * @param {*} access 
 */
export const setTokenTimestamp = (access) => {
  try {
    const decoded = jwtDecode(access);
    localStorage.setItem("tokenTimestamp", decoded.exp);
  } catch (err) {
    console.error("Failed to decode token:", err);
  }
};

/**
 * This cleanup function removes the token timestamp
 * upon the user logging out.
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem("tokenTimestamp");
};

/**
 * This function determines whether the token
 * needs to be refreshed based on the TTL left
 * on the timestamp. 
 */
export const shouldRefreshToken = () => {
  const timestamp = localStorage.getItem("tokenTimestamp");
  if (!timestamp) return false;

  const buffer = 60; // seconds before actual expiry
  const now = Math.floor(Date.now() / 1000);
  return now >= timestamp - buffer;
};

/**
 * This function takes an array of labels and checks them
 * against the localStorage. If the label is indexed, the
 * function removes it from localStorage, otherwise it will
 * set the key and value as the index. 
 * 
 * @param {Array} prev - contains the previous labels for the function to interpet 
 * @param {number} index - contains the index of the labels parsed
 * @param {'front' | 'back'} side - refers to which side of the trolley the labels are on
 * @param {boolean} submit - if the function is called within a from submittion, value is true
 * @param {boolean} unmount - if function is called when unmounting, value is true
 * @returns an updated localStorage reflecting the labels passsed.
 */
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

/**
 * This function takes the labels from the fetched trolley
 * and adds them to the localStorage based on the
 * 'checked' attribute of the labels. Then, the labels will
 * appear as selected when the component mounts to the user.
 * @param {Array} labels - an array of the recently fetched labels
 */
export const handleLabelsMount = (labels) => {
  const { front, back } = labels;
  front.forEach((label, idx) => {
    if (label.checked) {
      localStorage.setItem(`front-${idx}-btnIndex`, idx);
    }
  });
  back.forEach((label, idx) => {
    if (label.checked) {
      localStorage.setItem(`back-${idx}-btnIndex`, idx);
    }
  });
};

/**
 * This function takes the labels from the fetched trolley
 * as a parameter, and then removes the indexes from the
 * localStorage upon the component unmounting.
 * @param {Array} labels - an array of the mounted labels
 */
export const handleLabelUnmount = (labels) => {
  const { front, back } = labels;
  front.forEach((label, idx) => {
      localStorage.removeItem(`front-${idx}-btnIndex`, idx);
  });
  back.forEach((label, idx) => {
      localStorage.removeItem(`back-${idx}-btnIndex`, idx);
  });
};
