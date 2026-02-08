import { index, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { ticketPriorityEnum, ticketStatusEnum } from "./enums";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const supportTickets = pgTable(
    "support_tickets",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        assignedTo: uuid("assigned_to").references(() => users.id, {
            onDelete: "set null",
        }),

        ticketNumber: varchar("ticket_number", { length: 50 })
            .notNull()
            .unique(),
        subject: varchar("subject", { length: 255 }).notNull(),
        description: text("description").notNull(),

        status: ticketStatusEnum("status").notNull().default("open"),
        priority: ticketPriorityEnum("priority").notNull().default("medium"),

        createdAt: timestamps.createdAt,
        updatedAt: timestamps.updatedAt,
    },
    table => [
        index("idx_support_tickets_user_id").on(table.userId),
        index("idx_support_tickets_assigned_to").on(table.assignedTo),
        index("idx_support_tickets_status").on(table.status),
        index("idx_support_tickets_priority").on(table.priority),
        index("idx_support_tickets_created_at").on(table.createdAt),
    ]
);

export const ticketMessages = pgTable(
    "ticket_messages",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        ticketId: uuid("ticket_id")
            .notNull()
            .references(() => supportTickets.id, { onDelete: "cascade" }),
        senderId: uuid("sender_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),

        message: text("message").notNull(),
        attachmentUrl: text("attachment_url"),

        createdAt: timestamps.createdAt,
    },
    table => [
        index("idx_ticket_messages_ticket_id").on(table.ticketId),
        index("idx_ticket_messages_sender_id").on(table.senderId),
    ]
);

export type SupportTicket = typeof supportTickets.$inferSelect;
export type NewSupportTicket = typeof supportTickets.$inferInsert;
export type TicketMessage = typeof ticketMessages.$inferSelect;
export type NewTicketMessage = typeof ticketMessages.$inferInsert;
