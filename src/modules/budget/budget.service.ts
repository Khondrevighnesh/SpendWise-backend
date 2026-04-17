import Budget from "./budget.model";

export const setBudget = async (
  userId: string,
  amount: number,
  month: string
) => {
  const budget = await Budget.findOneAndUpdate(
    { userId, month }, // 🔥 UNIQUE KEY
    { amount },
    { new: true, upsert: true } // 🔥 CREATE if not exists
  );

  return budget;
};

export const getBudget = async (userId: string, month: string) => {
  return await Budget.findOne({ userId, month });
};