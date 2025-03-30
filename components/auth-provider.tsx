"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth"

// Firebase configuration with your provided values
const firebaseConfig = {
  apiKey: "AIzaSyDYp0gSRs3KzNFiRzn2wBTeUR9cjGeVPsM",
  authDomain: "g4m3ify.firebaseapp.com",
  projectId: "g4m3ify",
  storageBucket: "g4m3ify.firebasestorage.app",
  messagingSenderId: "91344613535",
  appId: "1:91344613535:web:724186f6628afa1e3432aa",
  measurementId: "G-DX833EFWRK",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUserProfile: (profile: { displayName?: string; photoURL?: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    await signOut(auth)
  }

  const updateUserProfile = async (profile: { displayName?: string; photoURL?: string }) => {
    if (!auth.currentUser) throw new Error("No user logged in")
    await updateProfile(auth.currentUser, profile)
    setUser({ ...auth.currentUser })
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

