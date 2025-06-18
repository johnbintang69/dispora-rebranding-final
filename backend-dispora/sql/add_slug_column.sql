-- Add slug column to berita table if it doesn't exist
ALTER TABLE berita 
ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE AFTER judul;

-- Update existing records with generated slugs if they don't have one
UPDATE berita 
SET slug = LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
  CONCAT(
    SUBSTRING_INDEX(judul, ' ', 5), 
    '-', 
    DATE_FORMAT(created_at, '%Y-%m-%d'),
    '-',
    id_berita
  ),
  ' ', '-'),
  '--', '-'),
  '--', '-'),
  '--', '-'),
  '--', '-'
))
WHERE slug IS NULL OR slug = '';
