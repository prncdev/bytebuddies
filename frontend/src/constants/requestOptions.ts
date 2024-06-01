// export const requestOptions: RequestInit = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify
// }

export type SignIn = {
  name: string;
  age: string;
  gender: string;
  email: string;
  password: string;
};

export type LogIn = {
  email: string;
  password: string;
};

/**
 * 
 * @param UserData that will be send to the database.
 * @returns Request headers configuration for POST.
 */
export const createRequestConfig = function(postData: (SignIn | LogIn)): RequestInit {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }
}