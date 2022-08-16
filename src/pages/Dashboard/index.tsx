import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";
import { useAuth } from "../../providers/AuthContext";
import { useTasks } from "../../providers/TaskContext";
import { FirstTask } from "./FirstTask";
import { NotFound } from "./NotFound";
import { TasksList } from "./TasksList";

interface Task {
	id: string;
	title: string;
	description: string;
	completed: boolean;
}

export const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const { user, acessToken } = useAuth();
	const { tasks, loadTasks, notFound, taskNotFound } = useTasks();

	const [selectedTask, setSelectedTask] = useState<Task>({} as Task);

	const {
		isOpen: isTaskDetailOpen,
		onOpen: onTaskDetailOpen,
		onClose: onTaskDetailClose,
	} = useDisclosure();

	useEffect(() => {
		loadTasks(user.id, acessToken).then((res) => setLoading(false));
	}, []);

	const handleClick = (task: Task) => {
		setSelectedTask(task);
		onTaskDetailOpen();
	};
	if (notFound) {
		return (
			<NotFound
				isTaskDetailOpen={isTaskDetailOpen}
				onTaskDetailClose={onTaskDetailClose}
				selectedTask={selectedTask}
				taskNotFound={taskNotFound}
			/>
		);
	}
	return (
		<>
			<ModalTaskDetail
				isOpen={isTaskDetailOpen}
				onClose={onTaskDetailClose}
				task={selectedTask}
			/>
			{!loading && !tasks.length ? (
				<FirstTask />
			) : (
				<TasksList handleClick={handleClick} loading={loading} tasks={tasks} />
			)}
		</>
	);
};
