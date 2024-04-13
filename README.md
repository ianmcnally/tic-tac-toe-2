Calendar App

Implement a clone of Google Calendar’s day view that allows creating, editing, and deleting events.

Specifications:

1. Show date for the day at the top, as well as 24 1-hour blocks in one column. Labels for hours should be displayed on the left beside each block.

2. Events are rectangles that span one or multiple blocks.

  - Assume event start/end times are EXACTLY on the hour (eg. 2pm-5pm, but don’t need to handle 2:03pm-5:07pm).

3. Add a header below today’s date with 3 inputs at the top of the page. The header has 3 inputs (start time, end time, name) and a button to save.

  - The header is always visible.

  - Saving creates the event and clears the input fields.

  - The start time input’s default value is populated by the hour corresponding to which empty cell you clicked on.
4. Clicking an existing event should autofill the header inputs to edit event details (start time, end time, and name only)

  - The start/end/name inputs is default populated by the event’s current details.

  - On save button click, calendar updates.

  - When editing an existing event, there should be a button to delete the event.

  - Deleting an event clears the input fields.

5. Assume no events overlap. Each hour block will have <= 1 event.

Notes:

- Primary goal is functionality, not styling. Don’t worry about copying Google Calendar styles.

- It may be easier to use number instead of Date to represent time

General:

- You can use Google to look up documentation, articles, and code examples.

- You may install and use libraries for data fetching, styling, and state management.

- TypeScript is not required.

# Dev

`pnpm webpack serve`
