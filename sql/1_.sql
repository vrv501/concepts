SELECT * FROM table_name;

SELECT column_name FROM table_name;

SELECT DISTINCT(column_name) FROM table_name;

SELECT DISTINCT column_name1, column_name2 FROM table_name; -- All unique combinations of column_name1 and column_name2

SELECT COUNT(column_name) FROM table_name;

SELECT COUNT(DISTINCT(column_name)) FROM table_name;

-- comparision operators are similar to programming languages with exception of = instead of ==
-- AND, NOT, OR to combine multiple WHERE conditions

SELECT c_name FROM t_name WHERE condition;

SELECT c_name FROM t_name ORDER BY c_name ASC/DESC, c1_name ASC/DESC; -- Sort results by c_name and c1_name

SELECT c_name FROM t_name WHERE condition LIMIT 10; -- Limit results to 10 rows. Best to use with ORDER BY

SELECT c_name FROM t_name WHERE condition BETWEEN value1 AND value2; -- Filter results within a range(both values inclusive)
                                                                     -- BETWEEN can also be used with dates provided c_name is of ISO8601 format(YYYY-MM-DD) 

SELECT c_name FROM t_name WHERE condition NOT BETWEEN value1 AND value2; -- Filter results outside a range

SELECT c_name FROM t_name WHERE condition IN (value1, value2, ...); -- Filter results that match any of the values in the list
SELECT c_name FROM t_name WHERE condition NOT IN (value1, value2, ...); -- Filter results that do not match any of the values in the list

SELECT c_name FROM t_name WHERE condition LIKE 'pattern'; -- Filter results that match a pattern
                                                        -- common patterns:
                                                        -- 'a%' - starts with 'a'
                                                        -- '%a' - ends with 'a'
                                                        -- '%a%' - contains 'a'
                                                        -- 'a_b' - 'a' followed by any single character and then 'b'
                                                        -- 'a#__' - 'a' followed '#' and then any two characters

SELECT c_name FROM t_name WHERE condition NOT LIKE 'pattern'; -- Filter results that do not
SELECT c_name FROM t_name WHERE condition ILIKE 'pattern'; -- Case-insensitive pattern matching