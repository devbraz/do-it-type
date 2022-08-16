import { AxiosResponse } from "axios";
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import { api } from "../services/api";

interface TaskProviderProps {
	children: ReactNode;
}

interface Task {
	id: string;
	title: string;
	description: string;
	userId: string;
	completed: boolean;
}

interface TaskContextData {
	tasks: Task[];
	createTask: (data: Omit<Task, "id">, acessToken: string) => Promise<void>;
	loadTasks: (userId: string, acessToken: string) => Promise<void>;
	deleteTask: (taskId: string, acessToken: string) => Promise<void>;
	updateTask: (
		taskId: string,
		userId: string,
		acessToken: string
	) => Promise<void>;
	searchTask: (taskTitle: string, acessToken: string) => Promise<void>;
	notFound: boolean;
	taskNotFound: string;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

const useTasks = () => {
	const context = useContext(TaskContext);

	if (!context) {
		throw new Error("useTask must be used within an TaskProvider");
	}
	return context;
};

const TaskProvider = ({ children }: TaskProviderProps) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [notFound, setNotFound] = useState(false);
	const [taskNotFound, setTaskNotFound] = useState("");

	const loadTasks = useCallback(async (userId: string, acessToken: string) => {
		try {
			const response = await api.get(`/tasks?userId=${userId}`, {
				headers: {
					Authorization: `Bearer ${acessToken}`,
				},
			});

			setTasks(response.data);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const createTask = useCallback(
		async (data: Omit<Task, "id">, acessToken: string) => {
			api
				.post("/tasks", data, {
					headers: {
						Authorization: `Bearer ${acessToken}`,
					},
				})
				.then((response: AxiosResponse<Task>) =>
					setTasks((oldTasks) => [...oldTasks, response.data])
				)
				.catch((err) => console.log(err));
		},
		[]
	);

	const deleteTask = useCallback(
		async (taskId: string, acessToken: string) => {
			await api
				.delete(`/tasks/${taskId}`, {
					headers: {
						Authorization: `Bearer ${acessToken}`,
					},
				})
				.then((_) => {
					const filteredTasks = tasks.filter((task) => task.id !== taskId);
					setTasks(filteredTasks);
				})
				.catch((err) => console.log(err));
		},
		[tasks]
	);

	const updateTask = useCallback(
		async (taskId: string, userId: string, acessToken: string) => {
			await api
				.patch(
					`/tasks/${taskId}`,
					{ completed: true, userId },
					{
						headers: {
							Authorization: `Bearer ${acessToken}`,
						},
					}
				)
				.then((response) => {
					const filteredTasks = tasks.filter((task) => task.id !== taskId);
					const task = tasks.find((task) => task.id === taskId);

					if (task) {
						task.completed = true;
						setTasks([...filteredTasks, task]);
					}
				})
				.catch((err) => console.log(err));
		},
		[tasks]
	);
	const searchTask = useCallback(
		async (taskTitle: string, acessToken: string) => {
			const response = await api.get(`/tasks?title_like=${taskTitle}`, {
				headers: {
					Authorization: `Bearer ${acessToken}`,
				},
			});
			if (!response.data.length) {
				setTaskNotFound(taskTitle);
				return setNotFound(true);
			}
			setNotFound(false);
			setTasks(response.data);
		},
		[]
	);
	return (
		<TaskContext.Provider
			value={{
				tasks,
				createTask,
				loadTasks,
				deleteTask,
				updateTask,
				searchTask,
				notFound,
				taskNotFound,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

export { useTasks, TaskProvider };
