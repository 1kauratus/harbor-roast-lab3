// In-memory specialty menu for Harbor Roast.
// Data resets when the server restarts (fine for this lab).

let nextId = 7;

const items = [
  {
    id: 1,
    name: "Foghorn Latte",
    category: "Espresso",
    price: 4.75,
    caffeineMg: 150,
    available: true,
    description: "Double espresso with steamed oat milk and a pinch of sea salt."
  },
  {
    id: 2,
    name: "North Pier Pour-Over",
    category: "Brewed",
    price: 3.95,
    caffeineMg: 180,
    available: true,
    description: "Single-origin drip coffee roasted for a clean berry finish."
  },
  {
    id: 3,
    name: "Dockside Mocha",
    category: "Espresso",
    price: 5.25,
    caffeineMg: 160,
    available: true,
    description: "Espresso, dark cocoa, and whipped cream."
  },
  {
    id: 4,
    name: "Blueberry Scone",
    category: "Bakery",
    price: 3.5,
    caffeineMg: 0,
    available: true,
    description: "Buttery scone with local blueberries."
  },
  {
    id: 5,
    name: "Harbour Cold Brew",
    category: "Brewed",
    price: 4.5,
    caffeineMg: 210,
    available: false,
    description: "16-hour steep with citrus peel. Currently sold out."
  },
  {
    id: 6,
    name: "Maple Cortado",
    category: "Seasonal",
    price: 4.95,
    caffeineMg: 130,
    available: true,
    description: "Equal parts espresso and steamed milk with maple syrup."
  }
];

export const getAllItems = () => [...items];

export const getItemById = (id) => items.find((item) => item.id === id);

export const createItem = (payload) => {
  const item = {
    id: nextId++,
    name: payload.name.trim(),
    category: payload.category.trim(),
    price: Number(payload.price),
    caffeineMg: Number(payload.caffeineMg),
    available: Boolean(payload.available),
    description: typeof payload.description === "string"
      ? payload.description.trim()
      : ""
  };

  items.push(item);
  return item;
};

export const deleteItemById = (id) => {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [removed] = items.splice(index, 1);
  return removed;
};
