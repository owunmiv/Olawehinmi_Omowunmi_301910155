# Library management system — database design

My case study records book, member, loan.

## Users

- Librarians manage the catalog and record checkouts and returns.
- Members borrow and return book copies.

## Main operations

- Register a lendable book copy with a unique copy code.
- Register a member with a unique email address.
- Check out an available copy to a member.
- Record a return and find overdue active loans.

## Entities

| Entity | Information stored |
| --- | --- |
| book | One lendable physical copy, with its catalog details stored once rather than repeated in each loan. |
| member | A library member who may borrow book copies. |
| loan | A checkout referencing one book copy and one member. Normalization example: loan is the root entity with foreign keys book_id and member_id; store checkout and due dates here, and obtain book title and member name by joining to book and member rather than repeating those attributes in loan. |

## book

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| book_id | BIGINT | PK | Yes |
| copy_code | TEXT | Unique | Yes |
| title | TEXT |  | Yes |
| author | TEXT |  | Yes |
| publication_year | INTEGER |  | No |
- Unique key: (copy_code).

## member

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| member_id | BIGINT | PK | Yes |
| email | TEXT | Unique | Yes |
| full_name | TEXT |  | Yes |
| joined_on | DATE |  | Yes |
- Unique key: (email).

## loan

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| loan_id | BIGINT | PK | Yes |
| book_id | BIGINT | FK | Yes |
| member_id | BIGINT | FK | Yes |
| checkout_date | DATE |  | Yes |
| due_date | DATE |  | Yes |
| returned_date | DATE |  | No |
- book_id → book.book_id
- member_id → member.member_id

## Relationships and business rules

- Each lendable copy has a distinct copy code.
- Each member account has a distinct email address.
- Every loan references an existing book copy through book_id to book.book_id.
- Every loan references an existing member through member_id to member.member_id.
- A loan's due_date must be later than or equal to its checkout_date.
- A book copy may have at most one active loan; enforce uniqueness of book_id only for loan rows where returned_date is null.

## Assumptions

- Each book record represents one lendable physical copy; copy_code identifies that copy, while title and author describe it.
- The library has one branch; reservations, fines, renewals, and multiple copies per catalog record are outside this exercise.
- A loan is active when returned_date is null; no separate loan-status field is stored.
- A copy may have at most one active loan, and a loan's due date cannot precede its checkout date.
- Use only synthetic identifiers and example data.

