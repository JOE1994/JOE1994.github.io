#!/usr/bin/env python3

import datetime
import json
import os
import subprocess
import sys

def is_valid_date_str(date_str: str) -> bool:
    try:
        datetime.datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False

def read_json_into_dict(filename: str) -> dict:
    assert(filename.endswith('.json'))
    json_as_dict = None
    with open(filename) as json_file:
        json_as_dict = json.load(json_file)
    return json_as_dict

def gen_markdown_table(workout_dict: dict) -> str:
    markdown_str = (
        '|  | Weight (lbs) | Set1 | Set2 | Set3 | Set4 | Set5 | Set6 | Set7 | Set8 | Set9 | Set10 | Set11 | Set12 |\n'
        '|--|--------------|------|------|------|------|------|------|------|------|------|-------|-------|-------|\n'
    )
    row_fmt = '| {task} | {weight_in_lbs} | {s1} | {s2} | {s3} | {s4} | {s5} | {s6} | {s7} | {s8} | {s9} | {s10} | {s11} | {s12} |\n'

    for task in workout_dict:
        # Extend list to fit length 12
        workout_dict[task]['cnt'] += ['' for _ in range(12 - len(workout_dict[task]['cnt']))]
        # Append row to table
        markdown_str += row_fmt.format(
            task          = task,
            weight_in_lbs = workout_dict[task]['weight'] if 'weight' in workout_dict[task] else '',
            s1            = workout_dict[task]['cnt'][0],
            s2            = workout_dict[task]['cnt'][1],
            s3            = workout_dict[task]['cnt'][2],
            s4            = workout_dict[task]['cnt'][3],
            s5            = workout_dict[task]['cnt'][4],
            s6            = workout_dict[task]['cnt'][5],
            s7            = workout_dict[task]['cnt'][6],
            s8            = workout_dict[task]['cnt'][7],
            s9            = workout_dict[task]['cnt'][8],
            s10           = workout_dict[task]['cnt'][9],
            s11           = workout_dict[task]['cnt'][10],
            s12           = workout_dict[task]['cnt'][11]
        )

    return markdown_str

def gen_html_table(workout_dict):
    html_str = (
        '<table><thead><tr>'
        '<th></th><th>Weight (lbs)</th>'
        '<th>Set1</th><th>Set2</th><th>Set3</th><th>Set4</th><th>Set5</th><th>Set6</th><th>Set7</th><th>Set8</th><th>Set9</th><th>Set10</th><th>Set11</th><th>Set12</th>'
        '</tr></thead><tbody>'
    )
    row_fmt = '<tr><td>{task}</td><td>{weight_in_lbs}</td><td>{s1}</td><td>{s2}</td><td>{s3}</td><td>{s4}</td><td>{s5}</td><td>{s6}</td><td>{s7}</td><td>{s8}</td><td>{s9}</td><td>{s10}</td><td>{s11}</td><td>{s12}</td></tr>'
    for task in workout_dict:
        # Extend list to fit length 12
        workout_dict[task]['cnt'] += ['' for _ in range(12 - len(workout_dict[task]['cnt']))]
        # Append row to table
        html_str += row_fmt.format(
            task          = task,
            weight_in_lbs = workout_dict[task]['weight'] if 'weight' in workout_dict[task] else '',
            s1            = workout_dict[task]['cnt'][0],
            s2            = workout_dict[task]['cnt'][1],
            s3            = workout_dict[task]['cnt'][2],
            s4            = workout_dict[task]['cnt'][3],
            s5            = workout_dict[task]['cnt'][4],
            s6            = workout_dict[task]['cnt'][5],
            s7            = workout_dict[task]['cnt'][6],
            s8            = workout_dict[task]['cnt'][7],
            s9            = workout_dict[task]['cnt'][8],
            s10           = workout_dict[task]['cnt'][9],
            s11           = workout_dict[task]['cnt'][10],
            s12           = workout_dict[task]['cnt'][11]
        )
    html_str += '</tbody></table>'
    return html_str

if __name__ == '__main__':
    if not os.getcwd().endswith("workout_diary_challenge"):
        sys.exit('This script must be run at `JOE1994.github.io/workout_diary_challenge`')

    for i in range(1, len(sys.argv)):
        date_str = os.path.basename(sys.argv[i])[:-5]
        assert(is_valid_date_str(date_str))
        workout_dict = read_json_into_dict(sys.argv[i])

        html_table_str = gen_html_table(workout_dict)
        with open('data/html_tables/' + date_str + '.html', 'w') as table_f:
            table_f.write(html_table_str)
        
        print(f'[info] Generated html table from `{date_str}.json`')

    ls = subprocess.Popen(['ls', 'data/json'], stdout=subprocess.PIPE)
    how_many_days_so_far = subprocess.check_output(['wc', '-l'], stdin=ls.stdout).decode('utf-8')[:-1]
    subprocess.run(['git', 'add', 'data'])
    subprocess.run(['git', 'commit', '-m', '[workout] Day' + how_many_days_so_far])
