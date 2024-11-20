import sqlite3
from utils import logger

# Function to establish a database connection
def get_db_connection():
    """
    Establishes and returns a connection to the MySQL database.
    Returns:
        connection (MySQLConnection): A MySQL connection object if the connection is successful, None otherwise.
    """
    try:
        # Connect to the MySQL database using specified credentials
        connection = sqlite3.connect("terpedu.db")
        return connection
    except Exception as error:
        # Log and return None if an error occurs during the connection attempt
        logger.error("Error while connecting to MySQL: %s", str(error))
        return None

# Function to close an active database connection
def close_db_connection(conn):
    """
    Closes an active MySQL database connection.
   _ Args:
        conn (MySQLConnection): The database connection object to close.
    """
    if conn:
        conn.close()

def execute_query(sql, params=None, fetch=False):
    """
    Executes a SQL query on the database. This function handles connecting to and disconnecting from the database.
    Args:
        sql (str): The SQL query to be executed.
        params (tuple, optional): Parameters to be used with the SQL query (for parameterized queries).
        fetch (bool, optional): Whether to fetch and return the query results. Defaults to False.
    Returns:
        data (list or None): The fetched data if fetch is True, or None if fetch is False or if an error occurs.
    """
    connection = get_db_connection()  # Establish a database connection
    if connection:
        try:
            cursor = connection.cursor() 
            cursor.execute(sql, params)
            if fetch:
                data = cursor.fetchall()
            else:
                connection.commit()
                data = None
            cursor.close()
            return data
        except Exception as e:
            # Log and print any errors encountered during database operations
            logger.error(f"Database operation failed: {e}")
            print(f"Database error: {e}")
        finally:
            # Close the database connection regardless of success or failure
            close_db_connection(connection)
    else:
        # Log an error if unable to establish a database connection
        logger.error("Failed to get database connection.")
        return None
