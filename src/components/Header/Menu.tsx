import {
	Box,
	Center,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Heading,
	theme,
	Text,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/AuthContext";
import { FiLogOut } from "react-icons/fi";

interface MenuProps {
	isOpen: boolean;
	onClose: () => void;
}

export const Menu = ({ isOpen, onClose }: MenuProps) => {
	const { user, signOut } = useAuth();

	return (
		<Drawer isOpen={isOpen} placement="top" onClose={onClose}>
			<DrawerOverlay mt="8vh" />
			<DrawerContent ml="auto" mt="80px" w={["450px", "350px"]}>
				<DrawerCloseButton />
				<DrawerHeader
					borderBottomWidth="1px"
					borderColor="gray.50"
					color="gray.400"
				>
					{user.name}
				</DrawerHeader>

				<DrawerBody>
					<Flex align="center" onClick={signOut} _hover={{ cursor: "pointer" }}>
						<Center
							w="60px"
							h="60px"
							bg="red.600"
							fontSize="2xl"
							borderRadius="md"
						>
							<FiLogOut color={theme.colors.white} />
						</Center>
						<Box>
							<Heading as="h2" fontSize="lg">
								Sair da minha conta
							</Heading>
							<Text color="gray.300" fontSize="sm">
								Sair da minha conta agora
							</Text>
						</Box>
					</Flex>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
