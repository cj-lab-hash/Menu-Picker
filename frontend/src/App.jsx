import { useEffect, useMemo, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

const fallbackDishes = [
  {
    name: "Chicken Adobo",
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Chicken", "Soy sauce", "Vinegar", "Garlic", "Bay leaves", "Peppercorns", "Oil"],
    steps: ["Sauté garlic in oil.", "Add chicken and lightly brown.", "Pour soy sauce and vinegar.", "Add bay leaves and peppercorns.", "Simmer until tender and sauce is reduced."],
  },
  {
    name: "Pork Sinigang",
    category: "Soup",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Pork", "Tamarind mix", "Tomato", "Onion", "Radish", "Kangkong", "String beans"],
    steps: ["Boil pork with onion and tomato.", "Simmer until pork is tender.", "Add tamarind mix.", "Add vegetables by cooking time.", "Season and serve hot."],
  },
  {
    name: "Pancit Canton",
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Canton noodles", "Chicken", "Cabbage", "Carrots", "Soy sauce", "Garlic", "Onion"],
    steps: ["Sauté garlic, onion, and chicken.", "Add vegetables.", "Pour broth and soy sauce.", "Add noodles.", "Toss until noodles absorb sauce."],
  },
  {
    name: "Kare-Kare",
    category: "Beef",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Beef or oxtail", "Peanut butter", "Ground rice", "Eggplant", "String beans", "Pechay", "Bagoong"],
    steps: ["Boil beef until tender.", "Prepare peanut sauce.", "Add vegetables.", "Simmer until thick.", "Serve with bagoong."],
  },
  {
    name: "Tinola",
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Chicken", "Ginger", "Green papaya", "Malunggay", "Fish sauce", "Garlic", "Onion"],
    steps: ["Sauté ginger, garlic, and onion.", "Add chicken and fish sauce.", "Pour water and simmer.", "Add papaya.", "Add malunggay before serving."],
  },
  {
    name: "Bistek Tagalog",
    category: "Beef",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Beef slices", "Soy sauce", "Calamansi", "Onion rings", "Garlic", "Pepper"],
    steps: ["Marinate beef in soy sauce and calamansi.", "Fry onion rings and set aside.", "Pan-fry beef.", "Add marinade and simmer.", "Top with onions."],
  },
  {
    name: "Laing",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Dried taro leaves", "Coconut milk", "Coconut cream", "Chili", "Garlic", "Ginger", "Shrimp paste"],
    steps: ["Simmer coconut milk with aromatics.", "Add dried taro leaves without stirring first.", "Cook low and slow.", "Add coconut cream.", "Simmer until rich and oily."],
  },
  {
    name: "Bulalo",
    category: "Soup",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Beef shank", "Corn", "Cabbage", "Pechay", "Peppercorns", "Onion", "Fish sauce"],
    steps: ["Boil beef shank and remove scum.", "Simmer until bone marrow and beef are tender.", "Add corn.", "Add vegetables.", "Season and serve hot."],
  },
  {
    name: "Pork Sisig",
    category: "Pork",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Pork belly", "Onion", "Chili", "Calamansi", "Mayonnaise optional", "Soy sauce", "Pepper"],
    steps: ["Boil and grill pork.", "Chop into small pieces.", "Sauté with onion and chili.", "Season with calamansi and soy sauce.", "Serve sizzling if available."],
  },
  {
    name: "Lechon Kawali",
    category: "Pork",
    image: "https://images.unsplash.com/photo-1625938145744-e38051539952?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Pork belly", "Salt", "Pepper", "Bay leaves", "Oil", "Water"],
    steps: ["Boil pork with salt and bay leaves.", "Dry pork completely.", "Deep fry until crispy.", "Rest and chop.", "Serve with sauce."],
  },
  {
    name: "Ginataang Kalabasa",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Squash", "String beans", "Coconut milk", "Shrimp or pork", "Garlic", "Onion", "Fish sauce"],
    steps: ["Sauté garlic and onion.", "Add protein if using.", "Pour coconut milk.", "Add squash and simmer.", "Add string beans and season."],
  },
  {
    name: "Lumpiang Shanghai",
    category: "Pork",
    image: "https://images.unsplash.com/photo-1604909053195-0bc2cecbc6e6?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Ground pork", "Carrots", "Onion", "Garlic", "Egg", "Lumpia wrapper", "Oil"],
    steps: ["Mix filling ingredients.", "Wrap in lumpia wrapper.", "Seal edges.", "Deep fry until golden.", "Serve with sweet chili sauce."],
  },
  {
    name: "Arroz Caldo",
    category: "Rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Rice", "Chicken", "Ginger", "Garlic", "Onion", "Fish sauce", "Boiled egg"],
    steps: ["Sauté ginger, garlic, and onion.", "Add chicken and rice.", "Pour water or broth.", "Simmer until rice breaks down.", "Top with egg and garlic bits."],
  },
  {
    name: "Pinakbet",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Squash", "Eggplant", "Okra", "Bitter melon", "String beans", "Tomato", "Shrimp paste"],
    steps: ["Sauté tomato, garlic, and onion.", "Add shrimp paste.", "Add vegetables.", "Simmer with small amount of water.", "Cook until vegetables are tender."],
  },
  {
    name: "Tapsilog",
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Beef tapa", "Garlic rice", "Egg", "Soy sauce", "Calamansi", "Garlic", "Sugar"],
    steps: ["Marinate beef.", "Pan-fry tapa.", "Cook garlic rice.", "Fry egg.", "Serve together."],
  },
  {
    name: "Chicken Inasal",
    category: "Chicken",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Chicken", "Calamansi", "Garlic", "Ginger", "Lemongrass", "Annatto oil", "Vinegar"],
    steps: ["Marinate chicken.", "Prepare annatto oil.", "Grill chicken while basting.", "Cook until done.", "Serve with rice."],
  },
  {
    name: "Dinuguan",
    category: "Pork",
    image: "https://images.unsplash.com/photo-1604908554027-07d7c1d9cf64?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Pork", "Pork blood", "Vinegar", "Garlic", "Onion", "Chili", "Fish sauce"],
    steps: ["Sauté garlic and onion.", "Add pork and cook.", "Pour vinegar and simmer.", "Add pork blood gradually.", "Cook until thick."],
  },
  {
    name: "Monggo Guisado",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1547592226-3f7dcfb4db2d?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Mung beans", "Pork or shrimp", "Tomato", "Garlic", "Onion", "Malunggay", "Fish sauce"],
    steps: ["Boil mung beans until soft.", "Sauté garlic, onion, tomato.", "Add protein.", "Combine with mung beans.", "Add malunggay and season."],
  },
  {
    name: "Menudo",
    category: "Pork",
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Pork", "Tomato sauce", "Potato", "Carrot", "Bell pepper", "Hotdog optional", "Liver spread"],
    steps: ["Sauté pork with garlic and onion.", "Add tomato sauce.", "Simmer until pork is tender.", "Add vegetables.", "Finish with liver spread."],
  },
  {
    name: "Halo-Halo",
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
    ingredients: ["Shaved ice", "Milk", "Sweet beans", "Jelly", "Sago", "Leche flan", "Ube ice cream"],
    steps: ["Add sweet ingredients to glass.", "Fill with shaved ice.", "Pour milk.", "Top with leche flan and ube ice cream.", "Mix before eating."],
  },
];

