import Chart from "chart.js/auto";
import "./TappingChart.css";
import { useEffect, useState } from "react";

function TappingChart() {
  const [view, setView] = useState("daily");
  useEffect(() => {
    const ctx = document.getElementById("tapChart").getContext("2d");
    const tapChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"], // Sample labels
        datasets: [
          {
            label: "Tap Count",
            data: [100, 200, 150, 300, 250, 400, 350], // Sample data
            backgroundColor: "#7FD660", // Adjust as needed
            borderColor: "#7FD660", // Adjust as needed
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      tapChart.destroy();
    };
  }, []);

  return (
    <div className="chart-container">
        <div style={{width:"80%"}}>
      <canvas id="tapChart"></canvas>
      <div className="toggle-container">
        <button
          className={view === "daily" ? "active" : ""}
          onClick={() => setView("daily")}>
          Daily
        </button>
        <button
          className={view === "weekly" ? "active" : ""}
          onClick={() => setView("weekly")}>
          Weekly
        </button>
      </div>
      </div>
      </div>
  );
}

export default TappingChart;
