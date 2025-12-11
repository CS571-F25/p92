import '../App.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flower2, Heart, Sparkles, Leaf, Calendar, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'

function Home() {
  const services = [
    {
      icon: <Flower2 className="w-8 h-8 text-pink-500" />,
      title: "Fresh Daily Deliveries",
      description: "Hand-picked flowers delivered fresh to your door every day"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Custom Wedding Arrangements",
      description: "Create your dream wedding with our bespoke floral designs"
    },
    {
      icon: <Building2 className="w-8 h-8 text-blue-500" />,
      title: "Corporate Event Florals",
      description: "Professional arrangements for all your business occasions"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      title: "Special Occasions",
      description: "Sympathy, funeral, and memorial flower arrangements"
    },
    {
      icon: <Calendar className="w-8 h-8 text-orange-500" />,
      title: "Holiday & Seasonal",
      description: "Beautiful arrangements for every season and celebration"
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      title: "Plant Care",
      description: "Expert plant maintenance and care services"
    }
  ]

  return (
    <div className="app-content">
      {/* Large Welcome Header */}
      <div className="mb-16">
        <h1 className="text-7xl font-bold text-black mb-2">
          Welcome to Mai Mai Flowers!
        </h1>
      </div>

      {/* Hero Section */}
      <div className="mb-12 space-y-4">
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Where beauty meets craftsmanship. We have been serving our community for over a decade, 
          creating stunning floral arrangements for all of life's special moments.
        </p>
      </div>

      {/* Introduction Card */}
      <Card className="mb-12 border-0 shadow-lg">
        <CardContent className="pt-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Our team of experienced florists is passionate about bringing your vision to life. 
            Whether you're celebrating a wedding, anniversary, birthday, or simply want to brighten 
            someone's day, we have the perfect flowers for every occasion.
          </p>
        </CardContent>
      </Card>

      {/* Our Story Section */}
      <div className="mb-12">
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
            <CardTitle className="text-3xl flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              Our Story
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed text-left">
              Founded in 2024, Mai Mai Flowers started as a small family business with a simple mission: 
              to spread joy through the natural beauty of flowers. What began as a local flower shop has 
              grown into a trusted name in floral design, known for our attention to detail and commitment 
              to quality.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-2">
          <Flower2 className="w-8 h-8 text-pink-500" />
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-shadow duration-300 border-0 hover:border-pink-200"
            >
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Sustainability Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            Our Commitment to Sustainability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-left">
            We source our flowers from local growers whenever possible, ensuring the freshest blooms 
            while supporting our community. Our commitment to sustainability means we use eco-friendly 
            practices in all aspects of our business.
          </p>
        </CardContent>
      </Card>

      {/* Call to Action Button */}
      <div className="mt-12 flex justify-center">
        <Link to="/order" style={{ width: '100%', maxWidth: '500px' }}>
          <Button 
            style={{
              width: '100%',
              backgroundColor: '#203d2b',
              color: 'white',
              fontSize: '1.1rem',
              padding: '0.85rem',
              borderRadius: '32px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2d5a3d'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#203d2b'}
          >
            Start your order now
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Home