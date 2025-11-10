// script.js
(() => {
  // ---------- Config / LS Keys ----------
  const LS_KEYS = {
    USERS: "hm_users_v1",
    LOGGED_IN: "hm_logged_in_v1",
    EMPLOYEES: "hm_employees_v1",
    CUSTOMERS: "hm_customers_v1",
    BOOKINGS: "hm_bookings_v1",
    CANCELLED: "hm_cancelled_v1",
    REVENUE: "hm_revenue_v1",
    TABLES: "hm_tables_v1",
  };

  // ---------- Minimal Styles (inject) ----------
  const baseStyles = `
    :root{--card-gap:12px;--container-padding:16px;--card-radius:10px;}
    body{font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;background:#f4f6f8;color:#222;}
    .container{max-width:1100px;margin:20px auto;padding:var(--container-padding);box-sizing:border-box;}
    header.app-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px;}
    .brand{font-weight:700;font-size:20px}
    nav.controls{display:flex;gap:8px;flex-wrap:wrap}
    button.btn{padding:8px 12px;border-radius:8px;border:none;cursor:pointer;background:#3b82f6;color:#fff}
    button.btn.secondary{background:#6b7280}
    button.btn.ghost{background:transparent;border:1px solid #d1d5db;color:#111}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:var(--card-gap)}
    .hotel-card, .card{background:#fff;padding:12px;border-radius:var(--card-radius);box-shadow:0 1px 6px rgba(16,24,40,0.06);}
    img.card-img{width:100%;height:140px;object-fit:cover;border-radius:8px;margin-bottom:8px}
    .muted{color:#6b7280;font-size:13px}
    .form-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}
    .form-row input, .form-row select{padding:8px;border-radius:6px;border:1px solid #d1d5db;min-width:0}
    label{display:block;margin:6px 0;font-weight:600}
    .back-button{margin-top:10px;background:#ef4444}
    .small{font-size:13px;padding:6px 8px;border-radius:6px}
    .role-badge{display:inline-block;padding:4px 8px;border-radius:999px;background:#efefef;font-size:12px;margin-right:6px}
    .section{margin-top:12px}
    .flex{display:flex;gap:8px;align-items:center}
    .toast{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:10px 14px;border-radius:8px;display:none;z-index:9999}
    .toast.show{display:block}
    .thumbs{display:flex;gap:8px;margin-top:8px}
    .thumbs img{width:60px;height:40px;object-fit:cover;border-radius:6px;cursor:pointer}
    @media (max-width:600px){ .container{padding:12px} img.card-img{height:120px} header.app-header{flex-direction:column;align-items:flex-start} .form-row{flex-direction:column} }
  `;
  function injectStyles() {
    if (document.getElementById("hm-base-styles")) return;
    const s = document.createElement("style");
    s.id = "hm-base-styles";
    s.innerText = baseStyles;
    document.head.appendChild(s);
  }

  // ---------- Default data (hotels with rooms + galleries) ----------
  const hotels = [
    {
      name: "Ocean View Resort",
      country: "USA",
      state: "Florida",
      city: "Miami",
      location: "Miami",
      lat: 25.790654,
      lon: -80.1300455,
      image: "assets/img1.jpg",
      description: "Relax by the ocean with luxury rooms and spa.",
      rooms: [
        {
          type: "Single",
          price: 120,
          available: 5,
          image: "room_assets/r1.jpg",
        },
        {
          type: "Double",
          price: 180,
          available: 3,
          image: "room_assets/r2.jpg",
        },
        {
          type: "Suite",
          price: 250,
          available: 2,
          image: "room_assets/r3.jpg",
        },
      ],
      gallery: [
        "room_assets/r1.jpg",
        "room_assets/r2.jpg",
        "room_assets/r3.jpg",
      ],
    },
    {
      name: "Mountain Escape",
      country: "USA",
      state: "Colorado",
      city: "Denver",
      location: "Denver",
      lat: 39.7392,
      lon: -104.9903,
      image: "assets/img2.jpg",
      description: "A peaceful mountain retreat surrounded by nature.",
      rooms: [
        {
          type: "Double",
          price: 150,
          available: 4,
          image: "room_assets/r2.jpg",
        },
        {
          type: "Suite",
          price: 220,
          available: 1,
          image: "room_assets/r3.jpg",
        },
      ],
      gallery: ["room_assets/r2.jpg", "room_assets/r3.jpg"],
    },
    {
      name: "City Lights Inn",
      country: "USA",
      state: "New York State",
      city: "New York City",
      location: "New York City",
      lat: 40.7128,
      lon: -74.006,
      image: "assets/img3.jpg",
      description: "Experience vibrant city life with modern rooms.",
      rooms: [
        {
          type: "Single",
          price: 130,
          available: 6,
          image: "room_assets/r1.jpg",
        },
        {
          type: "Double",
          price: 200,
          available: 3,
          image: "room_assets/r2.jpg",
        },
      ],
      gallery: ["room_assets/r1.jpg", "room_assets/r2.jpg"],
    },
    {
      name: "Desert Oasis",
      country: "USA",
      state: "Arizona",
      city: "Phoenix",
      location: "Phoenix",
      lat: 33.4484,
      lon: -112.074,
      image: "assets/img4.jpg",
      description: "Luxury oasis resort with desert adventures.",
      rooms: [
        {
          type: "Suite",
          price: 270,
          available: 2,
          image: "room_assets/r3.jpg",
        },
      ],
      gallery: ["room_assets/r3.jpg"],
    },
    {
      name: "Lakeside Retreat Minneapolis",
      country: "USA",
      state: "Minnesota",
      city: "Minneapolis",
      location: "Minneapolis",
      lat: 44.9778,
      lon: -93.265,
      image: "assets/img5.jpg",
      description: "Tranquil lakeside stay with cozy cabins.",
      rooms: [
        {
          type: "Single",
          price: 100,
          available: 4,
          image: "room_assets/r1.jpg",
        },
        {
          type: "Suite",
          price: 200,
          available: 2,
          image: "room_assets/r3.jpg",
        },
      ],
      gallery: ["room_assets/r1.jpg", "room_assets/r3.jpg"],
    },
  ];

  for (let i = 6; i <= 10; i++) {
    hotels.push({
      name: `Lakeside Retreat ${i}`,
      country: "USA",
      state: "Minnesota",
      city: "Minneapolis",
      location: "Minneapolis",
      lat: 44.9778 + (i - 8) * 0.01,
      lon: -93.265 + (i - 8) * 0.008,
      image: `assets/img${i}.jpg`,
      description: "Tranquil lakeside stay.",
      rooms: [
        {
          type: "Single",
          price: 90 + i,
          available: 3,
          image: "room_assets/r1.jpg",
        },
        {
          type: "Suite",
          price: 180 + i,
          available: 1,
          image: "room_assets/r3.jpg",
        },
      ],
      gallery: ["room_assets/r1.jpg", "room_assets/r2.jpg"],
    });
  }

  const EMPLOYEE_ROLES = [
    "Receptionist",
    "Room Service",
    "Cleaning Staff",
    "Room Assignment",
  ];

  // ---------- App state (loaded from localStorage) ----------
  let users = loadFromLS(LS_KEYS.USERS) || [];
  let loggedInUser = loadFromLS(LS_KEYS.LOGGED_IN) || null; // {email, role}
  let employees = loadFromLS(LS_KEYS.EMPLOYEES) || defaultEmployees();
  let customers = loadFromLS(LS_KEYS.CUSTOMERS) || [];
  let bookings = loadFromLS(LS_KEYS.BOOKINGS) || [];
  let cancelledBookings = loadFromLS(LS_KEYS.CANCELLED) || [];
  let dailyRevenue = loadFromLS(LS_KEYS.REVENUE) || [];

  function defaultEmployees() {
    const list = [
      {
        id: genId(),
        name: "Alice Johnson",
        role: "Receptionist",
        phone: "555-0101",
      },
      {
        id: genId(),
        name: "Mark Thomas",
        role: "Room Service",
        phone: "555-0102",
      },
      {
        id: genId(),
        name: "Fatima Ali",
        role: "Cleaning Staff",
        phone: "555-0103",
      },
      {
        id: genId(),
        name: "Ravi Kumar",
        role: "Room Assignment",
        phone: "555-0104",
      },
    ];
    saveToLS(LS_KEYS.EMPLOYEES, list);
    return list;
  }

  function genId() {
    return "id_" + Math.random().toString(36).slice(2, 10);
  }
  function saveToLS(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      console.error("ls save", e);
    }
  }
  function loadFromLS(k) {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : null;
    } catch (e) {
      console.error("ls load", e);
      return null;
    }
  }

  // ---------- Utils ----------
  function toRad(d) {
    return (d * Math.PI) / 180;
  }
  function distanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  function unique(arr) {
    return Array.from(new Set(arr.filter(Boolean)));
  }
  function escapeHtml(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ---------- App bootstrap ----------
  const app = document.getElementById("app");
  if (!app) {
    console.error('Add <div id="app"></div> to your HTML');
    return;
  }
  injectStyles();
  renderAppShell();
  showPage("home");

  function renderAppShell() {
    document.title = "Hotel Manager";
    app.innerHTML = "";
  }
  function headerHTML() {
    const logged = loggedInUser ? loggedInUser : null;
    if (!logged)
      return `<header class="app-header"><div class="brand">Hotel Booking App</div><div class="muted"><span style="color:#ef4444">Not logged in</span></div></header>`;
    return `<header class="app-header"><div class="brand">Hotel Booking App</div><div class="muted">${escapeHtml(
      logged.email
    )} <span class="role-badge">${escapeHtml(
      logged.role
    )}</span></div></header>`;
  }

  // ---------- Router & Access control ----------
  function showPage(page, opts = {}) {
    const requireLogin = [
      "hotels",
      "hotelDetails",
      "employees",
      "customers",
      "nearest",
      "bookings",
      "cancelled",
      "revenue",
    ];
    if (requireLogin.includes(page) && !loggedInUser)
      return showToast("Please login to access this section.");

    // block admin-only pages for customers
    const adminOnly = [
      "employees",
      "customers",
      // "cancelled",
      "revenue",
      "bookings",
    ]; // bookings here refers to admin "All bookings" view
    if (
      loggedInUser &&
      loggedInUser.role === "customer" &&
      adminOnly.includes(page)
    ) {
      // allow customers to view their own bookings via the 'bookings' route, but we will handle view inside renderBookingsPage
      if (page !== "bookings") return showToast("Access denied.");
    }

    switch (page) {
      case "home":
        renderHome();
        break;
      case "login":
        renderLogin();
        break;
      case "register":
        renderRegister();
        break;
      case "hotels":
        renderHotelsPage();
        break;
      case "hotelDetails":
        renderHotelDetails(typeof opts.index === "number" ? opts.index : 0);
        break;
      case "employees":
        renderEmployeesPage();
        break;
         case "firedEmployees":
    renderFiredEmployeesPage();
    break;
      case "customers":
        renderCustomersPage();
        break;
      case "nearest":
        renderNearestPage();
        break;
      case "bookings":
        renderBookingsPage();
        break;
      case "cancelled":
        renderCancelledPage();
        break;
      case "revenue":
        renderRevenuePage();
        break;
      case "tables":
        renderTablesPage();
        break;

      default:
        renderHome();
    }
  }

  // ---------- Pages ----------
  function renderHome() {
    const role = loggedInUser?.role;
    // role-specific buttons
    let buttons = `<button class="btn" onclick="window.hm_show('hotels')">Browse Hotels</button>`;
    // buttons += `<button class="btn ghost" onclick="window.hm_show('nearest')">Find Nearest Hotel</button>`;

    if (role === "admin") {
      buttons += `<button class="btn secondary" onclick="window.hm_show('employees')">Employees</button>
                  <button class="btn secondary" onclick="window.hm_show('customers')">Customers</button>
                  <button class="btn ghost" onclick="window.hm_show('bookings')">All Bookings</button>
                  <button class="btn" onclick="window.hm_show('cancelled')">View Cancelled Bookings</button>
                  <button class="btn" onclick="window.hm_show('revenue')">View Daily Revenue</button>
                  <button class="btn" onclick="window.hm_show('tables')">View Tables</button>
`;
    } else if (role === "customer") {
      buttons += `<button class="btn ghost" onclick="window.hm_show('bookings')">My Bookings</button>`;
    } else {
      // not logged in -> show login/register
      buttons += `<button class="btn ghost" onclick="window.hm_show('login')">Login / Register</button>`;
    }

    // logout for logged user
    if (loggedInUser)
      buttons += `<button class="btn" onclick="window.hm_logout()">Logout</button>`;

    app.innerHTML = `<div class="container">${headerHTML()}<div class="card" style="padding:18px">
      <h2>Welcome to Hotel Booking</h2>
      <p class="muted">Manage hotels, employees, customers, and find the nearest hotel from your location.</p>
      <div class="section flex" style="margin-top:12px">${buttons}</div>
    </div></div>`;
  }

  function renderLogin() {
    app.innerHTML = `<div class="container">${headerHTML()}<div class="card">
      <h3>Login</h3>
      <div class="form-row">
        <input id="loginEmail" placeholder="Email" />
        <input id="loginPassword" type="password" placeholder="Password" />
        <select id="loginRole">
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="form-row">
        <button class="btn" onclick="window.hm_doLogin()">Login</button>
        <button class="btn secondary" onclick="window.hm_show('register')">Register</button>
        <button class="btn ghost" onclick="window.hm_show('home')">Cancel</button>
      </div>
    </div></div>`;
  }

  function renderRegister() {
    app.innerHTML = `<div class="container">${headerHTML()}<div class="card">
      <h3>Register</h3>
      <div class="form-row">
        <input id="regName" placeholder="Full Name (optional)" />
        <input id="regEmail" placeholder="Email" />
        <input id="regPassword" type="password" placeholder="Password" />
        <select id="regRole">
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="form-row">
        <button class="btn" onclick="window.hm_doRegister()">Register</button>
        <button class="btn ghost" onclick="window.hm_show('login')">Back to Login</button>
      </div>
    </div></div>`;
  }

  // Hotels list with filters
  function renderHotelsPage() {
    const role = loggedInUser?.role;

    app.innerHTML = `
    <div class="container">${headerHTML()}
      <div class="flex" style="justify-content:space-between;align-items:flex-start;align-items:center;">
        <div style="flex:1;margin-right:12px">
          <div class="card">
            <div class="form-row">
              <select id="filterCountry">
                <option value="">All countries</option>
                ${unique(hotels.map((h) => h.country))
                  .map(
                    (c) =>
                      `<option value="${escapeHtml(c)}">${escapeHtml(
                        c
                      )}</option>`
                  )
                  .join("")}
              </select>
              <select id="filterState">
                <option value="">All states</option>
              </select>
              <select id="filterCity">
                <option value="">All cities</option>
              </select>
              <input id="hotelSearchBox" placeholder="Search hotels..." />
            </div>

            <div class="form-row" style="margin-top:8px">
              <button class="btn" id="btnFilterApply">Apply Filters</button>
              <button class="btn secondary" id="btnClearFilters">Clear</button>
              <button class="btn ghost" id="btnCheapestInCity">Find Cheapest in City</button>
            </div>
          </div>

          <div id="hotelListArea" class="section"></div>
        </div>

        <div style="width:320px;min-width:220px">
          <div class="card"><h4>Quick Actions</h4>
            <div class="section">
              <button class="btn" onclick="window.hm_show('nearest')">Find Nearest Hotel</button>
              ${
                role === "admin"
                  ? `<button class="btn secondary" onclick="window.hm_show('employees')">Employees</button>
                     <button class="btn secondary" onclick="window.hm_show('customers')">Customers</button>`
                  : ""
              }
              <button class="btn ghost" onclick="window.hm_show('home')">Home</button>
            </div>
          </div>
          <div class="card section"><h4>Logged In</h4>
            <div class="muted">${
              loggedInUser
                ? `${escapeHtml(loggedInUser.email)} (${escapeHtml(
                    loggedInUser.role
                  )})`
                : "No"
            }</div>
          </div>
        </div>
      </div>
    </div>`;

    // -----------------------------
    // Country → State → City logic
    // -----------------------------
    const countrySelect = document.getElementById("filterCountry");
    const stateSelect = document.getElementById("filterState");
    const citySelect = document.getElementById("filterCity");

    countrySelect.addEventListener("change", () => {
      const country = countrySelect.value;
      if (!country) {
        stateSelect.innerHTML = `<option value="">All states</option>`;
        citySelect.innerHTML = `<option value="">All cities</option>`;
        return;
      }

      const states = unique(
        hotels.filter((h) => h.country === country).map((h) => h.state)
      );
      if (states.length === 0) {
        showToast("No states found for selected country");
        stateSelect.innerHTML = `<option value="">All states</option>`;
        citySelect.innerHTML = `<option value="">All cities</option>`;
        return;
      }

      stateSelect.innerHTML =
        `<option value="">Select state</option>` +
        states
          .map(
            (s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`
          )
          .join("");

      citySelect.innerHTML = `<option value="">All cities</option>`;
    });

    stateSelect.addEventListener("change", () => {
      const state = stateSelect.value;
      const country = countrySelect.value;
      if (!state) {
        citySelect.innerHTML = `<option value="">All cities</option>`;
        return;
      }

      // Validate: state must belong to selected country
      const isValid = hotels.some(
        (h) => h.country === country && h.state === state
      );
      if (!isValid) {
        showToast("State not found in selected country");
        stateSelect.value = "";
        citySelect.innerHTML = `<option value="">All cities</option>`;
        return;
      }

      const cities = unique(
        hotels.filter((h) => h.state === state).map((h) => h.city)
      );
      if (cities.length === 0) {
        showToast("No cities found for selected state");
        citySelect.innerHTML = `<option value="">All cities</option>`;
        return;
      }

      citySelect.innerHTML =
        `<option value="">Select city</option>` +
        cities
          .map(
            (c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`
          )
          .join("");
    });

    // -----------------------------
    // Filter buttons
    // -----------------------------
    document
      .getElementById("btnFilterApply")
      .addEventListener("click", applyHotelFilters);
    document.getElementById("btnClearFilters").addEventListener("click", () => {
      countrySelect.value = "";
      stateSelect.innerHTML = `<option value="">All states</option>`;
      citySelect.innerHTML = `<option value="">All cities</option>`;
      document.getElementById("hotelSearchBox").value = "";
      renderHotelCards(hotels);
    });
    document
      .getElementById("btnCheapestInCity")
      .addEventListener("click", () => {
        const city = citySelect.value;
        if (!city) return showToast("Please select a city to search cheapest.");
        const res = cheapestHotelInCity(city);
        if (!res) return showToast("No hotels found in this city.");
        renderHotelCards([res.hotel], {
          highlightPrice: res.price,
          title: `Cheapest in ${city} — ₹${res.price}`,
        });
      });

    renderHotelCards(hotels);
  }

  function applyHotelFilters() {
    const country = document.getElementById("filterCountry").value;
    const state = document.getElementById("filterState").value;
    const city = document.getElementById("filterCity").value;
    const search = document
      .getElementById("hotelSearchBox")
      .value.trim()
      .toLowerCase();

    const filtered = hotels.filter((h) => {
      if (country && h.country !== country) return false;
      if (state && h.state !== state) return false;
      if (city && h.city !== city) return false;
      if (search && !h.name.toLowerCase().includes(search)) return false;
      return true;
    });

    if (filtered.length === 0) {
      showToast("No hotels found for selected filters.");
    }

    renderHotelCards(filtered);
  }

  function renderHotelCards(list, opts = {}) {
    const area = document.getElementById("hotelListArea");
    if (!area) return;
    const title = opts.title || `Available Hotels (${list.length})`;
    const cards = list
      .map((h) => {
        const realIndex = hotels.findIndex(
          (x) => x.name === h.name && x.city === h.city && x.lat === h.lat
        );
        const minPrice = Math.min(...h.rooms.map((r) => r.price));
        return `
      <div class="hotel-card" data-index="${realIndex}">
        <img class="card-img" src="${escapeHtml(h.image)}" alt="${escapeHtml(
          h.name
        )}" data-index="${realIndex}" />
        <div style="display:flex;justify-content:space-between;align-items:center"><h4 style="margin:0">${escapeHtml(
          h.name
        )}</h4><div class="muted small">From ₹${minPrice}</div></div>
        <div class="muted">${escapeHtml(
          h.location || h.city + ", " + h.state
        )}</div>
        <p class="muted" style="margin-top:8px">${escapeHtml(h.description)}</p>
        <div style="margin-top:8px"><button class="btn small" data-open="${realIndex}">View Details</button></div>
      </div>`;
      })
      .join("");
    area.innerHTML = `<div class="card"><h3>${escapeHtml(
      title
    )}</h3><div class="grid">${cards}</div></div>`;

    Array.from(area.querySelectorAll("img.card-img")).forEach((img) =>
      img.addEventListener("click", (ev) => {
        const i = Number(ev.currentTarget.dataset.index);
        window.hm_openHotel(i);
      })
    );
    Array.from(area.querySelectorAll("button[data-open]")).forEach((btn) =>
      btn.addEventListener("click", (ev) => {
        const i = Number(ev.currentTarget.dataset.open);
        window.hm_openHotel(i);
      })
    );
  }

  // Hotel details page (shows room list + gallery thumbnails)
  function renderHotelDetails(index) {
    const h = hotels[index];
    if (!h) return showToast("Hotel not found.");
    app.innerHTML = `
      <div class="container">${headerHTML()}<div class="card">
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-left:.85rem">
          <div style="flex:0 0 360px">
            <img id="mainHotelImage" class="card-img" src="${escapeHtml(
              h.image
            )}" alt="${escapeHtml(
      h.name
    )}" style="width:90%;height:260px;object-fit:cover" />
            <div class="thumbs">${h.gallery
              .map(
                (g, gi) =>
                  `<img src="${escapeHtml(
                    g
                  )}" data-thumb-index="${gi}" class="hotel-thumb" alt="thumb${gi}" />`
              )
              .join("")}</div>
          </div>
          <div style="flex:1">
            <h2>${escapeHtml(h.name)}</h2>
            <div class="muted">${escapeHtml(h.location)}</div>
            <p style="margin-top:8px">${escapeHtml(h.description)}</p>

            <div class="section"><h4>Rooms (${h.rooms.length})</h4>
              ${h.rooms
                .map(
                  (
                    r,
                    ri
                  ) => `<div style="padding:10px;border:1px solid #eee;border-radius:8px;margin-bottom:8px;display:flex;gap:12px;align-items:center">
                <img src="${escapeHtml(
                  r.image || h.gallery[0] || h.image
                )}" style="width:80px;height:60px;object-fit:cover;border-radius:6px" />
                <div style="flex:1"><div style="font-weight:700">${escapeHtml(
                  r.type
                )}</div><div class="muted">Price: ₹${r.price} • Available: ${
                    r.available
                  }</div></div>
                <div><button class="btn" data-room-index="${ri}">Book Now</button></div>
              </div>`
                )
                .join("")}
            </div>

            <div style="margin-top:10px"><button class="btn ghost" onclick="window.hm_show('hotels')">Back</button></div>
          </div>
        </div>
      </div></div>`;

    Array.from(document.querySelectorAll(".hotel-thumb")).forEach((t) =>
      t.addEventListener("click", (ev) => {
        const s = ev.currentTarget.src;
        const main = document.getElementById("mainHotelImage");
        if (main) main.src = s;
      })
    );

    Array.from(document.querySelectorAll("button[data-room-index]")).forEach(
      (btn) =>
        btn.addEventListener("click", (ev) => {
          const ri = Number(ev.currentTarget.dataset.roomIndex);
          openBookingModal(index, ri);
        })
    );
  }

  // Booking modal (simple inline form replacement of content area)
function openBookingModal(hotelIndex, roomIndex) {
  const h = hotels[hotelIndex];
  const r = h.rooms[roomIndex];
  if (!h || !r) return showToast("Invalid room selection.");
  app.innerHTML = `<div class="container">${headerHTML()}<div class="card">
    <h3>Book: ${escapeHtml(h.name)} — ${escapeHtml(r.type)}</h3>
    <div class="muted">Price: ₹${r.price} • Available: ${r.available}</div>
    <div class="form-row" style="margin-top:12px">
      <label style="width:100%">Booking Date: <input id="bookDate" type="date" /></label>
    </div>
    <div class="form-row">
      <button class="btn" id="confirmBook">Confirm Booking</button>
      <button class="btn ghost" id="cancelBook">Cancel</button>
    </div>
  </div></div>`;

  document.getElementById("cancelBook").addEventListener("click", () =>
    window.hm_show("hotelDetails", { index: hotelIndex })
  );

  document.getElementById("confirmBook").addEventListener("click", () => {
    if (!loggedInUser) return showToast("Please login to book.");
    const date = document.getElementById("bookDate").value;
    if (!date) return showToast("Select a booking date.");
    const sel = new Date(date);
    sel.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (sel < today) return showToast("Select a future date.");
    if (r.available <= 0) return showToast("No rooms available.");

    const booking = {
      userEmail: loggedInUser.email,
      hotelName: h.name,
      roomType: r.type,
      price: r.price,
      date,
      createdAt: new Date().toISOString(),
    };

    fetch("https://hotel-backend-ncgp.onrender.com/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Booking failed");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Booking saved to backend:", data);
        showToast("Booking confirmed!");
        setTimeout(() => window.hm_show("bookings"), 700);
      })
      .catch((err) => {
        console.error("❌ Booking error:", err);
        showToast("Booking failed: " + err.message);
      });
  });
}


 function renderBookingsPage() {
  if (!loggedInUser) return showToast("Please login to view bookings.");
  const role = loggedInUser.role;

  fetch("https://hotel-backend-ncgp.onrender.com/api/bookings")
    .then((res) => res.json())
    .then((data) => {
      let list =
        role === "admin"
          ? data
          : data.filter((b) => b.userEmail === loggedInUser.email);

      app.innerHTML = `<div class="container">${headerHTML()}<div class="card">
        <h3>${role === "admin" ? "All Bookings" : "My Bookings"} (${list.length})</h3>
        <div>${
          list.length
            ? list
                .map(
                  (b) => `<div style="padding:10px;border-bottom:1px solid #eee">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div><strong>${escapeHtml(b.hotelName)}</strong> — ${escapeHtml(
                    b.roomType
                  )}</div>
              <div class="muted">${escapeHtml(b.date)} • ₹${b.price}</div>
            </div>
            <div>
              <button class="btn ghost small" data-cancel="${b._id}">Cancel</button>
            </div>
          </div>
        </div>`
                )
                .join("")
            : '<div class="muted">No bookings yet.</div>'
        }</div>

       <div style="margin-top:10px">
  ${
    role === "admin"
      ? `<button class="btn" onclick="window.hm_show('cancelled')">View Cancelled Bookings</button>`
      : `<button class="btn" onclick="window.hm_show('cancelled')">My Cancelled Bookings</button>`
  }
  <button class="btn ghost" onclick="window.hm_show('hotels')">Back to Hotels</button>
