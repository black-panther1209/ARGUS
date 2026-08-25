import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Boxes,
  CheckCircle2,
  ChevronDown,
  Database,
  Download,
  FileText,
  Gauge,
  Globe2,
  Menu,
  Play,
  RefreshCw,
  Route,
  Save,
  Settings,
  ShieldAlert,
  Ship,
  SlidersHorizontal,
  Users,
  X,
  Zap
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


const API = "http://127.0.0.1:8000";


/* =====================================================
   SIDEBAR
===================================================== */

const navigation = [

  {
    id: "dashboard",
    name: "Dashboard",
    icon: Gauge
  },

  {
    id: "simulator",
    name: "Scenario Simulator",
    icon: SlidersHorizontal
  },

  {
    id: "impact",
    name: "Impact Analysis",
    icon: Activity
  },

  {
    id: "optimization",
    name: "Optimization",
    icon: Route
  },

  {
    id: "recommendations",
    name: "Recommendations",
    icon: FileText
  },

  {
    id: "alerts",
    name: "Alerts",
    icon: Bell
  },

  {
    id: "reports",
    name: "Reports",
    icon: Database
  },

  {
    id: "settings",
    name: "Settings",
    icon: Settings
  }

];


/* =====================================================
   CHART DATA
===================================================== */

const supplyData = [

  {
    day: "May 20",
    supply: 6.5,
    demand: 5.1
  },

  {
    day: "May 24",
    supply: 6.2,
    demand: 5.0
  },

  {
    day: "May 28",
    supply: 6.1,
    demand: 5.3
  },

  {
    day: "Jun 03",
    supply: 6.3,
    demand: 4.0
  },

  {
    day: "Jun 08",
    supply: 6.2,
    demand: 3.1
  },

  {
    day: "Jun 14",
    supply: 6.4,
    demand: 3.2
  },

  {
    day: "Jun 18",
    supply: 6.3,
    demand: 3.0
  }

];


const reserveData = [

  {
    day: "May 20",
    days: 30
  },

  {
    day: "May 24",
    days: 28
  },

  {
    day: "May 28",
    days: 25
  },

  {
    day: "Jun 03",
    days: 23
  },

  {
    day: "Jun 08",
    days: 21
  },

  {
    day: "Jun 14",
    days: 18
  },

  {
    day: "Jun 18",
    days: 17
  }

];


function Card({
  children,
  className = ""
}) {

  return (

    <div className={`card ${className}`}>

      {children}

    </div>

  );

}


/* =====================================================
   CHARTS
===================================================== */

function SupplyChart() {

  return (

    <ResponsiveContainer
      width="100%"
      height={250}
    >

      <LineChart data={supplyData}>

        <CartesianGrid
          stroke="#20304a"
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="day"
          stroke="#71809b"
          fontSize={11}
        />

        <YAxis
          stroke="#71809b"
          fontSize={11}
        />

        <Tooltip
          contentStyle={{
            background: "#0b1423",
            border: "1px solid #263a55"
          }}
        />

        <Legend />

        <Line
          type="monotone"
          dataKey="supply"
          stroke="#65e572"
          strokeWidth={2}
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="demand"
          stroke="#5da8ff"
          strokeWidth={2}
          dot={false}
        />

      </LineChart>

    </ResponsiveContainer>

  );

}


function ReserveChart() {

  return (

    <ResponsiveContainer
      width="100%"
      height={220}
    >

      <LineChart data={reserveData}>

        <CartesianGrid
          stroke="#20304a"
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="day"
          stroke="#71809b"
          fontSize={10}
        />

        <YAxis
          stroke="#71809b"
          fontSize={10}
        />

        <Tooltip
          contentStyle={{
            background: "#0b1423",
            border: "1px solid #263a55"
          }}
        />

        <Line
          type="monotone"
          dataKey="days"
          stroke="#b68cff"
          strokeWidth={2.5}
          dot={false}
        />

      </LineChart>

    </ResponsiveContainer>

  );

}


