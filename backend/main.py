from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from scipy.optimize import linprog

app = FastAPI(
    title="Energy Resilience API",
    version="2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# REQUEST MODEL
# -----------------------------

class ScenarioRequest(BaseModel):
    scenario: str = "Strait of Hormuz"
    severity: int = 75
    duration: int = 30


# -----------------------------
# HOME
# -----------------------------

@app.get("/")
def home():
    return {
        "status": "online",
        "message": "Energy Resilience API is running"
    }


# -----------------------------
# DASHBOARD
# -----------------------------

@app.get("/dashboard")
def dashboard():

    return {
        "resilience_index": 72,
        "geopolitical_risk": "HIGH",
        "critical_corridors": 3,
        "supplier_exposure": 14.2,
        "strategic_reserve": 23,
        "supply_status": "NORMAL",
        "active_disruptions": 2,

        "events": [
            {
                "name": "Strait of Hormuz Disruption",
                "severity": "HIGH",
                "duration": 30
            },
            {
                "name": "Red Sea Congestion",
                "severity": "MEDIUM",
                "duration": 15
            }
        ],

        "suppliers": [
            {
                "name": "Saudi Arabia",
                "exposure": 22.1,
                "risk": "HIGH"
            },
            {
                "name": "Iraq",
                "exposure": 17.3,
                "risk": "HIGH"
            },
            {
                "name": "UAE",
                "exposure": 14.2,
                "risk": "MEDIUM"
            },
            {
                "name": "Russia",
                "exposure": 10.1,
                "risk": "LOW"
            },
            {
                "name": "USA",
                "exposure": 8.7,
                "risk": "LOW"
            },
            {
                "name": "Brazil",
                "exposure": 6.3,
                "risk": "LOW"
            }
        ]
    }


# -----------------------------
# SCENARIO SIMULATION
# -----------------------------

@app.post("/simulate")
def simulate(request: ScenarioRequest):

    severity = max(0, min(request.severity, 100))
    duration = max(1, request.duration)

    scenario_factor = {
        "Strait of Hormuz": 1.0,
        "Red Sea Disruption": 0.65,
        "Major Supplier Disruption": 0.85
    }

    factor = scenario_factor.get(
        request.scenario,
        1.0
    )

    crude_deficit = (
        4 +
        (severity / 100) * 10.2
    )

    crude_deficit *= factor
    crude_deficit *= min(duration / 30, 2)

    crude_deficit = min(
        round(crude_deficit, 1),
        40
    )

    reserve_loss = (
        duration / 30
    ) * (
        severity / 75
    ) * 6

    reserve_after = max(
        5,
        round(23 - reserve_loss)
    )

    if severity >= 75:
        refineries = 3
    elif severity >= 50:
        refineries = 2
    else:
        refineries = 1

    routes = {
        "Hormuz": "AVAILABLE",
        "Red Sea": "AVAILABLE",
        "Cape Route": "AVAILABLE",
        "Malacca": "AVAILABLE"
    }

    if request.scenario == "Strait of Hormuz":
        routes["Hormuz"] = "DISRUPTED"

    elif request.scenario == "Red Sea Disruption":
        routes["Red Sea"] = "DISRUPTED"

    return {
        "scenario": request.scenario,
        "severity": severity,
        "duration": duration,
        "expected_crude_deficit": crude_deficit,
        "reserve_before_days": 23,
        "reserve_after_days": reserve_after,
        "affected_refineries": refineries,
        "routes": routes
    }


# -----------------------------
# OPTIMIZATION
# -----------------------------

@app.post("/optimize")
def optimize(request: ScenarioRequest):

    suppliers = [
        "USA",
        "Brazil",
        "Russia"
    ]

    capacity = [
        8,
        6,
        10
    ]

    cost = [
        75,
        73,
        70
    ]

    required_supply = 15

    result = linprog(
        c=cost,
        A_ub=[
            [-1, -1, -1]
        ],
        b_ub=[
            -required_supply
        ],
        bounds=[
            (0, capacity[0]),
            (0, capacity[1]),
            (0, capacity[2])
        ],
        method="highs"
    )

    if result.success:

        allocation = {
            suppliers[i]: round(
                float(result.x[i]),
                2
            )
            for i in range(len(suppliers))
        }

        total_cost = round(
            float(result.fun),
            2
        )

    else:

        allocation = {
            "USA": 0,
            "Brazil": 0,
            "Russia": 0
        }

        total_cost = 0

    return {
        "status": "optimized",

        "strategy": [
            "Increase US crude procurement",
            "Increase Brazilian crude procurement",
            "Increase Russian allocation where feasible",
            "Redirect selected cargo through alternative routes",
            "Use controlled strategic reserve drawdown"
        ],

        "allocation": allocation,

        "additional_cost": total_cost,

        "expected_supply_gap_before": "14.2%",

        "expected_supply_gap_after": "3.7%",

        "residual_risk": "LOW",

        "explanation":
            "The optimized plan diversifies suppliers, "
            "avoids the disrupted corridor and reduces "
            "reserve depletion."
    }


# -----------------------------
# RECOMMENDATIONS
# -----------------------------

@app.post("/recommendation")
def recommendation(request: ScenarioRequest):

    return {
        "title": "Recommended Strategy",

        "recommendations": [
            "Increase US crude procurement",
            "Increase Brazilian crude procurement",
            "Increase Russian allocation where feasible",
            "Redirect selected cargo through alternative routes",
            "Use controlled strategic reserve drawdown"
        ],

        "expected_result": {
            "supply_gap": "14.2% → 3.7%",
            "residual_risk": "LOW"
        }
    }


# -----------------------------
# ALERTS
# -----------------------------

@app.get("/alerts")
def alerts():

    return {
        "alerts": [
            {
                "id": 1,
                "title": "Strait of Hormuz risk elevated",
                "level": "HIGH",
                "status": "Active"
            },
            {
                "id": 2,
                "title": "Red Sea congestion detected",
                "level": "MEDIUM",
                "status": "Monitoring"
            },
            {
                "id": 3,
                "title": "Supplier exposure above threshold",
                "level": "MEDIUM",
                "status": "Monitoring"
            }
        ]
    }