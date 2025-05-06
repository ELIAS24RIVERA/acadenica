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
// Configurar los modales
function setupModals() {
    // Botón para agregar estudiante
    document.getElementById('add-student-btn').addEventListener('click', () => {
        openStudentModal();
    });
    
    // Botón para agregar profesor
    document.getElementById('add-teacher-btn').addEventListener('click', () => {
        openTeacherModal();
    });
    
    // Botón para agregar curso
    document.getElementById('add-course-btn').addEventListener('click', () => {
        openCourseModal();
    });
    
    // Botón para agregar calificación
    document.getElementById('add-grade-btn').addEventListener('click', () => {
        openGradeModal();
    });
    
    // Cerrar modales
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Cerrar al hacer clic en el fondo
    document.getElementById('modal-backdrop').addEventListener('click', closeModal);
}

// Configurar los formularios
function setupForms() {
    // Formulario de estudiante
    document.getElementById('student-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveStudent();
    });
    
    // Formulario de profesor
    document.getElementById('teacher-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveTeacher();
    });
    
    // Formulario de curso
    document.getElementById('course-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveCourse();
    });
    
    // Formulario de calificación
    document.getElementById('grade-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveGrade();
    });
}

// Configurar los reportes
function setupReports() {
    document.getElementById('student-report').addEventListener('click', () => {
        generateStudentReport();
    });
    
    document.getElementById('course-report').addEventListener('click', () => {
        generateCourseReport();
    });
    
    document.getElementById('grade-report').addEventListener('click', () => {
        generateGradeReport();
    });
}

// Abrir modal de estudiante
function openStudentModal(student = null) {
    editMode = student !== null;
    const modal = document.getElementById('student-modal');
    const form = document.getElementById('student-form');
    
    if (editMode) {
        document.getElementById('student-modal-title').textContent = 'Editar Estudiante';
        document.getElementById('student-id').value = student.id;
        document.getElementById('student-name').value = student.name;
        document.getElementById('student-email').value = student.email;
        document.getElementById('student-phone').value = student.phone;
        document.getElementById('student-career').value = student.career;
        document.getElementById('student-address').value = student.address;
        document.getElementById('student-birthdate').value = student.birthdate;
    } else {
        document.getElementById('student-modal-title').textContent = 'Agregar Nuevo Estudiante';
        form.reset();
    }
    
    openModal(modal);
}

// Abrir modal de profesor
function openTeacherModal(teacher = null) {
    editMode = teacher !== null;
    const modal = document.getElementById('teacher-modal');
    const form = document.getElementById('teacher-form');
    
    if (editMode) {
        document.getElementById('teacher-modal-title').textContent = 'Editar Profesor';
        document.getElementById('teacher-id').value = teacher.id;
        document.getElementById('teacher-name').value = teacher.name;
        document.getElementById('teacher-email').value = teacher.email;
        document.getElementById('teacher-phone').value = teacher.phone;
        document.getElementById('teacher-specialty').value = teacher.specialty;
        document.getElementById('teacher-degree').value = teacher.degree;
    } else {
        document.getElementById('teacher-modal-title').textContent = 'Agregar Nuevo Profesor';
        form.reset();
    }
    
    openModal(modal);
}

// Abrir modal de curso
function openCourseModal(course = null) {
    editMode = course !== null;
    const modal = document.getElementById('course-modal');
    const form = document.getElementById('course-form');
    
    // Llenar select de profesores
    const teacherSelect = document.getElementById('course-teacher');
    teacherSelect.innerHTML = '<option value="">Seleccione un profesor</option>';
    
    database.teachers.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.id;
        option.textContent = teacher.name;
        teacherSelect.appendChild(option);
    });
    
    if (editMode) {
        document.getElementById('course-modal-title').textContent = 'Editar Curso';
        document.getElementById('course-code').value = course.code;
        document.getElementById('course-name').value = course.name;
        document.getElementById('course-teacher').value = course.teacherId;
        document.getElementById('course-schedule').value = course.schedule;
        document.getElementById('course-classroom').value = course.classroom;
        document.getElementById('course-credits').value = course.credits;
        document.getElementById('course-description').value = course.description;
    } else {
        document.getElementById('course-modal-title').textContent = 'Agregar Nuevo Curso';
        form.reset();
    }
    
    openModal(modal);
}

