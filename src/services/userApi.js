const urlServer = import.meta.env.VITE_API_URL;

// CALL API FUNCTIONS
async function getFetch(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    throw error;
  }
}

async function deleteFecth(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function postAndPutFetch(method, url, data) {
  try {
    const response = await fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log(JSON.stringify(data));
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// API
//USERS -----------
// GET ALL USERS - GET
export async function getAllUsers() {
  return await getFetch(`${urlServer}users`);
}

// GET USER BY ID - GET
export async function getUserById(user_id) {
  return await getFetch(`${urlServer}users/${user_id}`);
}

// UPDATE USER EMAIL - PUT
export async function updateUserEmail(user_id, email) {
  return await postAndPutFetch("PUT", `${urlServer}users/email/${user_id}`, {
    email: email,
  });
}

// UPDATE USER USERNAME - PUT
export async function updateUserUsername(user_id, username) {
  return await postAndPutFetch("PUT", `${urlServer}users/username/${user_id}`, {
    username: username,
  });
}

// UPDATE USER ROLE - PUT
export async function updateUserRole(user_id, role) {
  return await postAndPutFetch("PUT", `${urlServer}users/urole/${user_id}`, {
    urole: role,
  });
}

// UPDATE USER PASSWORD - PUT
export async function updateUserPassword(user_id, password, pastPassword) {
  return await postAndPutFetch(
    "PUT",
    `${urlServer}users/password/${user_id}/${pastPassword}`,
    {
      pssd: password,
    }
  );
}

// DELETE USER BY ID - DELETE
export async function deleteUserById(user_id) {
  return await deleteFecth(`${urlServer}users/${user_id}`);
}

//POST
// LOGIN - POST
export async function login(username, password) {
  console.log("url: " + urlServer);
  return await postAndPutFetch("POST", `${urlServer}users/emailandpassword`, {
    email: username,
    pssd: password,
  });
}

// REGISTER - POST
export async function register(username, email, password) {
  return await postAndPutFetch("POST", `${urlServer}users`, {
    username: username,
    email: email,
    pssd: password,
    urole: 2,
    foto: null,
  });
}

// ROUTINES -----------
// CREATE ROUTINE - POST
export async function createRoutine(
  routine_name,
  type_routine,
  day_routine,
  num_routine,
  user_id
) {
  if (type_routine === "libre") {
    return await postAndPutFetch("POST", `${urlServer}routine/${user_id}`, {
      routine_name: routine_name,
      type_routine: "libre",
      day_routine: null,
      num_routine: num_routine,
    });
  } else if (type_routine === "semanal") {
    return await postAndPutFetch("POST", `${urlServer}routine/${user_id}`, {
      routine_name: routine_name,
      type_routine: "semanal",
      day_routine: JSON.stringify(day_routine),
      num_routine: null,
    });
  }
}

//UPDATE ROUTINE DAYS - PUT
export async function updateRoutineDays(routine_id, num_routine, days) {
  return await postAndPutFetch("PUT", `${urlServer}routine/day/${routine_id}`, {
    day_routine: days,
    num_routine: num_routine,
  });
}

// UPDATE ROUTINE NAME - PUT
export async function updateRoutineName(routine_id, routine_name) {
  return await postAndPutFetch(
    "PUT",
    `${urlServer}routine/name/${routine_id}`,
    {
      routine_name: routine_name,
    }
  );
}

// DELETE ROUTINE BY ID - DELETE
export async function deleteRoutineById(routine_id) {
  return await deleteFecth(`${urlServer}routine/${routine_id}`);
}

//GET
// GET ROUTINES BY USER - GET
export async function getRoutinesByUser(user_id) {
  return await getFetch(`${urlServer}routine/${user_id}`);
}

// GET ROUTINE BY ID - GET
export async function getRoutineById(routine_id) {
  return await getFetch(`${urlServer}routine/id/${routine_id}`);
}

// MAIN ROUTINE -----------
// GET MAIN ROUTINE BY USER ID - GET
export async function getMainRoutineByUser(user_id) {
  return await getFetch(`${urlServer}mainRoutine/${user_id}`);
}

// GET MAIN ROUTINE BY USER AND ROUTINE ID - GET
export async function getMainRoutineByUserAndRoutine(routine_id, user_id) {
  const url = `${urlServer}mainRoutine/${routine_id}/${user_id}`;
  console.log(`Fetching from URL: ${url}`);
  try {
    const response = await getFetch(url);
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching main routine by user and routine:", error);
    throw error;
  }
}

// CREATE MAIN ROUTINE - POST
export async function createMainRoutine(user_id, routine_id) {
  return await postAndPutFetch(
    "POST",
    `${urlServer}mainRoutine/${routine_id}`,
    {
      fk_id_user: user_id,
    }
  );
}

// DELETE MAIN ROUTINE BY USER ID - DELETE
export async function deleteMainRoutineByUser(user_id) {
  return await deleteFecth(`${urlServer}mainRoutine/${user_id}`);
}

// SESSIONS -----------
// GET SESSIONS BY ROUTINE ID - GET
export async function getSessionsByRoutineId(session_id) {
  return await getFetch(`${urlServer}sessions/routine/${session_id}`);
}

// GET SESSION BY ID - GET
export async function getSessionById(session_id) {
  return await getFetch(`${urlServer}sessions/${session_id}`);
}

// CREATE SESSION - POST
export async function createSessionPlanedRoutine(
  nom_session,
  week_day,
  fk_id_routine
) {
  return await postAndPutFetch(
    "POST",
    `${urlServer}sessions/${fk_id_routine}`,
    {
      nom_session: nom_session,
      week_day: week_day,
      fk_category_1: null,
      fk_category_2: null,
    }
  );
}

export async function createSessionFreeRoutine(nom_session, fk_id_routine) {
  return await postAndPutFetch(
    "POST",
    `${urlServer}sessions/${fk_id_routine}`,
    {
      nom_session: nom_session,
      week_day: null,
      fk_category_1: null,
      fk_category_2: null,
    }
  );
}

// DELETE SESSION BY ID - DELETE
export async function deleteSessionById(session_id) {
  return await deleteFecth(`${urlServer}sessions/${session_id}`);
}

// SESSION EXERCISES -----------
// GET EXERCISES BY SESSION ID - GET
export async function getSessionExercisesBySessionId(session_id) {
  return await getFetch(`${urlServer}sessions_exercise/${session_id}`);
}

// GET SESSION EXERCISE BY SESSION EXERCISE ID - GET
export async function getSessionExerciseById(session_exercise_id) {
  return await getFetch(
    `${urlServer}sessions_exercise/session/${session_exercise_id}`
  );
}

// CREATE EXERCISES BY SESSION ID - POST
export async function createSessionExercise(fk_id_exercise, fk_id_session) {
  return await postAndPutFetch("POST", `${urlServer}sessions_exercise`, {
    fk_id_exercise: fk_id_exercise,
    fk_id_sessio: fk_id_session,
  });
}

// DELETE EXERCISE BY SESSION AND EXERCISE ID - DELETE
export async function deleteSessionExerciseById(session_id, exercise_id) {
  return await deleteFecth(
    `${urlServer}sessions_exercise/${session_id}/${exercise_id}`
  );
}

// EXERCISES TYPES -----------
// GET ALL EXERCISES TYPES - GET
export async function getExercisesTypes() {
  return await getFetch(`${urlServer}typeExercise`);
}

// EXERCISES -----------
// GET ALL EXERCISES - GET
export async function getAllExercises() {
  return await getFetch(`${urlServer}exercise`);
}

// GET ALL EXERCISES BY TYPE - GET
export async function getExercisesByType(type_id) {
  return await getFetch(`${urlServer}exercise/type/${type_id}`);
}

// GET EXERCISE BY ID - GET
export async function getExerciseById(exercise_id) {
  // console.log("url: " + urlServer + "exercise/id/" + exercise_id)
  return await getFetch(`${urlServer}exercise/id/${exercise_id}`);
}

// CREATE EXERCISE - POST
export async function createExercise(
  exercise_name,
  description,
  fk_category_1,
  fk_id_type
) {
  return await postAndPutFetch("POST", `${urlServer}exercise`, {
    exercise_name: exercise_name,
    description: description,
    fk_category_1: fk_category_1,
    fk_id_type: fk_id_type,
  });
}

// UPDATE EXERCISE - PUT
export async function updateExercise(
  exercise_id,
  exercise_name,
  description,
  fk_category_1,
  fk_id_type
) {
  return await postAndPutFetch("PUT", `${urlServer}exercise/${exercise_id}`, {
    exercise_name: exercise_name,
    description: description,
    fk_category_1: fk_category_1,
    fk_id_type: fk_id_type,
  });
}

// DELETE EXERCISE BY ID - DELETE
export async function deleteExerciseById(exercise_id) {
  return await deleteFecth(`${urlServer}exercise/${exercise_id}`);
}

//CALENDAR -----------
// GET ALL CALENDAR - GET
export async function getCalendar() {
  return await getFetch(`${urlServer}calendar`);
}

// GET CALENDAR BY SESSION_EXERCISE ID - GET
export async function getCalendarBySessionExerciseId(session_exercise_id) {
  return await getFetch(`${urlServer}calendar/exercise/${session_exercise_id}`);
}

// GET CALENDAR BY SESSION_EXERCISE AND DATE - GET
export async function getCalendarBySessionExerciseAndDate(
  session_exercise_id,
  date
) {
  return await getFetch(
    `${urlServer}calendar/exercise/${session_exercise_id}/${date}`
  );
}

export async function createCalendar(
  serie,
  weight,
  repetitions,
  duration,
  day,
  fk_id_session_ex
) {
  return await postAndPutFetch("POST", `${urlServer}calendar`, {
    serie: serie,
    weight: weight,
    repetitions: repetitions,
    duration: duration,
    day: day,
    fk_id_session_ex: fk_id_session_ex,
  });
}

export async function deleteCalendarById(calendar_id) {
  return await deleteFecth(`${urlServer}calendar/${calendar_id}`);
}
