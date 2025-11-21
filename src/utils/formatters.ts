import { formatDistanceToNow, format } from "date-fns";

export const formatSalary = (
  min: number,
  max: number,
  currency = "INR",
): string => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${formatter.format(min)} - ${formatter.format(max)}`;
};

export const formatDate = (date: string): string => {
  return format(new Date(date), "MMM dd, yyyy");
};

export const formatRelativeTime = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatEmploymentType = (type: string): string => {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
