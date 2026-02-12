//Local Mission storage array - Gavin
export async function getAllMissions() {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        {
          id: "m1",
          title: "Plant a Tree",
          description: "Plant one native tree in your area.",
          category: "Nature",
          points: 25,
          emoji: "🌳",
        },
        {
          id: "m2",
          title: "Bike to Work",
          description: "Use a bike for your commute today.",
          category: "Transport",
          points: 15,
          emoji: "🚲",
        },
        {
          id: "m3",
          title: "Recycle Properly",
          description: "Sort your recyclables correctly this week.",
          category: "Household",
          points: 10,
          emoji: "♻️",
        },
        {
          id: "m4",
          title: "Community Cleanup",
          description: "Join a local cleanup event.",
          category: "Community",
          points: 30,
          emoji: "🧹",
        },
        {
          id: "m5",
          title: "Energy Audit",
          description: "Perform a home energy audit.",
          category: "Household",
          points: 20,
          emoji: "💡",
        },
        {
          id: "m6",
          title: "Support Local Farm",
          description: "Buy produce from a local farm.",
          category: "Shopping",
          points: 12,
          emoji: "🧺",
        },
      ]);
    }, 120);
  });
}
