<div align="center">

# âš¡ Athena Infra Core

**High-Throughput Telemetry Collectors & Resilient Circuit Breakers for Distributed Minecraft Networks**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Resilience](https://img.shields.io/badge/Pattern-Circuit%20Breaker-F59E0B?style=for-the-badge)](https://github.com/AthenaProjects)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<br/>

`infra-core` is a lightweight, low-overhead utility library engineered to shield high-frequency Minecraft server clusters (Velocity / Paper / Folia nodes) from downstream database, Redis IPC, and telemetry ingestion latency spikes.

</div>

---

### ğŸ›¡ï¸ Core Resilience Patterns

```
              [ Minecraft Node / Proxy Thread ]
                             â”‚
                  [ CircuitBreaker Proxy ]
                   â”œâ”€â”€ State: CLOSED (Normal Operation)
                   â”œâ”€â”€ State: OPEN (Downstream Latency / Fail-Fast)
                   â””â”€â”€ State: HALF-OPEN (Canary Probe Recovery)
                             â”‚
                [ Target RPC / Database / Redis ]
```

#### 1. â±ï¸ Low-Overhead Telemetry Buffer (`TelemetryCollector`)
* In-memory circular buffer for tick-by-tick TPS metrics, entity density tracking, and player packet counters.
* Decouples synchronous game loops from external metric sinks (Prometheus, InfluxDB, Grafana).
* Zero allocations in critical hot paths.

#### 2. ğŸ”Œ Stateful Circuit Breaker (`CircuitBreaker`)
* Automatically trips into `OPEN` state when downstream database or cache failure thresholds are breached, preventing thread pool exhaustion on backend nodes.
* Seamless auto-recovery via canary probes in `HALF-OPEN` state once the downstream service stabilizes.

---

### ğŸ“¦ Quick Start

```typescript
import { CircuitBreaker, CircuitState } from '@athena/infra-core';

const dbBreaker = new CircuitBreaker({
    failureThreshold: 5,
    resetTimeoutMs: 10000
});

// Protect high-frequency database / player data requests
const playerData = await dbBreaker.execute(async () => {
    return await queryPlayerDatabase(uuid);
});
```

---

<div align="center">
  <sub>Part of the <a href="https://github.com/AthenaProjects">Athena Development</a> distributed server ecosystem.</sub>
</div>