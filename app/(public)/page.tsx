import HeroSection from '@/components/home/HeroSection';
import AboutSnippet from '@/components/home/AboutSnippet';
import SkillBubbles from '@/components/home/SkillBubbles';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import StatsCounter from '@/components/home/StatsCounter';
import LatestPosts from '@/components/home/LatestPosts';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSnippet />
      <SkillBubbles />
      <FeaturedProjects />
      <StatsCounter />
      <LatestPosts />
      <TestimonialsSection />
    </>
  );
}
