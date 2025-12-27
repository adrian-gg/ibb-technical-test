import { contacts, files, inboxes, outboxes, records } from "../mocks/mock";


/**
 * Devuelve todos los records que son external
 */
export const getReceivedRecords = (): Iberbox.NodeList => {
  return records.filter((record) => record.external === 1);
};

/**
 * Devuelve todos los records que no son external
 */
export const getSentRecords = (): Iberbox.NodeList => {
  return records.filter((record) => record.external === 0);
};

/**
 * Devuelve todos los contactos
 */
export const getContacts = (): Iberbox.NodeList => {
  return contacts;
};

/**
 * Devuelve todos los inboxes
 */
export const getInboxes = (): Iberbox.NodeList => {
  return inboxes;
};

/**
 * Devuelve una lista de nodos cuyo `parentHandle` sea el handle proporcionado
 * @param handle - El identificador del nodo padre
 */
export const getChildren = (handle: Iberbox.NodeHandle): Iberbox.NodeList => {
  return [...contacts, ...inboxes, ...outboxes, ...records, ...files].filter(
    (node) => node.parentHandle === handle
  );
};

/**
 * Devuelve el nodo cuyo `handle` coincide con el handle proporcionado
 * @param handle - El identificador único del nodo
 */
export const getNodeById = (handle: Iberbox.NodeHandle): Iberbox.Node | undefined => {
  return [...contacts, ...inboxes, ...outboxes, ...records, ...files].find(
    (node) => node.handle === handle
  );
};

/**
 * Devuelve la información del usuario
 */
export function getUserInfo(): Iberbox.UserInfo {
  const firstNames = ['Juan', 'Ana', 'Carlos', 'Maria', 'Pedro', 'Sofia'];
  const lastNames = ['Gomez', 'Lopez', 'Perez', 'Martinez', 'Rodriguez', 'Hernandez'];
  const domains = ['example.com', 'test.com', 'demo.com', 'mail.com'];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomEmail = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;

  return {
    firstname: randomFirstName,
    lastname: randomLastName,
    email: randomEmail
  };
}