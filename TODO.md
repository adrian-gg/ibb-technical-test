# 📄 Data from SDK

## Table of Contents

- [👤 User Info](#-user-info)
- [👥 Contacts](#-contacts)
- [📥 All Inboxes](#-all-inboxes)
- [📤 Outboxes inside first contact](#-outboxes-inside-first-contact)
- [📥 Received Records](#-received-records)
- [📤 Sent Records](#-sent-records)
- [📮 Selected Record](#-selected-record)
- [📄 Files inside the Selected Record](#-files-inside-the-selected-record)
- [ℹ️ Información preliminar](#-información-preliminar)
- [🎯 Objetivo](#-objetivo)
- [Aclaraciones:](#aclaraciones)

## 👤 User Info

Maria Hernandez (maria.hernandez@example.com)

## 👥 Contacts

Juan José Caballero (Handle: 5k2enl5vn4f)
Celia Sanz (Handle: v5w61icsigl)
Miguel García (Handle: gfa3m93qtl)
Alejandro Sánchez (Handle: zeeno828spi)
Alejandro Sánchez (Handle: bnfmind5lmw)

## 📥 All Inboxes

Soporte (Handle: lglnew5lul)
Bandeja Principal (Handle: b8sf8cpl5rk)
Facturación (Handle: 8naisvc3r4r)
Facturación (Handle: rpbfkwsj1k)
Ventas (Handle: uf6g4edga4f)

## 📤 Outboxes inside first contact

Ventas (Handle: 5nqqkystpcd, Parent: 5k2enl5vn4f)

## 📥 Received Records

Recordatorio de reunión (Handle: 6zuybuvgm2v, Parent: b8sf8cpl5rk, Contact: gfa3m93qtl)
Oferta especial para ti (Handle: o8azav43ly, Parent: rpbfkwsj1k, Contact: 5k2enl5vn4f)
Recordatorio de reunión (Handle: 4bstrtvtc6l, Parent: lglnew5lul, Contact: bnfmind5lmw)
Factura disponible (Handle: rikyipulg9a, Parent: lglnew5lul, Contact: gfa3m93qtl)

## 📤 Sent Records

Recordatorio de reunión (Handle: txbhugcpby, Parent: xn1hscfxnwb)
Recordatorio de reunión (Handle: 7v5687zm5dl, Parent: xn1hscfxnwb)
Oferta especial para ti (Handle: 51onxaaebeq, Parent: 5nqqkystpcd)
Bienvenido a nuestro servicio (Handle: 6p8n3v2zgam, Parent: xn1hscfxnwb)
Oferta especial para ti (Handle: fjxrpot8056, Parent: jkxtlesvxwj)
Factura disponible (Handle: yrwslxguhp, Parent: fvzq45i43ki)

## 📮 Selected Record

Recordatorio de reunión (Handle: 6zuybuvgm2v)

## 📄 Files inside the Selected Record

notes.xlsx (Handle: 8xwe02tv0ao, Parent: 6zuybuvgm2v)

---

## ℹ️ Información preliminar

Esta aplicación genera una serie de datos de manera automática y totalmente aleatoria, que cambian cada vez que se produce un re-renderizado del proyecto. La información generada está jerarquizada y consiste en:

- Contact > Outbox > Record > Files
- Inbox > Record > Files

**Contactos:** Listado de contactos. Puedes acceder a ellos mediante el método:
`getContacts()`

**Inboxes:** Listado de bandejas de entrada, que sirven para organizar los mensajes recibidos. Puedes listarlas con el método:
`getInboxes()`

**Outboxes:** Listado de bandejas de salida, que sirven para organizar los mensajes enviados. Son siempre hijos de un contacto. Puedes listarlas con este método (siempre que pases el handle de un contact):
`getChildren(handle)`

Mensajes o registros (records): Son los mensajes propiamente dichos. Son simpre hijos de un inbox o un outbox, en función de si se trata de un mensaje recibido o enviado, respectivamente. Puedes acceder a ellos de diferentes formas:

**getReceivedRecords()**
: te devuelve todos los mensajes recibidos de todos los inboxes.

**getSentRecords()**
: te devuelve todos los mensajes enviados a todos los outboxes.

**getChildren(handle)**
: si le pasas el handle de un outbox, te devuelve los registros enviados a ese outbox. Si le pasas el handle de un inbox, te devuelve los registros recibidos en ese inbox.

**Ficheros:** Listado de ficheros asociados a un mensaje. Son siempre hijos de un mensaje (record). Puedes listarlos con este método (siempre que pases el handle de un record):
`getChildren(handle)`

---

## 🎯 Objetivo

Tu objetivo será generar la vista UI de una aplicación de chats. Deberá contar con las siguientes vistas:

- Contactos: deberás listar todos los contactos. Cuando se hace click en un contacto, se mostrarán todos los mensajes intercambiados (tanto enviados como recibidos) con ese contacto, ordenados por fecha. El mensaje más reciente se mostrará abajo del todo. La interfaz de mensajes deberá ser tal que el scroll comience abajo del todo y se vaya haciendo scroll hacia arriba (tipo Whatsapp).
- Inboxes: de la misma manera, mostrarás todo el listado de inboxes. Cuando se haga click en un inbox, aparecerán todos los mensajes recibidos en él y se indicará para cada uno de los mensajes qué contacto lo envió.
- Outboxes: deberás mostrar el listado de outboxes. Cuando se haga click en un outbox, aparecerán los mensajes enviados a ese outbox. De alguna manera, deberá quedar claro a nivel usuario a qué contacto pertenece ese outbox, para facilitar su identificación.

En todo momento, debe estar visible la información del usuario principal (también se genera de forma aleatoria). Dado que es un dato estático, no debería solicitarse cada vez que se cambie de página. Puedes obtener esta información invocando:
`getUserInfo()`

De acuerdo con la jerarquía especificada, siempre que llames a la función getChildren(handle) podrás recuperar los hijos del nodo asociado a ese handle. Por ejemplo, para obtener los hijos de un contacto (los outboxes), llamarás a getChildren(handle) pasando el handle del contacto cuyos outboxes deseas obtener.

## Aclaraciones:

- Aunque puedes generar el típico componente de la textarea para el envío de mensajes, la app no hará envío de mensajes de ningún tipo. Simplemente mostrará las vistas especificadas con la información que te devuelve el sdk.
- Además del código y el funcionamiento general de la app, se valorará especialmente el diseño UX/UI de interfaz. Puedes usar el design system / librería de componentes externa que quieras, no es necesario reinventar la rueda. Busca un diseño limpio y moderno, siguiendo las tendencias actuales. Para este ejemplo, si deseas añadir imágenes aleatorias a los contactos para mejorar la UI, puedes usar la API externa que prefieras.
- Los ficheros mock.ts y sdk.ts no se pueden/deben modificar. Debes ser capaz de hacer todo lo que se pide simplemente invocando los métodos del fichero sdk.ts.
  Si necesitas crear un contexto global, se recomienda el uso de Zustand.
- Cualquier funcionalidad adicional que desees añadir para mejorar la UI, se valorará muy positivamente. Por ejemplo: añadir búsquedas a los listados (en este caso, sería recomendable añadir debounce para optimizar el rendimiento), ordenación de elementos, etc.
- Usa buenas prácticas, y evita abusar del prop-drilling. Se descartarán solicitudes si el proyecto no construye correctamente o falla en tiempo de ejecución. Añade comentarios o incluso edita el README.md por defecto para añadir información útil a la hora de ejecutar tu proyecto. Incluir testing y traducciones no es obligatorio, pero suma puntos :)