</div>

      </div></div>`;

      Array.from(document.querySelectorAll("button[data-cancel]")).forEach((btn) =>
        btn.addEventListener("click", (ev) =>
          cancelBooking(ev.currentTarget.dataset.cancel)
        )
      );
    })
    .catch((err) => {
      console.error("❌ Failed to load bookings:", err);
      showToast("Could not load bookings");
    });
}

// =============================
// CANCEL BOOKING (backend)
// =============================
function cancelBooking(bookingId) {
  if (!loggedInUser) return showToast("Please login first.");
  if (!confirm("Are you sure you want to cancel this booking?")) return;

  fetch(`https://hotel-backend-ncgp.onrender.com/api/bookings/${bookingId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to cancel booking");
      return res.json();
    })
    .then((data) => {
      console.log("✅ Booking cancelled:", data);
      showToast("Booking cancelled successfully!");
      setTimeout(() => renderBookingsPage(), 500);
    })
    .catch((err) => {
      console.error("❌ Cancel booking error:", err);
      showToast("Booking not found or already cancelled.");
    });
}



 function renderCancelledPage() {
  if (!loggedInUser) return showToast("Please login to view cancelled bookings.");
  const role = loggedInUser.role;

  fetch("https://hotel-backend-ncgp.onrender.com/api/cancelled")
    .then((res) => res.json())
    .then((data) => {
      let list =
        role === "admin"
          ? data
          : data.filter((b) => b.userEmail === loggedInUser.email);

      app.innerHTML = `<div class="container">${headerHTML()}<div class="card">
        <h3>Cancelled Bookings (${list.length})</h3>
        ${
          list.length
            ? list
                .map(
                  (b) => `
          <div style="padding:10px;border-bottom:1px solid #eee">
            <div><strong>${escapeHtml(b.hotelName)}</strong> — ${escapeHtml(b.roomType)}</div>
            <div class="muted">${escapeHtml(b.date)} • ₹${b.price}</div>
            <div class="muted small">Cancelled: ${new Date(
              b.cancelledAt
            ).toLocaleString()}</div>
          </div>`
                )
                .join("")
            : '<div class="muted">No cancelled bookings.</div>'
        }
        <div style="margin-top:10px"><button class="btn ghost" onclick="window.hm_show('bookings')">Back to Bookings</button></div>
      </div></div>`;
    })
    .catch((err) => {
      console.error("❌ Failed to load cancelled bookings:", err);
      showToast("Could not load cancelled bookings");
    });
}

