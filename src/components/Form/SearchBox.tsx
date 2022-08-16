import { useDisclosure } from "@chakra-ui/core";
import { Button, Center, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../providers/AuthContext";
import { useTasks } from "../../providers/TaskContext";
import { theme } from "../../styles/theme";
import { ModalCreateTask } from "../Modal/ModalCreateTask";
import { Input } from "./input";

interface SearchData {
	title: string;
}

export const SearchBox = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const { searchTask } = useTasks();
	const { acessToken } = useAuth();
	const handleSearch = ({ title }: SearchData) => {
		searchTask(title, acessToken);
	};
	const { register, handleSubmit } = useForm();
	return (
		<>
			<ModalCreateTask isOpen={isOpen} onClose={onClose} />
			<Flex
				mt="6"
				w="100%"
				px={["4", "8"]}
				py="2"
				pb="6"
				borderBottomWidth="1px"
				borderColor="gray.50"
				flexDir={["column", "column", "row", "row"]}
			>
				<Flex as="form" onSubmit={handleSubmit(() => handleSearch)}>
					<Input
						placeholder="Pesquisar por tarefa"
						w={["100%", "100%", "35vw"]}
						{...register("title")}
					/>
					<Center
						borderRadius="8px"
						as="button"
						ml="2"
						w="65px"
						h="60px"
						fontSize="2xl"
						bg="purple.600"
					>
						<FaSearch color={theme.colors.white} />
					</Center>
				</Flex>
				<Button
					bg="purple.500"
					color="white"
					px="16"
					ml={["0", "0", "4"]}
					h="60px"
					borderRadius="8px"
					onClick={onOpen}
					mt={["4", "4", "0"]}
					_hover={{ bg: "purple.600" }}
				>
					Adicionar uma nova tarefa
				</Button>
			</Flex>
		</>
	);
};
