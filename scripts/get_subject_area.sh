#!/usr/bin/env bash

wget -q -O-  http://timetable.unsw.edu.au/2018/subjectSearch.html |
    html2text - |
    tail -226 | head -195 |
    cut -d' ' -f1 |
    sort | uniq > subject_areas.txt