// =============================
// CANCEL BOOKING (backend version)
// =============================


  async function renderRevenuePage() {
    const revenueRes = await fetch("https://hotel-backend-ncgp.onrender.com/api/revenue");
const dailyRevenue = await revenueRes.json();

  if (!loggedInUser) return showToast("Please login to view revenue.");
  if (loggedInUser.role !== "admin") return showToast("Access denied.");

  const today = new Date().toISOString().split("T")[0];

  try {
    // 🧩 Fetch all bookings from backend
    const res = await fetch("https://hotel-backend-ncgp.onrender.com/api/bookings");
    if (!res.ok) throw new Error("Failed to fetch bookings");
    const bookings = await res.json();

    // --- DAILY & MONTHLY REVENUE CALC ---
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);
    const todayBookings = bookings.filter((b) => b.date === today);
    const todayRevenue = todayBookings.reduce((sum, b) => sum + (b.price || 0), 0);

    const record = dailyRevenue.find((r) => r.date === today);
    const expenditure = record ? record.expenditure : 0;
    const expDesc = record ? record.description || "" : "";

    const netProfit = todayRevenue - expenditure;

    // --- Monthly revenue total ---
    const currentMonth = new Date().toISOString().slice(0, 7); // e.g. "2025-10"
    const monthlyRecords = dailyRevenue.filter((r) =>
      r.date.startsWith(currentMonth)
    );
    const monthlyRevenue = monthlyRecords.reduce((sum, r) => sum + r.revenue, 0);
    const monthlyExpenditure = monthlyRecords.reduce(
      (sum, r) => sum + (r.expenditure || 0),
      0
    );
    const monthlyProfit = monthlyRevenue - monthlyExpenditure;

    // --- Top 5 hotels by revenue ---
    const revenueByHotel = {};
    bookings.forEach((b) => {
      if (!revenueByHotel[b.hotelName]) revenueByHotel[b.hotelName] = 0;
      revenueByHotel[b.hotelName] += b.price || 0;
    });
    const topHotels = Object.entries(revenueByHotel)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // --- UI ---
    app.innerHTML = `
    <div class="container">${headerHTML()}
      <div class="card">
        <h3>💰 Daily Revenue — ${today}</h3>
        <p><b>Today's Bookings:</b> ${todayBookings.length}</p>
        <p><b>Today's Revenue:</b> ₹${todayRevenue.toFixed(2)}</p>
        <p><b>Today's Expenditure:</b> ₹${expenditure.toFixed(2)} ${
      expDesc ? `(${escapeHtml(expDesc)})` : ""
    }</p>
        <p><b>Today's Net Profit:</b> ₹${netProfit.toFixed(2)}</p>

        <div style="margin-top:15px">
          <label>🧾 Update Today's Expenditure:</label>
          <input id="expInput" type="number" min="0" value="${expenditure}" />
          <input id="expDesc" type="text" placeholder="Description (e.g. Maintenance, Food)" value="${escapeHtml(
            expDesc
          )}" />
          <button class="btn" onclick="window.hm_updateExpenditure('${today}')">Save Expenditure</button>
        </div>
      </div>

      <div class="card" style="margin-top:20px">
        <h3>📆 Monthly Summary (${currentMonth})</h3>
        <p><b>Total Monthly Revenue:</b> ₹${monthlyRevenue.toFixed(2)}</p>
        <p><b>Total Monthly Expenditure:</b> ₹${monthlyExpenditure.toFixed(2)}</p>
        <p><b>Monthly Net Profit:</b> ₹${monthlyProfit.toFixed(2)}</p>
      </div>

      <div class="card" style="margin-top:20px">
        <h3>🏨 Top 5 Hotels by Revenue</h3>
        ${
          topHotels.length
            ? `<table class="simple-table">
                 <tr><th>Hotel</th><th>Total Revenue (₹)</th></tr>
                 ${topHotels
                   .map(
                     ([name, total]) =>
                       `<tr><td>${escapeHtml(name)}</td><td>${total.toFixed(2)}</td></tr>`
                   )
                   .join("")}
               </table>`
            : `<p class="muted">No hotel revenue data available.</p>`
        }
      </div>

      <div class="card" style="margin-top:20px">
        <h3>📜 Revenue History</h3>
        ${
          dailyRevenue.length
            ? dailyRevenue
                .map(
                  (r) => `
            <div style="padding:6px;border-bottom:1px solid #eee">
             <b>${r.date}</b> — Revenue: ₹${r.revenue.toFixed(2)}, 
Expenditure: ₹${r.expenditure.toFixed(2)} ${
                    r.description ? `(${escapeHtml(r.description)})` : ""
                  }, 
Net: ₹${(r.revenue - r.expenditure).toFixed(2)}
<button class="btn ghost" style="margin-left:8px;padding:2px 8px" onclick="window.hm_openEditExpenditure('${r.date}')">✏️ Edit</button>
            </div>`
                )
                .join("")
            : `<p class="muted">No revenue records yet.</p>`
        }
      </div>

      <div style="margin-top:10px">
        <button class="btn ghost" onclick="window.hm_show('home')">Back</button>
      </div>
    </div>`;
  } catch (err) {
    console.error("❌ Revenue error:", err);
    showToast("Failed to load revenue data");
  }
}


  // EXPENDITURE ADD / UPDATE (for any date)
  // ===============================
 async function updateExpenditure(date) {
  const expVal = parseFloat(document.getElementById("expInput").value) || 0;
  const expDesc = (document.getElementById("expDesc")?.value || "").trim();

  try {
    // Fetch bookings to calculate total revenue for that date
    const res = await fetch("https://hotel-backend-ncgp.onrender.com/api/bookings");
    const bookings = await res.json();
    const dateBookings = bookings.filter((b) => b.date === date);
    const totalRevenue = dateBookings.reduce((sum, b) => sum + (b.price || 0), 0);

    // Send to backend
    const saveRes = await fetch("https://hotel-backend-ncgp.onrender.com/api/revenue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        revenue: totalRevenue,
        expenditure: expVal,
        description: expDesc,
      }),
    });

    if (!saveRes.ok) throw new Error("Failed to save revenue data");

    showToast("✅ Expenditure & Revenue saved to backend!");
    renderRevenuePage();
  } catch (err) {
    console.error("❌ Error saving revenue:", err);
    showToast("Failed to save revenue data");
  }
}
window.hm_updateExpenditure = updateExpenditure;



  // ===============================
  // POPUP CONTROL
  // ===============================
