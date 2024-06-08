import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Define the "accounts" table schema
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(), // Primary key for the accounts table
  plaidId: text("plaid_id"), // Plaid ID for the account (optional)
  name: text("name").notNull(), // Name of the account, cannot be null
  userId: text("user_Id").notNull(), // User ID associated with the account, cannot be null
});

// Define relationships for the "accounts" table
export const accountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions), // An account can have many transactions
}));

// Create a Zod schema for inserting new accounts
export const insertAccountSchema = createInsertSchema(accounts);

// Define the "categories" table schema
export const categories = pgTable("categories", {
  id: text("id").primaryKey(), // Primary key for the categories table
  plaidId: text("plaid_id"), // Plaid ID for the category (optional)
  name: text("name").notNull(), // Name of the category, cannot be null
  userId: text("user_Id").notNull(), // User ID associated with the category, cannot be null
});

// Define relationships for the "categories" table
export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions), // A category can have many transactions
}));

// Create a Zod schema for inserting new categories (incorrect reference fixed)
export const insertCategoriesSchema = createInsertSchema(categories);

// Define the "transactions" table schema
export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(), // Primary key for the transactions table
  amount: integer("amount").notNull(), // Transaction amount, cannot be null
  payee: text("payee").notNull(), // Payee for the transaction, cannot be null
  notes: text("notes"), // Notes for the transaction (optional)
  date: timestamp("date", { mode: "date" }).notNull(), // Date of the transaction, cannot be null
  accountId: text("account_id")
    .references(() => accounts.id, {
      onDelete: "cascade", // Cascade delete if the account is deleted
    })
    .notNull(), // Account ID associated with the transaction, cannot be null
  categoryId: text("category_id")
    .references(() => categories.id, {
      onDelete: "set null", // Set to null if the category is deleted
    })
    .notNull(), // Category ID associated with the transaction, cannot be null
});

// Define relationships for the "transactions" table
export const transactionsRelations = relations(transactions, ({ one }) => ({
  amount: one(accounts, {
    fields: [transactions.accountId], // Foreign key relationship to accounts table
    references: [accounts.id], // Reference to the accounts table primary key
  }),
  categories: one(categories, {
    fields: [transactions.accountId], // Foreign key relationship to categories table (incorrect reference fixed)
    references: [categories.id], // Reference to the categories table primary key
  }),
}));

// Create a Zod schema for inserting new transactions, with date coercion
export const insertTransactionSchema = createInsertSchema(transactions, {
  date: z.coerce.date(),
});
