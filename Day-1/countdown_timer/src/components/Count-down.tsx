"use client"
import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CountDownTimer() {
  const [duration, setDuration] = useState<number | string>("")
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [active, setActive] = useState<boolean>(false)
  const [pause, setPause] = useState<boolean>(false)
  const TimerRef =  useRef<NodeJS.Timeout | null>(null)

  function setTimeDuration(){
    if(typeof duration === "number" && duration > 0){
      setTimeLeft(duration)
    }
      setActive(false)
      setPause(false)

    }
    
    function setTimeFormate(time:number){
       const hours = Math.floor(time/(60*60))
        const minutes = Math.floor((time % (60*60))/60)
        const seconds = time % 60
        return(
          hours > 0 ?  `
          ${ String(hours).padStart(2,"0")} : ${ String(minutes).padStart(2,"0")} : ${String(seconds).padStart(2,"0")}`
          :
          `${ String(minutes).padStart(2,"0")} : ${String(seconds).padStart(2,"0")}`
        )
        
       
    }

    function startCountDown(){
      if(timeLeft > 0){
        setActive(true)
        setPause(false)
      }
    }

    function pauseCountDown(){
        setPause(true)
        setActive(false)
        if(TimerRef.current){
          clearInterval(TimerRef.current)
        }
    }

    function resetCountDown(){
      if(typeof duration === "number" && duration > 0){
        setTimeLeft(duration)
      }
      setActive(false)
      setPause(false)
      if(TimerRef.current) clearInterval(TimerRef.current)
      
    }
  
  useEffect(()=>{
    if(active && !pause){
    TimerRef.current = setInterval(()=>{
        setTimeLeft((prevTime)=>{
          if(prevTime < 1){
            clearInterval(TimerRef.current!)
            return prevTime
          }
          return prevTime -1
        })
      },1000)

      
    }

    return ()=>{
      if(TimerRef.current)
      clearInterval(TimerRef.current)
    }
    
  },[timeLeft, active])
  

  return (
  
    <main className="flex min-h-screen  items-center bg-slate-200 justify-center dark:bg-gray-900">
      <div className=" max-w-md w-screen dark:bg-gray-800 min-h-80 border bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-center font-bold text-3xl mb-6">Countdown Timer</h1>
          <div className="flex ">
          <Input
          className="rounded-2xl mr-3"
          placeholder="Enter duration in seconds"
          type="number"
          onChange={(e)=> setDuration(Number(e.target.value) || "")}
          value={duration}
          ></Input>
          <Button onClick={setTimeDuration} variant="outline">Set</Button>
          </div>
          <div className="flex justify-center items-center text-6xl font-bold my-6">
            <div className="min-w-60 px-1">
              {setTimeFormate(timeLeft)}
            </div>
          </div>
          <div className="flex justify-center gap-4">
          <Button onClick={startCountDown} variant="outline">{!pause? "Start" : "Resume"}</Button>
          <Button onClick={pauseCountDown} variant="outline">Pause</Button>
          <Button onClick={resetCountDown} variant="outline">Reset</Button>
          </div>
      </div>
    </main>
  );
}
