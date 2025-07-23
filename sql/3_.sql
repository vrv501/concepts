-- Inner Join Similar to Aintersection B
-- Inner join is symmetrical A intersection B is same as B intersection A
-- INNER JOIN is same as JOIN 
SELECT * FROM t1 INNER JOIN t2 ON t1.cxname = t2.cyname;

-- You can use multiple ON conditions to join on multiple columns
SELECT * FROM t1 INNER JOIN t2 ON t1.cxname = t2.cyname
AND t1.cname = t2.cname; -- what happens here is that both conditions must be true for a row to be included in the result

-- To use multiple table joins you can do
SELECT t3.cgname, t3.ckname FROM t1 INNER JOIN t2 ON t1.cxname = t2.cyname
INNER JOIN t3 ON t2.cyname = t3.czname WHERE t3.czname IN("V1", "V2");

-- FULL OUTER JOIN is also symmetrical. It's essentially same as A union B
SELECT * FROM t1 FULL OUTER JOIN t2 ON t1.cxname = t2.cyname;

-- To get rows which are unique to t1 and t2 but not both
-- essentially we remove common rows where t1.cxname = t2.cyname
SELECT * FROM t1 FULL OUTER JOIN t2 ON t1.cxname = t2.cyname
WHERE t1.cxname IS NULL OR t2.cyname IS NULL;



-- Left and right outer joins are not symmetrical
-- They both essentially depending on order of tables menitoned
-- get all rows from one table and matching rows from the other
-- LEFT OUTER JOIN is same as LEFT JOIN
SELECT * FROM t1 LEFT OUTER JOIN t2 ON t1.cxname = t2.cyname;


-- To get only rows from first table and not matching rows from second table
SELECT * FROM t1 LEFT OUTER JOIN t2 ON t1.cxname = t2.cyname
WHERE t2.cyname IS NULL;

-- Right ouer join is same as left outer join but order of tables is reversed
SELECT * FROM t1 RIGHT OUTER JOIN t2 ON t1.cxname = t2.cyname;

-- UNION operator helps to combine results of two or more SELECT queries
-- It removes duplicates by default
-- both select queries must have same number of columns and compatible data types
-- The column names from both select queries should be same as the first select query
SELECT cxname FROM t1
UNION
SELECT cyname FROM t2;

-- To include duplicates use UNION ALL
