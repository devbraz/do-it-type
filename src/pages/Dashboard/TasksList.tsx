import { Box, Grid } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { CardSkeleton } from "../../components/Skeleton/CardSkeleton";

interface Task {
	id: string;
	title: string;
	description: string;
	completed: boolean;
}

interface TasksListProps {
	loading: boolean;
	tasks: Task[];
	handleClick: (task: Task) => void;
}

export const TasksList = ({ loading, tasks, handleClick }: TasksListProps) => {
	return (
		<Box>
			<Header />
			<SearchBox />
			<Grid
				w="100%"
				templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
				gap={10}
				px="8"
				mt="8"
			>
				{loading ? (
					<CardSkeleton repeatCount={9} />
				) : (
					tasks.map((task) => <Card task={task} onClick={handleClick} />)
				)}
			</Grid>
		</Box>
	);
};
