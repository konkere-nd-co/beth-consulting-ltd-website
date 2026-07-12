CREATE TABLE IF NOT EXISTS news (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('article', 'mentorship')),
  kicker TEXT,
  title TEXT NOT NULL,
  summary TEXT,
  image_url TEXT,
  image_alt TEXT,
  read_more_text TEXT,
  body_content TEXT,
  external_link TEXT,
  mentorship_data TEXT, -- Stored as JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
