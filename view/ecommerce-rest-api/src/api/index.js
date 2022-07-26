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

    if (response.ok) {
      const json = await response.json();
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
      redirect: 'follow',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    });
    console.log(response);
    if (response.ok) {
      const json = await response.json();
      console.log(json)
      return json;
    }
    throw new Error('Incorrect Details')
  }
  catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
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
    const response = await fetch(`${root}/carts/session/${userId}`, { 
      credentials: "include"
    });

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

export const getCartItems = async (cartId) => {
  try {
    const response = await fetch(`${root}/carts/${cartId}`, { 
      credentials: "include"
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error('Could not get cart items')
  }
  catch (error) {
    console.log(error);
  }
};

export const getOrders = async (userId) => {
  try {
    const response = await fetch(`${root}/orders/user/${userId}`, { 
      credentials: "include"
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error('Could not get orders')
  }
  catch (error) {
    console.log(error);
  }
};


export const getUser = async () => {
  try {
    const response = await fetch(`${root}/auth/redirect`, {
      credentials: 'include'
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    };
    throw Error('Unable to get User.')
  }
  catch (error) {
    console.log(error)
  }
};

// Get prodcuts to redner product page

export const getProducts = async (queryString) => {
  const response = await fetch(`${root}/products/${queryString}`)

  if (response.ok) {
    const json = await response.json();
    return json 
  }
}
// Get categories to render category filter list
export const getCategories = async () => {
  const response = await fetch(`${root}/products/categories`);

  if (response.ok) {
    const json = await response.json()
    return json;
  }
}

export const getProduct = async (productId) => {
  const response = await fetch(`${root}/products/${productId}`);

  if (response.ok) {
    const json = await response.json()

    return json;
  }
}