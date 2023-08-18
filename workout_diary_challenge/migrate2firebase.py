import json
import os
import sys

import firebase_admin
from firebase_admin import firestore

# Reference:
#   https://github.com/firebase/firebase-admin-python/blob/master/snippets/firestore/firestore.py

# PREREQ: Set environment variable GOOGLE_APPLICATION_CREDENTIALS
def migrate(path_to_workout_json: str):
    my_app = firebase_admin.initialize_app() # Initialize Google Cloud service account
    db = firestore.client()

    for workout_json_fname in os.listdir(path_to_workout_json):
        date_str = workout_json_fname[:-5] # Exclude last 5 characters (".json")
        print(date_str)
        fname = os.path.join(path_to_workout_json, workout_json_fname)
        with open(fname, "r") as f:
            json_data = json.load(f)
            doc_ref = db.collection("workout-data").document(date_str)
            
            assert not doc_ref.get().exists

            for key in json_data:
                json_data[key]["reps"] = json_data[key].pop("cnt")

            doc_ref.set(json_data)
            pass

if __name__ == '__main__':
    migrate(sys.argv[1])