function openEditExpenditure(date) {
  const record = dailyRevenue.find((r) => r.date === date);
  if (!record) return showToast("No record found for this date.");

  const newExp = prompt(
    `Enter new expenditure for ${date}:`,
    record.expenditure
  );
  if (newExp === null) return; // user cancelled

  const newDesc = prompt(
    `Enter new description:`,
    record.description || ""
  );

  record.expenditure = parseFloat(newExp) || 0;
  record.description = newDesc;
  saveToLS(LS_KEYS.REVENUE, dailyRevenue);
  showToast("Expenditure updated!");
  renderRevenuePage();
}

// make it global so the button can call it
window.hm_openEditExpenditure = openEditExpenditure;


  // Employees
 async function renderEmployeesPage() {
  if (!loggedInUser) return showToast("Please login to view employees.");
  if (loggedInUser.role !== "admin") return showToast("Access denied.");

  try {
    // 🧩 Fetch current employees
    const res = await fetch("https://hotel-backend-ncgp.onrender.com/api/employees");
    const employees = await res.json();

    const grouped = EMPLOYEE_ROLES.reduce((acc, role) => {
      acc[role] = employees.filter((e) => e.role === role);
      return acc;
    }, {});

    app.innerHTML = `<div class="container">${headerHTML()}<div class="card">
      <h3>Employees</h3>
      <div class="form-row">
        <input id="empName" placeholder="Employee name" />
        <select id="empRole">${EMPLOYEE_ROLES.map(
          (r) => `<option value="${r}">${r}</option>`
        ).join("")}</select>
        <input id="empPhone" placeholder="Phone (optional)" />
        <button class="btn" id="btnAddEmp">Add Employee</button>
      </div>
      ${EMPLOYEE_ROLES.map(
        (role) =>
          `<div class="section"><h4>${escapeHtml(role)} <span class="muted">(${
            grouped[role].length
          })</span></h4><div class="grid">${grouped[role]
            .map(
              (emp) => `
        <div class="card"><div style="display:flex;justify-content:space-between;align-items:center">
          <div><div style="font-weight:700">${escapeHtml(
            emp.name
          )}</div><div class="muted">${escapeHtml(emp.phone || "")}</div></div>
          <div><div class="role-badge">${escapeHtml(
            emp.role
          )}</div><button class="btn ghost small" data-remove="${
                emp._id
              }">Fire</button></div>
        </div></div>`
            )
            .join("")}</div></div>`
      ).join("")}
      <div style="margin-top:10px">
        <button class="btn" onclick="window.hm_show('firedEmployees')">View Fired Employees</button>
        <button class="btn ghost" onclick="window.hm_show('home')">Back</button>
      </div>
    </div></div>`;

    // ➕ Hire new employee
    document.getElementById("btnAddEmp").addEventListener("click", async () => {
      const name = document.getElementById("empName").value.trim();
      const role = document.getElementById("empRole").value;
      const phone = document.getElementById("empPhone").value.trim();
      if (!name) return showToast("Enter employee name.");

      const res = await fetch("https://hotel-backend-ncgp.onrender.com/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, phone }),
      });

      if (res.ok) {
        showToast("Employee hired successfully!");
        renderEmployeesPage();
      } else {
        showToast("Failed to add employee.");
      }
    });

    // ❌ Fire employee
    Array.from(document.querySelectorAll("button[data-remove]")).forEach((b) =>
      b.addEventListener("click", async (ev) => {
        const id = ev.currentTarget.dataset.remove;
        const res = await fetch(`https://hotel-backend-ncgp.onrender.com/api/employees/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          showToast("Employee fired.");
          renderEmployeesPage();
        } else {
          showToast("Failed to fire employee.");
        }
      })
    );
  } catch (err) {
    console.error("❌ Error loading employees:", err);
    showToast("Could not load employee data.");
  }
}

async function renderFiredEmployeesPage() {
  if (!loggedInUser || loggedInUser.role !== "admin")
    return showToast("Access denied.");

  try {
    const res = await fetch("https://hotel-backend-ncgp.onrender.com/api/employees/fired/all");
    const fired = await res.json();

    app.innerHTML = `<div class="container">${headerHTML()}<div class="card">
      <h3>🧾 Fired Employees (${fired.length})</h3>
      ${
        fired.length
          ? fired
              .map(
                (e) => `
        <div style="padding:8px;border-bottom:1px solid #eee">
          <b>${escapeHtml(e.name)}</b> — ${escapeHtml(e.role)} 
          <div class="muted small">Phone: ${escapeHtml(e.phone || "-")} | Hired on: ${new Date(
                  e.hiredAt
                ).toLocaleDateString()}</div>
        </div>`
              )
              .join("")
          : `<p class="muted">No fired employees.</p>`
      }
      <div style="margin-top:10px"><button class="btn ghost" onclick="window.hm_show('employees')">Back</button></div>
    </div></div>`;
  } catch (err) {
    console.error("❌ Error loading fired employees:", err);
    showToast("Failed to load fired employees.");
  }
}

  // Customers
  function renderCustomersPage() {
    if (!loggedInUser) return showToast("Please login to view customers.");
    if (loggedInUser.role !== "admin") return showToast("Access denied.");

    app.innerHTML = `<div class="container">${headerHTML()}<div class="card"><h3>Customers</h3><div class="section">${
      customers.length
        ? customers
            .map(
              (c) => `<div style="padding:10px;border-bottom:1px solid #eee">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div><div style="font-weight:700">${escapeHtml(
            c.name || c.email
          )}</div><div class="muted">${escapeHtml(c.email)}</div></div>
          <div><button class="btn ghost small" data-view="${escapeHtml(
            c.email
          )}">View</button></div>
        </div>
      </div>`
            )
            .join("")
        : '<div class="muted">No customers yet (bookings create customer records).</div>'
    }
    </div><div style="margin-top:8px"><button class="btn ghost" onclick="window.hm_show('home')">Back</button></div></div></div>`;

    Array.from(document.querySelectorAll("button[data-view]")).forEach((b) =>
      b.addEventListener("click", (ev) =>
        viewCustomer(ev.currentTarget.dataset.view)
      )
    );
  }

  function viewCustomer(email) {
    if (!loggedInUser) return showToast("Please login.");
    if (loggedInUser.role !== "admin") return showToast("Access denied.");

    const c = customers.find((x) => x.email === email);
    if (!c) return showToast("Customer not found.");
    app.innerHTML = `<div class="container">${headerHTML()}<div class="card">
      <h3>Customer: ${escapeHtml(c.name || c.email)}</h3>
      <div class="muted">${escapeHtml(c.email)}</div>
      <div class="section"><h4>Booking History (${
        (c.bookings || []).length
      })</h4>${
      c.bookings && c.bookings.length
        ? c.bookings
            .map(
              (b) =>
                `<div style="padding:8px;border-bottom:1px solid #eee"><div><strong>${escapeHtml(
                  b.hotelName
                )}</strong> — ${escapeHtml(
                  b.roomType
                )}</div><div class="muted">${escapeHtml(b.date)} • ₹${
                  b.price
                }</div></div>`
            )
            .join("")
        : '<div class="muted">No bookings.</div>'
    }</div>
      <div style="margin-top:8px"><button class="btn ghost" onclick="window.hm_show('customers')">Back to Customers</button></div>
    </div></div>`;
  }

  // Nearest
  function renderNearestPage() {
    app.innerHTML = `<div class="container">${headerHTML()}<div class="card">
      <h3>Find Nearest Hotel</h3>
      <p class="muted">Click the button below to get your current location and find hotels closest to you.</p>
      <div class="form-row">
        <button class="btn" id="btnGetLocation">Find Nearest Hotel</button>
        <button class="btn secondary" id="btnNearestTop5">Show Top 5</button>
        <button class="btn ghost" id="btnNearestBack">Back</button>
      </div>
      <div id="nearestResults" class="section"></div>
    </div></div>`;

    document.getElementById("btnGetLocation").addEventListener("click", () => {
      getUserLocation()
        .then((coords) => {
          const list = hotels
            .map((h) => ({
              hotel: h,
              distanceKm: distanceKm(coords.lat, coords.lon, h.lat, h.lon),
            }))
            .sort((a, b) => a.distanceKm - b.distanceKm);
          renderNearestResults(list);
        })
        .catch((err) => showToast(err || "Unable to get location."));
    });
    document.getElementById("btnNearestTop5").addEventListener("click", () => {
      getUserLocation()
        .then((coords) => {
          const list = hotels
            .map((h) => ({
              hotel: h,
              distanceKm: distanceKm(coords.lat, coords.lon, h.lat, h.lon),
            }))
            .sort((a, b) => a.distanceKm - b.distanceKm)
            .slice(0, 5);
          renderNearestResults(list);
        })
        .catch((err) => showToast(err || "Unable to get location."));
    });
    document
      .getElementById("btnNearestBack")
      .addEventListener("click", () => window.hm_show("home"));
  }

  function renderNearestResults(list) {
    const area = document.getElementById("nearestResults");
    if (!area) return;
    area.innerHTML = list.length
      ? `<div class="grid">${list
          .map(
            (item) => `<div class="hotel-card">
      <img class="card-img" src="${escapeHtml(
        item.hotel.image
      )}" /><h4>${escapeHtml(item.hotel.name)}</h4>
      <div class="muted">${escapeHtml(item.hotel.location)}</div>
      <div class="muted">Distance: ${item.distanceKm.toFixed(2)} km</div>
      <div style="margin-top:8px"><button class="btn small" data-book="${escapeHtml(
        item.hotel.name
      )}">Book</button></div>
    </div>`
          )
          .join("")}</div>`
      : '<div class="muted">No results.</div>';

    Array.from(area.querySelectorAll("button[data-book]")).forEach((b) =>
      b.addEventListener("click", (ev) => {
        const name = ev.currentTarget.dataset.book;
        const idx = hotels.findIndex((h) => h.name === name);
        if (idx === -1) return showToast("Hotel not found.");
        window.hm_show("hotelDetails", { index: idx });
      })
    );
  }

  function getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation)
        return reject("Geolocation not supported by your browser.");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          console.error("Geolocation error:", err);
          if (err.code === err.PERMISSION_DENIED)
            reject("Location permission denied. Please allow location access.");
          else if (err.code === err.POSITION_UNAVAILABLE)
            reject("Location unavailable. Please check GPS or internet.");
          else if (err.code === err.TIMEOUT)
            reject("Location request timed out. Try again.");
          else reject("Unable to fetch location.");
        },
        {
          enableHighAccuracy: true, // ✅ Use GPS instead of Wi-Fi
          timeout: 10000, // ✅ Wait max 10 seconds
          maximumAge: 0, // ✅ No cached location
        }
      );
    });
  }

  // cheapest
  function cheapestHotelInCity(cityName) {
    const list = hotels.filter(
      (h) => h.city.toLowerCase() === cityName.toLowerCase()
    );
    if (!list.length) return null;
    let best = list[0],
      bestPrice = Math.min(...best.rooms.map((r) => r.price));
    for (let h of list) {
      const minP = Math.min(...h.rooms.map((r) => r.price));
      if (minP < bestPrice) {
        bestPrice = minP;
        best = h;
      }
    }
    return { hotel: best, price: bestPrice };
  }

  // ---------- Auth ----------
 function doLogin() {
  const email = (document.getElementById("loginEmail") || {}).value?.trim();
  const password = (document.getElementById("loginPassword") || {}).value;
  if (!email || !password) return showToast("Enter email and password.");

  fetch("https://hotel-backend-ncgp.onrender.com/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    })
    .then((user) => {
      console.log("✅ Login success:", user);
      loggedInUser = { email: user.email, role: user.role };
      saveToLS(LS_KEYS.LOGGED_IN, loggedInUser);
      showToast("Login successful.");
      setTimeout(() => window.hm_show("home"), 400);
    })
    .catch((err) => {
      console.error("❌ Login error:", err);
      showToast("Login failed: " + err.message);
    });
}



  function doRegister() {
  const name = (document.getElementById("regName") || {}).value.trim();
  const email = (document.getElementById("regEmail") || {}).value.trim();
  const password = (document.getElementById("regPassword") || {}).value;
  const role = (document.getElementById("regRole") || {}).value || "customer";

  if (!email || !password) return showToast("Enter email and password.");

  fetch("https://hotel-backend-ncgp.onrender.com/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Registration failed");
      return res.json();
    })
    .then((user) => {
      console.log("✅ Backend Response:", user);
      loggedInUser = { email: user.email, role: user.role };
      saveToLS(LS_KEYS.LOGGED_IN, loggedInUser);
      showToast("Registered successfully!");
      setTimeout(() => window.hm_show("home"), 500);
    })
    .catch((err) => {
      console.error("❌ Register error:", err);
      showToast("Registration failed: " + err.message);
    });
}


  function doLogout() {
    loggedInUser = null;
    localStorage.removeItem(LS_KEYS.LOGGED_IN);
    showToast("Logged out.");
    setTimeout(() => showPage("home"), 300);
  }

  // ---------- Toast ----------
  let toastTimer = null;
  function showToast(msg) {
    let t = document.getElementById("hm_toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "hm_toast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = "toast show";
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      t.className = "toast";
    }, 3000);
  }

  // ---------- Window bindings (so inline handlers work) ----------
  window.hm_show = function (p, opts) {
    showPage(p, opts || {});
  };
  window.hm_doLogin = doLogin;
  window.hm_doRegister = doRegister;
  window.hm_logout = doLogout;
  window.hm_openHotel = function (i) {
    showPage("hotelDetails", { index: i });
  };
  window.hm_updateExpenditure = updateExpenditure;

  window.hm_state = {
    get users() {
      return users;
    },
    get employees() {
      return employees;
    },
    get customers() {
      return customers;
    },
    get bookings() {
      return bookings;
    },
    get hotels() {
      return hotels;
    },
  };

  // ---------- save initial arrays if missing ----------
  if (!Array.isArray(users)) {
    users = [];
    saveToLS(LS_KEYS.USERS, users);
  }
  if (!Array.isArray(employees)) {
    employees = defaultEmployees();
  }
  if (!Array.isArray(customers)) {
    customers = [];
    saveToLS(LS_KEYS.CUSTOMERS, customers);
  }
  if (!Array.isArray(bookings)) {
    bookings = [];
    saveToLS(LS_KEYS.BOOKINGS, bookings);
    updateRevenueOnBooking(r.price, h.name);
  }
  if (!Array.isArray(cancelledBookings)) {
    cancelledBookings = [];
    saveToLS(LS_KEYS.CANCELLED, cancelledBookings);
    updateRevenueOnCancel(b.price, b.hotelName);
  }
  if (!Array.isArray(dailyRevenue)) {
    dailyRevenue = [];
    saveToLS(LS_KEYS.REVENUE, dailyRevenue);
  }

  // =============================
  // TABLE STATUS PAGE
  // =============================
function renderTablesPage() {
  if (!loggedInUser) return showToast("Please login to view tables.");
  if (loggedInUser.role !== "admin") return showToast("Access denied.");

  fetch("https://hotel-backend-ncgp.onrender.com/api/tables")
    .then(res => res.json())
    .then(tables => {
      app.innerHTML = `
        <div class="container">${headerHTML()}
          <div class="card">
            <h3>🍽️ Table Status</h3>
            <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap:12px;">
              ${tables.map(t => `
                <div class="card" style="border-left:6px solid ${t.status === "occupied" ? "red" : "green"};">
                  <h4>Table ${t.tableNumber}</h4>
                  <p>Status: <b style="color:${t.status === "occupied" ? "red" : "green"}">
                    ${t.status.toUpperCase()}</b></p>
                  ${
                    t.status === "occupied"
                      ? `<p><b>Customer:</b> ${t.customer || "-"}</p>
                         <p><b>Food:</b> ${t.food || "-"}</p>
                         <button class="btn ghost small" data-empty="${t._id}">Mark Empty</button>`
                      : `<button class="btn small" data-occupy="${t._id}">Mark Occupied</button>`
                  }
                </div>
              `).join("")}
            </div>
            <div style="margin-top:15px">
              <button class="btn ghost" onclick="window.hm_show('home')">Back</button>
            </div>
          </div>
        </div>
      `;

      // Button actions
      document.querySelectorAll("button[data-occupy]").forEach(btn =>
        btn.addEventListener("click", e => occupyTable(e.target.dataset.occupy))
      );
      document.querySelectorAll("button[data-empty]").forEach(btn =>
        btn.addEventListener("click", e => emptyTable(e.target.dataset.empty))
      );
    })
    .catch(err => {
      console.error("❌ Error loading tables:", err);
      showToast("Failed to load tables");
    });
}

// 🧍‍♂️ Occupy table
async function occupyTable(id) {
  const customer = prompt("Enter customer name:");
  if (!customer) return showToast("Cancelled.");
  const food = prompt("Enter food requirements:");
  if (!food) return showToast("Cancelled.");

  try {
    const res = await fetch(`https://hotel-backend-ncgp.onrender.com/api/tables/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "occupied",
        customer,
        food
      }),
    });

    if (!res.ok) throw new Error("Failed to update");
    showToast(`Table occupied by ${customer}`);
    setTimeout(renderTablesPage, 300);
  } catch (err) {
    console.error("❌ Error:", err);
    showToast("Error updating table");
  }
}

