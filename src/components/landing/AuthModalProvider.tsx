"use client";

import { createContext, useState, ReactNode } from "react";
import AuthModal from "@/components/landing/AuthModal";

type AuthModalContextType = {
  openModal: (mode: "login" | "signup") => void;
  closeModal: () => void;
};

export const AuthModalContext = createContext<AuthModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export default function AuthModalProvider({ children }: { children: ReactNode }) {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: "login" | "signup" }>({
    isOpen: false,
    mode: "login",
  });

  const openModal = (mode: "login" | "signup") => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeModal = () => {
    setAuthModal({ isOpen: false, mode: "login" });
  };

  return (
    <AuthModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AuthModal isOpen={authModal.isOpen} onClose={closeModal} mode={authModal.mode} />
    </AuthModalContext.Provider>
  );
}
