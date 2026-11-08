// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("library_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("library_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "loan_checked_out",
                    "loan_returned"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "loan"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "loan_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("library_events").insertMany([
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
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_returned",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
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
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "event_payload": "illustrative event_payload",
                "device_metadata": "illustrative device_metadata"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_checked_out",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "loan",
            "key": {
                "loan_id": 6
            },
            "snapshot": {
                "loan_id": 6,
                "book_id": 2,
                "member_id": 4,
                "checkout_date": "2025-02-01",
                "due_date": "2025-02-15",
                "returned_date": "2025-02-12"
            }
        },
        "embedded": {
            "book": [
                {
                    "key": {
                        "book_id": 2
                    },
                    "snapshot": {
                        "book_id": 2,
                        "copy_code": "B-002",
                        "title": "Maps of Winter",
                        "author": "Jordan Vale",
                        "publication_year": 2018
                    },
                    "via": [
                        "loan.book_id → book"
                    ]
                }
            ],
            "member": [
                {
                    "key": {
                        "member_id": 4
                    },
                    "snapshot": {
                        "member_id": 4,
                        "email": "leo@example.test",
                        "full_name": "Leo Park",
                        "joined_on": "2024-03-02"
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
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_returned",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "loan",
            "key": {
                "loan_id": 6
            },
            "snapshot": {
                "loan_id": 6,
                "book_id": 2,
                "member_id": 4,
                "checkout_date": "2025-02-01",
                "due_date": "2025-02-15",
                "returned_date": "2025-02-12"
            }
        },
        "embedded": {
            "book": [
                {
                    "key": {
                        "book_id": 2
                    },
                    "snapshot": {
                        "book_id": 2,
                        "copy_code": "B-002",
                        "title": "Maps of Winter",
                        "author": "Jordan Vale",
                        "publication_year": 2018
                    },
                    "via": [
                        "loan.book_id → book"
                    ]
                }
            ],
            "member": [
                {
                    "key": {
                        "member_id": 4
                    },
                    "snapshot": {
                        "member_id": 4,
                        "email": "leo@example.test",
                        "full_name": "Leo Park",
                        "joined_on": "2024-03-02"
                    },
                    "via": [
                        "loan.member_id → member"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "event_payload": "illustrative event_payload",
                "device_metadata": "illustrative device_metadata"
            }
        }
    }
]));
  await db.getCollection("library_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("library_events").find({"eventType":"loan_checked_out"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("library_events").find({"source.key.loan_id":5}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("library_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("library_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("library_events").insertOne({...{
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
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("library_events").insertOne({
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
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("library_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
