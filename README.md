Project Argus: Adaptive Resilience & Procurement Orchestrator
🏆 Developed for IEEE Hack Synapse 2026 (36-Hour Offline Hackathon)
Track: National Infrastructure & Energy Resilience Modeling
Team: ALT ELITE

Team Leader: Shristi Pandey / Antara Sharma
Team Members: You (Frontend & Product Integration), Antara Sharma & Lakshmi Pandey (Simulation & Optimization), Shristi Pandey & Niharika Singh (Data Pipeline & AI Engineering)
📌 Executive Summary
Project Argus is an offline-first, mathematically-driven Energy Resilience Decision-Support System (DSS) designed to protect India's crude oil supply chain from sudden maritime chokepoint closures and geopolitical disruptions.

Traditional crisis response is reactive, relying on manual spreadsheet recalculations that take 48 to 72 hours. Project Argus automates this entire loop, executing high-performance Linear Programming (LP) optimizations via SciPy and using Generative AI strictly as an explanation layer to translate mathematical truth into actionable, plain-English strategic recommendations for security and energy planners in under 10 seconds.

🔴 The Problem Space: India's Vulnerabilities
India's economic growth is inextricably linked to its energy security, but the current grid is exposed to acute strategic risks:

High Import Dependency: India imports over 85% of its daily crude oil requirements, leaving it highly vulnerable to supplier sanctions, regional conflicts, or transit lane blockades [9, 103].
Maritime Choke Point Exposure: 14.2% of India's total daily crude oil supply passes directly through the volatile Strait of Hormuz [9, 105]. Active regional events in the Red Sea and Bab-el-Mandeb further constrain shipping routes [60, 77].
Finite Strategic Buffers: India's Strategic Petroleum Reserves (SPR) provide a national runway threshold of only 23 days under full import cutoff conditions [9, 105].
Static Emergency Response: Current crisis response infrastructure relies on static Excel modeling [77]. Recalculating allocations and route diversions across refineries during disruptions takes days, resulting in delayed decisions and unnecessary drawdown of strategic reserves [9, 77].
API Fragility & Black Boxes: Conceptual dashboards fail during real-world crises if third-party tracking APIs crash or go offline [78, 91]. Furthermore, optimization software outputs raw, uninterpretable variables (e.g., allocation_x = +15000) without explaining the strategic why [78, 117].
⚙️ The Core Decision-Support Loop
Project Argus automates crisis-response orchestration through a continuous 5-step pipeline [59]:

  ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
  │  1. RISK/EVENT  │ ───> │  2. DISRUPTION  │ ───> │    3. IMPACT    │
  │   News & Alerts │      │ Bottleneck Risk │      │ Deficit/SPR Calc│
  └─────────────────┘      └─────────────────┘      └─────────────────┘
                                                             │
  ┌─────────────────┐      ┌─────────────────┐               │
  │  5. RECOMMEND   │ <─── │ 4. OPTIMIZATION │ <─────────────┘
  │  GenAI Explanation│      │ SciPy LP Solver │
  └─────────────────┘      └─────────────────┘
Risk / Event Ingestion: Monitors news channels, text briefs, and geopolitical feeds for regional escalations [17, 83].
Disruption Translation: Converts raw text data into physical bottleneck risk coefficients on shipping channels (e.g., Strait of Hormuz 75% blockade) [17, 83].
Network Impact Simulation: Calculates immediate expected crude deficits (e.g., 14.2% supply drop), identifies affected inland refinery units, and projects strategic reserve depletion runways [17, 84].
Deterministic Optimization: Formulates alternative imports as a cost-minimization mathematical model, rerouting cargo via safe corridors (e.g., Cape of Good Hope) [17, 84].
Explainable AI Strategic Briefing: Leverages an LLM solely to convert the raw numeric solver allocations into clear, plain-English tactical rationales explaining why specific supplier decisions were made [17, 84].
📊 Mathematical Optimization Engine
Unlike standard hackathon entries that use LLMs to "hallucinate" math calculations, Project Argus ensures mathematical truth by running a deterministic Linear Program using Python’s scipy.optimize.linprog [92].

1. Objective Function
The engine minimizes the total strategic cost ($Z$) associated with buying, transporting, and suffering deficits:

$$\min Z = \sum_{s,r,k} \left( P_s \cdot V_{s,r,k} ight) + \sum_{s,r,k} \left( T_k \cdot V_{s,r,k} ight) + \sum_{s,r,k} \left( R_k \cdot V_{s,r,k} ight) + \left( ext{Pen}_{ ext{gap}} \cdot ext{Supply_Deficit} ight)$$

Where:

