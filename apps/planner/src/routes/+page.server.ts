import { SAVE_FILE, STATIC } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import fs from 'fs/promises';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const isStatic = STATIC === 'true';

const TaskSchema = z.object({
	id: zfd.numeric(z.number()),
	name: z.string(),
	plannedStart: zfd.numeric(z.number()),
	plannedEnd: zfd.numeric(z.number()),
	actualStart: zfd.numeric(z.number().optional()),
	actualEnd: zfd.numeric(z.number().optional()),
});
const FormSchema = zfd.formData({
	tasks: z.array(TaskSchema),
});

type Task = z.infer<typeof TaskSchema>;

type Plan = {
	start: number;
	end: number;
	tasks: Task[];
	deadline?: string;
};

async function loadPlan(fetchs?: typeof fetch): Promise<Plan> {
	if (isStatic && fetchs) {
		const res = await fetchs("/plan.json");
		return res.json();
	}

	try {
		return JSON.parse(await fs.readFile(SAVE_FILE, 'utf-8'));
	} catch (e) {
		return {
			start: 0,
			end: 0,
			tasks: [],
		};
	}
}

async function savePlan(plan: Plan) {
	if (isStatic) {
		return;
	}

	for (let task of plan.tasks) {
		if (task.id) {
			continue;
		}
		let id = 0;
		while (plan.tasks.reduce((acc, t) => acc || t.id === id, false)) {
			id = Math.floor(Math.random() * 1_000_000);
		}
		task.id = id;
	}

	return fs.writeFile(SAVE_FILE, JSON.stringify(plan, undefined, 2));
}

export async function load({fetch}) {
	const plan = await loadPlan(fetch);

	return {
		plan,
	};
}

export const actions = {
	async updatePlan({ request }) {
		if (isStatic) {
			return;
		}

		const data = await request.formData();
		const start = parseInt(data.get('start') as string);
		const end = parseInt(data.get('end') as string);

		const plan = await loadPlan();

		await savePlan({ ...plan, start, end });
	},
	async updateTasks({ request }) {
		if (isStatic) {
			return;
		}

		const result = FormSchema.safeParse(await request.formData());
		if (!result.success) {
			return fail(400, { ...result.error });
		}

		const data = result.data;

		const plan = await loadPlan();

		await savePlan({ ...plan, tasks: data.tasks });
	},
	async addTask({ request }) {
		if (isStatic) {
			return;
		}

		const result = FormSchema.safeParse(await request.formData());
		if (!result.success) {
			return fail(400, { ...result.error });
		}

		const data = result.data;

		const plan = await loadPlan();

		let id = 0;
		while (plan.tasks.reduce((acc, t) => acc || t.id === id, false)) {
			id = Math.floor(Math.random() * 1_000_000);
		}

		const newTask: Task = {
			id,
			name: 'new Task',
			plannedStart: 0,
			plannedEnd: 0,
			actualStart: undefined,
			actualEnd: undefined,
		};

		await savePlan({ ...plan, tasks: [...data.tasks, newTask] });
	},
	async deleteTask({ url, request }) {
		if (isStatic) {
			return;
		}

		const result = FormSchema.safeParse(await request.formData());
		if (!result.success) {
			return fail(400, { ...result.error });
		}

		const data = result.data;

		const id = parseInt(url.searchParams.get('id') ?? '');

		if (!id) {
			return fail(400, { noId: true });
		}

		const plan = await loadPlan();

		await savePlan({
			...plan,
			tasks: data.tasks.filter((t) => t.id !== id),
		});
	},
};
