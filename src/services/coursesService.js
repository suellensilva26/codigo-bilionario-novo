// Serviço de Cursos (modo DEMO)

export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Marketing Digital Avançado',
    description: 'Domine as estratégias que realmente vendem no digital',
    category: 'marketing',
    level: 'Intermediário',
    rating: 4.8,
    students: 15420,
    duration: '8h 30m',
    modules: 12,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    instructor: 'Carlos Mendes',
    featured: true,
    createdAt: '2024-01-10',
    price: 97,
    originalPrice: 997
  },
  {
    id: '2',
    title: 'Copywriting Persuasivo',
    description: 'Escreva textos que convertem cliques em vendas',
    category: 'copywriting',
    level: 'Iniciante',
    rating: 4.9,
    students: 8760,
    duration: '6h 15m',
    modules: 10,
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop',
    instructor: 'Ana Silva',
    createdAt: '2024-02-15',
    price: 97,
    originalPrice: 697
  },
  {
    id: '3',
    title: 'Vendas de Alta Performance',
    description: 'Feche negócios todos os dias com metodologia comprovada',
    category: 'sales',
    level: 'Avançado',
    rating: 4.7,
    students: 12340,
    duration: '12h 45m',
    modules: 16,
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop',
    instructor: 'Roberto Santos',
    createdAt: '2024-03-20',
    price: 97,
    originalPrice: 1297
  }
]

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const coursesService = {
  async getCourses() {
    // DEMO: retorna mock local
    await delay(300)
    return { success: true, courses: MOCK_COURSES }
  },

  async getCourseById(courseId) {
    await delay(200)
    const course = MOCK_COURSES.find((c) => c.id === String(courseId))
    if (!course) return { success: false, error: 'Curso não encontrado' }
    return { success: true, course }
  },

  async getCategories() {
    await delay(150)
    return {
      success: true,
      categories: [
        { id: 'marketing', name: 'Marketing Digital', icon: '📱', count: 1 },
        { id: 'copywriting', name: 'Copywriting', icon: '✍️', count: 1 },
        { id: 'sales', name: 'Vendas', icon: '💼', count: 1 }
      ]
    }
  },

  async searchCourses(term) {
    await delay(200)
    const t = term.toLowerCase()
    const results = MOCK_COURSES.filter(
      (c) =>
        c.title.toLowerCase().includes(t) ||
        c.description.toLowerCase().includes(t) ||
        c.instructor.toLowerCase().includes(t)
    )
    return { success: true, courses: results }
  },

  async getCourseProgress() {
    await delay(100)
    return { success: true, progress: 0, completedLessons: [] }
  },

  async markLessonComplete() {
    await delay(100)
    return { success: true }
  }
}

export default coursesService