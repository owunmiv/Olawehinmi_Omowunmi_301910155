-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. test book pk. Expected: pk_book, SQLSTATE 23505.
INSERT INTO portfolio."book" ("book_id", "copy_code", "title", "author", "publication_year")
VALUES (1, 'B-TEST-PK', 'Primary Key Test', 'Riley North', 2021);

-- 2. test book unique. Expected: uq_book_0, SQLSTATE 23505.
INSERT INTO portfolio."book" ("book_id", "copy_code", "title", "author", "publication_year")
VALUES (101, 'B-001', 'Unique Key Test', 'Riley North', 2021);

-- 3. test book id null. Expected: book_id, SQLSTATE 23502.
INSERT INTO portfolio."book" ("book_id", "copy_code", "title", "author", "publication_year")
VALUES (NULL, 'B-TEST-ID-NULL', 'Book ID Null Test', 'Riley North', 2021);

-- 4. test book copy null. Expected: copy_code, SQLSTATE 23502.
INSERT INTO portfolio."book" ("book_id", "copy_code", "title", "author", "publication_year")
VALUES (102, NULL, 'Copy Code Null Test', 'Riley North', 2021);

-- 5. test book title null. Expected: title, SQLSTATE 23502.
INSERT INTO portfolio."book" ("book_id", "copy_code", "title", "author", "publication_year")
VALUES (103, 'B-TEST-TITLE-NULL', NULL, 'Riley North', 2021);

-- 6. test book author null. Expected: author, SQLSTATE 23502.
INSERT INTO portfolio."book" ("book_id", "copy_code", "title", "author", "publication_year")
VALUES (104, 'B-TEST-AUTHOR-NULL', 'Author Null Test', NULL, 2021);

-- 7. test member pk. Expected: pk_member, SQLSTATE 23505.
INSERT INTO portfolio."member" ("member_id", "email", "full_name", "joined_on")
VALUES (3, 'pk-test@example.test', 'Primary Key Test', '2025-03-01');

-- 8. test member unique. Expected: uq_member_0, SQLSTATE 23505.
INSERT INTO portfolio."member" ("member_id", "email", "full_name", "joined_on")
VALUES (105, 'mira@example.test', 'Unique Key Test', '2025-03-01');

-- 9. test member id null. Expected: member_id, SQLSTATE 23502.
INSERT INTO portfolio."member" ("member_id", "email", "full_name", "joined_on")
VALUES (NULL, 'id-null@example.test', 'Member ID Null Test', '2025-03-01');

-- 10. test member email null. Expected: email, SQLSTATE 23502.
INSERT INTO portfolio."member" ("member_id", "email", "full_name", "joined_on")
VALUES (106, NULL, 'Email Null Test', '2025-03-01');

-- 11. test member name null. Expected: full_name, SQLSTATE 23502.
INSERT INTO portfolio."member" ("member_id", "email", "full_name", "joined_on")
VALUES (107, 'name-null@example.test', NULL, '2025-03-01');

-- 12. test member joined null. Expected: joined_on, SQLSTATE 23502.
INSERT INTO portfolio."member" ("member_id", "email", "full_name", "joined_on")
VALUES (108, 'joined-null@example.test', 'Joined Date Null Test', NULL);

-- 13. test loan pk. Expected: pk_loan, SQLSTATE 23505.
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date")
VALUES (5, 2, 4, '2025-03-01', '2025-03-15', '2025-03-10');

-- 14. test loan book fk. Expected: fk_loan_0, SQLSTATE 23503.
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date")
VALUES (109, 999, 4, '2025-03-01', '2025-03-15', '2025-03-10');

-- 15. test loan member fk. Expected: fk_loan_1, SQLSTATE 23503.
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date")
VALUES (110, 2, 999, '2025-03-01', '2025-03-15', '2025-03-10');

-- 16. test loan id null. Expected: loan_id, SQLSTATE 23502.
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date")
VALUES (NULL, 2, 4, '2025-03-01', '2025-03-15', '2025-03-10');

-- 17. test loan book null. Expected: book_id, SQLSTATE 23502.
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date")
VALUES (111, NULL, 4, '2025-03-01', '2025-03-15', '2025-03-10');

-- 18. test loan member null. Expected: member_id, SQLSTATE 23502.
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date")
VALUES (112, 2, NULL, '2025-03-01', '2025-03-15', '2025-03-10');

-- 19. test loan checkout null. Expected: checkout_date, SQLSTATE 23502.
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date")
VALUES (113, 2, 4, NULL, '2025-03-15', '2025-03-10');

-- 20. test loan due null. Expected: due_date, SQLSTATE 23502.
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date")
VALUES (114, 2, 4, '2025-03-01', NULL, '2025-03-10');

-- 21. test loan dates. Expected: loan_dates_ordered, SQLSTATE 23514.
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date")
VALUES (115, 2, 4, '2025-03-15', '2025-03-14', '2025-03-10');

-- 22. test loan active book. Expected: loan_active_book, SQLSTATE 23505.
INSERT INTO portfolio."loan" ("loan_id", "book_id", "member_id", "checkout_date", "due_date", "returned_date")
VALUES (116, 1, 4, '2025-03-01', '2025-03-15', NULL);
