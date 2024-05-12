const urlServer = import.meta.env.VITE_API_URL;

async function getFetch(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json(
    );
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

export async function login(username, password) {
   console.log("url: " + urlServer);
  return await postAndPutFetch("POST", `${urlServer}users/emailandpassword`, {
    email: username,
    pssd: password,
  });
}

export async function register(username, email, password) {
  return await postAndPutFetch("POST", `${urlServer}users`, {
    username: username,
    email: email,
    pssd: password,
    urole: 2,
    foto: null
  });
}

export async function createRoutine(routine_name ,type_routine, day_routine, num_routine, user_id){
  if(type_routine === "libre"){
    return await postAndPutFetch("POST", `${urlServer}routines/${user_id}`, {
      routine_name: routine_name,
      type_routine: "libre",
      day_routine: null,
      num_routine: num_routine,
    });
  }
  else if(type_routine === "semanal"){
    // console.log("entro a semanal");
    // console.log(typeof day_routine);
    // console.log(JSON.stringify(day_routine));
    // console.log(typeof day_routine);

    return await postAndPutFetch("POST", `${urlServer}routine/${user_id}`, {
      routine_name: routine_name,
      type_routine: "semanal",
      day_routine: JSON.stringify(day_routine),
      num_routine: null,
    });
  }

}

export async function getRoutinesByUser(user_id){
  return await getFetch(`${urlServer}routine/${user_id}`);
}