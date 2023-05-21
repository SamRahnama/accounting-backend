# Accounting Backend

This is a backend application for accounting built with AdonisJS. It provides models and controllers for managing
authentication, brands, products, categories, orders, payments, loans, roles, and users.

## Getting Started

To use this application, you need to have Node.js and a database (MySQL, PostgreSQL, or SQLite) installed. Then, follow
these steps:

1. Clone this repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Create a `.env` file based on the `.env.example` file and set your database credentials and other settings.
4. Run migrations: `node ace migration:run`
5. Start the server: `npm run start`

Now, you can access the API endpoints at `http://localhost:3333`.

## API Endpoints

Here are the available API endpoints (all endpoints are available at `http://localhost:3333/docs` ):

### Authentication

- `POST /api/v1/auth/register`: Register a new user.
- `POST /api/v1/auth/login`: Login with email and password.
- `GET /api/v1/auth/validate`: Get the current auth status.

### Brands

- `GET /api/v1/brands`: List all brands.
- `POST /api/v1/brands`: Create a new brand.
- `GET /api/v1/brands/:id`: Get a brand by ID.
- `PUT /api/v1/brands/:id`: Update a brand by ID.
- `DELETE /api/v1/brands/:id`: Delete a brand by ID.

### Products

- `GET /api/v1/products`: List all products.
- `POST /api/v1/products/storage/:store`: Create a new product with a store id.
- `GET /api/v1/products/:id`: Get a product by ID.
- `PUT /api/v1/products/:product/storage/:store`: Update a product by ID with store id.
- `DELETE /api/v1/products/:id`: Delete a product by ID.

### Stores

- `GET /api/v1/stores`: List all products.
- `POST /api/v1/stores`: Create a new product.
- `GET /api/v1/stores/:id`: Get a product by ID.
- `PUT /api/v1/stores/:id`: Update a product by ID.
- `DELETE /api/v1/stores/:id`: Delete a product by ID.

### Categories

- `GET /api/v1/categories`: List all categories.
- `POST /api/v1/categories`: Create a new category.
- `GET /api/v1/categories/:id`: Get a category by ID.
- `GET /api/v1/categories/children/:id`: Get a category's children by ID.
- `PUT /api/v1/categories/:id`: Update a category by ID.
- `DELETE /api/v1/categories/:id`: Delete a category by ID.

### Orders

- `GET /api/v1/orders`: List all orders.
- `POST /api/v1/orders`: Create a new order.
- `GET /api/v1/orders/:id`: Get an order by ID.
- `PUT /api/v1/orders/:id`: Update an order by ID.
- `DELETE /api/v1/orders/:id`: Delete an order by ID.

### Payments

- `GET /api/v1/payments`: List all payments.
- `POST /api/v1/payments`: Create a new payment.
- `GET /api/v1/payments/:id`: Get a payment by ID.
- `PUT /api/v1/payments/:id`: Update a payment by ID.
- `DELETE /api/v1/payments/:id`: Delete a payment by ID.

### Loans

- `GET /api/v1/loans`: List all loans.
- `POST /api/v1/loans`: Create a new loan.
- `GET /api/v1/loans/:id`: Get a loan by ID.
- `PUT /api/v1/loans/:id`: Update a loan by ID.
- `DELETE /api/v1/loans/:id`: Delete a loan by ID.

### Roles

- `GET /api/v1/roles`: List all roles.
- `POST /api/v1/roles`: Create a new role.
- `GET /api/v1/roles/:id`: Get a role by ID.
- `PUT /api/v1/roles/:id`: Update a role by ID.
- `DELETE /api/v1/roles/:id`: Delete a role by ID.

### Users

- `GET /api/v1/users`: List all users.
- `POST /api/v1/users`: Create a new user.
- `GET /api/v1/users/:id`: Get a user by ID.
- `PUT /api/v1/users/:id`: Update a user by ID.
- `DELETE /api/v1/users/:id`: Delete a user by ID.

## Validation

All API endpoints have validators to ensure that the input data is valid. If validation fails, the API will return a 422
Unprocessable Entity status code with an error message.

## Security

This application uses opaque access token authentication to protect API endpoints. To access protected endpoints, you
need to include a valid opaque access token in the Authorization header of your requests. The token is obtained by
logging in with email and password.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
