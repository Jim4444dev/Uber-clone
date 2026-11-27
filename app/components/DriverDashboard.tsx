"use client";

import { useState } from "react";
import "./dashboard.css";

const trips = [
  { id: "1", time: "12:42 PM", from: "300 W 23rd St", to: "JFK Airport", distance: "11.4 mi", fare: "$38.20" },
  { id: "2", time: "11:18 AM", from: "Central Park West", to: "Brooklyn Heights", distance: "7.8 mi", fare: "$24.75" },
  { id: "3", time: "9:56 AM", from: "Union Square", to: "Long Island City", distance: "5.2 mi", fare: "$18.40" },
];

export default function DriverDashboard() {
  const [online, setOnline] = useState(true);
  const [activeTab, setActiveTab] = useState("Today");
  const [rideOpen, setRideOpen] = useState(false);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <button className="brand" aria-label="Home">
          <span className="brand-mark">D</span>
          <span>DRIVE</span>
        </button>

        <nav>
          <button className="nav-item active"><span className="nav-icon">⌂</span><span>Home</span></button>
          <button className="nav-item"><span className="nav-icon">◎</span><span>Trips</span></button>
          <button className="nav-item"><span className="nav-icon">$</span><span>Earnings</span></button>
          <button className="nav-item"><span className="nav-icon">◫</span><span>Map</span></button>
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item"><span className="nav-icon">?</span><span>Help</span></button>
          <div className="driver">
            <div className="avatar">JD</div>
            <div><strong>James Davis</strong><small>4.96 ★</small></div>
            <button className="more">•••</button>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <h1>{online ? "You’re online" : "You’re offline"}</h1>
          <button className={`status-toggle ${online ? "on" : ""}`} onClick={() => setOnline(!online)}>
            <span />
          </button>
        </header>

        <div className="content">
          <div className="map-panel">
            <div className="map-grid">
              <div className="road r1" /><div className="road r2" /><div className="road r3" />
              <div className="road r4" /><div className="road r5" /><div className="road r6" />
              <div className="route-line"><i /><i /></div>
              <div className="car-marker">▲</div>
              <div className="pin pickup">●</div>
              <div className="map-zoom"><button>+</button><button>−</button></div>
            </div>

            {rideOpen ? (
              <article className="ride-card">
                <div className="ride-head"><span>New ride request</span><strong>0:18</strong></div>
                <div className="ride-route">
                  <div className="route-dots"><i /><b /><i /></div>
                  <div><small>Pickup in 4 min</small><strong>300 W 23rd St</strong><small>Drop-off</small><strong>JFK Airport</strong></div>
                </div>
                <div className="ride-meta"><span><small>Distance</small><strong>11.4 mi</strong></span><span><small>Estimated fare</small><strong>$38.20</strong></span></div>
                <div className="ride-actions"><button className="decline" onClick={() => setRideOpen(false)}>Decline</button><button className="accept" onClick={() => setRideOpen(false)}>Accept ride</button></div>
              </article>
            ) : (
              <button className="request-simulation" onClick={() => setRideOpen(true)}>Simulate ride request</button>
            )}
          </div>

          <aside className="details-panel">
            <div className="period-tabs">
              {["Today", "Week", "Month"].map(tab => <button key={tab} className={activeTab === tab ? "selected" : ""} onClick={() => setActiveTab(tab)}>{tab}</button>)}
            </div>

            <section className="earnings">
              <small>Online earnings</small>
              <div className="earning-row"><strong>$186.40</strong><span>+12.6%</span></div>
              <div className="bar-chart">
                {[32,46,38,58,72,66,84,54,68,92,78,88].map((h,i) => <i key={i} style={{height: `${h}%`}} />)}
              </div>
              <div className="chart-hours"><span>6 AM</span><span>12 PM</span><span>6 PM</span></div>
            </section>

            <section className="stats">
              <div><small>Trips</small><strong>12</strong></div>
              <div><small>Online</small><strong>6h 24m</strong></div>
              <div><small>Rating</small><strong>4.96 <em>★</em></strong></div>
            </section>

            <section className="recent">
              <div className="section-title"><strong>Recent trips</strong><button>View all</button></div>
              {trips.map(trip => (
                <article className="trip" key={trip.id}>
                  <div className="trip-time">{trip.time}</div>
                  <div className="trip-route"><i /><b /><i /></div>
                  <div className="trip-address"><strong>{trip.from}</strong><small>{trip.to}</small></div>
                  <div className="trip-fare"><strong>{trip.fare}</strong><small>{trip.distance}</small></div>
                </article>
              ))}
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
