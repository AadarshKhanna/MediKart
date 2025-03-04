import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { FaUsers, FaShoppingCart, FaPills, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart instance
    if (chartRef.current) {
      chartInstanceRef.current = new ChartJS(chartRef.current, {
        type: "bar",
        data: chartData,
        options: { responsive: true },
      });
    }

    return () => {
      // Cleanup function to destroy chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
