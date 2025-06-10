import React, { useEffect, useState } from "react";

const CurrentDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 3600000);

    return () => clearInterval(interval);
  }, []);
  return <p className="text-white">{date.toDateString()}</p>;
};

export default CurrentDate;
