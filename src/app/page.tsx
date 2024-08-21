import HeroSection from "@/app/components/HeroSection";
import LatestQuestions from "@/app/components/LatestQuestions";
import TopContributers from "@/app/components/TopContributors";

export default function Home() {
  
  return (
    <main>
      <HeroSection/>
      <div className="flex flex-col md:flex-row gap-6 items-start justify-between max-w-screen-lg mx-auto dark:text-white mb-20">
        <LatestQuestions/>
        <TopContributers/>
      </div>
    </main>
  )
}
