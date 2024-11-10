from mysql.connector import pooling
from utils import logger

try:
    connection_pool = pooling.MySQLConnectionPool(
        pool_name="terpedu_pool",
        pool_size=3,
        pool_reset_session=True,
        host="localhost",
        database="terpedu",
        user="root",
        password="root",
    )
    if connection_pool:
        logger.info(f"Connection pool created successfully")

except Exception as error:
    logger.error("Error while connecting to MySQL: %s", str(error))


def get_db_connection():
    return connection_pool.get_connection()


def close_db_connection(conn):
    return conn.close()


def execute_query(sql, params: list = None):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(sql, params)
        data = cursor.fetchall()
        cursor.close()        
        return data


def insert_query(sql, params: tuple = None):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(sql, params)
        conn.commit()
        cursor.close()        
