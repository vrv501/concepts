-- CASE (general syntax)
CASE 
    WHEN condition THEN result
    WHEN condition THEN result
    ...
    ELSE result
END

--example:
SELECT age 
CASE 
    WHEN age < 18 THEN 'Minor'
    WHEN age >= 18 AND age < 65 THEN 'Adult'
    ELSE 'Senior' 
END AS age_group
FROM users;
/*
-------------------
  age  | age_group
-------+-----------
    20 | Adult
    70 | Senior
    15 | Minor
-------+-----------
*/

-- CASE expression syntax
CASE EXPRESSION -- first evaluates the expression and matches case with result
    WHEN value1 THEN result
    WHEN value2 THEN result
    ...
    ELSE result
END
-- Example
SELECT age 
    CASE age 
        WHEN 1 THEN 'One'
        WHEN 2 THEN 'Two'
        ELSE 'Other'
    END 
FROM users;
-- Entire case-end block can be used inside aggregate functions

-- COALESCE: This operator takes unlimited number of arguments and returns first non-null value
-- If all arguments are null, it returns null
SELECT COALESCE(Discount, 'Not-provided') FROM items;

-- CAST converts one dat_type to another. Must be reasonable
SELECT '5'::INTEGER; -- text to integer -- can also do SELECT CAST('5' AS INTEGER)
SELECT date_column::TIMESTAMP FROM table_name;

-- NULLIF: takes two args and returns NULL if both are equal otherwise first_arg is returned
-- any mathematical operation with NULL is NULL

-- View: Is a virtual table consisting results of a query that is being used frequently
-- Since the stored_query is a VIEW & its a virtual table, you can do queries on VIEW as if it were a table
CREATE VIEW view_name AS 
{{YOUR SELECT QUERY HERE}};
--Example:
CREATE VIEW customer_order_info AS 
SELECT * FROM customer INNER JOIN orders ON customers.id=orders.id;

SELECT * FROM customer_order_info;

-- To create or replace view
CREATE OR REPLACE VIEW customer_info AS 
{{YOUR SELECT QUERY HERE}};

-- Other ops
DROP VIEW IF EXISTS customer_info
ALTER VIEW customer_info RENAME TO new_name;