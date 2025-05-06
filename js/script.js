// Base de datos simulada
const database = {
    students: [
        { id: 1, name: "Juan Pérez", email: "juan@example.com", phone: "555-1234", career: "Ingeniería de Sistemas", address: "Calle 123", birthdate: "2000-05-15" },
        { id: 2, name: "María García", email: "maria@example.com", phone: "555-5678", career: "Medicina", address: "Avenida 456", birthdate: "1999-08-22" },
        { id: 3, name: "Carlos López", email: "carlos@example.com", phone: "555-9012", career: "Derecho", address: "Carrera 789", birthdate: "2001-03-10" }
    ],
    
    teachers: [
        { id: 1, name: "Dr. Roberto Martínez", email: "roberto@example.com", phone: "555-3456", specialty: "Inteligencia Artificial", degree: "Doctorado" },
        { id: 2, name: "Dra. Ana Rodríguez", email: "ana@example.com", phone: "555-7890", specialty: "Bioquímica", degree: "Doctorado" },
        { id: 3, name: "Lic. Pedro Sánchez", email: "pedro@example.com", phone: "555-2345", specialty: "Derecho Penal", degree: "Maestría" }
    ],
    
    courses: [
        { code: "CS101", name: "Introducción a la Programación", teacherId: 1, schedule: "Lunes y Miércoles 8:00-10:00", classroom: "Aula 301", credits: 4, description: "Fundamentos de programación usando Python" },
        { code: "BIO201", name: "Biología Molecular", teacherId: 2, schedule: "Martes y Jueves 10:00-12:00", classroom: "Laboratorio 2", credits: 5, description: "Estudio de las moléculas biológicas" },
        { code: "LAW301", name: "Derecho Constitucional", teacherId: 3, schedule: "Viernes 14:00-18:00", classroom: "Aula 105", credits: 3, description: "Análisis de la constitución y sus principios" }
    ],
    
    grades: [
        { id: 1, studentId: 1, courseCode: "CS101", value: 85, period: "2023-1", notes: "Buen desempeño en el curso" },
        { id: 2, studentId: 2, courseCode: "BIO201", value: 92, period: "2023-1", notes: "Excelente participación" },
        { id: 3, studentId: 3, courseCode: "LAW301", value: 78, period: "2023-1", notes: "Necesita mejorar en investigaciones" },
        { id: 4, studentId: 1, courseCode: "BIO201", value: 88, period: "2023-2", notes: "Muy buen trabajo en laboratorio" }
    ],
    
    activities: [
        { id: 1, description: "Nuevo estudiante registrado: Juan Pérez", date: "2023-05-10 09:15" },
        { id: 2, description: "Calificación asignada a Juan Pérez en CS101: 85", date: "2023-05-12 14:30" },
        { id: 3, description: "Curso creado: Introducción a la Programación", date: "2023-05-08 10:45" },
        { id: 4, description: "Profesor agregado: Dr. Roberto Martínez", date: "2023-05-05 16:20" }
    ]
};
// Variables globales
let currentSection = 'dashboard';
let editMode = false;
let itemToDelete = null;

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Configurar navegación
    setupNavigation();
    
    // Cargar la sección actual
    loadSection(currentSection);
    
    // Configurar eventos de los modales
    setupModals();
    
    // Configurar eventos de los formularios
    setupForms();
    
    // Configurar eventos de los reportes
    setupReports();
});

// Configuración de la navegación
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover la clase active de todos los enlaces
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Agregar la clase active al enlace clickeado
            this.classList.add('active');
            
            // Obtener la sección a mostrar
            const sectionId = this.getAttribute('data-section');
            
            // Cargar la sección
            loadSection(sectionId);
        });
    });
}