function normalizeDish(dish) {
  return {
    ...dish,
    ingredients: Array.isArray(dish.ingredients) ? dish.ingredients : String(dish.ingredients || "").split("\n").filter(Boolean),
    steps: Array.isArray(dish.steps) ? dish.steps : String(dish.steps || "").split("\n").filter(Boolean),
  };
}

export default function App() {
  const [dishes, setDishes] = useState(fallbackDishes);
  const [index, setIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("Using local recipes");
  const touchStartX = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem("menu-picker-favorites");
    if (saved) setFavorites(JSON.parse(saved));

    Promise.allSettled([
      fetch(`${API_URL}/api/dishes`).then((res) => res.ok ? res.json() : []),
      fetch(`${API_URL}/api/favorites`).then((res) => res.ok ? res.json() : []),
    ]).then(([dishResult, favResult]) => {
      if (dishResult.status === "fulfilled" && dishResult.value?.length) {
        setDishes(dishResult.value.map(normalizeDish));
        setStatus("Connected to Server more recipes to choose");
      }
      if (favResult.status === "fulfilled" && favResult.value?.length) {
        setFavorites(favResult.value.map(normalizeDish));
      }
    }).catch(() => setStatus("Using local recipes"));
  }, []);

  useEffect(() => {
    localStorage.setItem("menu-picker-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const categories = useMemo(() => ["All", ...new Set(dishes.map((d) => d.category || "Other"))], [dishes]);

  const filteredDishes = useMemo(() => {
    return dishes.filter((d) => {
      const matchCategory = category === "All" || d.category === category;
      const text = `${d.name} ${d.category} ${d.ingredients.join(" ")}`.toLowerCase();
      return matchCategory && text.includes(query.toLowerCase());
    });
  }, [dishes, query, category]);

  const currentDish = filteredDishes[index % Math.max(filteredDishes.length, 1)] || filteredDishes[0];
  const isFavorite = currentDish && favorites.some((f) => f.name === currentDish.name);

  useEffect(() => {
    setIndex(0);
  }, [query, category]);

  const nextDish = () => {
    if (!filteredDishes.length) return;
    setIndex((prev) => (prev + 1) % filteredDishes.length);
  };

  const prevDish = () => {
    if (!filteredDishes.length) return;
    setIndex((prev) => (prev - 1 + filteredDishes.length) % filteredDishes.length);
  };

  const randomDish = () => {
    if (!filteredDishes.length) return;
    setIndex(Math.floor(Math.random() * filteredDishes.length));
  };

  const saveFavorite = async () => {
    if (!currentDish || isFavorite) return;
    setFavorites((prev) => [...prev, currentDish]);
    try {
      await fetch(`${API_URL}/api/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentDish),
      });
    } catch {
      // localStorage fallback already saved
    }
  };

  const removeFavorite = async (dishName) => {
    setFavorites((prev) => prev.filter((f) => f.name !== dishName));
    try {
      await fetch(`${API_URL}/api/favorites/${encodeURIComponent(dishName)}`, { method: "DELETE" });
    } catch {
      // localStorage fallback already removed
    }
  };

  const openFavorite = (dishName) => {
    const foundIndex = filteredDishes.findIndex((d) => d.name === dishName);
    if (foundIndex >= 0) setIndex(foundIndex);
    else {
      const fav = favorites.find((f) => f.name === dishName);
      if (fav) {
        setDishes((prev) => prev.some((d) => d.name === fav.name) ? prev : [fav, ...prev]);
        setCategory("All");
        setQuery("");
        setIndex(0);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    const diff = event.changedTouches[0].clientX - touchStartX.current;
    if (diff > 60) prevDish();
    if (diff < -60) nextDish();
  };

  if (!currentDish) {
    return (
      <main className="app-shell">
        <section className="empty-state">
          <h1>No recipe found</h1>
          <button onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Mommy JM Menu Picker</p>
          <h1>Randomly or Pick the Menu you want to Cook.</h1>
          {/* <p className="subtitle">Mobile-friendly recipe cards with favorites and optional PostgreSQL API sync.</p> */}
        </div>
        <div className="status-pill">{status}</div>
      </section>

      <section className="toolbar">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search dish, ingredient, category..."
        />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((cat) => <option key={cat}>{cat}</option>)}
        </select>
      </section>

      <section className="layout">
        <article className="recipe-card" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="image-wrap">
            <img
              src={currentDish.image}
              alt={currentDish.name}
              onError={(event) => { event.currentTarget.src = "https://placehold.co/900x600/f3f4f6/111827?text=Filipino+Dish"; }}
            />
            <div className="image-overlay">
              <span>{currentDish.category}</span>
              <span>{index + 1} / {filteredDishes.length}</span>
            </div>
          </div>

          <div className="recipe-content">
            <h2>{currentDish.name}</h2>
            <div className="actions">
              <button className="primary" onClick={randomDish}>🎲 Random</button>
              <button onClick={prevDish}>← Previous</button>
              <button onClick={nextDish}>Next →</button>
              <button className={isFavorite ? "saved" : "heart"} onClick={saveFavorite} disabled={isFavorite}>
                {isFavorite ? "❤️ Saved" : "🤍 Save"}
              </button>
            </div>

            <div className="details-grid">
              <div>
                <h3>Ingredients</h3>
                <ul>
                  {currentDish.ingredients.map((item, idx) => <li key={`${item}-${idx}`}>{item}</li>)}
                </ul>
              </div>
              <div>
                <h3>How to cook</h3>
                <ol>
                  {currentDish.steps.map((step, idx) => <li key={`${step}-${idx}`}>{step}</li>)}
                </ol>
              </div>
            </div>
            <p className="swipe-tip">Tip: On mobile, swipe left or right on the card.</p>
          </div>
        </article>

        <aside className="favorites-panel">
          <div className="panel-header">
            <h2>❤️ Favorites</h2>
            <span>{favorites.length}</span>
          </div>
          {favorites.length === 0 ? (
            <p className="muted">No favorites yet. Save dishes you want to cook later.</p>
          ) : (
            <div className="favorite-list">
              {favorites.map((fav) => (
                <div className="favorite-item" key={fav.name}>
                  <button className="favorite-open" onClick={() => openFavorite(fav.name)}>
                    <img
                      src={fav.image}
                      alt={fav.name}
                      onError={(event) => { event.currentTarget.src = "https://placehold.co/96x96/f3f4f6/111827?text=Dish"; }}
                    />
                    <span>{fav.name}</span>
                  </button>
                  <button className="remove" onClick={() => removeFavorite(fav.name)}>Remove</button>
                </div>
              ))}
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
