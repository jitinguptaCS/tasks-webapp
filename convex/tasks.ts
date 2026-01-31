import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const priorityValidator = v.union(
  v.literal("high"),
  v.literal("medium"),
  v.literal("low")
);

const categoryValidator = v.union(
  v.literal("work"),
  v.literal("personal"),
  v.literal("shopping"),
  v.literal("health"),
  v.literal("other")
);

export const list = query({
  args: {
    category: v.optional(categoryValidator),
    sortBy: v.optional(v.union(v.literal("priority"), v.literal("dueDate"))),
  },
  handler: async (ctx, args) => {
    let tasks;

    if (args.category) {
      tasks = await ctx.db
        .query("tasks")
        .withIndex("by_category", (q) => q.eq("category", args.category))
        .collect();
    } else {
      tasks = await ctx.db.query("tasks").collect();
    }

    // Apply defaults for legacy tasks
    const tasksWithDefaults = tasks.map((task) => ({
      ...task,
      priority: task.priority ?? "medium",
      category: task.category ?? "other",
    }));

    if (args.sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      tasksWithDefaults.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (args.sortBy === "dueDate") {
      tasksWithDefaults.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate - b.dueDate;
      });
    }

    return tasksWithDefaults;
  },
});

export const add = mutation({
  args: {
    text: v.string(),
    priority: priorityValidator,
    category: categoryValidator,
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: false,
      priority: args.priority,
      category: args.category,
      dueDate: args.dueDate,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    text: v.optional(v.string()),
    priority: v.optional(priorityValidator),
    category: v.optional(categoryValidator),
    dueDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    if (Object.keys(filteredUpdates).length > 0) {
      await ctx.db.patch(id, filteredUpdates);
    }
  },
});

export const toggle = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (task) {
      await ctx.db.patch(args.id, { isCompleted: !task.isCompleted });
    }
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
