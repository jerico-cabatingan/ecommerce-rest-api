const root = 'http://localhost:3001';

export const registerNewUser = async (fname, lname, email, username, password) => {
  try {
    const response = await fetch(`${root}/users/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fname, lname, email, username, password })
    });
    // console.log(response);

    if (response.ok) {
      const json = await response.json();
      // console.log(json)
      return json;
    }
  }
  catch (error) {
    console.log(error);
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${root}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    });
    // console.log(response);
    if (response.ok) {
      const json = await response.json();
      // console.log(json)
      return json;
    }
    throw new Error('Incorrect Details')
  }
  catch (error) {
    console.log(error);
  }
};

export const logout = async (username, password) => {
  try {
    const response = await fetch(`${root}/auth/logout`);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error('Incorrect Details')
  }
  catch (error) {
    console.log(error);
  }
};

// Retrieves the most recent cart from a logged in user
// Returns cart with most recent timestamp and is_checked_out === false for a given userId
export const getLastCart = async (userId) => {
  try {
    const response = await fetch(`${root}/carts/session/${userId}`);
    console.log(response)

    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error('Could not get active cart')
  }
  catch (error) {
    console.log(error);
  }
};