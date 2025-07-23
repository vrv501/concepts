
/*
    Aggregation funcitons can only be used in the SELECT clause or HAVING clause
    Common AGGREGATE functions: MAX(), MIN(), SUM(), AVG(), COUNT()
    AVG() can be used with ROUND() to limit decimal places -- ROUND(AVG(c_name), 2) -- round off to 2 decimal places

    Aggregate functions return a single value for the entire result set or for each group of rows

    You can use aggregate function along with other column_names in the SELECT clause but
    multiple aggregate functions can be used in the same SELECT clause.

    GROUP BY should always come after WHERE or FROM in SELECT clause
    If you are using a one or more columns in GROUP BY clause, then other columns in the SELECT clause
    must be aggregate functions. If there is column in SELECT which is not in GROUP BY clause,
    then it will throw an error vice-versa will also hold. Also if you are aggregating on a column do not use
    it in GROUP BY clause.

    Basically when you choose one or more columns in SELECT they must also be compulsorily be present in GROUP BY clause
    The only exception is other columns in SELECT clause can be aggregate functions.

    The columns chosen for GROUP BY clause are typically categorical. They by definition are non-continuous.
    You can mind-map this as being similar to enums in programming languages. They are not continuous and cannot be used 
    in mathematical operations like addition, subtraction, etc or AGGREGATE functions. Their values/rows fall into discrete finite set of options
    without any intermediate values or increasing like a series(numerical data)

    If you wanted to filter results based on aggregate function, you can use HAVING clause
    HAVING clause is similar to WHERE clause but it is used after GROUP BY clause and can
    only be used with aggregate functions. It is used to filter results after aggregation has been applied
*/

-- Group results by c_name and c1_name and apply aggregate function on c3_name
-- Also keep in mind, aggregation result cannot be used with WHERE 
SELECT c_name, c1_name, AGG(c3_name) FROM t_name GROUP BY c_name, c1_name; 

-- Using in with one of column used in GROUP BY 
SELECT c_name, c1_name, AGG(c3_name) FROM t_name WHERE c_name IN ("V1", "V2") GROUP BY c_name, c1_name;

-- Group results by c_name and apply aggregate function on c1_name, then sort results by the aggregate value of c_name
SELECT c_name, AGG(c1_name) FROM t_name GROUP BY c_name ORDER BY AGG(c_name); 

-- To aggregate results using timestamp, you can convert into date using DATE(column) where column is of type timestamp
SELECT DATE(timestamp_column) AS date, AGG(column_name) FROM t_name GROUP BY date ORDER BY date;

SELECT c1, SUM(c2) FROM t_name GROUP BY c1 HAVING SUM(c2) > 100;