import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { ArrowRight, Camera, Compass, MapPin } from "lucide-react"

export const Index = () => {
  return (
    <div className="absolute left-0 right-0">
      <section className="relative bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80"
            alt="Beautiful travel destination"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative text-center w-full">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore breathtaking destinations, create unforgettable memories,
            and let Travel Apps be your guide.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90"
          >
            <Link to="/articles">
              Explore Articles <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 bg-foreground">
        <h2 className="text-3xl font-poppins font-semibold text-center mb-12">
          Why Choose Travel Apps?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Compass className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-poppins font-semibold mb-2">
              Curated Guides
            </h3>
            <p className="text-muted-foreground">
              Expertly crafted travel guides to help you make the most of your
              journey.
            </p>
          </div>
          <div className="p-6">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-poppins font-semibold mb-2">
              Hidden Gems
            </h3>
            <p className="text-muted-foreground">
              Discover unique spots and local secrets often missed by tourists.
            </p>
          </div>
          <div className="p-6">
            <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-poppins font-semibold mb-2">
              Inspiring Stories
            </h3>
            <p className="text-muted-foreground">
              Read captivating travelogues from fellow adventurers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
