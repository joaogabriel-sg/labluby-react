import React, { useMemo } from "react";

const DemoList = ({ title, items }) => {
  console.log("DemoList RUNNING");
  const sortedList = useMemo(() => {
    console.log("aqui");
    return items.sort((a, b) => a - b);
  }, [items]);

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);