$P_s$: Purchase price per barrel from supplier $s$ [115].
$T_k$: Shipping transit fee for route/corridor $k$ [115].
$R_k$: Configured geopolitical risk-penalty coefficient of transit corridor $k$ [115].
$ ext{Pen}_{ ext{gap}}$: High cost penalty assigned to any unmet national inland refinery demand [115].
$V_{s,r,k}$: Volume of crude allocated from supplier $s$ to refinery $r$ via corridor $k$ [115].
2. Constraints Setup
Supplier Capacity: The total volume sourced from any exporter cannot exceed their maximum daily capacity [115]: $$\sum_{r,k} V_{s,r,k} \le ext{Capacity}_s$$
Route Availability: Rerouting forces allocations to zero if a corridor exceeds configured risk thresholds [116]: $$V_{s,r,k} = 0 \quad orall k ext{ where } ext{Risk}_k > ext{Threshold}$$
Refinery Demand: Guarantees inland refineries receive feedstock above their absolute shutdown limits [116]: $$\sum_{s,k} V_{s,r,k} \ge ext{Demand}_r$$
Strategic Petroleum Reserve (SPR) Balances: Depletion is tracked over crisis duration ($t$), penalizing high drawdowns to conserve the national reserve buffer [116]: $$S_t = S_{t-1} - ext{Deficit}_t$$
🧠 Decoupled AI: Explainable Decision Support
Project Argus operates on the strict architectural principle: Mathematical truth stays inside the solver; Generative AI translates variables into strategic context [38].

┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│       RAW LP SOLVER OUTPUT      │       │     EXPLAINABLE AI REASONING    │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│ • US Gulf Crude: +6.5% bpd      │ ───>  │ "US Gulf crude was prioritized  │
│ • Brazilian Crude: +4.2% bpd    │  LLM  │ because sufficient supplier     │
│ • Russian Ural: +3.5% bpd       │ Trans │ capacity remains, the route     │
│ • SPR Draw: 2.4 days            │ lator │ avoids the Hormuz chokepoint,   │
│ • Cost Premium: +$1.82/bbl      │       │ and transportation cost is lower│
│                                 │       │ than the next best alternative."│
└─────────────────────────────────┘       └─────────────────────────────────┘
The LLM integrates the relational database variables with the LP allocation metrics to produce decision-ready reports for defense commanders and energy ministers [119].

🛠️ Technology Stack
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                               FRONTEND                                  │
 │         React + Vite  •  Tailwind CSS  •  Recharts  •  Leaflet          │
 └────────────────────────────────────┬────────────────────────────────────┘
                                      │ REST API (JSON)
 ┌────────────────────────────────────┴────────────────────────────────────┐
 │                                BACKEND                                  │
 │                         FastAPI Asynchronous Web                        │
 └────────────────────────────────────┬────────────────────────────────────┘
                                      │
 ┌────────────────────────────────────┴────────────────────────────────────┐
 │                          COMPUTATIONAL ANALYTICS                        │
 │        Python Cores  •  SciPy Optimization  •  NumPy & Pandas           │
 └────────────────────────────────────┬────────────────────────────────────┘
                                      │
 ┌────────────────────────────────────┴────────────────────────────────────┐
 │                             DATA STORAGE                                │
 │          PostgreSQL Database  •  Local SQLite/JSON Offline Fallback     │
 └─────────────────────────────────────────────────────────────────────────┘
Frontend: Built with React and Vite for fast HMR [85]. Styled with Tailwind CSS for a technical dark interface [85]. Graph visualizations run on Recharts [85], and the geographic shipping map overlays use interactive Leaflet maps [85].
Backend: FastAPI implements asynchronous REST endpoints, completely separating UI rendering from heavier mathematical operations [86].
Optimization & Math: Solves multi-constraint linear program matrices using SciPy linprog [25]. Matrix operations are managed through NumPy and Pandas [86].
Resilient Storage: Primary transactional storage is handled by PostgreSQL [87]. An automatic SQLite & JSON offline fallback is implemented; if live database servers or external APIs go offline, the system continues running on local curated baseline coordinates to ensure the demo is entirely crash-proof [87, 89].
💻 Code Structure & Implementation
project-argus/
├── frontend/
│   ├── src/
│   │   ├── components/       # Map, Charts, Scenario sliders
│   │   ├── App.jsx           # Stateful UI shell
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── app/
│   │   ├── solver.py         # SciPy linprog optimization engine
│   │   ├── schema.py         # Relational database models
│   │   └── main.py           # FastAPI endpoints
│   ├── data/
│   │   └── reference_data.json # Offline fallback coordinates
│   ├── requirements.txt
│   └── Dockerfile
└── README.md
Core Solver Snippet (backend/app/solver.py)
Below is a simplified example of how the SciPy Linear Programming model is implemented to calculate the optimized alternative allocations:

import numpy as np
from scipy.optimize import linprog

