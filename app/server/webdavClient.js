import { createClient } from 'webdav';

const client = createClient(
  "https://cloud.studiocall.fr/remote.php/dav/files/AISTUDIOCALL",
  {
    username: "AISTUDIOCALL",
    password: "aistudiocalldev",
    withCredentials: true,
  }
);

export default client;
