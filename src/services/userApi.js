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
    return await response.json();
  } catch (error) {
    console.log(error);
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

// ROUTINES
// CREATE ROUTINE - POST
export async function createRoutine(
  routine_name,
  type_routine,
  day_routine,
  num_routine,
  user_id
) {
  if (type_routine === "libre") {
    return await postAndPutFetch("POST", `${urlServer}routines/${user_id}`, {
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

// SESSIONS
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

// DELETE SESSION BY ID - DELETE
export async function deleteSessionById(session_id) {
  return await deleteFecth(`${urlServer}sessions/${session_id}`);
}

// SESSION EXERCISES
// GET EXERCISES BY SESSION ID - GET
export async function getSessionExercisesBySessionId(session_id) {
  return await getFetch(`${urlServer}sessions_exercise/${session_id}`);
}


// EXERCISES TYPES
// GET ALL EXERCISES TYPES - GET
export async function getExercisesTypes() {
  return await getFetch(`${urlServer}typeExercise`);
}


// EXERCISES
// GET ALL EXERCISES BY TYPE - GET
export async function getExercisesByType(type_id) {
  return await getFetch(`${urlServer}exercise/type/${type_id}`);
}