// Abrir modal de calificación
function openGradeModal(grade = null) {
    editMode = grade !== null;
    const modal = document.getElementById('grade-modal');
    const form = document.getElementById('grade-form');
    
    // Llenar select de estudiantes
    const studentSelect = document.getElementById('grade-student');
    studentSelect.innerHTML = '<option value="">Seleccione un estudiante</option>';
    
    database.students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.name;
        studentSelect.appendChild(option);
    });
    
    // Llenar select de cursos
    const courseSelect = document.getElementById('grade-course');
    courseSelect.innerHTML = '<option value="">Seleccione un curso</option>';
    
    database.courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.code;
        option.textContent = course.name;
        courseSelect.appendChild(option);
    });
    
    if (editMode) {
        document.getElementById('grade-modal-title').textContent = 'Editar Calificación';
        document.getElementById('grade-id').value = grade.id;
        document.getElementById('grade-student').value = grade.studentId;
        document.getElementById('grade-course').value = grade.courseCode;
        document.getElementById('grade-value').value = grade.value;
        document.getElementById('grade-period').value = grade.period;
        document.getElementById('grade-notes').value = grade.notes;
    } else {
        document.getElementById('grade-modal-title').textContent = 'Asignar Calificación';
        form.reset();
    }
    
    openModal(modal);
}

// Abrir un modal genérico
function openModal(modal) {
    document.getElementById('modal-backdrop').style.display = 'block';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Cerrar modales
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    
    document.getElementById('modal-backdrop').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Guardar estudiante
function saveStudent() {
    const form = document.getElementById('student-form');
    const id = document.getElementById('student-id').value;
    const name = document.getElementById('student-name').value;
    const email = document.getElementById('student-email').value;
    const phone = document.getElementById('student-phone').value;
    const career = document.getElementById('student-career').value;
    const address = document.getElementById('student-address').value;
    const birthdate = document.getElementById('student-birthdate').value;
    
    const student = {
        id: editMode ? parseInt(id) : database.students.length > 0 ? Math.max(...database.students.map(s => s.id)) + 1 : 1,
        name,
        email,
        phone,
        career,
        address,
        birthdate
    };
    
    if (editMode) {
        // Editar estudiante existente
        const index = database.students.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
            database.students[index] = student;
            addActivity(`Estudiante actualizado: ${name}`);
        }
    } else {
        // Agregar nuevo estudiante
        database.students.push(student);
        addActivity(`Nuevo estudiante registrado: ${name}`);
    }
    
    // Cerrar modal y recargar datos
    closeModal();
    loadSection(currentSection);
}

// Guardar profesor
function saveTeacher() {
    const form = document.getElementById('teacher-form');
    const id = document.getElementById('teacher-id').value;
    const name = document.getElementById('teacher-name').value;
    const email = document.getElementById('teacher-email').value;
    const phone = document.getElementById('teacher-phone').value;
    const specialty = document.getElementById('teacher-specialty').value;
    const degree = document.getElementById('teacher-degree').value;
    
    const teacher = {
        id: editMode ? parseInt(id) : database.teachers.length > 0 ? Math.max(...database.teachers.map(t => t.id)) + 1 : 1,
        name,
        email,
        phone,
        specialty,
        degree
    };
    
    if (editMode) {
        // Editar profesor existente
        const index = database.teachers.findIndex(t => t.id === parseInt(id));
        if (index !== -1) {
            database.teachers[index] = teacher;
            addActivity(`Profesor actualizado: ${name}`);
        }
    } else {
        // Agregar nuevo profesor
        database.teachers.push(teacher);
        addActivity(`Nuevo profesor agregado: ${name}`);
    }
    
    // Cerrar modal y recargar datos
    closeModal();
    loadSection(currentSection);
}

// Guardar curso
function saveCourse() {
    const form = document.getElementById('course-form');
    const code = document.getElementById('course-code').value;
    const name = document.getElementById('course-name').value;
    const teacherId = parseInt(document.getElementById('course-teacher').value);
    const schedule = document.getElementById('course-schedule').value;
    const classroom = document.getElementById('course-classroom').value;
    const credits = parseInt(document.getElementById('course-credits').value);
    const description = document.getElementById('course-description').value;
    
    const course = {
        code: editMode ? code : generateCourseCode(name),
        name,
        teacherId,
        schedule,
        classroom,
        credits,
        description
    };
    
    if (editMode) {
        // Editar curso existente
        const index = database.courses.findIndex(c => c.code === code);
        if (index !== -1) {
            database.courses[index] = course;
            addActivity(`Curso actualizado: ${name}`);
        }
    } else {
        // Agregar nuevo curso
        database.courses.push(course);
        addActivity(`Curso creado: ${name}`);
    }
    
    // Cerrar modal y recargar datos
    closeModal();
    loadSection(currentSection);
}

