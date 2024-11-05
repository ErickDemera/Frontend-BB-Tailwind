import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FcBarChart,
  FcCheckmark,
  FcCurrencyExchange,
  FcImport,
  FcSupport,
  FcPortraitMode,
} from "react-icons/fc";

export const Header: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showCatalogoSubMenu, setShowCatalogoSubMenu] = useState(false);
  const [showConfiguracionSubMenu, setShowConfiguracionSubMenu] =
    useState(false);

  const adminMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null); // Añadir ref para el menú de usuario

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        adminMenuRef.current &&
        !adminMenuRef.current.contains(event.target as Node)
      ) {
        setShowAdminMenu(false);
        setShowCatalogoSubMenu(false);
        setShowConfiguracionSubMenu(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false); // Cierra el menú de usuario
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  return (
    <header>
      <nav className="bg-[#229fa5] p-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#home">
            <img src="/logo-bb.png" alt="Logo" className="h-10" />
          </Link>
          <div className="relative" ref={userMenuRef}>
            {" "}
            {/* Usar el ref aquí */}
            <button
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="flex items-center text-white focus:outline-none"
            >
              <span className="mr-2">Erick Demera</span>
              <FcPortraitMode className="text-2xl" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg">
                <Link href="/perfil">
                  <button className="flex items-center p-2 w-full hover:bg-gray-100 text-black">
                    <FcPortraitMode className="mr-2" />
                    Perfil
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 w-full hover:bg-gray-100 text-black"
                >
                  <FcImport className="mr-2" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Barra de navegación principal */}
      <nav className="bg-[#D3E9ED] p-2">
        <div className="container mx-auto flex justify-start space-x-4">
          <div className="flex justify-center items-center">
            <button className="text-black font-bold">Seguridad</button>
          </div>

          {/* Administración Dropdown */}
          <div
            className="relative flex justify-center items-center"
            ref={adminMenuRef}
          >
            <button
              className="text-black font-bold"
              onClick={() => setShowAdminMenu((prev) => !prev)}
            >
              Administración
            </button>
            {showAdminMenu && (
              <div className="absolute top-full mt-2 bg-white shadow-md rounded-lg w-40 z-20">
                {/* Submenú Catálogo */}
                <div className="relative">
                  <button
                    className="flex items-center px-4 py-2 text-black hover:bg-gray-100 w-full"
                    onClick={() => {
                      setShowCatalogoSubMenu((prev) => !prev);
                      setShowConfiguracionSubMenu(false); // Cierra el submenú de Configuración
                    }}
                  >
                    <FcBarChart className="mr-2" />
                    Catálogo
                  </button>
                  {showCatalogoSubMenu && (
                    <div className="absolute left-full top-0 mt-0 bg-white shadow-md rounded-lg w-40 z-30">
                      <Link
                        href="/simulador/productos"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        <FcCheckmark className="mr-2" />
                        Productos
                      </Link>
                      <Link
                        href="/simulador/segmentos"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        <FcCheckmark className="mr-2" />
                        Segmento
                      </Link>
                      <Link
                        href="/simulador/plazo"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        <FcCheckmark className="mr-2" />
                        Plazo
                      </Link>
                    </div>
                  )}
                </div>

                {/* Submenú Configuración */}
                <div className="relative">
                  <button
                    className="flex items-center px-4 py-2 text-black hover:bg-gray-100 w-full"
                    onClick={() => {
                      setShowConfiguracionSubMenu((prev) => !prev);
                      setShowCatalogoSubMenu(false); // Cierra el submenú de Catálogo
                    }}
                  >
                    <FcSupport className="mr-2" />
                    Configuración
                  </button>
                  {showConfiguracionSubMenu && (
                    <div className="absolute left-full top-0 mt-0 bg-white shadow-md rounded-lg w-40 z-30">
                      <Link
                        href="/configuracion/tasa"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        <FcCheckmark className="mr-2" />
                        Tasa
                      </Link>
                      <Link
                        href="/configuracion/pit"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        <FcCheckmark className="mr-2" />
                        Pit
                      </Link>
                      <Link
                        href="/configuracion/provision"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        <FcCheckmark className="mr-2" />
                        Provisión
                      </Link>
                      <Link
                        href="/configuracion/ingreso"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        <FcCheckmark className="mr-2" />
                        Ingreso
                      </Link>
                      <Link
                        href="/configuracion/costo"
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        <FcCheckmark className="mr-2" />
                        Costo
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Simulador Button */}
          <Link href="/simulador/simulacion/rentabilidadform">
            <button className="flex items-center bg-[#229fa5] text-white font-bold rounded px-4 py-2 hover:bg-[#1d8b91] transition duration-200 ease-in-out">
              <FcCurrencyExchange className="mr-2 text-2xl" />
              Simulador
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
