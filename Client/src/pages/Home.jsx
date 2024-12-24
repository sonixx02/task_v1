import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
  
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-800">Routine Builder</span>
        </div>
        <div className="flex space-x-4">
          <Button variant="ghost" className="text-gray-800" onClick={() => window.location.href = "/login"}>
            Login
          </Button>
          <Button onClick={() => window.location.href = "/signup"}>Sign Up</Button>
        </div>
      </nav>

    
      <header className="text-center mt-12 mb-16 px-4">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Transform Your Daily Routines
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Explore personalized routines, track progress, and achieve weekly goals with ease.
        </p>
        <Button className="mt-6 px-6 py-3 text-lg" onClick={() => window.location.href = "/signup"}>
          Get Started
        </Button>
      </header>

      
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 mb-16">
        {[
          {
            title: "Routine Builder",
            description: "Create customized routines with milestones and benefits.",
            icon: "🛠️",
          },
          {
            title: "Product Integration",
            description: "Attach products and lifestyle tips to each step.",
            icon: "🛍️",
          },
          {
            title: "Templates",
            description: "Get started quickly with pre-built, customizable templates.",
            icon: "📄",
          },
          {
            title: "Analytics",
            description: "Track engagement, completions, and customer progress.",
            icon: "📊",
          },
        ].map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition">
            <CardHeader>
              <div className="text-3xl">{feature.icon}</div>
              <CardTitle className="mt-4 text-lg font-semibold text-gray-800">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      
      <section className="px-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Routines</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "8-Week Hair Care Routine",
              progress: 80,
              benefits: "Achieve healthier, shinier hair in just 8 weeks.",
            },
            {
              title: "Mindfulness Routine",
              progress: 60,
              benefits: "Improve your mental clarity with daily mindfulness exercises.",
            },
            {
              title: "Skincare Routine",
              progress: 100,
              benefits: "Radiant skin is just weeks away with our skincare routine.",
            },
          ].map((routine, index) => (
            <Card key={index} className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {routine.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{routine.benefits}</p>
                <Progress value={routine.progress} className="my-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      
      <footer className="text-center py-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          © 2024 Routine Builder. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
