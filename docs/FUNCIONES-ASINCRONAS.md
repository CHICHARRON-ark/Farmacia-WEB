# Funciones asíncronas y promesas — Farmacia Econopharma

Este documento separa dos conceptos que el proyecto usa de forma complementaria:

| Concepto | Cómo se identifica en el código | Para qué sirve |
|----------|----------------------------------|----------------|
| **Función asíncrona** | Declarada con `async function` o `async () =>` y usa `await` | Escribir lógica secuencial que espera resultados sin bloquear la interfaz |
| **Promesa** | `new Promise(...)`, `Promise.all(...)`, `.then(...)` | Crear o combinar operaciones que se resuelven en el futuro |

**Requisito mínimo:** 5 funciones asíncronas **y** uso de promesas. El proyecto cumple ambos.

---

## Parte A — Funciones asíncronas (`async` / `await`)

Funciones declaradas con `async`. Siempre devuelven una `Promise` implícita.

### A.1 Seguridad — `src/utils/security.js`

| Función | Línea aprox. | Qué hace |
|---------|--------------|----------|
| `hashPassword(password)` | exportada | Genera hash seguro con sal aleatoria (`v2:salt:hash`) |
| `verifyPassword(password, storedHash)` | exportada | Compara contraseña con el hash guardado |
| `deriveKeySubtle(password, salt)` | interna | Deriva clave PBKDF2 con `crypto.subtle` (solo HTTPS) |

**Consumidores:** `authService.js` → `registerUser`, `loginUser`, `changeUserPassword`, `seedUsersIfNeeded`.

---

### A.2 Autenticación — `src/services/authService.js`

| Función | Qué hace | Dónde se llama |
|---------|----------|----------------|
| `seedUsersIfNeeded()` | Crea usuarios demo si no existen en `localStorage` | `AuthContext` → `bootstrap()` |
| `registerUser(data)` | Valida, hashea contraseña, registra y abre sesión | `Register.jsx` |
| `loginUser(data)` | Valida credenciales, verifica hash, controla bloqueo | `Login.jsx` |
| `changeUserPassword(userId, data)` | Cambia contraseña tras verificar la actual | `AccountProfile.jsx` |
| `upgradePasswordIfNeeded(userId, password)` | Migra contraseñas al formato hash nuevo | interna, desde `loginUser` |

---

### A.3 Catálogo — `src/services/catalogService.js`

| Función | Qué hace | Dónde se llama |
|---------|----------|----------------|
| `loadCatalogAsync()` | Lee y repara productos desde `localStorage` | `ProductsContext` |
| `persistCatalogAsync(products)` | Guarda catálogo con retardo simulado | `ProductsContext.saveProducts()` |
| `initCatalogStorageAsync()` | Inicializa catálogo la primera vez | `ProductsContext` → `bootstrapCatalog()` |

---

### A.4 Pedidos — `src/services/orderService.js`

| Función | Qué hace | Dónde se llama |
|---------|----------|----------------|
| `processCheckoutOrder(orderData)` | Simula pasarela de pago y crea el pedido | `Checkout.jsx` → `handleSubmit` |
| `fetchUserOrdersAsync(userId)` | Carga pedidos del usuario de forma diferida | `AccountOrders.jsx` → `loadOrders` |

---

### A.5 Contextos React

#### `src/context/AuthContext.jsx`

| Función | Qué hace |
|---------|----------|
| `bootstrap()` | `await seedUsersIfNeeded()` al iniciar la app |
| `register(data)` | `await registerUser(data)` + estado `authLoading` |
| `login(data)` | `await loginUser(data)` + estado `authLoading` |
| `changePassword(data)` | `await changeUserPassword(...)` |

#### `src/context/ProductsContext.jsx`

| Función | Qué hace |
|---------|----------|
| `bootstrapCatalog()` | `await initCatalogStorageAsync()` al montar el provider |
| `refresh()` | `await loadCatalogAsync()` al detectar cambios en catálogo |

---

### A.6 Páginas (manejadores `async`)

| Archivo | Función | `await` sobre |
|---------|---------|---------------|
| `src/pages/Login.jsx` | `handleSubmit` | `login(form)` |
| `src/pages/Register.jsx` | `handleSubmit` | `register(form)` |
| `src/pages/AccountProfile.jsx` | `handlePasswordSubmit` | `changePassword(passForm)` |
| `src/pages/Checkout.jsx` | `handleSubmit` | `processCheckoutOrder(...)` |
| `src/pages/AccountOrders.jsx` | `loadOrders` | `fetchUserOrdersAsync(user.id)` |

**Total funciones asíncronas identificables: 24**

---

## Parte B — Promesas (`Promise` API)

Uso explícito de la API de promesas: creación manual, combinación en paralelo o encadenamiento con `.then()`.

### B.1 Creación manual — `src/utils/asyncHelpers.js`

#### `delay(ms)`
```javascript
return new Promise((resolve) => {
  setTimeout(resolve, ms);
});
```
- **Tipo:** `new Promise`
- **Qué hace:** Espera `ms` milisegundos y resuelve la promesa
- **Usada en:** `catalogService.js`, `orderService.js`

---

### B.2 Combinación en paralelo — `src/utils/asyncHelpers.js`

