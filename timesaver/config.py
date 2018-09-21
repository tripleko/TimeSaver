# Python variables in this file determine the behaivor of the app

# REST_DAY is a single day of the week that can optionally have a different
# number of required hours.
# 0 is Monday, 6 is Sunday.

REST_DAY = 6

# These are the number of hours that need to be logged before the extension
# stops blocking.
# If weekly hours are met, the extension will stop and ignore the normal daily
# or rest day requirement.

DAILY_HOURS = 8
WEEKLY_HOURS = 45
REST_DAY_HOURS = 4

# On blocked pages, the user is required to enter a message followed by a
# randomized string of characters. Customize the message and random string length here.

CONFIRM_MSG = "Unblock this page"
RAND_LEN = 5

# Configure the localhost port to run on. It should match the extension's
# config.js setting.

PORT = 51234