// Generar código de curso basado en el nombre
function generateCourseCode(name) {
    const words = name.split(' ');
    let code = '';
    
    // Tomar las primeras letras de las primeras 2 palabras
    if (words.length >= 2) {
        code = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    } else {
        code = words[0].substring(0, 2).toUpperCase();
    }
    
    // Agregar un número único
    const existingCodes = database.courses.map(c => c.code);
    let num = 101;
    
    while (existingCodes.includes(code + num)) {
        num++;
    }
    
    return code + num;
}

// Guardar calificación
function saveGrade() {
    const form = document.getElementById('grade-form');
    const id = document.getElementById('grade-id').value;
    const studentId = parseInt(document.getElementById('grade-student').value);
    const courseCode = document.getElementById('grade-course').value;
    const value = parseInt(document.getElementById('grade-value').value);
    const period = document.getElementById('grade-period').value;
    const notes = document.getElementById('grade-notes').value;
    
    const grade = {
        id: editMode ? parseInt(id) : database.grades.length > 0 ? Math.max(...database.grades.map(g => g.id)) + 1 : 1,
        studentId,
        courseCode,
        value,
        period,
        notes
    };
    
    if (editMode) {
        // Editar calificación existente
        const index = database.grades.findIndex(g => g.id === parseInt(id));
        if (index !== -1) {
            database.grades[index] = grade;
            
            const student = database.students.find(s => s.id === studentId);
            const course = database.courses.find(c => c.code === courseCode);
            addActivity(`Calificación actualizada para ${student.name} en ${course.name}`);
        }
    } else {
        // Agregar nueva calificación
        database.grades.push(grade);
        
        const student = database.students.find(s => s.id === studentId);
        const course = database.courses.find(c => c.code === courseCode);
        addActivity(`Calificación asignada a ${student.name} en ${course.name}: ${value}`);
    }
    
    // Cerrar modal y recargar datos
    closeModal();
    loadSection(currentSection);
}

// Editar un elemento
function editItem(type, id) {
    switch(type) {
        case 'students':
            const student = database.students.find(s => s.id === parseInt(id));
            if (student) openStudentModal(student);
            break;
        case 'teachers':
            const teacher = database.teachers.find(t => t.id === parseInt(id));
            if (teacher) openTeacherModal(teacher);
            break;
        case 'courses':
            const course = database.courses.find(c => c.code === id);
            if (course) openCourseModal(course);
            break;
        case 'grades':
            const grade = database.grades.find(g => g.id === parseInt(id));
            if (grade) openGradeModal(grade);
            break;
    }
}

// Confirmar eliminación
function confirmDelete(type, id) {
    itemToDelete = { type, id };
    
    // Configurar mensaje según el tipo
    let message = '';
    let itemName = '';
    
    switch(type) {
        case 'students':
            const student = database.students.find(s => s.id === parseInt(id));
            itemName = student ? student.name : 'este estudiante';
            message = `¿Estás seguro de que deseas eliminar a ${itemName}? Esta acción no se puede deshacer.`;
            break;
        case 'teachers':
            const teacher = database.teachers.find(t => t.id === parseInt(id));
            itemName = teacher ? teacher.name : 'este profesor';
            message = `¿Estás seguro de que deseas eliminar a ${itemName}? Esta acción no se puede deshacer.`;
            break;
        case 'courses':
            const course = database.courses.find(c => c.code === id);
            itemName = course ? course.name : 'este curso';
            message = `¿Estás seguro de que deseas eliminar ${itemName}? Esta acción no se puede deshacer.`;
            break;
        case 'grades':
            message = `¿Estás seguro de que deseas eliminar esta calificación? Esta acción no se puede deshacer.`;
            break;
    }
    
    document.getElementById('confirm-message').textContent = message;
    openModal(document.getElementById('confirm-modal'));
    
    // Configurar el botón de confirmación
    const confirmBtn = document.getElementById('confirm-action');
    confirmBtn.onclick = function() {
        deleteItem();
        closeModal();
    };
}

