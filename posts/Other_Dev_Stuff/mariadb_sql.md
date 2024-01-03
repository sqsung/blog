---
title: "Fundamentals of Managing Databases, Tables and Data with MariaDB"
date: 2024-01-03
description: "Exploring the fundamentals of managing databases, tables, and data with MariaDB. Based on findings from the book 'Getter Started with MariaDB' by Daniel Bartholomew."
tags: ["MariaDB", "SQL", "Notes"]
isPublished: true
---

> The contents of this post is based on findings from the book ["Getting Started with MariaDB"](https://www.amazon.com/Getting-Started-MariaDB-Daniel-Bartholomew/dp/1785284126).
>
> For a more detailed understanding, check out chapter 5~6 of the book written by Daniel Barhtolomew.

## 1. Database

Installing MariaDB is like installing a MariaDB server. The subsequent step is to create a database to store tables (_actual data_) in.

To create a database, access your MariaDB server from the terminal and run the command below. Replace the `<Database Name>` with the actual name you want to use. In my case, I used `test` to practice.

### 1-1. Creating a New Database

```sql
$ CREATE DATABASE <Database Name>;
```

When creating a database in MariaDB, you can include the optional `IF NOT EXISTS` clause to ensure that the database is only created if it doesn't already exist. This is useful to prevent accidental re-creation of an existing database and avoids errors.

```sql
$ CREATE DATABASE IF NOT EXISTS <Database Name>;
```

### 1-2. Accessing a Database

Access the created database, use the `USE` statement.

```sql
$ USE <Database Name>;
```

Assuming you named your database `test`, your terminal should now display the database in the MariaDB prompt as follows.

```sql
MariaDB [test]>
```

This indicates that you are currently working within the `test` database, and any subsequent SQL statements you enter will affect or retrieve data from this database.

## 2. Table

Databases are like file cabinets where you store data in different sections called tables.

### 2-1. Creating Tables

To create a table, use the `CREATE TABLE` command and specify the table's structure. In the example below, I created a table called `employees`.

```sql
$ CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  surname VARCHAR(100),
  givenname VARCHAR(100),
  pref_name VARCHAR(50),
  birthday DATE,
);
```

### 2-2. Verifying Table Structure

After creating the table, run the `DESCRIBE` command to inspect the table's structure and whether the table has been properly configured.

```sql
$ DESCRIBE employees;
```

If nothing went wrong during the table creation process, you should see something like this.

```sql
MariaDB [test]> DESCRIBE employees;

+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| surname   | varchar(100) | YES  |     | NULL    |                |
| givenname | varchar(100) | YES  |     | NULL    |                |
| pref_name | varchar(50)  | YES  |     | NULL    |                |
| birthday  | date         | YES  |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+

5 rows in set (0.004 sec)
```

A quick breakdown of the table above:

- _**Field:** The name of the column_
- _**Type:** The data type of the column (e.g., int, varchar, date)_
- _**Null:** Indicates whether the column allows NULL values (YES or NO)_
- _**Key:** Shows if the column is part of the table's primary key (PRI) or other indexes_
- _**Default:** Specifies the default value for the column_
- _**Extra:** Contains additional information about the column, such as auto-increment for the 'id' column_

If you want to see just a specific column only, specify the column name after the previous command.

```
MariaDB [test]> DESCRIBE employees surname;

+---------+--------------+------+-----+---------+-------+
| Field   | Type         | Null | Key | Default | Extra |
+---------+--------------+------+-----+---------+-------+
| surname | varchar(100) | YES  |     | NULL    |       |
+---------+--------------+------+-----+---------+-------+

1 row in set (0.004 sec)
```

### 2-3. Updating Tables

To add, update, or delete columns from a specific table, you can use the `ALTER TABLE` command followed by `ADD`, `MODIFY`, or `DROP` column. For example, to add a new column to the employees table, use the command below.

```sql
$ ALTER TABLE employees ADD college_major varchar(100) AFTER pref_name;
```

The command above would add a new column called `college_major` to the employees table. The `college_major` column is of type varchar(100), meaning it's a variable character with a maximum length of 100. The `AFTER pref_name` command would also indicate that the newly added column should be placed after the `pref_name` column.

But let's assume a 100 characters is unecessarily long for storing college major informations of employees. Therefore, to change the type of the `college_major` column, you can use `MODIFY` as below.

```sql
$ ALTER TABLE employees MODIFY college_major varchar(25);
```

You can also decide to get rid of the `college_major` column entirely by using `DROP`.

```sql
$ ALTER TABLE employees DROP college_major;
```

## 3. Data

Tables without data is as useless as an empty Excel sheet or an unfilled file cabinet. For a database to have functional value, there needs to be data in it.

### 3-1. Inserting Data

To add a new row (record) of data into a table, you can use the `INSERT` or `INSERT INTO` command. The two commands are used interchangeably, but `INSERT INTO` is more widely preferred because it makes reading the command easier.

```sql
$ INSERT INTO employees
    VALUES (NULL, "Sohn", "Kyusung", "James", "1994-03-30");
```

Given the structure of the `employees` table:

```sql
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| surname   | varchar(100) | YES  |     | NULL    |                |
| givenname | varchar(100) | YES  |     | NULL    |                |
| pref_name | varchar(50)  | YES  |     | NULL    |                |
| birthday  | date         | YES  |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
```

When using the INSERT command without specifying column names, the values are going to align in the order of the columns in the table. In this case, the sequence would be id, surname, givenname, pref_name, and birthday.

Of course, you can specify the columns in whatever order you prefer.

```sql
$ INSERT INTO employees (givenname, surname, pref_name, birthday, id)
    VALUES ("Kyusung", "Sohn", "James", "1994-03-30", NULL);
```

You can also add multiple rows at once.

```sql
$ INSERT INTO employees  (givenname, surname, pref_name, birthday, id) VALUES
    ("Kyusung", "Sohn", "James", "1994-03-30", NULL),
    ("Matthew", "Smith", "Matt", "1992-01-01", NULL),
    ("Jennifer", "Florence", "Jenny", "1997-04-07", NULL);
```

> 💡 Note that the values for 'id' is all set to NULL
>
> This is because id is set to auto_increment, meaning MariaDB will automatically set a unique value for id for each record

## 3-2. Updating Data

To change data, use the `UPDATE` command in the following manner.

```sql
$ UPDATE employees SET
    pref_name = "Jen"
    WHERE surname = "Florence";
```

This structure tells MariaDB to go through employees and change the `pref_name` value to "Jen" if the employee's surname equals "Florence". Keep in mind that removing the `WHERE` statement completely from the command above would result in MariaDB changing every employee's `pref_name` value to "Jen". Additionally, if you wanted to change the `pref_name` value of one specific employee with the surname "Florence", it would be safer in reality to use a unique value (like the employee ID) to identify the target.

You can also change multiple values at once.

```sql
$ UPDATE employees SET
    pref_name = "Jen", givenname = "Jenny"
    WHERE surname = "Florence";
```

### 3-3. Deleting Data

You can use the `DELETE` or `DELETE FROM` command to delete data. Similar to the `UPDATE` command, it's crucial to use `DELETE` with a `WHERE` clause. Without a specified condition, MariaDB will delete every row in the database, which is most likely unintended and catastrophic.

```sql
$ DELETE FROM employees
    WHERE givenname = "Jenny" AND surname = "Florence";
```
