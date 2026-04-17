import Expense from "../expense/expense.model";

export const getAnalytics = async (user: any, month: string) => {
  const start = new Date(`${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  const match: any = {
    createdAt: { $gte: start, $lt: end }
  };

  if (user.isPersonal) {
    match.userId = user._id;
  } else {
    match.groupId = user.groupId;
  }

  // 🔥 Total spending
  const total = await Expense.aggregate([
    { $match: match },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  // 📊 Category breakdown
  const categories = await Expense.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  return {
    total: total[0]?.total || 0,
    categories
  };
};