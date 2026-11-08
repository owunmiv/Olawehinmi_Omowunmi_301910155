# Library management system — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| book_id | loan records (list) |
| --- | --- |
| 1 | [5] |
| 2 | [6] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| loan.loan_id | loan.book_id | loan.member_id | book.book_id | book.copy_code | member.member_id | member.email |
| --- | --- | --- | --- | --- | --- | --- |
| 5 | 1 | 3 | 1 | B-001 | 3 | mira@example.test |
| 6 | 2 | 4 | 2 | B-002 | 4 | leo@example.test |

Key: loan_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## loan_example

| loan.loan_id | loan.book_id | loan.member_id | book.book_id | book.copy_code | member.member_id | member.email |
| --- | --- | --- | --- | --- | --- | --- |
| 5 | 1 | 3 | 1 | B-001 | 3 | mira@example.test |
| 6 | 2 | 4 | 2 | B-002 | 4 | leo@example.test |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## book

| book_id | copy_code | title | author | publication_year |
| --- | --- | --- | --- | --- |
| 1 | B-001 | The Quiet Harbor | Avery Rowan | 2020 |
| 2 | B-002 | Maps of Winter | Jordan Vale | 2018 |

## member

| member_id | email | full_name | joined_on |
| --- | --- | --- | --- |
| 3 | mira@example.test | Mira Chen | 2024-01-15 |
| 4 | leo@example.test | Leo Park | 2024-03-02 |

## loan

| loan_id | book_id | member_id | checkout_date | due_date | returned_date |
| --- | --- | --- | --- | --- | --- |
| 5 | 1 | 3 | 2025-01-10 | 2025-01-24 | NULL |
| 6 | 2 | 4 | 2025-02-01 | 2025-02-15 | 2025-02-12 |

## Dependencies

- book: (book_id) → copy_code, title, author, publication_year
- member: (member_id) → email, full_name, joined_on
- loan: (loan_id) → book_id, member_id, checkout_date, due_date, returned_date

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
