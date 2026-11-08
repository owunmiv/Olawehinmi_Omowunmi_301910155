# Library management system — SQL queries

## 1. Show related loan, book, member records (up to 20).

```sql
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
```

| loan_loan_id | loan_checkout_date | book_book_id | book_copy_code | member_member_id | member_email |
| --- | --- | --- | --- | --- | --- |
| 5 | 2025-01-10 | 1 | B-001 | 3 | mira@example.test |
| 6 | 2025-02-01 | 2 | B-002 | 4 | leo@example.test |

## 2. Find loan records where checkout_date matches "2025-01-10" (up to 20).

```sql
SELECT * FROM portfolio."loan"
WHERE "checkout_date" IS NOT DISTINCT FROM '2025-01-10'
ORDER BY "loan_id"
LIMIT 20;
```

| loan_id | book_id | member_id | checkout_date | due_date | returned_date |
| --- | --- | --- | --- | --- | --- |
| 5 | 1 | 3 | 2025-01-10 | 2025-01-24 | NULL |

## 3. Count loan records for each book_id (up to 20 groups).

```sql
SELECT "book_id", count(*) AS record_count
FROM portfolio."loan"
GROUP BY "book_id"
ORDER BY record_count DESC, "book_id" NULLS LAST
LIMIT 20;
```

| book_id | record_count |
| --- | --- |
| 1 | 1 |
| 2 | 1 |

## 4. Find loan records where checkout_date matches "2025-01-10" (up to 20).

```sql
SELECT * FROM portfolio."loan"
WHERE "checkout_date" IS NOT DISTINCT FROM '2025-01-10'
ORDER BY "loan_id"
LIMIT 20;
```

| loan_id | book_id | member_id | checkout_date | due_date | returned_date |
| --- | --- | --- | --- | --- | --- |
| 5 | 1 | 3 | 2025-01-10 | 2025-01-24 | NULL |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 2.235 | 2.285, 2.235, 2.22 | Sort → Seq Scan | 274 |
| After index | 0.289 | 0.268, 0.289, 0.297 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 55 |

The median execution time changed from 2.235 ms to 0.289 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=2.253..2.255 rows=50 loops=1)
  Seq Scan on loan (actual time=0.015..2.21 rows=50 loops=1)
Planning Time: 0.356 ms
Execution Time: 2.285 ms
```

### Before index, run 2

```text
Sort (actual time=2.207..2.209 rows=50 loops=1)
  Seq Scan on loan (actual time=0.014..2.166 rows=50 loops=1)
Planning Time: 0.312 ms
Execution Time: 2.235 ms
```

### Before index, run 3

```text
Sort (actual time=2.192..2.195 rows=50 loops=1)
  Seq Scan on loan (actual time=0.014..2.153 rows=50 loops=1)
Planning Time: 0.316 ms
Execution Time: 2.22 ms
```

### After index, run 1

```text
Sort (actual time=0.223..0.225 rows=50 loops=1)
  Bitmap Heap Scan on loan (actual time=0.027..0.184 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=50 loops=1)
Planning Time: 0.541 ms
Execution Time: 0.268 ms
```

### After index, run 2

```text
Sort (actual time=0.242..0.244 rows=50 loops=1)
  Bitmap Heap Scan on loan (actual time=0.027..0.203 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=50 loops=1)
Planning Time: 0.516 ms
Execution Time: 0.289 ms
```

### After index, run 3

```text
Sort (actual time=0.25..0.252 rows=50 loops=1)
  Bitmap Heap Scan on loan (actual time=0.028..0.211 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.012..0.012 rows=50 loops=1)
Planning Time: 0.525 ms
Execution Time: 0.297 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Olawehinmi_Omowunmi_301910155_P2_Queries.sql, then Olawehinmi_Omowunmi_301910155_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Olawehinmi_Omowunmi_301910155_P2_QueryResults.png) · [Index comparison](screenshots/Olawehinmi_Omowunmi_301910155_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

