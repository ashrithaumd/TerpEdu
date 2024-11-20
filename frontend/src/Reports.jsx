import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

function Reports() {
  const [userCounts, setUserCounts] = useState({});

  useEffect(() => {
    // Fetch user counts
    const fetchUserCounts = async () => {
      try {
        const response = await fetch("/course/get_user_counts");
        if (response.ok) {
          const data = await response.json();
          setUserCounts(data);
        } else {
          console.error("Error fetching user counts:", response);
        }
      } catch (error) {
        console.error("An error occurred while fetching user counts:", error);
      }
    };

    fetchUserCounts();
  }, []);

  useEffect(() => {
    if (Object.keys(userCounts).length > 0) {
      // Render chart
      const ctx = document.getElementById("userRoleChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(userCounts), // Roles (e.g., Student, Instructor)
          datasets: [
            {
              label: "Number of Users",
              data: Object.values(userCounts), // Counts (e.g., 100, 10)
              backgroundColor: ["#f39c12", "#3498db"], // Customize colors
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
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
  }, [userCounts]);

  return (
    <div>
      <h2>User Role Distribution</h2>
      <canvas id="userRoleChart" width="400" height="200"></canvas>
    </div>
  );
}

export default Reports;
