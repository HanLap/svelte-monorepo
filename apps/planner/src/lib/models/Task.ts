import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const TaskSchema = z.object({
	id: zfd.numeric(z.number()),
	name: z.string(),
	plannedStart: zfd.numeric(z.number()),
	plannedEnd: zfd.numeric(z.number()),
	actualStart: zfd.numeric(z.number().optional()),
	actualEnd: zfd.numeric(z.number().optional()),
});

export type Task = z.infer<typeof TaskSchema>;
