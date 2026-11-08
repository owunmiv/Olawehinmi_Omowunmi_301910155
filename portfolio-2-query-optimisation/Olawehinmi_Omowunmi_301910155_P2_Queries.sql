-- Show related loan, book, member records (up to 20).
SELECT t0."loan_id" AS "loan_loan_id",
       t0."checkout_date" AS "loan_checkout_date",
       t1."book_id" AS "book_book_id",
       t1."copy_code" AS "book_copy_code",
       t2."member_id" AS "member_member_id",
       t2."email" AS "member_email"
FROM portfolio."loan" t0
JOIN portfolio."book" t1 ON t0."book_id" = t1."book_id"
JOIN portfolio."member" t2 ON t0."member_id" = t2."member_id"
ORDER BY t0."loan_id", t1."book_id", t2."member_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."loan_id" AS "loan_loan_id",
       t0."checkout_date" AS "loan_checkout_date",
       t1."book_id" AS "book_book_id",
       t1."copy_code" AS "book_copy_code",
       t2."member_id" AS "member_member_id",
       t2."email" AS "member_email"
FROM portfolio."loan" t0
JOIN portfolio."book" t1 ON t0."book_id" = t1."book_id"
JOIN portfolio."member" t2 ON t0."member_id" = t2."member_id"
ORDER BY t0."loan_id", t1."book_id", t2."member_id"
LIMIT 20;

-- Find loan records where checkout_date matches "2025-01-10" (up to 20).
SELECT * FROM portfolio."loan"
WHERE "checkout_date" IS NOT DISTINCT FROM '2025-01-10'
ORDER BY "loan_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."loan"
WHERE "checkout_date" IS NOT DISTINCT FROM '2025-01-10'
ORDER BY "loan_id"
LIMIT 20;

-- Count loan records for each book_id (up to 20 groups).
SELECT "book_id", count(*) AS record_count
FROM portfolio."loan"
GROUP BY "book_id"
ORDER BY record_count DESC, "book_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "book_id", count(*) AS record_count
FROM portfolio."loan"
GROUP BY "book_id"
ORDER BY record_count DESC, "book_id" NULLS LAST
LIMIT 20;

-- Find loan records where checkout_date matches "2025-01-10" (up to 20).
SELECT * FROM portfolio."loan"
WHERE "checkout_date" IS NOT DISTINCT FROM '2025-01-10'
ORDER BY "loan_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."loan"
WHERE "checkout_date" IS NOT DISTINCT FROM '2025-01-10'
ORDER BY "loan_id"
LIMIT 20;