// Eliminar un elemento
function deleteItem() {
    if (!itemToDelete) return;
    
    const { type, id } = itemToDelete;
    let itemName = '';
    
    switch(type) {
        case 'students':
            const studentIndex = database.students.findIndex(s => s.id === parseInt(id));
            if (studentIndex !== -1) {
                itemName = database.students[studentIndex].name;
                database.students.splice(studentIndex, 1);
                
                // También eliminar calificaciones asociadas
                database.grades = database.grades.filter(g => g.studentId !== parseInt(id));
                
                addActivity(`Estudiante eliminado: ${itemName}`);
            }
            break;
        case 'teachers':
            const teacherIndex = database.teachers.findIndex(t => t.id === parseInt(id));
            if (teacherIndex !== -1) {
                itemName = database.teachers[teacherIndex].name;
                database.teachers.splice(teacherIndex, 1);
                
                // Quitar al profesor de los cursos
                database.courses.forEach(c => {
                    if (c.teacherId === parseInt(id)) {
                        c.teacherId = null;
                    }
                });
                
                addActivity(`Profesor eliminado: ${itemName}`);
            }
            break;
        case 'courses':
            const courseIndex = database.courses.findIndex(c => c.code === id);
            if (courseIndex !== -1) {
                itemName = database.courses[courseIndex].name;
                database.courses.splice(courseIndex, 1);
                
                // También eliminar calificaciones asociadas
                database.grades = database.grades.filter(g => g.courseCode !== id);
                
                addActivity(`Curso eliminado: ${itemName}`);
            }
            break;
        case 'grades':
            const gradeIndex = database.grades.findIndex(g => g.id === parseInt(id));
            if (gradeIndex !== -1) {
                const grade = database.grades[gradeIndex];
                const student = database.students.find(s => s.id === grade.studentId);
                const course = database.courses.find(c => c.code === grade.courseCode);
                
                if (student && course) {
                    itemName = `calificación de ${student.name} en ${course.name}`;
                }
                
                database.grades.splice(gradeIndex, 1);
                addActivity(`Calificación eliminada: ${itemName}`);
            }
            break;
    }
    
    itemToDelete = null;
    loadSection(currentSection);
}

// Agregar una actividad al historial
function addActivity(description) {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
    
    database.activities.push({
        id: database.activities.length > 0 ? Math.max(...database.activities.map(a => a.id)) + 1 : 1,
        description,
        date: `${dateStr} ${timeStr}`
    });
}

// Generar reporte de estudiantes
function generateStudentReport() {
    const container = document.getElementById('report-container');
    let html = `
        <h3>Reporte de Estudiantes</h3>
        <p>Total de estudiantes: ${database.students.length}</p>
        <table class="report-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Carrera</th>
                    <th>Promedio</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    database.students.forEach(student => {
        // Calcular promedio del estudiante
        const studentGrades = database.grades.filter(g => g.studentId === student.id);
        const average = studentGrades.length > 0 
            ? (studentGrades.reduce((sum, g) => sum + g.value, 0) / studentGrades.length).toFixed(2)
            : 'N/A';
        
        html += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.career}</td>
                <td>${average}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
        <div class="report-actions">
            <button class="btn btn-primary" onclick="printReport()"><i class="fas fa-print"></i> Imprimir</button>
            <button class="btn btn-primary" onclick="exportToPDF('reporte-estudiantes')"><i class="fas fa-file-pdf"></i> Exportar a PDF</button>
        </div>
    `;
    
    container.innerHTML = html;
}

