# Library management system — ER diagram

```mermaid
erDiagram
    direction LR
    book {
        bigint book_id PK
        text copy_code UK
        text title
        text author
        integer publication_year "Optional"
    }
    member {
        bigint member_id PK
        text email UK
        text full_name
        date joined_on
    }
    loan {
        bigint loan_id PK
        bigint book_id FK
        bigint member_id FK
        date checkout_date
        date due_date
        date returned_date "Optional"
    }
    book ||--o{ loan : "book_id"
    member ||--o{ loan : "member_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Olawehinmi_Omowunmi_301910155_ERDiagram.png)
