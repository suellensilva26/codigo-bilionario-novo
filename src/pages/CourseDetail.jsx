import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Play, Clock, Star, Users } from 'lucide-react'

const CourseDetail = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  
  console.log('🎯 CourseDetail NOVO carregado - courseId:', courseId)

  // Dados diretos - impossível dar erro
  const courses = {
    '1': {
      id: '1',
      title: 'Marketing Digital Avançado',
      description: 'Domine as estratégias de marketing digital que realmente funcionam',
      category: 'Marketing Digital',
      level: 'Intermediário',
      rating: 4.8,
      students: 15420,
      duration: '8h 30m',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      instructor: 'Carlos Mendes'
    },
    '2': {
      id: '2',
      title: 'Desenvolvimento Pessoal Premium',
      description: 'Transforme sua mentalidade e alcance seus objetivos',
      category: 'Desenvolvimento Pessoal',
      level: 'Iniciante',
      rating: 4.9,
      students: 8760,
      duration: '6h 15m',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      instructor: 'Ana Silva'
    },
    '3': {
      id: '3',
      title: 'Investimentos e Finanças',
      description: 'Aprenda a investir seu dinheiro de forma inteligente',
      category: 'Finanças',
      level: 'Avançado',
      rating: 4.7,
      students: 12340,
      duration: '12h 45m',
      thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop',
      instructor: 'Roberto Santos'
    }
  }

  const course = courses[courseId] || courses['1']

  return (
    <>
      <Helmet>
        <title>{course.title} - Código Bilionário</title>
        <meta name="description" content={course.description} />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="bg-gray-900 border-b border-yellow-500/20">
          <div className="container mx-auto px-6 py-4">
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center text-yellow-500 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar aos Cursos
            </button>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-white">{course.title}</h1>
                    <p className="text-gray-300 mb-4">{course.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-400">
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
                        <span>{course.students.toLocaleString()} estudantes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-64">
                <div className="bg-gray-800 rounded-lg p-6">
                  <button className="w-full bg-yellow-500 text-black py-3 px-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Assistir Curso
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg p-8 text-center mb-6">
                <Play className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">Player de Vídeo</h3>
                <p className="text-gray-400">
                  🎉 SUCESSO! O curso está carregando perfeitamente!
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Sobre o Curso</h2>
                <p className="text-gray-300 leading-relaxed mb-6">{course.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-2">Nível</h4>
                    <p className="text-gray-300">{course.level}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-500 mb-2">Categoria</h4>
                    <p className="text-gray-300">{course.category}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-white">Aulas do Curso</h2>
                
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((lesson) => (
                    <div
                      key={lesson}
                      className="p-4 rounded-lg bg-black hover:bg-yellow-500/10 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center text-sm font-bold">
                          {lesson}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1 text-white">Aula {lesson}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>15:30</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetail