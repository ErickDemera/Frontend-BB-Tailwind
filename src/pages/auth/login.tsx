import Head from "next/head";
import { LoginForm } from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/logo-pag-bb.svg" />
        <title>Simulador BB</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon-pagina.svg" />
      </Head>

      <div className="min-h-screen bg-teal-700 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-4">
            <img src="/icon-bb.svg" alt="Logo BB" className="mx-auto w-80" />
          </div>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Iniciar Sesión
          </h2>
          <h6 className="text-center text-gray-500 mb-4">
            BIENVENIDO A LA APLICACION
          </h6>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
