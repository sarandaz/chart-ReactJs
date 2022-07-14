import React, { Component, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const LineChart = () => {
  const [dataAPR, setDataAPR] = useState(null);
  const [dataSupply, setDataSupply] = useState(null);
  const [list, setList] = useState([]);
  const [currentEntryIndex, setCurrentEntryIndex] = useState(null);

  var apiUrl =
    "https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000";

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    await fetch(`${apiUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log(json.data);
            if (json.data && json.data.length) {
              setList(json.data);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateChart = (data) => {
    const labelsAPR = data.dailyAPRHistorical.map((entry) => entry.date);
    const valuesAPR = data.dailyAPRHistorical.map((entry) => ({
      x: entry.date,

      y: entry.value,
    }));
    const labelsTotalSupply = data.totalSupplyHistorical.map(
      (entry) => entry.date
    );
    const valuesTotalSupply = data.totalSupplyHistorical.map((entry) => ({
      x: entry.date,

      y: entry.value,
    }));

    const updateDataAPR = {
      labels: labelsAPR,
      type: "line",
      datasets: [
        {
          label: labelsAPR,
          data: valuesAPR,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,         
        },
      ],
            
      };

    setDataAPR(updateDataAPR);
    const updateDataSupply = {
      labels: labelsTotalSupply,
      type: "line",
      datasets: [
        {
          label: labelsTotalSupply,
          data: valuesTotalSupply,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setDataSupply(updateDataSupply);
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <div style={{ paddingTop: "10px" }}>
      {list.length && (
        <select
          value={currentEntryIndex}
          onChange={(e) => {
            if (e.target.value != -1) {
              setCurrentEntryIndex(e.target.value);
              updateChart(list[e.target.value]);
            }
          }}
        >
          <option value={-1}>No item selected</option>

          {list.map((item, index) => (
            <option value={index}>{item.assetId}</option>
          ))}
        </select>
      )}
      {dataAPR !== null && (
        <Line
          data={dataAPR}
          style={{ maxHeight: "400px" }}
          height={400}
          options={options}
        />
      )}
      {dataSupply !== null && (
        <Line
          data={dataSupply}
          style={{ maxHeight: "400px" }}
          height={400}
          options={options}
        />
      )}
    </div>
  );
};

export default LineChart;