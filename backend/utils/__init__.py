import logging
from logging import handlers

formatter = logging.Formatter(
    fmt="%(asctime)s - %(levelname)-1s - %(module)20s - %(message)s"
)
logger = logging.getLogger("terpedu-logger")

logHandler = handlers.TimedRotatingFileHandler("logs/terpedu.log", when="h", interval=1)
logHandler.setLevel(logging.DEBUG)
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)