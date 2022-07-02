// POST /users/register
export const registerNewUser = async () => {

};

// POST /login 
// Returns user data to be stored in session storage
export const login = async (username, password) => {
  try {
    const response = await fetch(`/login`, {
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
    const response = await fetch(`/carts/session/${userId}`);
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