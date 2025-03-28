import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { Bar, Pie, Scatter, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Insights({sid}) {
  const [prods, setProds] = useState([]);
  const [catCount, setCatCount] = useState({
    "Electronics": 0,
    "Food": 0,
    "Clothes": 0,
    "Grocery": 0,
    "Books": 0,
    "Kitchen": 0,
    "Stationery": 0,
    "Health": 0,
    "Toys": 0,
    "Sports": 0,
    "Beauty": 0
  });

  const [brandCount, setBrandCount] = useState({});
  const [categoryPriceRangeData, setCategoryPriceRangeData] = useState({});
  const [scatterData, setScatterData] = useState([]);

  const [donutData, setDonutData] = useState({
    labels: [], // Ensure labels are initialized
    datasets: [
      {
        label: "Availability",
        data: [], // Ensure data array is initialized
        backgroundColor: [], // Placeholder for colors
      },
    ],
  });
  const [donutOptions, setDonutOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const range = tooltipItem.label;
            const count = tooltipItem.raw;
            return `Availability ${range}: ${count} products`;
          },
        },
      },
      legend: {
        display: true,
        position: 'left', // Ensure it's visible
        
      },
      title: {
        display: true,
        position: "top",
        text: "Availability (in Range)",
        font: {
          size: 18,
          weight: "bold",
        },
      },

    },
  });

  // Fetch products from API
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const res = await fetch("https://gcrneuratechserver.vercel.app/seller/viewsproducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sid,
            page: 1,
            limit: 180,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setProds(data.products);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Count categories, brands, and price ranges
  useEffect(() => {
    if (prods && prods.length > 0) {
      const updatedCatCount = { ...catCount };
      const updatedBrandCount = {};
      const priceRanges = {
        "Low": [0, 200], // Price range for low
        "Medium": [100, 500], // Price range for medium
        "High": [400, Infinity], // Price range for high
      };
      const updatedCategoryPriceRangeData = {};
      const scatterDataPoints = [];
      const scatterDataMap = new Map(); // Map to prevent duplicate points

      prods.forEach((prod) => {
        // Count categories
        if (prod.category in updatedCatCount) {
          updatedCatCount[prod.category] += 1;
        }

        // Count products by brand, excluding undefined brands
        const brand = prod.brand;
        if (brand) { // Only count defined brands
          updatedBrandCount[brand] = (updatedBrandCount[brand] || 0) + 1;
        }

        // Count price ranges for each category
        const { category } = prod;
        const price = prod.dynamicFields['price'];

        let priceRange = "";
        if (price >= priceRanges.Low[0] && price <= priceRanges.Low[1]) {
          priceRange = "Low";
        } else if (price >= priceRanges.Medium[0] && price <= priceRanges.Medium[1]) {
          priceRange = "Medium";
        } else if (price >= priceRanges.High[0] && price <= priceRanges.High[1]) {
          priceRange = "High";
        }

        if (priceRange) {
          if (!updatedCategoryPriceRangeData[category]) {
            updatedCategoryPriceRangeData[category] = { Low: 0, Medium: 0, High: 0 };
          }
          updatedCategoryPriceRangeData[category][priceRange] += 1;
        }

        // Add data point for scatter plot, avoiding duplicates
        const key = `${category}-${price}`;
        if (!scatterDataMap.has(key)) {
          scatterDataMap.set(key, { x: category, y: price, count: updatedCatCount[category] });
        }
      });





      const ranges = {
        "(0-200)": 0,
        "(200-400)": 0,
        "(400-600)": 0,
        "(600-800)": 0,
        "(800-1000)": 0,
        "(1000+)": 0,
      };

      prods.forEach((product) => {
        const availability = product.dynamicFields?.availability;
        if (availability >= 0 && availability <= 200) ranges["(0-200)"]++;
        else if (availability > 200 && availability <= 400) ranges["(200-400)"]++;
        else if (availability > 400 && availability <= 600) ranges["(400-600)"]++;
        else if (availability > 600 && availability <= 800) ranges["(600-800)"]++;
        else if (availability > 800 && availability <= 1000) ranges["(800-1000)"]++;
        else if (availability > 1000) ranges["(1000+)"]++;
      });

      

      setDonutData({
        labels: Object.keys(ranges),
        datasets: [
          {
            label: "Availability",
            data: Object.values(ranges),
            backgroundColor: [
              "rgb(255, 99, 132,0.7)",
              "rgb(54, 162, 235,0.7)",
              "rgb(255, 206, 86,0.7)",
              "rgb(75, 192, 192,0.7)",
              "rgb(153, 102, 255,0.7)",
              "rgb(255, 159, 64,0.7)"
            ]
            
          },
        ],
      });

    

      scatterDataPoints.push(...scatterDataMap.values());

      setScatterData(scatterDataPoints); // Set the scatter plot data
      setCatCount(updatedCatCount);
      setBrandCount(updatedBrandCount); // Set the brand count state
      setCategoryPriceRangeData(updatedCategoryPriceRangeData); // Set the price range data
    }
  }, [prods]);

  

  const pieData = {
    labels: Object.keys(catCount),
    datasets: [
      {
        label: `Category Count`,
        data: Object.values(catCount),
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(192, 75, 192, 0.5)",
          "rgba(192, 192, 75, 0.5)",
          "rgba(75, 75, 192, 0.5)",
          "rgba(192, 75, 75, 0.5)",
          "rgba(75, 192, 75, 0.5)",
          "rgba(192, 192, 192, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(153, 102, 255, 0.5)"
        ],
        // borderColor: [
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(192, 75, 192, 1)",
        //   "rgba(192, 192, 75, 1)",
        //   "rgba(75, 75, 192, 1)",
        //   "rgba(192, 75, 75, 1)",
        //   "rgba(75, 192, 75, 1)",
        //   "rgba(192, 192, 192, 1)",
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(153, 102, 255, 1)"
        // ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: Object.keys(brandCount),
    datasets: [
      {
        data: Object.values(brandCount),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            const category = tooltipItem.label;
            const count = tooltipItem.raw;
            return `${category}: ${count} products`;
          },
        },
      },
      title: {
        display: true,
        position: "top",
        text: "Product Distribution by Category",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "true",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} products`;
          },
        },
      },
      title: {
        display: true,
        position: "top",
        text: "Brands",
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
  };


  const scatterPlotData = {
    datasets: [
      {
        label: 'Price Distribution by Category',
        data: scatterData.map((point) => ({
          x: Object.keys(catCount).indexOf(point.x),
          y: point.y,
          count: point.count,
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const category = Object.keys(catCount)[context.raw.x];
            const price = context.raw.y;
            const count = context.raw.count;
            return `Category: ${category}, Price: $${price}, Products: ${count}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Distribution by Category',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Categories',
        },
        ticks: {
          callback: (value) => Object.keys(catCount)[value],
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
  };

  return (
    <>
      {
        prods.length === 0
          ? <Loading />
          : <div className="sInsights">

            {/* <div className="inHeader"></div> */}

            
            {/* Bar Chart for Category Count */}
            <div className="myCharts myBar">
              <Bar data={barData} options={barOptions} />
            </div>

            {/* Pie Chart for Product Count by Brand */}
            <div className="myCharts myPie">
              <Pie data={pieData} options={pieOptions} /> 
            </div>
            
            {/* Donut Chart for Availability */}
            <div className="myCharts myDonut">
              <Doughnut data={donutData} options={donutOptions} /> 
            </div>

            {/* Scatter Plot for Price Distribution */}
            <div className="myCharts myScatter">
              <Scatter data={scatterPlotData} options={scatterOptions} />
            </div>
          </div>
      }
    </>
  );
}
