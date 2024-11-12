import mysql.connector
from utils import logger

# Function to get a direct database connection
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="root",
            database="terpedu"
        )
        return connection
    except Exception as error:
        logger.error("Error while connecting to MySQL: %s", str(error))
        return None

# Function to close a database connection
def close_db_connection(conn):
    if conn:
        conn.close()

# Function to execute a query (SELECT)
def execute_query(sql, params=None):
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute(sql, params)
        data = cursor.fetchall()
        cursor.close()
        close_db_connection(connection)
        return data
    else:
        logger.error("Failed to get database connection.")
        return None

# Function to execute a non-query (INSERT, UPDATE, DELETE)
def execute_non_query(sql, params=None):
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute(sql, params)
        connection.commit()  # Commit changes for non-queries
        cursor.close()
        close_db_connection(connection)
    else:
        logger.error("Failed to get database connection.")

# Function for insert queries (specific for INSERT operations)
def insert_query(sql, params=None):
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute(sql, params)
        connection.commit()
        cursor.close()
        close_db_connection(connection)
    else:
        logger.error("Failed to get database connection.")
