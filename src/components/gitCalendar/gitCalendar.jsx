import React, { useState, useEffect, useRef } from "react";
import "./../../styles/calendar.css";
import Cookies from "universal-cookie";

import {
  getRoutinesByUser,
  getSessionsByRoutineId,
  getSessionExercisesBySessionId,
  getCalendarBySessionExerciseId,
} from "../../services/userApi";

const GitCalendar = () => {
  const [weeks, setWeeks] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [weekStreak, setWeekStreak] = useState(0);
  const calendarRef = useRef(null);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const initialDates = getLastTwoYearsDates();
    const initialWeeks = groupDatesByWeeks(initialDates);

    getRoutinesByUser(token).then((routines) => {
      routines.forEach((routine) => {
        getSessionsByRoutineId(routine.pk_id_routine).then((sessions) => {
          sessions.forEach((session) => {
            getSessionExercisesBySessionId(session.pk_id_sessio).then(
              (sessionExercises) => {
                if (sessionExercises.length > 0) {
                  sessionExercises.forEach((element) => {
                    getCalendarBySessionExerciseId(
                      element.pk_id_sessio_ex
                    ).then((calendar) => {
                      if (calendar[0].length > 0) {
                        calendar[0].forEach((element) => {
                          setCalendar((prev) => {
                            const elementDayFormatted =
                              element.day.split("T")[0];
                            if (!prev.includes(elementDayFormatted)) {
                              return [...prev, elementDayFormatted];
                            } else {
                              return prev;
                            }
                          });
                        });
                      }
                    });
                  });
                }
              }
            );
          });
        });
      });
    });

    setWeeks(initialWeeks);
  }, []);

  useEffect(() => {
    const weeekStreak = calculateWeekStreak(calendar);
    setWeekStreak(weeekStreak);
  }, [calendar]);

  const calculateWeekStreak = (calendar) => {
    if (!Array.isArray(calendar)) {
      return 0;
    }

    let streak = 0;
    let lastWeekNumber = -1;

    const sortedCalendar = [...calendar].sort(
      (a, b) => new Date(b) - new Date(a)
    );

    for (let i = 0; i < sortedCalendar.length; i++) {
      const weekNumber = getWeekNumber(new Date(sortedCalendar[i]));

      if (lastWeekNumber === -1 || weekNumber === lastWeekNumber - 1) {
        streak++;
        lastWeekNumber = weekNumber;
      } else if (weekNumber < lastWeekNumber - 1) {
        break;
      }
    }

    return streak;
  };

  const getWeekNumber = (date) => {
    const newDate = new Date(date.getTime());
    newDate.setHours(0, 0, 0, 0);
    const week1 = new Date(newDate.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((newDate.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  };

  const getLastTwoYearsDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 365 * 2; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  const groupDatesByWeeks = (dates) => {
    const weeks = [];
    let currentWeek = [];

    dates.forEach((date) => {
      if (currentWeek.length === 0) {
        console.log(date);
        currentWeek.push(date);
      } else if (date.getDay() === 0) {
        console.log(date);
        weeks.push(currentWeek);
        currentWeek = [date];
      } else {
        currentWeek.push(date);
      }
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  return (
    <>
      <div id="calendarRoutines" className="border-r5 backgroundBlack cage100">
        <h2>Calendario de sessiones</h2>
        <div className="calendar flex marginAuto" ref={calendarRef}>
          <div className="calendar-grid">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="calendar-week">
                {week.map((date, dayIndex) => {
                  const day = date.getDate();
                  const month = date.getMonth() + 1;
                  const formattedDay = day < 10 ? `0${day}` : `${day}`;
                  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
                  const formattedDate = `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;
                  return (
                    <div
                      key={date.toDateString()}
                      className="dayCage"
                      {...(calendar.includes(formattedDate)
                        ? { style: { backgroundColor: "#00FF1A" } }
                        : {})}
                      id={`${formattedDay}-${formattedMonth}-${date.getFullYear()}`}
                    ></div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="leyenda flex align-center">
            <p>Vacio</p>
            <div className="dayCage"></div>
            <p>Completado</p>
            <div
              className="dayCage"
              style={{ backgroundColor: "#00FF1A" }}
            ></div>
          </div>
        </div>
      </div>
      <div id="showStats" className="flex justify-between align-center">
        <div className="cageStat backgroundBlack">
          <h2>
            {calendar.length > 9 ? calendar.length : "0" + calendar.length}
          </h2>
          <h3>Dias Completados</h3>
        </div>
        <div className="cageStat backgroundBlack">
          <h2>{weekStreak > 9 ? weekStreak : "0" + weekStreak}</h2>
          <h3>Racha de Semanas</h3>
        </div>
      </div>
    </>
  );
};

export default GitCalendar;
