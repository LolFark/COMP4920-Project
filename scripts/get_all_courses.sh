#!/usr/bin/env bash

# Shell script to scrape UNSW handbook
# Takes subject area code as input
# Reads timetable site and extracts all course codes
# Reads each course page and extracts data for database
# Format data accordingly for import
# Usage: ./get_all_courses.sh < subject_areas.txt

export year="2018"
export ugrad="undergraduate"
export pgrad="postgraduate"


while read -r subject_area
do
    export subject_area_url="http://timetable.unsw.edu.au/2018/""$subject_area""KENS.html"

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
            grad_level="\"$ugrad\""
        elif curl --output /dev/null --silent --fail -r 0-0 "$pgrad_url"
        then
            handbook_url="$pgrad_url"
            grad_level="\"$pgrad\""
        else
            #echo "Course $course_code not found in handbook. Moving on."
            continue
        fi
        wget -q -O- "$handbook_url" | html2text -width 999 - > handbook_entry.txt.tmp
        # Formatting all variables to be JSON compatible for import into mongoDB
        # cut beginning label -> Change underscores to spaces -> wrap in quotes
        faculty=`egrep "Faculty:" handbook_entry.txt.tmp | cut -d':' -f2 | sed -e 's/_/ /g' | sed -E 's/^.(.*)/\"\1\"/g'`
        #? wrap in quotes
        co_reqs=`egrep "Corequisite:" handbook_entry.txt.tmp | cut -d':' -f2 | sed -e 's/_/ /g' | sed -E 's/(.*)/\"\1\"/g'`
        if [ "$co_reqs" == "" ]
        then
            co_reqs="\"\""
        fi
        #? wrap in quotes
        pre_reqs=`egrep "^Prerequisite:" handbook_entry.txt.tmp | head -1 | cut -d':' -f2 | sed -e 's/_/ /g' | sed -E 's/(.*)/\"\1\"/g'`
        if [ "$pre_reqs" == "" ]
        then
            pre_reqs="\"\""
        fi
        #? wrap in quotes
        excluded=`egrep "^Excluded:" handbook_entry.txt.tmp | head -1 | cut -d':' -f2 | sed -e 's/_/ /g' | sed -E 's/(.*)/\"\1\"/g'`
        if [ "$excluded" == "" ]
        then
            excluded="\"\""
        fi
        # filter asterisks on either side -> remove dash + course code at end + wrap in quotes
        course_name=`egrep "\*+.*$course_code.*\*+" handbook_entry.txt.tmp | sed -e 's/\*//g' |  sed -e 's/\"/\\\\"/g' | sed -E 's/^ (.*) - .*/\"\1\"/g'`
        if [ "$course_name" == "" ]
        then
            continue
        fi
        # wrap in quotes
        course_code=`echo $course_code | sed -E 's/(.*)/\"\1\"/g'`
        # wrap in quotes
        handbook_url=`echo "$handbook_url" | sed -E 's/(.*)/\"\1\"/g'`
        echo "{\"code\":$course_code, \"name\":$course_name, \"faculty\":$faculty, \"grad_level\":$grad_level, \"co_reqs\":$co_reqs, \"pre_reqs\":$pre_reqs, \"exclusions\":$excluded, \"handbook_url\":$handbook_url}"
    done
done
rm handbook_entry.txt.tmp