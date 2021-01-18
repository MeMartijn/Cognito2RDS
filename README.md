# Lambda function to connect Cognito to RDS PostgreSQL database

## Prerequisites

Make sure to have a `cognito_user` table in your database. You can use the following PostgreSQL command to create one:

```(sql)
CREATE TABLE cognito_user (
    sub UUID NOT NULL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL
);
```