def optimize_procurement(supplier_capacities, refinery_demands, route_costs, active_corridor_risks):
    """
    Solves cost-minimization supply reallocation under constraints.
    """
    num_suppliers = len(supplier_capacities)
    num_refineries = len(refinery_demands)

    # Flatten cost matrix: Purchase + Transit + Geopolitical Risk Penalty
    c = []
    for s in range(num_suppliers):
        for r in range(num_refineries):
            total_cost = route_costs[s][r]['purchase'] + route_costs[s][r]['transit']
            # Incorporate route penalty
            risk_penalty = active_corridor_risks[s][r] * 10.0
            c.append(total_cost + risk_penalty)

    # Inequality constraints (A_ub, b_ub) -> Exporter capacities
    A_ub = []
    b_ub = []
    for s in range(num_suppliers):
        row = np.zeros(num_suppliers * num_refineries)
        row[s*num_refineries : (s+1)*num_refineries] = 1.0
        A_ub.append(row)
        b_ub.append(supplier_capacities[s])

    # Equality constraints (A_eq, b_eq) -> Refinery feed demands
    A_eq = []
    b_eq = []
    for r in range(num_refineries):
        row = np.zeros(num_suppliers * num_refineries)
        for s in range(num_suppliers):
            row[s*num_refineries + r] = 1.0
        A_eq.append(row)
        b_eq.append(refinery_demands[r])

    # Bounds (allocations cannot be negative)
    bounds = [(0, None) for _ in range(num_suppliers * num_refineries)]

    # Run SciPy Solver
    result = linprog(c, A_ub=A_ub, b_ub=b_ub, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')

    if result.success:
        return result.x.reshape((num_suppliers, num_refineries)), result.fun
    else:
        raise ValueError("LP optimization failed to find a valid allocation under constraints.")
🚀 Installation & Local Setup
Prerequisites
Python 3.10+
Node.js 18+
PostgreSQL (Optional, fallback JSON is enabled by default)
Backend Installation
Navigate to the backend folder:
cd backend
Create and activate a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install required packages:
pip install -r requirements.txt
Start the FastAPI local server:
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
Frontend Installation
Navigate to the frontend folder:
cd ../frontend
Install Node modules:
npm install
Boot the local development environment:
npm run dev
Open http://localhost:5173 in your browser to interact with the dashboard.
🏆 Prototype Walkthrough: Judge Demo Guide
Walk the judges through this 4-step simulation to demonstrate technical viability:

Step 1: Baseline Analysis: Review the baseline dashboard showing active shipping channels, a national Energy Resilience Index of 72/100, and a steady 23-day reserve runway [93].
Step 2: Simulate Disruption: Trigger a blockade scenario by adjusting the Strait of Hormuz slider to 75% severity for 30 days [93].
Step 3: Unoptimized Deficit: Click 'Run Simulation' [122]. The system dynamically computes the immediate cascade: an expected 14.2% crude oil import deficit, exposure of 3 critical refineries, and depletion of emergency reserves down to 17 days [93].
Step 4: Optimize Response: Click "Optimize Response" [122]. The SciPy engine reallocates allocations via the Cape of Good Hope, increasing imports from alternative suppliers (US, Brazil) [122, 123]. The supply gap drops from 14.2% to 3.7% [123], and the LLM prints a conversational, plain-English justification of the rerouting plan [123].
📈 Measured Strategic Impact
Strategic Metric	Unoptimized Spreadsheet Approach	Project Argus (Optimized Engine)
Expected Crude Deficit Gap	14.2% Deficit [45]	3.7% Managed Residual Gap [45]
Emergency SPR Runway Draw	High Rate (6 reserve days lost in 30 days) [45]	Controlled Drawdown (only 2.4 days draw) [45]
Refinery Stoppage Risk	HIGH (Imminent fuel supply lines shut down) [45, 125]	LOW (Critical feed volumes guaranteed) [45]
Crisis Modeling Latency	48 - 72 Hours (Manual coordination) [45]	< 10 Seconds (Automated analytical pipelines) [45]
🗺️ Product Development Roadmap
Phase 0 (Built MVP): Core LP solver engine, relational PostgreSQL database schema, interactive stateful React interface, Leaflet spatial nodes, and LLM translation briefing cards [52, 94-95].
Phase 1 (Enhanced Production Cores): Live RSS/Geopolitical news API parsing, concurrent sandbox scenarios (blockade + sanction overlapping), interactive real-time GIS vessel coordinates, and reserve evaporation/decay models [95-96].
Phase 2 (National Digital Twin): Macroeconomic impact pipeline (linking import deficit percentage directly to India's GDP and inflation metrics), refined product line network mapping, refinery chemistry blending recommendations, and AI fleet movement predictive alerts [96-97].
