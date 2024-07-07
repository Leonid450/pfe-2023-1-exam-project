--Task 9--------------
SELECT role, COUNT(role)
FROM "Users"
GROUP BY role;


-----------------Task 10------------------
CREATE TABLE transactions(
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL REFERENCES "Users" (id),
  sum_of_transaction INT NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);

INSERT INTO transactions
VALUES
(1,1,350,'2024-12-25'),
(2,1,250,'2025-01-19'),
(3,2,350,'2024-12-25'),
(4,2,750,'2025-01-13'),
(5,3,150,'2024-12-27'),
(6,3,250,'2025-01-13'),
(7,4,10,'2024-12-25'),
(8,4,250,'2025-01-13');

WITH new_table AS(SELECT SUM(sum_of_transaction )*0.1 AS procent, "userId" 
FROM transactions
WHERE created_at >= '2024-12-25' AND created_at <= '2025-01-14'
GROUP BY "userId"),
new_table_2 AS(SELECT SUM(balance + procent) AS balance_bonus, id
FROM "Users"
INNER JOIN new_table ON "Users".id =  new_table."userId"
GROUP BY id)
UPDATE "Users"
SET balance = balance_bonus FROM new_table_2
WHERE role = 'customer' AND "Users".id =  new_table_2.id;

------------Task 11-------------------
WITH new_table AS(SELECT id AS best_id
FROM "Users"
ORDER BY rating DESC
limit 3
)
UPDATE "Users"
SET  balance = balance + 10
FROM new_table
WHERE role = 'creator' AND id = best_id ;


