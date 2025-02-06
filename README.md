# Project Aria

## Getting Started
1. Copy all the contents of `.env.example` to `.env`

```bash
cp .env.example .env
```

2. Install all the necessary packages by executing the following command:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. To run in the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next js files
- page.js
- layout.js
- not-found.js
- template.js
- loading.js
- error.js

## Add product to cart
- Implement adding product in cart without auth
- Store this in localstorage (redux persist)
- Requires auth on checkout

## Checkout process
- Create an order, status PENDING => not paid yet
- After payment, also require shipping address, order is confirmed, status => CONFIRMED
- Admin: status => SHIPPED
- Admin: status => DELIVERED
