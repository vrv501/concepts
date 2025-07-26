-- DATE store only date
-- TIME store time and time-zone only
-- TIMESTAMP store date and time 
-- TIMESTAMPTZ store date and time with timezone, but with a different precision

SHOW ALL -- shows current config of postgres
SHOW TIMEZONE -- shows current timezone of postgres

SELECT NOW(); -- shows current date and time along with timezone (TIMESTAMPTZ)

SELECT TIMEOFDAY(); -- shows current time. day, date, year, timezone as strings

SELECT CURRENT_TIME; -- shows current time and timezone (TIME)

SELECT CURRENT_DATE; -- shows current date (DATE)

-- EXTRACT() can be used to get specific parts of date
-- You can extract YEAR, MONTH, DAY, WEEK, QUARTER
-- EXTRACT(YEAR FROM date_column)

-- AGE(timestamp_col) calculates difference between current timestamp and timestamp_column
-- 13years 4months 5days 13:12:34.123456789

-- TO_CHAR() can be used convert several data_types to text
-- TO_CHAR(timestamp_col, 'YYYY-MM-DD HH24:MI:SS') -- converts timestamp to text with specified format
-- TO_CHAR(date_col, 'YYYY-MM-DD') -- converts date to text with specified format
-- When extracting something it's good to use TRIM(TO_CHAR(...)) to remove extra spaces


-- You can use mathematical operators on columns
SELECT 0.1*c_name AS new_name FROM t_name;

-- Some popular string operators: || - concat two columns of type text
-- LENGTH(c_name) - returns length of column c_name
-- UPPER(c_name) - converts c_name to uppercase

-- Subqueries can be used to operate a query based on result of another query
-- If the subquery returns multiple rows, you can use IN operator
-- If you aggregate in subquery you can directly compare the value using comparision operators in main query
SELECT * FROM t_name WHERE c_name IN (SELECT c_name FROM t_name WHERE c_name LIKE 'A%');
SELECT * FROM t_name WHERE c_name > (SELECT AGG(c_name) FROM t_name WHERE c_name LIKE 'A%');

-- So far you have seen that subqueries are excecuted first followed by results being passed onto primary query
-- But what if you want to execute subquery for every row of primary query?
-- This is called correlated subquery
-- In this case the subquery is executed for each row of primary query. 
-- To ensure that you need to use a column from primary query in subquery
SELECT emp_id, emp_name, salary
FROM employees e1
WHERE salary > (
    SELECT AVG(salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id  -- Correlated
);

-- You can also use NOT EXISTS to filter rows based on absence of related rows in another table
SELECT customer_id, customer_name
FROM customers AS c -- Table with alias
WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
);

-- EXISTS is used to check if a subquery returns any rows
-- It returns true if the subquery returns at least one row
-- It is often used to filter rows based on existence of related rows in another table
SELECT product_id, product_name
FROM products AS p
WHERE EXISTS (
    SELECT 1
    FROM order_items AS oi
    JOIN orders AS o ON oi.order_id = o.order_id
    WHERE oi.product_id = p.product_id
    AND o.order_date >= CURRENT_DATE - INTERVAL '30 days'
);

-- EXISTS is efficient as it stops checking after finding the first match. It can be useful where you only want
-- data from outer table(primary query) if there is at least one match in the subquery 


-- SELF JOIN is a join where a table is joined with itself
-- It is useful when you want to compare rows within the same table
SELECT tableA.c1, tableB.c2 FROM t AS tableA
INNER JOIN t AS tableB ON tableA.c1 = tableB.c2
WHERE tableA.c3 = 'some_value';

-- [Correlated sub-queries, EXISTS, Self Joins](https://www.perplexity.ai/spaces/learning-sql-advanced-nKObBmNmR_..sabIxF9ajQ)




