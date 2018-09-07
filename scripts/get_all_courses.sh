#!/usr/bin/env bash

# Usage: ./get_all_courses.sh < min_subject_areas.txt

export year="2018"
export ugrad="undergraduate"
export pgrad="postgraduate"

while read -r subject_area
do
    export subject_area_url="http://timetable.unsw.edu.au/2018/"$subject_area"KENS.html"

    for course_code in `wget -q -O- "$subject_area_url" |
                        html2text - |
                        egrep "$subject_area[0-9]{4}" |
                        cut -d' ' -f1`
    do
        ugrad_url="http://legacy.handbook.unsw.edu.au/$ugrad/courses/$year/$course_code.html"
        pgrad_url="http://legacy.handbook.unsw.edu.au/$pgrad/courses/$year/$course_code.html"
        if curl --output /dev/null --silent --fail -r 0-0 "$ugrad_url"
        then
            handbook_url="$ugrad_url"
        elif curl --output /dev/null --silent --fail -r 0-0 "$pgrad_url"
        then
            handbook_url="$pgrad_url"
        else
            echo "Course $course_code not found in handbook. Moving on."
            continue
        fi
        wget -q -O- "$handbook_url" | html2text - > handbook_entry.txt.tmp
        # cat handbook_entry.txt.tmp
        faculty=`egrep "Faculty:" handbook_entry.txt.tmp | cut -d':' -f2 | sed -e 's/_/ /g'`
        co_reqs=`egrep "Corequisite:" handbook_entry.txt.tmp | cut -d':' -f2 | sed -e 's/_/ /g'`
        pre_reqs=`egrep "Prerequisite:" handbook_entry.txt.tmp | cut -d':' -f2 | sed -e 's/_/ /g'`
        excluded=`egrep "Excluded:" handbook_entry.txt.tmp | cut -d':' -f2 | sed -e 's/_/ /g'`
        # course_name=`egrep "\*{6}.*$course_code\*{6}" handbook_entry.txt.tmp | sed -e 's/\*//g'`
        course_name=`egrep "\*+.*$course_code.*" handbook_entry.txt.tmp | sed -e 's/\*//g'`
        # echo "==================="
        echo "$course_code |$course_name | $faculty | $co_reqs | $pre_reqs | $excluded | $handbook_url"
    done
done
rm handbook_entry.txt.tmp

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
