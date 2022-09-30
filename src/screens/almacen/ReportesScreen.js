import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
const labels = [100, 200, 300, 400, 500, 600, 700];

const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

const ReportesScreen = () => {

  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Mis datos",
          data: scores,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "Mis datos (2)",
          tension: 0.3,
          data: scores2,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
        },
      ],
      labels,
    };
  }, []);

  return (
    <div class="row min-vh-100">
      <h3 className="mt-3 mb-0 text-center">
          Reportes
        </h3>
      <div class="col-lg-6 col-md-12">
        <div class="card">
          <div class="card-header pb-0 p-3">
            <h6 class="mb-0">Traffic channels</h6>
            {/* <div class="d-flex align-items-center">
              <span class="badge badge-md badge-dot me-4">
                <i class="bg-primary"></i>
                <span class="text-dark text-xs">Organic search</span>
              </span>
              <span class="badge badge-md badge-dot me-4">
                <i class="bg-dark"></i>
                <span class="text-dark text-xs">Referral</span>
              </span>
              <span class="badge badge-md badge-dot me-4">
                <i class="bg-info"></i>
                <span class="text-dark text-xs">Social media</span>
              </span>
            </div> */}
          </div>
          <div class="card-body p-3">
            <div class="chart">
              {/* <canvas
                id="chart-line"
                class="chart-canvas"
                height="300"
              ></canvas> */}
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
      {/* <div class="col-lg-5 col-md-12 mt-4 mt-lg-0">
        <div class="card h-100">
          <div class="card-header pb-0 p-3">
            <div class="d-flex align-items-center">
              <h6 class="mb-0">Referrals</h6>
              <button
                type="button"
                class="btn btn-icon-only btn-rounded btn-outline-secondary mb-0 ms-2 btn-sm d-flex align-items-center justify-content-center ms-auto"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="See which websites are sending traffic to your website"
              >
                <i class="material-icons text-sm">priority_high</i>
              </button>
            </div>
          </div>
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-5 col-12 text-center">
                <div class="chart mt-5">
                  <canvas
                    id="chart-doughnut"
                    class="chart-canvas"
                    height="200"
                  ></canvas>
                </div>
                <a class="btn btn-sm bg-gradient-secondary mt-4" href="https:">
                  See all referrals
                </a>
              </div>
              <div class="col-lg-7 col-12">
                <div class="table-responsive">
                  <table class="table align-items-center mb-0">
                    <tbody>
                      <tr>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img
                                src="../../assets/img/small-logos/logo-xd.svg"
                                class="avatar avatar-sm me-2"
                                alt="logo_xd"
                              />
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">Adobe</h6>
                            </div>
                          </div>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="text-xs font-weight-bold"> 25% </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img
                                src="../../assets/img/small-logos/logo-atlassian.svg"
                                class="avatar avatar-sm me-2"
                                alt="logo_atlassian"
                              />
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">Atlassian</h6>
                            </div>
                          </div>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="text-xs font-weight-bold"> 13% </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img
                                src="../../assets/img/small-logos/logo-slack.svg"
                                class="avatar avatar-sm me-2"
                                alt="logo_slack"
                              />
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">Slack</h6>
                            </div>
                          </div>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="text-xs font-weight-bold"> 12% </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img
                                src="../../assets/img/small-logos/logo-spotify.svg"
                                class="avatar avatar-sm me-2"
                                alt="logo_spotify"
                              />
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">Spotify</h6>
                            </div>
                          </div>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="text-xs font-weight-bold"> 37% </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img
                                src="../../assets/img/small-logos/logo-jira.svg"
                                class="avatar avatar-sm me-2"
                                alt="logo_jira"
                              />
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">Jira</h6>
                            </div>
                          </div>
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="text-xs font-weight-bold"> 13% </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div class="col-lg-6 col-md-12 mt-4 mt-lg-0">
          <div class="card mt-4 mt-md-0">
            <div class="card-header pb-0 p-3">
              <div class="d-flex align-items-center">
                <h6>Pages</h6>
                <button type="button" class="btn btn-icon-only btn-rounded btn-outline-success mb-0 ms-2 btn-sm d-flex align-items-center justify-content-center ms-auto" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Data is based from sessions and is 100% accurate">
                  <i class="material-icons text-sm">done</i>
                </button>
              </div>
            </div>
            <div class="card-body px-3 pt-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Page</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Page Views</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Avg. Time</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Bounce Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">1. /bits</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">345</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">00:17:07</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">40.91%</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">2. /pages/argon-dashboard</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">520</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">00:23:13</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">30.14%</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">3. /pages/soft-ui-dashboard</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">122</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">00:3:10</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">54.10%</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">4. /bootstrap-themes</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">1,900</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">00:30:42</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">20.93%</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">5. /react-themes</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">1,442</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">00:31:50</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">34.98%</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">6. /product/argon-dashboard-angular</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">201</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">00:12:42</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">21.4%</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">7. /product/material-dashboard-pro</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">2,115</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">00:50:11</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-normal mb-0">34.98%</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
export default ReportesScreen;
