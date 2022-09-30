import React from "react";
import Banner from "../assets/logos/BannerPrincipal.png";
import Header from "../components/Header";
import {
  LineChart,
  PieChart,
  Pie,
  Sector,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  AreaChart,
  Area,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart, RadialBar, Legend,
} from "recharts";
function LogoScreen() {
  const data = [
    { name: "A", uv: 400, pv: 2400, amt: 2400 },
    { name: "C", uv: 800, pv: 2200, amt: 2400 },
    { name: "B", uv: 200, pv: 200, amt: 2400 },
  ];
  const data2 = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];
  const data3 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: -1000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 500,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: -2000,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: -250,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const data4 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const data5 = [
    {
      subject: "A",
      A: 120,
      B: 110,
      fullMark: 150
    },
    {
      subject: "B",
      A: 98,
      B: 130,
      fullMark: 150
    },
    {
      subject: "C",
      A: 86,
      B: 130,
      fullMark: 150
    },
    {
      subject: "D",
      A: 99,
      B: 100,
      fullMark: 150
    },
    {
      subject: "E",
      A: 85,
      B: 90,
      fullMark: 150
    },
    {
      subject: "F",
      A: 65,
      B: 85,
      fullMark: 150
    }
  ];
  const data6 = [
    {
      name: "18-24",
      uv: 31.47,
      pv: 2400,
      fill: "#8884d8"
    },
    {
      name: "25-29",
      uv: 26.69,
      pv: 4567,
      fill: "#83a6ed"
    },
    {
      name: "30-34",
      uv: 15.69,
      pv: 1398,
      fill: "#8dd1e1"
    },
    {
      name: "35-39",
      uv: 8.22,
      pv: 9800,
      fill: "#82ca9d"
    },
    {
      name: "40-49",
      uv: 8.63,
      pv: 3908,
      fill: "#a4de6c"
    },
    {
      name: "50+",
      uv: 2.63,
      pv: 4800,
      fill: "#d0ed57"
    },
    {
      name: "unknow",
      uv: 6.67,
      pv: 4800,
      fill: "#ffc658"
    }
  ];
  const style = {
    top: 0,
    left: 350,
    lineHeight: "24px"
  };
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const gradientOffset = () => {
    const dataMax = Math.max(...data3.map((i) => i.uv));
    const dataMin = Math.min(...data3.map((i) => i.uv));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };
  const off = gradientOffset();
  return (
    <div className="container">
      <Header />
      <div className="mb-5">
        <img className="mb-5 mw-100" src={Banner} alt="banner"></img>
      </div>
      <div className="row mt-5">
        <div className="col-lg-4 col-md-6">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
                <AreaChart
                  width={500}
                  height={300}
                  data={data2}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />

                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="asd"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Chart1</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mt-5 mt-md-0">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
                <LineChart width={500} height={300} data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                </LineChart>
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="ad"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Chart2</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-5 mt-lg-0">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
                <AreaChart
                  width={500}
                  height={400}
                  data={data3}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset={off} stopColor="green" stopOpacity={1} />
                      <stop offset={off} stopColor="red" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#000"
                    fill="url(#splitColor)"
                  />
                </AreaChart>
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="asd"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Chart3</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-4 col-md-6">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
                <PieChart width={800} height={400}>
                <Pie
                  data={data4}
                  
                  innerRadius={180}
                  outerRadius={240}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                </PieChart>
                
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="asd"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Chart5</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mt-5 mt-md-0">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
              <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={500}
      height={500}
      data={data5}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name="Mike"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="asd"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Chart 5 </a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-5 mt-lg-0">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
              <RadialBarChart
      width={500}
      height={300}
      
      innerRadius={20}
      outerRadius={140}
      barSize={10}
      data={data6}
    >
      <RadialBar
        minAngle={15}
        label={{ position: "insideStart", fill: "#fff" }}
        background
        clockWise
        dataKey="uv"
      />
      
    </RadialBarChart>
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="ad"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Chart 6</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoScreen;
