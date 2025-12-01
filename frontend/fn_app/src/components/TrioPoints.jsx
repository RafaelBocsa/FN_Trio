import React, { useMemo } from "react";

const TrioPoints = ({ p1, p2, p3 }) => {
  const getValue = (player, field) => {
    if (!player) {
      return 0;
    }
    const value = player[field];
    if (!value || value === "unknown" || isNaN(value)) return 0;

    return Number(value);
  };

  //only calulates when players change
  const totals = useMemo(() => {
    const totalPR =
      getValue(p1, "pr_points") +
      getValue(p2, "pr_points") +
      getValue(p3, "pr_points");

    const totalEarnings =
      getValue(p1, "earnings") +
      getValue(p2, "earnings") +
      getValue(p3, "earnings");

    return { totalPR, totalEarnings };
  }, [p1, p2, p3]);

  return (
    <div>
      <div>Total PR Points: {totals.totalPR.toLocaleString("en-US")}</div>
      <div>
        {" "}
        Total Earnings: {"$ " + totals.totalEarnings.toLocaleString("en-US")}
      </div>
    </div>
  );
};

export default TrioPoints;
