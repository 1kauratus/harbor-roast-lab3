/**
 * Harbor Roast frontend.
 * Talks to the Express API on the same origin locally,
 * or to a Render URL when window.API_BASE is set / ?api= is provided.
 */
const params = new URLSearchParams(window.location.search);
const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
// Same-origin on Render/production. Only fall back to local API during local static previews.
const API_BASE = (
  params.get("api") ||
  window.API_BASE ||
  (isLocalHost && window.location.port !== "3000" ? "http://localhost:3000" : "")
).replace(/\/$/, "");

const menuGrid = document.querySelector("#menu-grid");
const menuStatus = document.querySelector("#menu-status");
const emptyState = document.querySelector("#empty-state");
const apiStatus = document.querySelector("#api-status");
const addForm = document.querySelector("#add-form");
const formFeedback = document.querySelector("#form-feedback");
const refreshButton = document.querySelector("#refresh-button");

const money = (value) => `$${Number(value).toFixed(2)}`;

const setFeedback = (message, type = "") => {
  formFeedback.textContent = message;
  formFeedback.className = `feedback${type ? ` is-${type}` : ""}`;
};

const apiUrl = (path) => `${API_BASE}${path}`;

const fetchJson = async (path, options = {}) => {
  const response = await fetch(apiUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    const details = body?.details?.join("; ");
    const message = details || body?.message || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return body;
};

const makeCard = (item) => {
  const card = document.createElement("article");
  card.className = "menu-card";

  const title = document.createElement("h3");
  title.textContent = item.name;

  const description = document.createElement("p");
  description.textContent = item.description || "No tasting notes yet.";

  const meta = document.createElement("div");
  meta.className = "meta";

  for (const text of [item.category, `${item.caffeineMg} mg caffeine`]) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = text;
    meta.append(badge);
  }

  const availability = document.createElement("span");
  availability.className = `badge ${item.available ? "available" : "unavailable"}`;
  availability.textContent = item.available ? "Available" : "Sold out";
  meta.append(availability);

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const price = document.createElement("span");
  price.className = "price";
  price.textContent = money(item.price);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "danger-button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", async () => {
    try {
      await fetchJson(`/api/items/${item.id}`, { method: "DELETE" });
      setFeedback(`Deleted “${item.name}”.`, "success");
      await loadMenu();
    } catch (error) {
      setFeedback(error.message, "error");
    }
  });

  actions.append(price, deleteButton);
  card.append(title, description, meta, actions);
  return card;
};

const loadMenu = async () => {
  menuStatus.textContent = "Loading items…";
  try {
    const data = await fetchJson("/api/items");
    menuGrid.replaceChildren(...data.items.map(makeCard));
    emptyState.hidden = data.items.length > 0;
    menuStatus.textContent = `${data.count} item${data.count === 1 ? "" : "s"} on the menu`;
    apiStatus.textContent = `API online · ${API_BASE || "same origin"}`;
    apiStatus.classList.remove("is-down");
  } catch (error) {
    menuGrid.replaceChildren();
    emptyState.hidden = false;
    menuStatus.textContent = "Could not load the menu.";
    apiStatus.textContent = `API offline · ${error.message}`;
    apiStatus.classList.add("is-down");
  }
};

addForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setFeedback("Saving…");

  const formData = new FormData(addForm);
  const payload = {
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || ""),
    price: Number(formData.get("price")),
    caffeineMg: Number(formData.get("caffeineMg")),
    available: document.querySelector("#available").checked,
    description: String(formData.get("description") || "")
  };

  try {
    const created = await fetchJson("/api/items", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    addForm.reset();
    document.querySelector("#available").checked = true;
    setFeedback(`Added “${created.name}” (id ${created.id}).`, "success");
    await loadMenu();
  } catch (error) {
    setFeedback(error.message, "error");
  }
});

refreshButton.addEventListener("click", () => {
  loadMenu();
});

loadMenu();
