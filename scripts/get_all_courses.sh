#!/usr/bin/env bash

# Usage: ./get_all_courses.sh < min_subject_areas.txt

export year="2018"
export study_level="undergraduate"

while read -r subject_area
do
    export subject_area_url="http://timetable.unsw.edu.au/2018/"$subject_area"KENS.html"

    for course_code in `wget -q -O- "$subject_area_url" |
                        html2text - |
                        egrep "$subject_area[0-9]{4}" |
                        cut -d' ' -f1`
    do
        export handbook_url="http://legacy.handbook.unsw.edu.au/$study_level/courses/$year/$course_code.html"
        wget -q -O- "$handbook_url" | html2text - > handbook_entry.txt.tmp
        faculty=`egrep "Faculty:" handbook_entry.txt.tmp | cut -d':' -f2 | sed -e 's/_/ /g'`
        co_reqs=`egrep "Corequisite:" handbook_entry.txt.tmp | cut -d':' -f2 | sed -e 's/_/ /g'`
        pre_reqs=`egrep "Prerequisite:" handbook_entry.txt.tmp | cut -d':' -f2 | sed -e 's/_/ /g'`
        excluded=`egrep "Excluded:" handbook_entry.txt.tmp | cut -d':' -f2 | sed -e 's/_/ /g'`
        echo "==================="
        echo "course_code: $course_code | faculty: $faculty | co_reqs: $co_reqs | pre_reqs: $pre_reqs | excluded: $excluded | handbook_link: $handbook_url"
        rm handbook_entry.txt.tmp
    done
    # exit 1
done




# course {
# "code":COMP4920,
# "name":Ethics,
# "??description:ethics course,
# "prereqs":["ds","asjd"],
# "coreqs":[],
# "exclusion":[],
# "level of study":3
# "handbook_link":url
# "average_satisfaction":
# "average_difficulty":
# "root_comment_history": [comment]
# }