#### `runParallel(tasks)`
```javascript
return Promise.all(tasks);
```
- **Tipo:** `Promise.all`
- **Qué hace:** Ejecuta varias promesas a la vez y devuelve un array con todos los resultados
- **Disponible para:** tareas que deban correr en paralelo

---

### B.3 Paralelismo en autenticación — `src/services/authService.js`

#### Bloque dentro de `seedUsersIfNeeded()`
```javascript
const users = await Promise.all(
  defaultUsers.map(async (user) => ({
    ...
    password: await hashPassword(user.password),
  })),
);
```
- **Tipo:** `Promise.all` + callbacks `async` en `.map()`
- **Qué hace:** Hashea las contraseñas de admin y cliente **al mismo tiempo** al crear usuarios demo
- **Archivo:** `src/services/authService.js` — función `seedUsersIfNeeded`

---

### B.4 Encadenamiento con `.then()` — `src/context/ProductsContext.jsx`

#### Bloque dentro de `saveProducts(list)`
```javascript
persistCatalogAsync(list).then(() => {
  window.dispatchEvent(new Event('epharma-products-updated'));
});
```
- **Tipo:** `.then()` (sin `await`)
- **Qué hace:** Cuando termina de guardar el catálogo, notifica al resto de la app con un evento personalizado
- **Archivo:** `src/context/ProductsContext.jsx` — función `saveProducts`

---

### B.5 Import dinámico (promesa) — `src/services/orderService.js`

#### Bloque dentro de `fetchUserOrdersAsync(userId)`
```javascript
const { getOrdersByUser } = await import('../utils/orders.js');
```
- **Tipo:** `import()` devuelve una `Promise` de módulo
- **Qué hace:** Carga el módulo de pedidos bajo demanda antes de leer los datos
- **Archivo:** `src/services/orderService.js` — función `fetchUserOrdersAsync`

---

### Resumen de promesas

| # | Mecanismo | Ubicación | Patrón |
|---|-----------|-----------|--------|
| 1 | `new Promise` | `src/utils/asyncHelpers.js` → `delay()` | Creación manual |
| 2 | `Promise.all` | `src/utils/asyncHelpers.js` → `runParallel()` | Paralelo |
| 3 | `Promise.all` | `src/services/authService.js` → `seedUsersIfNeeded()` | Paralelo al sembrar usuarios |
| 4 | `.then()` | `src/context/ProductsContext.jsx` → `saveProducts()` | Encadenamiento |
| 5 | `import()` | `src/services/orderService.js` → `fetchUserOrdersAsync()` | Carga diferida de módulo |

**Total usos explícitos de promesas: 5**

---

## Parte C — Cómo se relacionan

```
┌─────────────────────────────────────────────────────────────┐
│  FUNCIÓN ASÍNCRONA (async/await)                            │
│  Ejemplo: processCheckoutOrder()                            │
│                                                             │
│    await delay(900)  ──────►  PROMESA (new Promise)         │
│    return createOrder()                                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  FUNCIÓN ASÍNCRONA (async/await)                            │
│  Ejemplo: seedUsersIfNeeded()                               │
│                                                             │
│    await Promise.all([...])  ──►  PROMESA (Promise.all)     │
│         └── async map con await hashPassword()              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  FUNCIÓN SÍNCRONA que dispara una promesa                   │
│  Ejemplo: saveProducts() en ProductsContext                 │
│                                                             │
│    persistCatalogAsync(list).then(...)  ──►  PROMESA        │
└─────────────────────────────────────────────────────────────┘
```

### Flujo: checkout completo

```
Checkout.jsx          orderService.js         asyncHelpers.js      orders.js
     │                       │                       │                  │
     │  await process...     │                       │                  │
     ├──────────────────────►│                       │                  │
     │                       │  await delay(900)     │                  │
     │                       ├──────────────────────►│  new Promise     │
     │                       │◄──────────────────────┤                  │
     │                       │  createOrder()        │                  │
     │                       ├─────────────────────────────────────────►│
     │◄──────────────────────┤                       │                  │
```

### Flujo: inicio de la aplicación

```
AuthContext.bootstrap()     authService.seedUsersIfNeeded()
        │                              │
        │  await seedUsersIfNeeded()   │
        ├─────────────────────────────►│
        │                              │  await Promise.all(
        │                              │    defaultUsers.map(async ...)
        │                              │  )
        │◄─────────────────────────────┤
```

---

## Parte D — Conteo para la entrega

| Requisito | Cantidad en el proyecto | Cumple |
|-----------|-------------------------|--------|
| Funciones asíncronas (`async`) | **24** | Sí (mín. 5) |
| Uso de promesas (`Promise` API) | **5** mecanismos distintos | Sí (mín. 5) |

---

## Nota técnica

- El almacenamiento real sigue siendo `localStorage` (síncrono).
- Las funciones `async` y las promesas **simulan** latencia de red, pasarela de pago y lectura diferida, como ocurriría con una API REST o el proxy NGINX `/kevin_gonzalez/api/`.
- Las de **autenticación y seguridad** ya existían en el proyecto; las de **catálogo y pedidos** se añadieron para distribuir el patrón asíncrono en más módulos sin romper la lógica existente.
