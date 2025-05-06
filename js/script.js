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
// Cargar una sección específica
function loadSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    currentSection = sectionId;
    
    // Cargar los datos correspondientes
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'students':
            loadStudents();
            break;
        case 'teachers':
            loadTeachers();
            break;
        case 'courses':
            loadCourses();
            break;
        case 'grades':
            loadGrades();
            break;
        case 'reports':
            loadReports();
            break;
    }
}

// Cargar el dashboard
function loadDashboard() {
    // Actualizar estadísticas
    document.getElementById('total-students').textContent = database.students.length;
    document.getElementById('total-teachers').textContent = database.teachers.length;
    document.getElementById('total-courses').textContent = database.courses.length;
    
    // Calcular promedio general
    const average = database.grades.reduce((sum, grade) => sum + grade.value, 0) / database.grades.length;
    document.getElementById('average-grade').textContent = average.toFixed(2) || '0.00';
    
    // Cargar actividades recientes
    const activitiesList = document.getElementById('activities-list');
    activitiesList.innerHTML = '';
    
    database.activities.slice().reverse().forEach(activity => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-circle"></i> ${activity.description} <span class="activity-date">${activity.date}</span>`;
        activitiesList.appendChild(li);
    });
}

// Cargar estudiantes
function loadStudents() {
    const tableBody = document.querySelector('#students-table tbody');
    tableBody.innerHTML = '';
    
    database.students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.career}</td>
            <td class="actions">
                <button class="action-btn edit" data-id="${student.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" data-id="${student.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Configurar eventos de los botones de edición y eliminación
    setupTableActions('students');
}

// Cargar profesores
function loadTeachers() {
    const tableBody = document.querySelector('#teachers-table tbody');
    tableBody.innerHTML = '';
    
    database.teachers.forEach(teacher => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.phone}</td>
            <td>${teacher.specialty}</td>
            <td class="actions">
                <button class="action-btn edit" data-id="${teacher.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" data-id="${teacher.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Configurar eventos de los botones de edición y eliminación
    setupTableActions('teachers');
}

// Cargar cursos
function loadCourses() {
    const tableBody = document.querySelector('#courses-table tbody');
    tableBody.innerHTML = '';
    
    database.courses.forEach(course => {
        const teacher = database.teachers.find(t => t.id === course.teacherId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${teacher ? teacher.name : 'No asignado'}</td>
            <td>${course.schedule}</td>
            <td>${course.classroom}</td>
            <td>${course.credits}</td>
            <td class="actions">
                <button class="action-btn edit" data-code="${course.code}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" data-code="${course.code}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Configurar eventos de los botones de edición y eliminación
    setupTableActions('courses');
}

// Cargar calificaciones
function loadGrades() {
    // Llenar los filtros
    fillGradeFilters();
    
    const tableBody = document.querySelector('#grades-table tbody');
    tableBody.innerHTML = '';
    
    // Aplicar filtros
    const courseFilter = document.getElementById('grade-course-filter').value;
    const studentFilter = document.getElementById('grade-student-filter').value;
    
    let filteredGrades = database.grades;
    
    if (courseFilter) {
        filteredGrades = filteredGrades.filter(grade => grade.courseCode === courseFilter);
    }
    
    if (studentFilter) {
        filteredGrades = filteredGrades.filter(grade => grade.studentId === parseInt(studentFilter));
    }
    
    filteredGrades.forEach(grade => {
        const student = database.students.find(s => s.id === grade.studentId);
        const course = database.courses.find(c => c.code === grade.courseCode);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student ? student.name : 'Estudiante no encontrado'}</td>
            <td>${course ? course.name : 'Curso no encontrado'}</td>
            <td>${grade.value}</td>
            <td>${grade.period}</td>
            <td class="actions">
                <button class="action-btn edit" data-id="${grade.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" data-id="${grade.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Configurar eventos de los botones de edición y eliminación
    setupTableActions('grades');
}

// Llenar los filtros de calificaciones
function fillGradeFilters() {
    const courseFilter = document.getElementById('grade-course-filter');
    const studentFilter = document.getElementById('grade-student-filter');
    
    // Limpiar opciones excepto la primera
    courseFilter.innerHTML = '<option value="">Todos los cursos</option>';
    studentFilter.innerHTML = '<option value="">Todos los estudiantes</option>';
    
    // Llenar cursos
    database.courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.code;
        option.textContent = course.name;
        courseFilter.appendChild(option);
    });
    
    // Llenar estudiantes
    database.students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.name;
        studentFilter.appendChild(option);
    });
    
    // Configurar eventos para recargar cuando cambien los filtros
    courseFilter.addEventListener('change', () => loadGrades());
    studentFilter.addEventListener('change', () => loadGrades());
}

// Cargar reportes
function loadReports() {
    // Por ahora solo mostramos el contenedor vacío
    document.getElementById('report-container').innerHTML = '<p>Selecciona un tipo de reporte para generarlo.</p>';
}

// Configurar eventos de los botones de acción en las tablas
function setupTableActions(type) {
    // Botones de edición
    document.querySelectorAll(`.action-btn.edit`).forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute(type === 'courses' ? 'data-code' : 'data-id');
            editItem(type, id);
        });
    });
    
    // Botones de eliminación
    document.querySelectorAll(`.action-btn.delete`).forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute(type === 'courses' ? 'data-code' : 'data-id');
            confirmDelete(type, id);
        });
    });
}