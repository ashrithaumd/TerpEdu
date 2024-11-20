# dao/__init__.py
import sqlite3
from utils.logger import logger

# Function to establish a database connection
def get_db_connection():
    try:
        connection = sqlite3.connect("terpedu.db")
        return connection
    except Exception as error:
        logger.error("Error while connecting to SQLite: %s", str(error))
        return None

# Function to close an active database connection
def close_db_connection(conn):
    if conn:
        conn.close()

# def execute_query(sql, params=None, fetch=False):
#     connection = get_db_connection()
#     if connection:
#         try:
#             cursor = connection.cursor() 
#             cursor.execute(sql, params)
#             if fetch:
#                 data = cursor.fetchall()
#             else:
#                 connection.commit()
#                 data = None
#             cursor.close()
#             return data
#         except Exception as e:
#             logger.error(f"Database operation failed: {e}")
#         finally:
#             close_db_connection(connection)
#     else:
#         logger.error("Failed to get database connection.")
#         return None


def execute_query(sql, params=None, fetch=False):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            if params:
                cursor.execute(sql, params)  # Use parameters if provided
            else:
                cursor.execute(sql)  # No parameters
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
