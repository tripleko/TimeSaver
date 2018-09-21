from flask import Flask, request, render_template, jsonify
import json
from datetime import datetime, timedelta
import db_task
import config

app = Flask(__name__)

def hr_to_ms(hours):
    return hours * 60 * 60 * 1000

DAILY_QUOTA = hr_to_ms(config.DAILY_HOURS)
WEEKLY_QUOTA = hr_to_ms(config.WEEKLY_HOURS)
REST_QUOTA = hr_to_ms(config.REST_DAY_HOURS)
#0 is monday, 6 is sunday.
REST_DAY = config.REST_DAY

@app.route('/')
def timer():
    today = datetime.today()

    start_time = db_task.get_time(today.day, today.month, today.year)
    seven_day = 0
    for i in range(0,7):
        temp_day = today - timedelta(days=i)
        seven_day += db_task.get_time(temp_day.day, temp_day.month, temp_day.year)

    return render_template('timer.html', weekday=today.strftime("%a"), day=today.day, month=today.strftime("%b"), month_num=today.month, year=today.year, start_time=start_time, seven_day=seven_day)

@app.route('/blocked/')
def blocked():
    return render_template('blocked.html', url=request.args.get('url'), confirm_msg=config.CONFIRM_MSG, rand_len=config.RAND_LEN)

allowed_time = datetime.strptime('2018-01-01', '%Y-%m-%d')

@app.route('/api/allow_request/', methods=['POST'])
def allow_request():
    global allowed_time
    allowed_time = datetime.now()
    return "Request allowed"

@app.route('/api/is_allowed/', methods=['POST'])
def is_allowed():
    global allowed_time

    if (datetime.now() - allowed_time).total_seconds() < 90:
        return jsonify({"allowed": "OK"})

    today = datetime.today()
    today_time = db_task.get_time(today.day, today.month, today.year)

    if today_time > DAILY_QUOTA:
        return jsonify({"allowed": "OK"})
    
    if today.weekday() == REST_DAY and today_time > REST_QUOTA:
        return jsonify({"allowed": "OK"})

    seven_day = 0
    for i in range(0,7):
        temp_day = today - timedelta(days=i)
        seven_day += db_task.get_time(temp_day.day, temp_day.month, temp_day.year)
    
    if seven_day > WEEKLY_QUOTA:
        return jsonify({"allowed": "OK"})

    return jsonify({"allowed": "Not allowed"})

@app.route('/api/elapsed_time/', methods=['POST'])
def elapsed_time():
    req_json = request.json
    db_task.update_date(req_json["day"], req_json["month_num"], req_json["year"], req_json["priorElapsedMs"])

    return jsonify(request.json) 

if __name__ == "__main__":
    app.run(port=config.PORT, debug=True)
