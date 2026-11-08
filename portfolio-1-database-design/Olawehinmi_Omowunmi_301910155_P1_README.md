# Portfolio 1 — Database Design and Modelling

I organised the data into book, member, loan. The design document explains the fields, keys, relationships and business rules. The normalisation document shows the sample tables at 1NF, 2NF and 3NF.

## Database checks

| Table | Rows |
| --- | --- |
| book | 2 |
| member | 2 |
| loan | 2 |

The 22 invalid inserts were rejected at their expected constraints, and the valid sample rows remained unchanged.

## Files

- [Design](Olawehinmi_Omowunmi_301910155_P1_Design.md)
- [ER diagram](Olawehinmi_Omowunmi_301910155_P1_ERDiagram.md)
- [Normalisation](Olawehinmi_Omowunmi_301910155_P1_Normalisation.md)
- [Schema](Olawehinmi_Omowunmi_301910155_P1_Schema.sql)
- [Sample data](Olawehinmi_Omowunmi_301910155_P1_SampleData.sql)
- [Constraint tests](Olawehinmi_Omowunmi_301910155_P1_ConstraintTests.sql)
- [Table and constraint evidence](screenshots/Olawehinmi_Omowunmi_301910155_P1_DatabaseResults.png)

## Run the SQL

Create a fresh PostgreSQL database. Run the schema first, then the sample data. Run the deliberately invalid statements in ConstraintTests.sql individually outside a transaction; each is expected to produce an error.

## References

- [PostgreSQL — constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)

