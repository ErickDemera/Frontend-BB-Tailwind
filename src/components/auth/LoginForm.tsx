import { useState } from "react";
import { useRouter } from "next/router";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = 
  
  
  useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    router.push("/simulador/productos/home");
  };

  return (
    <form onSubmit={handleSubmit} className="text-gray-800">
      <div className="mb-5">
        <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700">
          Usuario
        </label>
        <input
          id="emailInput"
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="passwordInput"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none"
      >
        Iniciar sesión
      </button>
    </form>
  );
};
