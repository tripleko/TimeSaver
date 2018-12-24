import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'data.db')

def db_connect(db_path=DB_PATH):
    con = sqlite3.connect(db_path)
    return con

def get_time(day, month, year):
    con = db_connect()
    cur = con.cursor()

    cur.execute("""CREATE TABLE IF NOT EXISTS timeWorked (date TEXT PRIMARY KEY,
    msTime INTEGER)""")

    date = f"{str(day)}-{str(month)}-{str(year)}"
    cur.execute(f"SELECT msTime FROM timeWorked WHERE date=?", (date,))
    
    result = cur.fetchone()

    con.commit()
    con.close()

    if result is not None:
        return result[0]
    else:
        return 0


def update_date(day, month, year, time_worked):
    con = db_connect()
    cur = con.cursor()

    # Store the date as 'DD-MM-YYYY' string, single digit day or month when applicable
    # Store time worked that day in milliseconds

    cur.execute("""CREATE TABLE IF NOT EXISTS timeWorked (date TEXT PRIMARY KEY,
    msTime INTEGER)""")

    # UPSERT requires SQLIte 3.24+
    date = f"{str(day)}-{str(month)}-{str(year)}"
    cur.execute("""INSERT INTO timeWorked (date, msTime)
    VALUES(?, ?) ON CONFLICT (date) DO UPDATE SET msTime=excluded.msTime""",
    (date, time_worked,))
    con.commit()

    con.close()

if __name__ == "__main__":
    print("Not intended to be run directly")
