-- Fictional sample records for Library management system.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."book" ("book_id", "copy_code", "title", "author", "publication_year") VALUES (1, 'B-001', 'The Quiet Harbor', 'Avery Rowan', 2020);
INSERT INTO portfolio."book" ("book_id", "copy_code", "title", "author", "publication_year") VALUES (2, 'B-002', 'Maps of Winter', 'Jordan Vale', 2018);
INSERT INTO portfolio."member" ("member_id", "email", "full_name", "joined_on") VALUES (3, 'mira@example.test', 'Mira Chen', '2024-01-15');
INSERT INTO portfolio."member" ("member_id", "email", "full_name", "joined_on") VALUES (4, 'leo@example.test', 'Leo Park', '2024-03-02');
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date") VALUES (5, 1, 3, '2025-01-10', '2025-01-24', NULL);
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date") VALUES (6, 2, 4, '2025-02-01', '2025-02-15', '2025-02-12');
COMMIT;
