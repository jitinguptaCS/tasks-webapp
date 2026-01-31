import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    dueDate: v.optional(v.number()),
    priority: v.optional(v.union(v.literal("high"), v.literal("medium"), v.literal("low"))),
    category: v.optional(v.union(
      v.literal("work"),
      v.literal("personal"),
      v.literal("shopping"),
      v.literal("health"),
      v.literal("other")
    )),
  })
    .index("by_priority", ["priority"])
    .index("by_category", ["category"]),
});
