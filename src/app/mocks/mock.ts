import { NodeType } from "../types/module";

// Función para generar un identificador único
const generateHandle = (): Iberbox.NodeHandle =>
  Math.random().toString(36).substring(2, 15);

// Función para obtener un nombre de persona aleatorio
const getRandomName = (): string => {
  const names = [
    "Juan Pérez",
    "María López",
    "Carlos Sánchez",
    "Ana Gómez",
    "Alejandro Sánchez",
    "Eva Martín",
    "Miguel García",
    "Carlos Parra",
    "Juan José Caballero",
    "Melissa Ruiz",
    "Pedro Mateos",
    "Jesús Navarro",
    "Javier López",
    "Daniel Mejías",
    "Celia Sanz",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Función para generar un correo aleatorio
const getRandomEmail = (): string => {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  return `${generateHandle()}@${
    domains[Math.floor(Math.random() * domains.length)]
  }`;
};

// Función para obtener un asunto de prueba
const getRandomSubject = (): string => {
  const subjects = [
    "Oferta especial para ti",
    "Recordatorio de reunión",
    "Factura disponible",
    "Actualización de cuenta",
    "Bienvenido a nuestro servicio",
  ];
  return subjects[Math.floor(Math.random() * subjects.length)];
};

// Función para obtener un mensaje de prueba
const getRandomMessage = (): string => {
  const messages = [
    "Hola, te informamos sobre una nueva promoción...",
    "No olvides que tu reunión está programada para mañana...",
    "Tu factura del mes ya está disponible para su descarga.",
    "Hemos actualizado nuestras políticas de privacidad.",
    "Gracias por unirte a nuestro servicio, aquí tienes los primeros pasos.",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

// Función para obtener un nombre de buzón
const getRandomMailboxName = (): string => {
  const mailboxes = [
    "Bandeja Principal",
    "Soporte",
    "Facturación",
    "Ventas",
    "Consultas",
  ];
  return mailboxes[Math.floor(Math.random() * mailboxes.length)];
};

// Función para obtener una descripción de buzón
const getRandomMailboxDescription = (): string => {
  const descriptions = [
    "Bandeja de entrada principal para mensajes importantes.",
    "Buzón dedicado a consultas de soporte técnico.",
    "Mensajes relacionados con facturación y pagos.",
    "Comunicaciones con el equipo de ventas.",
    "Consultas generales recibidas desde el sitio web.",
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Función para obtener un nombre de archivo con extensión
const getRandomFilename = (): string => {
  const filenames = ["document", "report", "invoice", "summary", "notes"];
  const extensions = [
    ".pdf",
    ".docx",
    ".xlsx",
    ".txt",
    ".jpg",
    ".mp3",
    ".mov",
    ".zip",
  ];
  return `${filenames[Math.floor(Math.random() * filenames.length)]}${
    extensions[Math.floor(Math.random() * extensions.length)]
  }`;
};

// Función para generar fechas aleatorias (en segundos de unix)
const generateRandomCtime = (): number => {
  const now = Math.floor(Date.now() / 1000);
  const pastLimit = now - 60 * 60 * 24 * 365 * 5;
  return Math.floor(Math.random() * (now - pastLimit) + pastLimit);
};


// Función para generar un nodo con valores personalizados
const generateNode = (overrides: Partial<Iberbox.Node> = {}): Iberbox.Node => {
  return {
    id: Math.floor(Math.random() * 10000),
    handle: generateHandle(),
    parentHandle: "",
    name: "",
    contact: "",
    subject: "",
    message: "",
    ctime: generateRandomCtime(),
    size: Math.floor(Math.random() * 1000),
    external: 0,
    type: NodeType.INVALID,
    replyTo: "",
    ...overrides,
  };
};

// Generar contactos
const contacts: Iberbox.NodeList = Array.from({ length: 5 }, () =>
  generateNode({
    type: NodeType.CONTACT,
    name: getRandomName(),
    contact: getRandomEmail(),
  })
);

// Generar bandejas de entrada (INBOX)
const inboxes: Iberbox.NodeList = Array.from({ length: 5 }, () =>
  generateNode({
    type: NodeType.INBOX,
    name: getRandomMailboxName(),
    subject: getRandomMailboxName(),
    message: getRandomMailboxDescription(),
  })
);

// Generar bandejas de salida (OUTBOX)
const outboxes: Iberbox.NodeList = Array.from({ length: 5 }, () =>
  generateNode({
    type: NodeType.OUTBOX,
    parentHandle: contacts[Math.floor(Math.random() * contacts.length)].handle,
    name: getRandomMailboxName(),
    subject: getRandomMailboxName(),
    message: getRandomMailboxDescription(),
  })
);

// Generar registros (RECORD)
const records: Iberbox.NodeList = Array.from({ length: 10 }, () => {
  const isExternal = Math.random() < 0.5;
  const randomContact = contacts[Math.floor(Math.random() * inboxes.length)].handle;
  const randomInbox = inboxes[Math.floor(Math.random() * inboxes.length)].handle;
  const randomOutbox = outboxes[Math.floor(Math.random() * outboxes.length)].handle;

  return generateNode({
    type: NodeType.RECORD,
    external: isExternal ? 1 : 0,
    parentHandle: isExternal
      ? randomInbox
      : randomOutbox,
    name: getRandomSubject(),
    contact: isExternal ? randomContact : "",
    subject: getRandomSubject(),
    message: getRandomMessage(),
    replyTo: isExternal
    ? randomOutbox
    : randomInbox,
  });
});

// Generar archivos (FILE)
const files: Iberbox.NodeList = Array.from({ length: 15 }, () =>
  generateNode({
    type: NodeType.FILE,
    parentHandle: records[Math.floor(Math.random() * records.length)].handle,
    name: getRandomFilename(),
  })
);

export { contacts, inboxes, outboxes, records, files };
