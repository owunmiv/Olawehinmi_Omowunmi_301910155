# Portfolio 4 — NoSQL and Advanced Data Models

I used MongoDB collection library_events for loan_checked_out and loan_returned events. These are fictional event examples based on loan, book, member.

## Document model

| Field | Meaning |
| --- | --- |
| _id | Unique string event ID |
| eventType | One of the two selected case event labels |
| occurredAt | Native BSON Date; sample timestamps are in 2030 |
| source | Original entity, primary key and saved JSON snapshot |
| embedded | Linked record snapshots read with the event |
| references | Keys for linked sources kept outside the embedded snapshots |
| details | Event metadata whose fields vary |

Related book, member details are stored as snapshots with the event. This makes an event readable in one document. It duplicates some information, and later SQL changes do not automatically update the snapshots. PostgreSQL continues to enforce the relational rules.

## Example document

```javascript
{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "loan_checked_out",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "loan",
        "key": {
            "loan_id": 5
        },
        "snapshot": {
            "loan_id": 5,
            "book_id": 1,
            "member_id": 3,
            "checkout_date": "2025-01-10",
            "due_date": "2025-01-24",
            "returned_date": null
        }
    },
    "embedded": {
        "book": [
            {
                "key": {
                    "book_id": 1
                },
                "snapshot": {
                    "book_id": 1,
                    "copy_code": "B-001",
                    "title": "The Quiet Harbor",
                    "author": "Avery Rowan",
                    "publication_year": 2020
                },
                "via": [
                    "loan.book_id → book"
                ]
            }
        ],
        "member": [
            {
                "key": {
                    "member_id": 3
                },
                "snapshot": {
                    "member_id": 3,
                    "email": "mira@example.test",
                    "full_name": "Mira Chen",
                    "joined_on": "2024-01-15"
                },
                "via": [
                    "loan.member_id → member"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}
```

## Queries and results

| Query | Returned documents |
| --- | --- |
| Find the first sample event type (up to five documents). | 2 |
| Find events for the first source record using nested key fields (up to five). | 2 |
| Find events in the sample time range using a MongoDB Date filter (up to five). | 4 |
| Count documents for each event type. | 2 |

## 1. Find the first sample event type (up to five documents).

```javascript
db.getCollection("library_events").find({"eventType":"loan_checked_out"}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "loan_checked_out",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "loan_id": 5
    }
  },
  {
    "_id": "event_000003",
    "eventType": "loan_checked_out",
    "occurredAt": {
      "$date": "2030-01-01T10:02:00Z"
    },
    "source": {
      "loan_id": 6
    }
  }
]
```

## 2. Find events for the first source record using nested key fields (up to five).

```javascript
db.getCollection("library_events").find({"source.key.loan_id":5}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "loan_checked_out",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "loan_id": 5
    }
  },
  {
    "_id": "event_000002",
    "eventType": "loan_returned",
    "occurredAt": {
      "$date": "2030-01-01T10:01:00Z"
    },
    "source": {
      "loan_id": 5
    }
  }
]
```

## 3. Find events in the sample time range using a MongoDB Date filter (up to five).

```javascript
db.getCollection("library_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "loan_checked_out",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "loan_id": 5
    }
  },
  {
    "_id": "event_000002",
    "eventType": "loan_returned",
    "occurredAt": {
      "$date": "2030-01-01T10:01:00Z"
    },
    "source": {
      "loan_id": 5
    }
  },
  {
    "_id": "event_000003",
    "eventType": "loan_checked_out",
    "occurredAt": {
      "$date": "2030-01-01T10:02:00Z"
    },
    "source": {
      "loan_id": 6
    }
  },
  {
    "_id": "event_000004",
    "eventType": "loan_returned",
    "occurredAt": {
      "$date": "2030-01-01T10:03:00Z"
    },
    "source": {
      "loan_id": 6
    }
  }
]
```

## 4. Count documents for each event type.

```javascript
db.getCollection("library_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray();
```

| _id | documentCount |
| --- | --- |
| loan_checked_out | 2 |
| loan_returned | 2 |

## Validation and suitability

MongoDB inserted 4 documents. An invalid date type was rejected with code 121 and a repeated event ID with 11000. The collection still contained 4 valid documents. The compound eventType/occurredAt index supports those access fields; this exercise does not measure its speed.

The details field can vary across event types, while the common fields have a validator. Events can be added as separate documents rather than growing one large history record.

## Run the script

Connect mongosh to a fresh exercise database and run Olawehinmi_Omowunmi_301910155_P4_MongoDB.js. It selects portfolio_nosql, creates the collection, inserts the sample documents and displays the query results. [Implementation evidence](screenshots/Olawehinmi_Omowunmi_301910155_P4_DocumentsAndQueries.png).

## References

- [MongoDB — data modelling](https://www.mongodb.com/docs/manual/data-modeling/)

