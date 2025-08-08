import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Star, Clock, Users, Play } from 'lucide-react'

const Courses = () => {
  console.log('🎯 Courses carregado - PROJETO NOVO!')

  const courses = [
    {
      id: '1',
      title: 'Marketing Digital Avançado',
      description: 'Domine as estratégias de marketing digital que realmente funcionam',
      category: 'Marketing Digital',
      rating: 4.8,
      students: 15420,
      duration: '8h 30m',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      title: 'Desenvolvimento Pessoal Premium',
      description: 'Transforme sua mentalidade e alcance seus objetivos',
      category: 'Desenvolvimento Pessoal',
      rating: 4.9,
      students: 8760,
      duration: '6h 15m',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      title: 'Investimentos e Finanças',
      description: 'Aprenda a investir seu dinheiro de forma inteligente',
      category: 'Finanças',
      rating: 4.7,
      students: 12340,
      duration: '12h 45m',
      thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop',
    }
  ]

  return (
    <>
      <Helmet>
        <title>Cursos - Código Bilionário</title>
        <meta name="description" content="Cursos premium do Código Bilionário" />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="bg-gray-900 border-b border-yellow-500/20">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold mb-4 text-yellow-500">Código Bilionário</h1>
            <p className="text-xl text-gray-300">Plataforma Premium de Cursos Digitais</p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img 
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-12 h-12 text-yellow-500" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wider">
                      {course.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-500 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Courses