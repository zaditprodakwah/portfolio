-- schema.sql
-- Cloudflare D1 Serverless SQL Schema
-- Mesin Bahan Bakar Pertumbuhan Otonom (Autonomous Agentic Growth Engine)

CREATE TABLE IF NOT EXISTS intent_telemetry (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT NOT NULL,
  audience_role TEXT,
  target_pillar TEXT,
  has_matching_solution BOOLEAN DEFAULT FALSE,
  user_agent TEXT,
  referer TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_telemetry_query ON intent_telemetry(query);
CREATE INDEX IF NOT EXISTS idx_telemetry_unserved ON intent_telemetry(has_matching_solution);

CREATE TABLE IF NOT EXISTS lead_inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  contact_channel TEXT NOT NULL, -- "whatsapp", "email"
  audience_role TEXT NOT NULL,   -- "bisnis", "yayasan", "akademisi", "rekruter"
  service_pillar TEXT NOT NULL,  -- "business-docs", "marketing-seo", "academic-research", "digital-solutions"
  project_summary TEXT,
  status TEXT DEFAULT "new",     -- "new", "in_discussion", "closed", "delivered"
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_pillar ON lead_inquiries(service_pillar);

CREATE TABLE IF NOT EXISTS competitor_intelligence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  niche_domain TEXT NOT NULL,
  competitor_type TEXT NOT NULL, -- "legacy_agency", "cheap_freelance", "free_template"
  typical_price_idr INTEGER,
  identified_weaknesses TEXT NOT NULL,
  customer_risk_factors TEXT NOT NULL,
  our_value_proposition TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programmatic_seeds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  intent_slug TEXT UNIQUE NOT NULL,
  target_keyword TEXT NOT NULL,
  pillar TEXT NOT NULL,
  status TEXT DEFAULT "queued", -- "queued", "drafted", "published"
  priority INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_seeds_status ON programmatic_seeds(status);
