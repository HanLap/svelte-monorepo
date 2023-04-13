import type { Task } from './models/Task';
import type { TaskStep } from './models/TaskStep';

/**
 * Transforms a task into a list of task steps.
 *
 * @param task
 * @returns
 */
export function getTaskSteps(
	task: Task,
	calendarWeek: number,
	planStart: number,
	planEnd: number
): TaskStep[] {
	const taskSteps: TaskStep[] = [];

	const weeksUntilStart =
		(task.actualStart ? Math.min(task.actualStart, task.plannedStart) : task.plannedStart) -
		planStart;
	taskSteps.push({
		type: 'NONE',
		weeks: weeksUntilStart,
	});

	if (task.actualStart) {
		if (task.actualStart < task.plannedStart) {
			taskSteps.push({
				type: 'EARLY',
				weeks: task.plannedStart - task.actualStart,
			});
		}
	}

	taskSteps.push({
		type: 'EXPECTED',
		weeks: task.plannedEnd,
	});

	if (task.actualEnd) {
		if (task.actualEnd > task.plannedEnd) {
			taskSteps.push({
				type: 'LATE',
				weeks: task.actualEnd - task.plannedEnd,
			});
		}
	} else if (calendarWeek >= (task.plannedStart + task.plannedEnd)) {
		taskSteps.push({
			type: 'LATE',
			weeks: calendarWeek - (task.plannedStart + task.plannedEnd),
		});
	}

	taskSteps.push({
		type: 'NONE',
		weeks: planEnd - task.plannedStart - task.plannedEnd,
	});

	return taskSteps;
}
