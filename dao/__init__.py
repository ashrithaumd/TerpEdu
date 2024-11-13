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

def execute_query(sql, params=None, fetch=False):
    connection = get_db_connection()
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
            logger.error(f"Database operation failed: {e}")
        finally:
            close_db_connection(connection)
    else:
        logger.error("Failed to get database connection.")
        return None
