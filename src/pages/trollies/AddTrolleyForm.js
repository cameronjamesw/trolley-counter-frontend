import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

const AddTrolleyForm = () => {
  const currentUser = useCurrentUser();

  if (currentUser === undefined) {
    return null; // or loading spinner
  };

  useRedirect(!currentUser? 'loggedIn' : 'loggedOut' );
  return (
    <div>
        This is the add trolley form
    </div>
  );
};

export default AddTrolleyForm;
