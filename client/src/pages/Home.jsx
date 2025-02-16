import React from "react";
import { useNavigate } from "react-router-dom";
import { MoveRight } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-gradient-to-tl to-purple-300 via-gray-200  from-gray-300  h-screen">
      <Header />

      <div className="flex gap-4 flex-col justify-center text-center text-gray-800 h-[80vh] p-4 ">
        <h2 className="font-medium text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide ">
          <p className="leading-snug">Get unique landing pages.</p>
          <p> Generated instantly with AI</p>
        </h2>

        <p className="text-slate-500 mt-2 text-base">
          Launch instantly with beautiful landing pages generated according to
          <br />
          your brand and style.
        </p>

        <section className="mt-5">
          <Button
            variant="outline"
            className="mr-2 rounded-full"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
          <Button
            className="ml-2 rounded-full"
            onClick={() => navigate("/dashboard")}
          >
            Start Creating
            <MoveRight />
          </Button>
        </section>
      </div>
    </main>
  );
};

export default Home;