// 🪑 Empty table
async function emptyTable(id) {
  try {
    const res = await fetch(`https://hotel-backend-ncgp.onrender.com/api/tables/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "empty",
        customer: "",
        food: ""
      }),
    });

    if (!res.ok) throw new Error("Failed to update");
    showToast("Table is now empty!");
    setTimeout(renderTablesPage, 300);
  } catch (err) {
    console.error("❌ Error:", err);
    showToast("Error updating table");
  }
}


  // =============================
  // ROLE-BASED BOTTOM TAB BAR
  // =============================

  function renderTabBar() {
    const bar = document.getElementById("tab-bar");
    if (!bar) return;

    // Clear previous
    bar.innerHTML = "";

    const role = loggedInUser?.role || "guest";
    let tabs = [];

    if (role === "admin") {
      tabs = [
        { id: "home", label: "🏠" },
        { id: "bookings", label: "📘" },
        { id: "cancelled", label: "🚫" },
        { id: "employees", label: "👤" },
        { id: "revenue", label: "💰" },
        { id: "customers", label: "📋" },
        { id: "logout", label: "↩️" },
      ];
    } else if (role === "customer") {
      tabs = [
        { id: "home", label: "🏠" },
        { id: "bookings", label: "📘" },
        // { id: "cancelled", label: "🚫" },
        { id: "logout", label: "↩️" },
      ];
    }

    tabs.forEach((tab) => {
      const btn = document.createElement("button");
      btn.innerHTML = tab.label;
      btn.dataset.page = tab.id;
      btn.addEventListener("click", () => {
        if (tab.id === "logout") {
          doLogout();
          renderTabBar();
        } else {
          showPage(tab.id);
          highlightActiveTab(tab.id);
        }
      });
      bar.appendChild(btn);
    });

    highlightActiveTab("home");
  }

  function highlightActiveTab(pageId) {
    document.querySelectorAll(".tab-bar button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.page === pageId);
    });
  }

  // Re-render tab bar when login state changes
  const originalLogin = window.hm_doLogin;
  window.hm_doLogin = function () {
    originalLogin();
    setTimeout(renderTabBar, 500);
  };

  const originalRegister = window.hm_doRegister;
  window.hm_doRegister = function () {
    originalRegister();
    setTimeout(renderTabBar, 500);
  };

  const originalLogout = window.hm_logout;
  window.hm_logout = function () {
    originalLogout();
    setTimeout(renderTabBar, 500);
  };

  // Initial render
  document.addEventListener("DOMContentLoaded", renderTabBar);

  function updateRevenueOnBooking(amount, hotelName) {
    const today = new Date().toISOString().split("T")[0];
    let record = dailyRevenue.find((r) => r.date === today);

    // total all bookings for today
    const todayBookings = bookings.filter((b) => b.date === today);
    const totalRevenue = todayBookings.reduce(
      (sum, b) => sum + (b.price || 0),
      0
    );

    if (!record) {
      record = {
        date: today,
        revenue: totalRevenue,
        expenditure: 0,
        description: "",
      };
      dailyRevenue.push(record);
    } else {
      record.revenue = totalRevenue;
    }

    saveToLS(LS_KEYS.REVENUE, dailyRevenue);
  }

  function updateRevenueOnCancel(amount, hotelName) {
    const today = new Date().toISOString().split("T")[0];
    let record = dailyRevenue.find((r) => r.date === today);

    // Recalculate after cancellation
    const todayBookings = bookings.filter((b) => b.date === today);
    const totalRevenue = todayBookings.reduce(
      (sum, b) => sum + (b.price || 0),
      0
    );

    if (!record) {
      record = {
        date: today,
        revenue: totalRevenue,
        expenditure: 0,
        description: "",
      };
      dailyRevenue.push(record);
    } else {
      record.revenue = totalRevenue;
    }

    saveToLS(LS_KEYS.REVENUE, dailyRevenue);
  }
})();