// Generar reporte de cursos
function generateCourseReport() {
    const container = document.getElementById('report-container');
    let html = `
        <h3>Reporte de Cursos</h3>
        <p>Total de cursos: ${database.courses.length}</p>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Profesor</th>
                    <th>Estudiantes</th>
                    <th>Promedio</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    database.courses.forEach(course => {
        // Obtener profesor
        const teacher = database.teachers.find(t => t.id === course.teacherId);
        
        // Obtener estudiantes y calificaciones para este curso
        const courseGrades = database.grades.filter(g => g.courseCode === course.code);
        const studentCount = new Set(courseGrades.map(g => g.studentId)).size;
        const average = courseGrades.length > 0 
            ? (courseGrades.reduce((sum, g) => sum + g.value, 0) / courseGrades.length).toFixed(2)
            : 'N/A';
        
        html += `
            <tr>
                <td>${course.code}</td>
                <td>${course.name}</td>
                <td>${teacher ? teacher.name : 'No asignado'}</td>
                <td>${studentCount}</td>
                <td>${average}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
        <div class="report-actions">
            <button class="btn btn-primary" onclick="printReport()"><i class="fas fa-print"></i> Imprimir</button>
            <button class="btn btn-primary" onclick="exportToPDF('reporte-cursos')"><i class="fas fa-file-pdf"></i> Exportar a PDF</button>
        </div>
    `;
    
    container.innerHTML = html;
}

// Generar reporte de calificaciones
function generateGradeReport() {
    const container = document.getElementById('report-container');
    
    // Calcular estadísticas generales
    const totalGrades = database.grades.length;
    const averageAll = totalGrades > 0 
        ? (database.grades.reduce((sum, g) => sum + g.value, 0) / totalGrades).toFixed(2)
        : 0;
    
    // Contar calificaciones por rango
    const ranges = {
        '90-100': 0,
        '80-89': 0,
        '70-79': 0,
        '60-69': 0,
        '0-59': 0
    };
    
    database.grades.forEach(grade => {
        if (grade.value >= 90) ranges['90-100']++;
        else if (grade.value >= 80) ranges['80-89']++;
        else if (grade.value >= 70) ranges['70-79']++;
        else if (grade.value >= 60) ranges['60-69']++;
        else ranges['0-59']++;
    });
    
    let html = `
        <h3>Reporte de Calificaciones</h3>
        <div class="stats">
            <div class="stat-card">
                <h3>Total Calificaciones</h3>
                <p>${totalGrades}</p>
            </div>
            <div class="stat-card">
                <h3>Promedio General</h3>
                <p>${averageAll}</p>
            </div>
        </div>
        
        <h4>Distribución de Calificaciones</h4>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Rango</th>
                    <th>Cantidad</th>
                    <th>Porcentaje</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (const [range, count] of Object.entries(ranges)) {
        const percentage = totalGrades > 0 ? ((count / totalGrades) * 100).toFixed(1) : 0;
        html += `
            <tr>
                <td>${range}</td>
                <td>${count}</td>
                <td>${percentage}%</td>
            </tr>
        `;
    }
    
    html += `
            </tbody>
        </table>
        
        <h4>Mejores Estudiantes</h4>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Estudiante</th>
                    <th>Promedio</th>
                    <th>Cursos</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Obtener mejores estudiantes (top 5)
    const studentAverages = [];
    
    database.students.forEach(student => {
        const studentGrades = database.grades.filter(g => g.studentId === student.id);
        if (studentGrades.length > 0) {
            const average = studentGrades.reduce((sum, g) => sum + g.value, 0) / studentGrades.length;
            studentAverages.push({
                student,
                average,
                courses: studentGrades.length
            });
        }
    });
    
    // Ordenar por promedio descendente
    studentAverages.sort((a, b) => b.average - a.average);
    
    // Mostrar solo los top 5
    const topStudents = studentAverages.slice(0, 5);
    
    topStudents.forEach(item => {
        html += `
            <tr>
                <td>${item.student.name}</td>
                <td>${item.average.toFixed(2)}</td>
                <td>${item.courses}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
        <div class="report-actions">
            <button class="btn btn-primary" onclick="printReport()"><i class="fas fa-print"></i> Imprimir</button>
            <button class="btn btn-primary" onclick="exportToPDF('reporte-calificaciones')"><i class="fas fa-file-pdf"></i> Exportar a PDF</button>
        </div>
    `;
    
    container.innerHTML = html;
}

// Función para imprimir el reporte (simulada)
function printReport() {
    alert('Función de impresión simulada. En una aplicación real, esto imprimiría el reporte actual.');
}

// Función para exportar a PDF (simulada)
function exportToPDF(filename) {
    alert(`Función de exportación a PDF simulada. En una aplicación real, esto generaría un PDF llamado "${filename}.pdf".`);
}

// Hacer las funciones accesibles globalmente para los botones en los reportes
window.printReport = printReport;
window.exportToPDF = exportToPDF;