/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  color = ""
}) {

  return (

    <Card className="stat">

      <div className={`stat-icon ${color}`}>

        <Icon size={20} />

      </div>

      <div>

        <div className="stat-title">
          {title}
        </div>

        <div className={`stat-value ${color}`}>
          {value}
        </div>

        <div className="stat-sub">
          {subtitle}
        </div>

      </div>

    </Card>

  );

}


/* =====================================================
   APP
===================================================== */

export default function App() {

  const [page, setPage] =
    useState("dashboard");

  const [mobileMenu, setMobileMenu] =
    useState(false);


  /* SCENARIO */

  const [scenario, setScenario] =
    useState("Strait of Hormuz");

  const [severity, setSeverity] =
    useState(75);

  const [duration, setDuration] =
    useState(30);


  /* RESULTS */

  const [simulation, setSimulation] =
    useState(null);

  const [optimization, setOptimization] =
    useState(null);

  const [alerts, setAlerts] =
    useState([]);


  /* LOADING */

  const [loading, setLoading] =
    useState(false);

  const [optimizing, setOptimizing] =
    useState(false);


  /* SETTINGS */

  const [settings, setSettings] =
    useState({

      notifications: true,

      autoRefresh: false,

      threshold: 70,

      compact: false

    });


  const [message, setMessage] =
    useState("");


  /* LOAD SETTINGS */

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "energyResilienceSettings"
      );

    if (saved) {

      try {

        setSettings(
          JSON.parse(saved)
        );

      } catch {

        console.log(
          "Invalid saved settings"
        );

      }

    }

  }, []);


  /* LOAD ALERTS */

  useEffect(() => {

    fetch(`${API}/alerts`)

      .then(response =>
        response.json()
      )

      .then(data =>
        setAlerts(
          data.alerts || []
        )
      )

      .catch(() => {

        console.log(
          "Backend unavailable"
        );

      });

  }, []);


  /* =====================================================
     SIMULATION
  ===================================================== */

  async function runSimulation() {

    setLoading(true);

    try {

      const response =
        await fetch(
          `${API}/simulate`,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              scenario,

              severity,

              duration

            })

          }
        );


      if (!response.ok) {

        throw new Error(
          "Simulation failed"
        );

      }


      const data =
        await response.json();


      setSimulation(data);

      setOptimization(null);

      setPage("impact");


    } catch (error) {

      alert(
        "Backend is not running.\n\nStart FastAPI using:\npython -m uvicorn main:app --reload"
      );

    } finally {

      setLoading(false);

    }

  }


  /* =====================================================
     OPTIMIZATION
  ===================================================== */

  async function runOptimization() {

    setOptimizing(true);

    try {

      const response =
        await fetch(
          `${API}/optimize`,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              scenario,

              severity,

              duration

            })

          }
        );


      if (!response.ok) {

        throw new Error(
          "Optimization failed"
        );

      }


      const data =
        await response.json();


      setOptimization(data);

      setPage("optimization");


    } catch {

      alert(
        "Optimization API is not available."
      );

    } finally {

      setOptimizing(false);

    }

  }


  /* =====================================================
     RESET
  ===================================================== */

  function resetScenario() {

    setScenario(
      "Strait of Hormuz"
    );

    setSeverity(75);

    setDuration(30);

    setSimulation(null);

    setOptimization(null);

  }


  /* =====================================================
     REPORT
  ===================================================== */

  function downloadReport() {

    const report = {

      generatedAt:
        new Date().toISOString(),

      project:
        "Energy Resilience AI",

      scenario: {

        name: scenario,

        severity,

        duration

      },

      simulation,

      optimization,

      alerts,

      settings

    };


    const blob =
      new Blob(
        [
          JSON.stringify(
            report,
            null,
            2
          )
        ],
        {
          type:
            "application/json"
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "energy-resilience-report.json";

    link.click();


    URL.revokeObjectURL(url);


    showMessage(
      "Report downloaded successfully."
    );

  }


  /* =====================================================
     SAVE SETTINGS
  ===================================================== */

  function saveSettings() {

    localStorage.setItem(

      "energyResilienceSettings",

      JSON.stringify(
        settings
      )

    );


    showMessage(
      "Settings saved successfully."
    );

  }


  function showMessage(text) {

    setMessage(text);

    setTimeout(() => {

      setMessage("");

    }, 2500);

  }


  /* =====================================================
     NAVIGATION
  ===================================================== */

  function navigate(id) {

    setPage(id);

    setMobileMenu(false);

  }


  const currentPage =
    navigation.find(
      item => item.id === page
    );


  /* =====================================================
     DASHBOARD
  ===================================================== */

  function Dashboard() {

    return (

      <>

        <div className="stats">

          <StatCard
            icon={ShieldAlert}
            title="Current Geopolitical Risk"
            value="HIGH"
            subtitle="Global Risk Level"
            color="red"
          />

          <StatCard
            icon={Route}
            title="Critical Corridors"
            value="3"
            subtitle="Under High Risk"
          />

          <StatCard
            icon={Users}
            title="Supplier Exposure"
            value="14.2%"
            subtitle="Potential Supply Exposure"
          />

          <StatCard
            icon={Boxes}
            title="Strategic Reserve"
            value="23"
            subtitle="Days of Net Imports"
            color="purple"
          />

          <StatCard
            icon={Ship}
            title="Supply Status"
            value="NORMAL"
            subtitle="Overall Supply Status"
            color="green"
          />

          <StatCard
            icon={AlertTriangle}
            title="Active Disruptions"
            value="2"
            subtitle="Active Events"
            color="red"
          />

        </div>


        <div className="dashboard-grid">


          {/* MAP */}

          <Card className="map-card">

            <div className="card-head">

              <h2>
                Critical Corridors Risk
              </h2>

              <Globe2 size={18}/>

            </div>


            <div className="map">

              <div className="world">
                WORLD
              </div>


              <div className="route-line r1">
                ●────────●
              </div>

              <div className="route-line r2">
                ●──────●
              </div>

              <div className="route-line r3">
                ●────────────●
              </div>


              <div className="map-label l1">

                <b>
                  Strait of Hormuz
                </b>

                <span>
                  RISK: HIGH
                </span>

              </div>


              <div className="map-label l2">

                <b>
                  Suez / Red Sea
                </b>

                <span className="yellow">
                  RISK: MEDIUM
                </span>

              </div>


              <div className="map-label l3">

                <b>
                  Malacca Strait
                </b>

                <span className="green">
                  RISK: LOW
                </span>

              </div>


              <div className="legend">

                <span>🔴 High</span>

                <span>🟡 Medium</span>

                <span>🟢 Low</span>

              </div>

            </div>

          </Card>


          {/* EVENTS */}

          <Card>

            <div className="card-head">

              <h2>
                Active Disruptions
              </h2>

              <AlertTriangle size={18}/>

            </div>


            <div className="event">

              <div>

                <b>
                  Strait of Hormuz
                  Disruption
                </b>

                <span>
                  Severity:
                  <strong className="red">
                    HIGH
                  </strong>
                  {" · "}
                  30 days
                </span>

              </div>

              <label className="badge redbg">
                HIGH
              </label>

            </div>


            <div className="event">

              <div>

                <b>
                  Red Sea Congestion
                </b>

                <span>
                  Severity:
                  <strong className="yellow">
                    MEDIUM
                  </strong>
                  {" · "}
                  15 days
                </span>

              </div>

              <label className="badge yellowbg">
                MEDIUM
              </label>

            </div>

          </Card>


          {/* SUPPLIERS */}

          <Card>

            <div className="card-head">

              <h2>
                Top Supplier Exposure
              </h2>

              <Users size={18}/>

            </div>


            {[
              ["Saudi Arabia", 22.1],
              ["Iraq", 17.3],
              ["UAE", 14.2],
              ["Russia", 10.1],
              ["USA", 8.7],
              ["Brazil", 6.3]
            ].map(
              ([name, exposure]) => (

                <div
                  className="supplier"
                  key={name}
                >

                  <span>
                    {name}
                  </span>

                  <div className="bar">

                    <i
                      style={{
                        width:
                          `${exposure * 3.8}%`
                      }}
                    />

                  </div>

                  <b>
                    {exposure}%
                  </b>

                </div>

              )
            )}

          </Card>


          {/* SUPPLY CHART */}

          <Card className="chart-wide">

            <div className="card-head">

              <div>

                <h2>
                  Supply vs Demand
                </h2>

                <span>
                  Next 30 Days
                </span>

              </div>

              <BarChart3 size={18}/>

            </div>

            <SupplyChart/>

          </Card>


          {/* RESERVE */}

          <Card>

            <div className="card-head">

              <div>

                <h2>
                  Strategic Reserve Trend
                </h2>

                <span>
                  Days
                </span>

              </div>

              <Boxes size={18}/>

            </div>

            <ReserveChart/>

          </Card>

        </div>

      </>

    );

  }


  /* =====================================================
     SIMULATOR
  ===================================================== */

  function Simulator() {

    return (

      <div className="page-content">

        <Card className="hero-card">

          <div>

            <span className="eyebrow">
              DECISION SUPPORT
            </span>

            <h2>
              Scenario Simulator
            </h2>

            <p>
              Test a geopolitical disruption
              and calculate supply impact.
            </p>

          </div>

          <SlidersHorizontal
            size={32}
          />

        </Card>


        <Card className="controls-card">

          <div className="form-grid">


            <label>

              Scenario

              <select
                value={scenario}
                onChange={e =>
                  setScenario(
                    e.target.value
                  )
                }
              >

                <option>
                  Strait of Hormuz
                </option>

                <option>
                  Red Sea Disruption
                </option>

                <option>
                  Major Supplier Disruption
                </option>

              </select>

            </label>


            <label>

              Severity

              <b>
                {severity}%
              </b>

              <input
                type="range"
                min="0"
                max="100"
                value={severity}
                onChange={e =>
                  setSeverity(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

            </label>


            <label>

              Duration

              <b>
                {duration} days
              </b>

              <input
                type="range"
                min="5"
                max="90"
                value={duration}
                onChange={e =>
                  setDuration(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

            </label>


          </div>


          <div className="button-row">

            <button
              className="primary"
              onClick={
                runSimulation
              }
              disabled={loading}
            >

              <Play size={16}/>

              {loading
                ? "Running..."
                : "Run Simulation"}

            </button>


            <button
              className="secondary"
              onClick={
                resetScenario
              }
            >

              <RefreshCw
                size={16}
              />

              Reset

            </button>

          </div>

        </Card>

      </div>

    );

  }


  /* =====================================================
     IMPACT
  ===================================================== */

  function ImpactAnalysis() {

    return (

      <div className="page-content">

        <Card className="hero-card">

          <div>

            <span className="eyebrow">
              IMPACT ANALYSIS
            </span>

            <h2>
              Disruption Impact
            </h2>

            <p>
              Analyze supply, reserve
              and route impact.
            </p>

          </div>

          <Activity size={32}/>

        </Card>


        {!simulation ? (

          <Card className="empty-panel">

            <Activity size={40}/>

            <h2>
              No simulation available
            </h2>

            <p>
              Run a scenario first.
            </p>

            <button
              className="primary"
              onClick={() =>
                navigate("simulator")
              }
            >

              Open Simulator

            </button>

          </Card>

        ) : (

          <Card className="result-card">

            <span className="eyebrow">
              SIMULATION RESULT
            </span>

            <h2>
              {simulation.scenario}
            </h2>


            <div className="metric-grid">

              <div>

                <small>
                  CRUDE DEFICIT
                </small>

                <strong>
                  {simulation
                    .expected_crude_deficit}%
                </strong>

              </div>


              <div>

                <small>
                  RESERVE AFTER
                </small>

                <strong>
                  {simulation
                    .reserve_after_days}
                  {" "}
                  days
                </strong>

              </div>


              <div>

                <small>
                  REFINERIES AFFECTED
                </small>

                <strong>
                  {simulation
                    .affected_refineries}
                </strong>

              </div>


              <div>

                <small>
                  SEVERITY
                </small>

                <strong>
                  {simulation.severity}%
                </strong>

              </div>

            </div>


            <div className="route-grid">

              {Object.entries(
                simulation.routes
              ).map(
                ([route, status]) => (

                  <div key={route}>

                    <span>
                      {route}
                    </span>

                    <b
                      className={
                        status ===
                        "DISRUPTED"
                          ? "red"
                          : "green"
                      }
                    >
                      {status}
                    </b>

                  </div>

                )
              )}

            </div>


            <button
              className="primary"
              onClick={
                runOptimization
              }
            >

              <Route size={16}/>

              {optimizing
                ? "Optimizing..."
                : "Optimize Response"}

            </button>

          </Card>

        )}


        <div className="two-col">

          <Card>

            <div className="card-head">

              <h2>
                Supply vs Demand
              </h2>

            </div>

            <SupplyChart/>

          </Card>


          <Card>

            <div className="card-head">

              <h2>
                Strategic Reserve
              </h2>

            </div>

            <ReserveChart/>

          </Card>

        </div>

      </div>

    );

  }


  /* =====================================================
     OPTIMIZATION
  ===================================================== */

  function Optimization() {

    return (

      <div className="page-content">

        <Card className="hero-card">

          <div>

            <span className="eyebrow">
              OPTIMIZATION ENGINE
            </span>

            <h2>
              Response Optimization
            </h2>

            <p>
              AI-assisted supplier allocation
              and response planning.
            </p>

          </div>

          <Route size={32}/>

        </Card>


        {!optimization ? (

          <Card className="empty-panel">

            <Route size={40}/>

            <h2>
              No optimized response
            </h2>

            <p>
              Run a simulation first and
              click Optimize Response.
            </p>

            <button
              className="primary"
              onClick={() =>
                navigate("simulator")
              }
            >
              Open Simulator
            </button>

          </Card>

        ) : (

          <Card className="optimization-card">

            <div className="optimization-header">

              <div>

                <span className="success">
                  ✓ OPTIMIZATION COMPLETE
                </span>

                <h2>
                  Recommended Allocation
                </h2>

              </div>


              <div className="risk-box">

                Residual Risk

                <strong>
                  {optimization
                    .residual_risk}
                </strong>

              </div>

            </div>


            <div className="allocation-grid">

              {Object.entries(
                optimization.allocation
              ).map(
                ([supplier, amount]) => (

                  <div key={supplier}>

                    <span>
                      {supplier}
                    </span>

                    <strong>
                      {amount}
                    </strong>

                    <small>
                      units
                    </small>

                  </div>

                )
              )}

            </div>


            <div className="strategy-list">

              {optimization.strategy.map(
                (item, index) => (

                  <div key={index}>

                    <span>
                      {index + 1}
                    </span>

                    {item}

                  </div>

                )
              )}

            </div>


            <div className="metric-grid">

              <div>

                <small>
                  GAP BEFORE
                </small>

                <strong>
                  {optimization
                    .expected_supply_gap_before}
                </strong>

              </div>


              <div>

                <small>
                  GAP AFTER
                </small>

                <strong className="green">
                  {optimization
                    .expected_supply_gap_after}
                </strong>

              </div>


              <div>

                <small>
                  ADDITIONAL COST
                </small>

                <strong>
                  ${optimization
                    .additional_cost}
                </strong>

              </div>

            </div>


            <p className="explanation">

              {optimization.explanation}

            </p>

          </Card>

        )}

      </div>

    );

  }


  /* =====================================================
     RECOMMENDATIONS
  ===================================================== */

  function Recommendations() {

    const recommendations =
      optimization?.strategy || [

        "Increase US crude procurement",

        "Increase Brazilian crude procurement",

        "Increase Russian allocation where feasible",

        "Redirect selected cargo through alternative routes",

        "Use controlled strategic reserve drawdown"

      ];


    return (

      <div className="page-content">

        <Card className="hero-card">

          <div>

            <span className="eyebrow">
              AI DECISION SUPPORT
            </span>

            <h2>
              Recommendations
            </h2>

            <p>
              Recommended actions for
              the current scenario.
            </p>

          </div>

          <FileText size={32}/>

        </Card>


        <Card className="recommendations">

          {recommendations.map(
            (item, index) => (

              <div
                className="recommendation"
                key={index}
              >

                <div>
                  {index + 1}
                </div>

                <span>
                  {item}
                </span>

                <CheckCircle2
                  size={18}
                />

              </div>

            )
          )}


          <div className="recommendation-summary">

            <b>
              Expected outcome:
            </b>

            {" "}
            supply gap 14.2% → 3.7%,
            residual risk LOW.

          </div>

        </Card>

      </div>

    );

  }


  /* =====================================================
     ALERTS
  ===================================================== */

  function AlertsPage() {

    return (

      <div className="page-content">

        <Card className="hero-card">

          <div>

            <span className="eyebrow">
              MONITORING
            </span>

            <h2>
              Alerts
            </h2>

            <p>
              Current geopolitical
              and supply alerts.
            </p>

          </div>

          <Bell size={32}/>

        </Card>


        <div className="alert-list">

          {alerts.map(
            alert => (

              <Card
                className="alert-item"
                key={alert.id}
              >

                <AlertTriangle
                  size={22}
                />

                <div>

                  <b>
                    {alert.title}
                  </b>

                  <span>
                    {alert.status}
                  </span>

                </div>

                <strong
                  className={
                    alert.level === "HIGH"
                      ? "red"
                      : "yellow"
                  }
                >

                  {alert.level}

                </strong>

              </Card>

            )
          )}

        </div>

      </div>

    );

  }


  /* =====================================================
     REPORTS
  ===================================================== */

  function Reports() {

    return (

      <div className="page-content">

        <Card className="hero-card">

          <div>

            <span className="eyebrow">
              REPORTING
            </span>

            <h2>
              Reports
            </h2>

            <p>
              Generate a report from
              your current analysis.
            </p>

          </div>

          <Database size={32}/>

        </Card>


        <Card className="report-card">

          <div className="report-preview">

            <FileText size={42}/>

            <h2>
              Energy Resilience Report
            </h2>

            <p>
              Scenario:
              {" "}
              <b>{scenario}</b>
            </p>

            <p>
              Severity:
              {" "}
              <b>{severity}%</b>
            </p>

            <p>
              Duration:
              {" "}
              <b>{duration} days</b>
            </p>


            {simulation && (

              <p>

                Crude deficit:
                {" "}
                <b>
                  {simulation
                    .expected_crude_deficit}%
                </b>

                {" · "}

                Reserve:
                {" "}
                <b>
                  {simulation
                    .reserve_after_days}
                  {" "}
                  days
                </b>

              </p>

            )}

          </div>


          <button
            className="primary"
            onClick={
              downloadReport
            }
          >

            <Download size={17}/>

            Download Report

          </button>


          {message && (

            <div className="toast">

              {message}

            </div>

          )}

        </Card>

      </div>

    );

  }


  /* =====================================================
     SETTINGS
  ===================================================== */

  function SettingsPage() {

    return (

      <div className="page-content">

        <Card className="hero-card">

          <div>

            <span className="eyebrow">
              CONFIGURATION
            </span>

            <h2>
              Settings
            </h2>

            <p>
              Configure dashboard behavior.
            </p>

          </div>

          <Settings size={32}/>

        </Card>


        <Card className="settings-card">


          {/* NOTIFICATIONS */}

          <SettingRow
            title="Notifications"
            description="Show risk notifications."
            value={
              settings.notifications
            }
            onChange={value =>
              setSettings({
                ...settings,
                notifications: value
              })
            }
          />


          {/* AUTO REFRESH */}

          <SettingRow
            title="Auto Refresh"
            description="Automatically refresh monitoring data."
            value={
              settings.autoRefresh
            }
            onChange={value =>
              setSettings({
                ...settings,
                autoRefresh: value
              })
            }
          />


          {/* THRESHOLD */}

          <div className="setting-row">

            <div>

              <b>
                Risk Alert Threshold
              </b>

              <span>
                Current threshold:
                {" "}
                {settings.threshold}
              </span>

            </div>


            <input
              type="range"
              min="30"
              max="100"
              value={
                settings.threshold
              }
              onChange={e =>
                setSettings({
                  ...settings,
                  threshold:
                    Number(
                      e.target.value
                    )
                })
              }
            />

          </div>


          {/* COMPACT */}

          <SettingRow
            title="Compact Dashboard"
            description="Use a compact dashboard layout."
            value={
              settings.compact
            }
            onChange={value =>
              setSettings({
                ...settings,
                compact: value
              })
            }
          />


          <button
            className="primary"
            onClick={
              saveSettings
            }
          >

            <Save size={17}/>

            Save Settings

          </button>


          {message && (

            <div className="toast">

              {message}

            </div>

          )}

        </Card>

      </div>

    );

  }


  /* =====================================================
     SETTING ROW
  ===================================================== */

  function SettingRow({
    title,
    description,
    value,
    onChange
  }) {

    return (

      <div className="setting-row">

        <div>

          <b>
            {title}
          </b>

          <span>
            {description}
          </span>

        </div>


        <button
          className={
            `toggle ${value ? "on" : ""}`
          }
          onClick={() =>
            onChange(!value)
          }
        >

          <i />

        </button>

      </div>

    );

  }


  /* =====================================================
     PAGE SWITCH
  ===================================================== */

  function renderPage() {

    switch (page) {

      case "dashboard":
        return <Dashboard/>;

      case "simulator":
        return <Simulator/>;

      case "impact":
        return <ImpactAnalysis/>;

      case "optimization":
        return <Optimization/>;

      case "recommendations":
        return <Recommendations/>;

      case "alerts":
        return <AlertsPage/>;

      case "reports":
        return <Reports/>;

      case "settings":
        return <SettingsPage/>;

      default:
        return <Dashboard/>;

    }

  }


  /* =====================================================
     FINAL UI
  ===================================================== */

  return (

    <div
      className={
        `app ${
          settings.compact
            ? "compact"
            : ""
        }`
      }
    >


      {/* MOBILE BUTTON */}

      <button
        className="mobile-menu"
        onClick={() =>
          setMobileMenu(
            !mobileMenu
          )
        }
      >

        {mobileMenu
          ? <X size={20}/>
          : <Menu size={20}/>}

      </button>


      {/* SIDEBAR */}

      <aside
        className={
          `sidebar ${
            mobileMenu
              ? "open"
              : ""
          }`
        }
      >


        <div className="brand">

          <div className="brand-icon">

            <Zap size={22}/>

          </div>


          <div>

            <b>
              ENERGY RESILIENCE
            </b>

            <span>
              AI DECISION SUPPORT
            </span>

          </div>

        </div>


        <nav>

          {navigation.map(
            item => {

              const Icon =
                item.icon;

              return (

                <button
                  key={item.id}
                  className={
                    `nav-item ${
                      page === item.id
                        ? "active"
                        : ""
                    }`
                  }
                  onClick={() =>
                    navigate(
                      item.id
                    )
                  }
                >

                  <Icon size={18}/>

                  <span>
                    {item.name}
                  </span>


                  {item.id ===
                    "alerts" &&
                    alerts.length > 0 && (

                    <em>
                      {alerts.length}
                    </em>

                  )}

                </button>

              );

            }
          )}

        </nav>


        <div className="side-index">

          <span>
            Energy Resilience Index
          </span>

          <strong>
            72
            <small>
              /100
            </small>
          </strong>

          <em>
            ● STABLE
          </em>

        </div>

      </aside>


      {/* MAIN */}

      <main>


        <header>

          <div>

            <h1>
              {currentPage?.name}
            </h1>

            <p>
              India crude supply
              network resilience monitor
            </p>

          </div>


          <div className="header-right">

            <div className="date">

              Data as of

              <br/>

              <b>
                20 May 2025
              </b>

            </div>


            <Bell size={19}/>


            <div className="profile">

              <div className="avatar">
                A
              </div>

              Analyst

              <ChevronDown
                size={14}
              />

            </div>

          </div>

        </header>


        {renderPage()}


      </main>

    </div>

  );

}