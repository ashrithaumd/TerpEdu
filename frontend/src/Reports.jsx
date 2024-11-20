import React, { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";

function Reports() {
  const [userCounts, setUserCounts] = useState({}); // State to store user role counts
  const chartRef = useRef(null); // Reference to the Chart instance
  const canvasRef = useRef(null); // Reference to the canvas element

  // Fetch user counts from the API
  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const response = await fetch("/course/get_user_counts");
        if (response.ok) {
          const data = await response.json();
          setUserCounts(data); // Update state with fetched data
        } else {
          console.error("Error fetching user counts:", response);
        }
      } catch (error) {
        console.error("An error occurred while fetching user counts:", error);
      }
    };

    fetchUserCounts();
  }, []);

  // Create and update the chart whenever userCounts changes
  useEffect(() => {
    if (Object.keys(userCounts).length > 0) {
      // Destroy existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart
      const ctx = canvasRef.current.getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(userCounts), // Roles (e.g., Student, Instructor, Admin)
          datasets: [
            {
              label: "Number of Users",
              data: Object.values(userCounts), // Counts for each role
              backgroundColor: [
                "#f39c12", // Student
                "#3498db", // Instructor
                "#1abc9c", // Admin
              ],
              borderColor: "#2c3e50",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Count",
              },
            },
            x: {
              title: {
                display: true,
                text: "Role",
              },
            },
          },
        },
      });
    }

    // Cleanup function to destroy the chart instance on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [userCounts]);

  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <h1>User Role Distribution</h1>
      <canvas id="userRoleChart" ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}

export default Reports;
