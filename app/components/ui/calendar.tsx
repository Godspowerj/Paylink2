import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 pb-5", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-2 pb-2 relative items-center",
        caption_label: "text-sm font-bold text-gray-900 mx-2",
        nav: "space-x-1 flex items-center bg-gray-50 rounded-lg p-0.5",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent px-0 py-0 border-none shadow-none text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
        ),
        nav_button_previous: "absolute left-2 z-10",
        nav_button_next: "absolute right-2 z-10",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full mb-3",
        head_cell:
          "text-gray-400 rounded-md w-9 font-medium text-[0.8rem]",
        row: "flex w-full mt-2 gap-1",
        cell: "h-9 w-9 text-center text-sm p-0 m-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-medium text-gray-600 aria-selected:opacity-100 hover:bg-gray-100 rounded-full transition-colors"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white rounded-full shadow-sm font-bold",
        day_today: "bg-gray-100 text-gray-900 rounded-full",
        day_outside:
          "day-outside text-gray-300 opacity-50 aria-selected:bg-blue-600/50 aria-selected:text-white aria-selected:opacity-80",
        day_disabled: "text-gray-300 opacity-50",
        day_range_middle:
          "aria-selected:bg-blue-50 aria-selected:text-blue-600 rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
