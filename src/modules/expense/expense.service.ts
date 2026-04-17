import Expense from "./expense.model";
import User from "../user/user.model";

// ➕ Create Expense
export const createExpense = async (userId: string, data: any) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  let status: "pending" | "approved" | "auto" = "auto";

  if (!user.isPersonal) {
    status = "pending";
  }

  const expense = await Expense.create({
    ...data,
    userId,
    groupId: user.groupId || null,
    status,
  });

  return expense;
};

// 📥 Get Expenses
export const getExpenses = async (user: any, query: any) => {
  const filter: any = {};

  // 👤 Personal vs Group
  if (user.isPersonal) {
    filter.userId = user._id;
  } else {
    filter.groupId = user.groupId;
  }

  // 📅 Month filter
  if (query.month) {
    const start = new Date(`${query.month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    filter.createdAt = {
      $gte: start,
      $lt: end,
    };
  }

  // 🏷 Category filter
  if (query.category && query.category !== "all") {
    filter.category = query.category;
  }

  // 🔍 Search (category + description)
  if (query.search) {
    filter.$or = [
      { category: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
    ];
  }

  return await Expense.find(filter).sort({ createdAt: -1 });
};

// ✏️ Update Expense
export const updateExpense = async (
  expenseId: string,
  userId: string,
  data: any
) => {
  const expense = await Expense.findById(expenseId);

  if (!expense) throw new Error("Expense not found");

  if (expense.userId.toString() !== userId) {
    throw new Error("Not authorized");
  }

  return await Expense.findByIdAndUpdate(expenseId, data, {
    new: true,
  });
};

// ❌ Delete Expense
export const deleteExpense = async (id: string, userId: string) => {
  const expense = await Expense.findById(id);

  if (!expense) {
    throw new Error("Expense not found");
  }

  // ✅ FIX HERE
  if (expense.userId.toString() !== userId.toString()) {
    throw new Error("Not authorized");
  }

  await expense.deleteOne();

  return { message: "Expense deleted" };
};

// ✅ Approve Expense
export const approveExpense = async (
  id: string,
  adminId: string,
  signature: string
) => {
  const expense = await Expense.findById(id);

  if (!expense) throw new Error("Expense not found");

  expense.status = "approved";
  expense.approvedBy = adminId;
  expense.signature = signature;

  await expense.save();

  return expense;
};

// ❌ Reject Expense
export const rejectExpense = async (id: string, adminId: string) => {
  const expense = await Expense.findById(id);

  if (!expense) throw new Error("Expense not found");

  expense.status = "rejected";
  expense.rejectedBy = adminId;

  await expense.save();

  return expense;
};