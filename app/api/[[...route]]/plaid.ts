import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";
import { z } from "zod";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_TOKEN,
      "PLAID-SECRET": process.env.PLAID_SECRET_TOKEN,
    },
  },
});

const client = new PlaidApi(configuration);

const app = new Hono()

  .post("/create-link-token", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Not authenticated" }, 401);
    }

    const token = await client.linkTokenCreate({
      user: {
        client_user_id: auth.userId,
      },
      client_name: "Personal Finance",
      products: [Products.Transactions],
      country_codes: [CountryCode.Gb],
      language: "en",
    });

    return c.json({ data: token.data.link_token }, 200);
  })
  .post(
    "/exchange-public-token",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        publicToken: z.string(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);

      const { publicToken} = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Not authenticated" }, 401);
      }

      const exchangeToken = await client.itemPublicTokenExchange({
        public_token: publicToken,
      });
      return c.json({ data: exchangeToken.data.access_token }, 200);
    }
  );
export default app;
