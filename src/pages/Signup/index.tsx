import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SignupInfo } from "./SignupInfo";
import { SignupForm } from "./SignupForm";
import { GoBackButton } from "./GoBackButton";
import { api } from "../../services/api";
import { ModalSucess } from "../../components/Modal/ModalSucess";
import { ModalError } from "../../components/Modal/ModalError";
import { useHistory } from "react-router-dom";

const signUpSchema = yup.object().shape({
	name: yup.string().required("Nome obrigatório"),
	email: yup.string().required("Email obrigatório").email("Email inválido"),
	password: yup.string().required("Senha obrigatória"),
	confirm_password: yup
		.string()
		.required("Confirmação de senha obrigatória")
		.oneOf([yup.ref("password")], "Senhas diferentes"),
});

interface SignUpData {
	email: string;
	password: string;
	name: string;
}

export const Signup = () => {
	const [loading, setLoading] = useState(false);

	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm({
		resolver: yupResolver(signUpSchema),
	});

	const {
		isOpen: isModalSucessOpen,
		onOpen: onModalSucessOpen,
		onClose: onModalSucessClose,
	} = useDisclosure();
	const {
		isOpen: isModalErrorOpen,
		onOpen: onModalErrorOpen,
		onClose: onModalErrorClose,
	} = useDisclosure();

	const handleSignUp = ({ name, email, password }: SignUpData) => {
		setLoading(true);
		api
			.post("/register", { name, email, password })
			.then((response) => {
				setLoading(false);
				onModalSucessOpen();
			})
			.catch((err) => {
				setLoading(false);
				onModalErrorOpen();
			});
	};

	const isWideVersion = useBreakpointValue({
		base: false,
		md: true,
	});

	const history = useHistory();

	return (
		<>
			<ModalSucess
				buttonMessage="Ir para o login agora"
				message="Seu cadastro deu super certo, <b> vamos-lá </b>"
				secondaryText="Você já pode começar criando <b> suas listas </b> de tarefas agora mesmo..."
				isOpen={isModalSucessOpen}
				onClose={onModalSucessClose}
				onClick={() => history.push("/")}
			/>
			<ModalError
				error="Seu email já está em uso"
				isOpen={isModalErrorOpen}
				onClose={onModalErrorClose}
				secondaryText="Você já pode tentar novamente, <b> clicando </b> no botão acima ou aguarde alguns minutos..."
			/>
			<Flex
				p={["10px 15px", "10px 15px", "0", "0"]}
				justifyContent="center"
				alignItems="center"
				h={["auto", "auto", "100vh", "100vh"]}
				bgGradient={[
					"linear(to-b, purple.800 65%, white 35%)",
					"linear(to-b, purple.800 65%, white 35%)",
					"linear(to-l, purple.800 65%, white 35%)",
					"linear(to-l, purple.800 65%, white 35%)",
				]}
				color="white"
			>
				<Flex
					w={["100%", "100%", "90%", "65%"]}
					justifyContent="center"
					flexDirection={["column", "column", "row", "row"]}
					alignItems="center"
				>
					{isWideVersion ? (
						<>
							<GoBackButton top="75" left="25" />
							<SignupForm
								errors={errors}
								handleSignUp={handleSubmit(() => handleSignUp)}
								loading={loading}
								register={register}
							/>
							<SignupInfo />
						</>
					) : (
						<>
							<GoBackButton top="10" left="75vw" />
							<SignupInfo />
							<SignupForm
								errors={errors}
								handleSignUp={handleSubmit(() => handleSignUp)}
								loading={loading}
								register={register}
							/>
						</>
					)}
				</Flex>
			</Flex>
		</>
	);
};
