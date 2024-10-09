"use client"
import "./globals.css"
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ghost } from "lucide-react";
import CountDownTimer from "@/components/Count-down";

export default function Home() {
  const [cont, setCount] = useState()
  return (
    <main className="flex min-h-screen  items-center bg-slate-200 justify-center dark:bg-gray-900">
      <CountDownTimer />
    </main>
  );
}
