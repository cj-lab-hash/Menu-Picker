CREATE TABLE IF NOT EXISTS dishes (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'Other',
  image TEXT DEFAULT '',
  ingredients TEXT[] DEFAULT '{}',
  steps TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'Other',
  image TEXT DEFAULT '',
  ingredients TEXT[] DEFAULT '{}',
  steps TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO dishes (name, category, image, ingredients, steps) VALUES
('Chicken Adobo','Chicken','https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=900&q=80',ARRAY['Chicken','Soy sauce','Vinegar','Garlic','Bay leaves','Peppercorns'],ARRAY['Sauté garlic.','Add chicken.','Pour soy sauce and vinegar.','Simmer until tender.']),
('Pork Sinigang','Soup','https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',ARRAY['Pork','Tamarind mix','Tomato','Onion','Kangkong'],ARRAY['Boil pork with tomato and onion.','Add tamarind mix.','Add vegetables.','Season and serve.']),
('Pancit Canton','Noodles','https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80',ARRAY['Canton noodles','Chicken','Cabbage','Carrots','Soy sauce'],ARRAY['Sauté aromatics and chicken.','Add vegetables.','Add noodles and sauce.','Toss until cooked.'])
ON CONFLICT (name) DO NOTHING;
