import { Grid, Heading, VStack, Text, Box, Button } from "@chakra-ui/react"
import { DeepMap, FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa"
import { Input } from "../../components/Form/input"


interface SignUpData {
  handleSignUp: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
  loading: boolean;
}

export const SignupForm = ({
  handleSignUp,
  errors,
  register,
  loading,
}: SignUpData) => {

  return (

    <Grid
      onSubmit={handleSignUp}
      as='form'
      mt={['4', '4', '0']}
      w={['100%', '100%', '40%', '40%']}
      p='40px 25px'
      border='3px solid'
      borderColor='gray.100'
      bg='white'
      color='gray.900'
    >
      <Heading size='lg'> Crie sua conta</Heading>
      <VStack mt='6' spacing='5'>
        <Box w='100%'>
          <Input
            placeholder="Digite seu nome"
            icon={FaEnvelope}
            label='Nome'
            error={errors.name}
            {...register('name')}
          />
          <Input
            placeholder="Digite seu Email"
            icon={FaEnvelope}
            label='Email'
            type='email'
            error={errors.email}
            {...register('email')}
          />
          {!errors.email && (
            <Text
              ml='1'
              mt='1'
              color='gray.300'
            >
              Exemplo: nome@email.com
            </Text>
          )}
        </Box>
        <Input
          label="Senha"
          placeholder="Digite sua senha"
          icon={FaLock}
          error={errors.password}
          {...register('password')}
        />
        <Input
          label="Confirmação de senha"
          placeholder="Confirme sua senha"
          icon={FaLock}
          error={errors.confirm_password}
          {...register('confirm_password')}
        />
      </VStack>
      <Button
        mt='8'
        isLoading={loading}
        bg='purple.800'
        w='100%'
        color='white'
        h='60px'
        borderRadius='8px'
        _hover={{
          bg: 'purple.900',
        }}
        type="submit"
      >
        Finalizar cadastro
      </Button>
    </Grid>
  )
}