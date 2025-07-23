-- DataTypes:
-- Boolean, CharacterTypes(char, varchar, text), Numeric(integer, floating-point numbers), Temporal(date, time, timestamp, interval)
-- uuid, array(strings, numbers), json, hstore kv pair, geometric data-types etc
-- serial and bigserial are used to create auto-incrementing integer columns. They should only be used for primary keys
-- If referencing them use integer or bigint data types

-- Primary key: one or more columns used to uniquely identify a row. Also holds true for foreign keys
-- Foreign key: one or more columns that refer to primary key of another table

-- Constraints: NOT NULL, UNIQUE, CHECK, PRIMARY KEY, FOREIGN KEY, EXCLUSION
-- Ensures columns are adhered to certain rules
-- They are two types. Column constraints(UNIQUE, PRIMARY KEY), Table constraints (CHECK, REFERENCES)

-- CREATE tables
CREATE TABLE table_name (
    column_name data_type column_constraint,
    column_name data_type column_constraint,
    table_constraint table_constraint
) INHERITS existing_table_name;

-- Example:
CREATE TABLE players(
    player_id SERIAL PRIMARY KEY,
    age SMALLINT NOT NULL,
);

-- INSERT
INSERT INTO table_name (column1, column2) VALUES (value1, value2);

-- UPDATE
UPDATE table_name SET column1 = value1, column2 = value2 
WHERE condition -- without where clause all rows are updated
RETURNING column1, column2; -- returns any columns

-- You can also combine multiple table columns in SET clause
UPDATE tableA 
SET column1 = tableB.column1 
FROM tableB 
WHERE tableA.id = tableB.id AND tableA.column2 = 'some_value';

-- DELETE
DELETE FROM table_name WHERE condition; -- without where clause all rows are deleted
-- DELETE can also be used with JOIN to delete rows from one table based on another table's condition
DELETE FROM tableA USING tableB 
WHERE tableA.id = tableB.id AND tableA.column2 = 'some_value';

-- ALTER can be used to modify table structure such as adding, dropping, renaming columns
-- changing column data type, setting default values, adding constraints, renaming tables etc
ALTER TABLE table_name action;

-- Examples:
ALTER TABLE tname ADD COLUMN new_column_name TYPE;
ALTER TABLE tname DROP COLUMN column_name, DROP COLUMN column_name; -- Also removes indexes, constraints associated with the column
ALTER TABLE tname DROP COLUMN column_name CASCADE; -- Removes views, stored procedures, functions that depend on the column
ALTER TABLE tname DROP COLUMN IF EXISTS column_name;
ALTER TABLE tname ALTER COLUMN column_name TYPE new_data_type;
ALTER TABLE tname ALTER COLUMN column_name SET DEFAULT default_value;
ALTER TABLE tname ALTER COLUMN column_name DROP DEFAULT;
ALTER TABLE tname ALTER COLUMN column_name SET/DROP NOT NULL;
ALTER TABLE tname ALTER COLUMN column_name ADD CONSTRAINT constraint_name;
ALTER TABLE tname RENAME COLUMN old_column_name TO new_column_name;
ALTER TABLE tname RENAME TO new_table_name;

-- CHECK constraint
CREATE TABLE example (
    age SMALLINT CHECK(age>21); -- Ensures age is greater than 21
    birthdate DATE NOT NULL;
    hire_date DATE CHECK (hire_date > birthdate)
);





