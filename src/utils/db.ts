import type { Category, CategoryColor } from "./types"

export const defaultCategoryColors: CategoryColor[] = [
  {
    iconColor: "#8B5CF6",
    iconBgColor: "#312E81",
    textColor: "#8B5CF6",
    hoverBgColor: "rgba(139, 92, 246, 0.05)",
    colorName: "Purple"
  },
  {
    iconColor: "#EC4899",
    iconBgColor: "#831843",
    textColor: "#EC4899",
    hoverBgColor: "rgba(236, 72, 153, 0.05)",
    colorName: "Pink"
  },
  {
    iconColor: "#3B82F6",
    iconBgColor: "#1E3A8A",
    textColor: "#3B82F6",
    hoverBgColor: "rgba(59, 130, 246, 0.05)",
    colorName: "Blue"
  },
  {
    iconColor: "#10B981",
    iconBgColor: "#064E3B",
    textColor: "#10B981",
    hoverBgColor: "rgba(16, 185, 129, 0.05)",
    colorName: "Green"
  },
  {
    iconColor: "#F59E0B",
    iconBgColor: "#92400E",
    textColor: "#F59E0B",
    hoverBgColor: "rgba(245, 158, 11, 0.05)",
    colorName: "Yellow"
  },
  {
    iconColor: "#EF4444",
    iconBgColor: "#7F1D1D",
    textColor: "#EF4444",
    hoverBgColor: "rgba(239, 68, 68, 0.05)",
    colorName: "Red"
  },
  {
    iconColor: "#06B6D4",
    iconBgColor: "#164E63",
    textColor: "#06B6D4",
    hoverBgColor: "rgba(6, 182, 212, 0.05)",
    colorName: "Cyan"
  },
  {
    iconColor: "#6366F1",
    iconBgColor: "#312E81",
    textColor: "#6366F1",
    hoverBgColor: "rgba(99, 102, 241, 0.05)",
    colorName: "Indigo"
  },
  {
    iconColor: "#14B8A6",
    iconBgColor: "#134E4A",
    textColor: "#14B8A6",
    hoverBgColor: "rgba(20, 184, 166, 0.05)",
    colorName: "Teal"
  },
  {
    iconColor: "#F97316",
    iconBgColor: "#7C2D12",
    textColor: "#F97316",
    hoverBgColor: "rgba(249, 115, 22, 0.05)",
    colorName: "Orange"
  }
]


export const defaultCategorys: Category[] = [
  {
    id: 1,
    name: "Food",
    icon: "bx bx-baguette",
    color: defaultCategoryColors[0]
  },
  {
    id: 2,
    name: "Transport",
    icon: "bx bx-bus",
    color: defaultCategoryColors[1]
  },
  {
    id: 3,
    name: "Entertainment",
    icon: "bx bx-film",
    color: defaultCategoryColors[2]
  },
  {
    id: 4,
    name: "Health",
    icon: "bx bx-plus-medical",
    color: defaultCategoryColors[3]
  },
  {
    id: 5,
    name: "Education",
    icon: "bx bxs-school",
    color: defaultCategoryColors[4]
  }
]

export const defaultCateoryIcons = [
  { category: "Finance", icons: ["dollar-circle", "wallet", "credit-card"] },
  { category: "Shopping", icons: ["cart-alt", "gift", "shopping-bag"] },
  { category: "Food and Dining", icons: ["bowl-hot", "coffee-togo", "restaurant"] },
  { category: "Transportation", icons: ["car", "bus", "train"] },
  { category: "Health and Fitness", icons: ["trophy", "dumbbell", "dna"] },
  { category: "Entertainment", icons: ["game", "music", "movie"] },
  { category: "Utilities", icons: ["bulb", "cloud-lightning"] },
  { category: "Communication", icons: ["phone-call", "message", "headphone"] },
  { category: "Security", icons: ["lock"] },
  { category: "Time and Organization", icons: ["timer", "calendar-event", "calendar-check"] },
  { category: "Travel", icons: ["rocket", "globe"] },
  { category: "Goals and Reminders", icons: ["bell-plus", "target-lock"] },
  { category: "Miscellaneous", icons: ["star", "heart-circle", "chip"] }
]
