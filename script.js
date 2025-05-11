// --- Application State & Data ---
let currentProgress = 0;
const applicantData = {
  avatarName: '',
  password: '',
  school: '',
  schoolId: '',
  specialization: '',
  specializationId: '',
  avatarStyle: '',
  personalInfo: {},
  documents: {},
  isUnderage: false,
  grantApplied: false
};

const schoolsData = {
  "eco": {
    name: "Международная Школа Экономики",
    avatarStyles: [
      { id: 'eco_avatar_1', src: 'https://placehold.co/100x100/3498db/FFFFFF?text=Econ1', name: 'Деловой Стиль' },
      { id: 'eco_avatar_2', src: 'https://placehold.co/100x100/2ecc71/FFFFFF?text=Econ2', name: 'Аналитик' },
      { id: 'eco_avatar_3', src: 'https://placehold.co/100x100/f1c40f/FFFFFF?text=Econ3', name: 'Стартапер' },
    ],
    ieltsRequirement: "Общий балл IELTS не ниже 6.0, пороговые баллы по секциям могут отличаться.",
    specializations: [
      { id: "marketing", name: "BBA in Marketing", requirements: "География 5 баллов + Математика 25 баллов" },
      { id: "management", name: "BBA in Management", requirements: "География 5 баллов + Математика 25 баллов" },
      { id: "it_bba", name: "BBA in IT", requirements: "География 5 баллов + Математика 25 баллов" },
      { id: "finance", name: "BBA in Finance", requirements: "География 5 баллов + Математика 25 баллов" },
      { id: "accounting", name: "BBA in Accounting", requirements: "География 5 баллов + Математика 25 баллов" },
      { id: "econ_ds", name: "BBA in Economics and Data Science", requirements: "География 5 баллов + Математика 25 баллов" },
      { id: "ir", name: "BA in International Relations", requirements: "Всемирная история 25 баллов + Иностранный язык 30 баллов" }
    ]
  },
  "law": {
    name: "Высшая Школа Права",
    avatarStyles: [
      { id: 'law_avatar_1', src: 'https://placehold.co/100x100/5D6D7E/FFFFFF?text=Law1', name: 'Юрист' },
      { id: 'law_avatar_2', src: 'https://placehold.co/100x100/85929E/FFFFFF?text=Law2', name: 'Судья' },
      { id: 'law_avatar_3', src: 'https://placehold.co/100x100/2C3E50/FFFFFF?text=Law3', name: 'Адвокат' },
    ],
    ieltsRequirement: "Общий балл IELTS не ниже 6.5.",
    specializations: [
      { id: "jurisprudence", name: "Юриспруденция", requirements: "Всемирная история 5 баллов + Основы права 10 баллов" },
      { id: "int_law", name: "Международное право", requirements: "Всемирная история 5 баллов + Основы права 10 баллов" }
    ]
  },
  "humanities": {
    name: "Высшая Гуманитарная Школа",
    avatarStyles: [
      { id: 'hum_avatar_1', src: 'https://placehold.co/100x100/AF7AC5/FFFFFF?text=Hum1', name: 'Лингвист' },
      { id: 'hum_avatar_2', src: 'https://placehold.co/100x100/D7BDE2/FFFFFF?text=Hum2', name: 'Психолог' },
      { id: 'hum_avatar_3', src: 'https://placehold.co/100x100/884EA0/FFFFFF?text=Hum3', name: 'Туризм' },
    ],
    ieltsRequirement: "Общий балл IELTS не ниже 5.5 (для некоторых специальностей может быть выше).",
    specializations: [
      { id: "translation", name: "BA in Translation Studies", requirements: "Всемирная история 5 баллов + Иностранный язык 5 баллов" },
      { id: "app_ling", name: "BA in Applied Linguistics", requirements: "Всемирная история 5 баллов + Иностранный язык 5 баллов" },
      { id: "hospitality_bsm", name: "BSM in Hospitality", requirements: "География 5 баллов + Иностранный язык 5 баллов" },
      { id: "tourism_bsm", name: "BSM in Tourism", requirements: "География 5 баллов + Иностранный язык 5 баллов" },
      { id: "psychology", name: "Психология", requirements: "География 5 баллов + Биология 5 баллов" }
    ]
  },
  "journalism": {
    name: "Международная Школа Журналистики",
    avatarStyles: [
      { id: 'jour_avatar_1', src: 'https://placehold.co/100x100/E74C3C/FFFFFF?text=Jour1', name: 'Репортер' },
      { id: 'jour_avatar_2', src: 'https://placehold.co/100x100/F0B27A/FFFFFF?text=Jour2', name: 'Медиа' },
      { id: 'jour_avatar_3', src: 'https://placehold.co/100x100/BA4A00/FFFFFF?text=Jour3', name: 'Писатель' },
    ],
    ieltsRequirement: "Общий балл IELTS не ниже 6.0.",
    specializations: [
      { id: "app_ling_jour", name: "BA in Applied Linguistics (Журналистика)", requirements: "Всемирная история 5 баллов + Иностранный язык 5 баллов" },
      { id: "hospitality_bsm_jour", name: "BSM in Hospitality (Журналистика)", requirements: "География 5 баллов + Иностранный язык 5 баллов" },
      { id: "tourism_bsm_jour", name: "BSM in Tourism (Журналистика)", requirements: "География 5 баллов + Иностранный язык 5 баллов" },
      { id: "int_journalism", name: "BSS International Journalism", requirements: "Творческие экзамены 50 баллов" }
    ]
  }
};

// --- Page Navigation ---
function navigateTo(pageId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
  window.scrollTo(0, 0);
}

// --- Modal Functions ---
const modal = document.getElementById('messageModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');

function showModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.innerHTML = message;
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// --- Registration Page Logic ---
const schoolSelect = document.getElementById('schoolSelect');
const specializationSelect = document.getElementById('specializationSelect');
const specializationRequirements = document.getElementById('specializationRequirements');
const avatarCustomizationSection = document.getElementById('avatarCustomizationSection');
const avatarOptionsContainer = document.getElementById('avatarOptionsContainer');
const avatarPreviewText = document.getElementById('avatarPreviewText');
const selectedAvatarImage = document.getElementById('selectedAvatarImage');

function populateSchools() {
  for (const schoolId in schoolsData) {
    const option = document.createElement('option');
    option.value = schoolId;
    option.textContent = schoolsData[schoolId].name;
    schoolSelect.appendChild(option);
  }
}

schoolSelect.addEventListener('change', function() {
  const schoolId = this.value;
  specializationSelect.innerHTML = '<option value="">-- Выбери специальность --</option>';
  specializationRequirements.textContent = '';
  specializationSelect.disabled = true;
  avatarOptionsContainer.innerHTML = '';
  avatarCustomizationSection.classList.add('hidden');

  if (schoolId && schoolsData[schoolId]) {
    const school = schoolsData[schoolId];
    school.specializations.forEach(spec => {
      const option = document.createElement('option');
      option.value = spec.id;
      option.textContent = spec.name;
      specializationSelect.appendChild(option);
    });
    specializationSelect.disabled = false;

    if (school.avatarStyles && school.avatarStyles.length > 0) {
      avatarCustomizationSection.classList.remove('hidden');
      school.avatarStyles.forEach(style => {
        const avatarDiv = document.createElement('div');
        avatarDiv.classList.add('avatar-option', 'p-1', 'flex', 'flex-col', 'items-center');
        const img = document.createElement('img');
        img.src = style.src;
        img.alt = style.name;
        img.dataset.styleId = style.id;
        img.onclick = () => selectAvatar(style.src, style.id);
        const nameSpan = document.createElement('span');
        nameSpan.classList.add('text-xs', 'mt-1', 'text-center');
        nameSpan.textContent = style.name;
        avatarDiv.appendChild(img);
        avatarDiv.appendChild(nameSpan);
        avatarOptionsContainer.appendChild(avatarDiv);
      });
    }
    applicantData.ieltsSchoolRequirement = school.ieltsRequirement;
  }
});

function selectAvatar(src, styleId) {
  applicantData.avatarStyle = styleId;
  selectedAvatarImage.src = src;
  selectedAvatarImage.classList.remove('hidden');
  avatarPreviewText.classList.add('hidden');
  document.querySelectorAll('#avatarOptionsContainer img').forEach(img => img.classList.remove('selected'));
  document.querySelector(`#avatarOptionsContainer img[data-style-id='${styleId}']`).classList.add('selected');
}

specializationSelect.addEventListener('change', function() {
  const schoolId = schoolSelect.value;
  const specId = this.value;
  if (schoolId && specId && schoolsData[schoolId]) {
    const spec = schoolsData[schoolId].specializations.find(s => s.id === specId);
    if (spec) {
      specializationRequirements.textContent = `Требования ЕНТ: ${spec.requirements}`;
    }
  } else {
    specializationRequirements.textContent = '';
  }
});

function submitRegistration() {
  const avatarNameInput = document.getElementById('avatarName');
  const passwordInput = document.getElementById('password');
  applicantData.avatarName = avatarNameInput.value.trim();
  applicantData.password = passwordInput.value;
  applicantData.schoolId = schoolSelect.value;
  applicantData.school = schoolsData[applicantData.schoolId]?.name;
  applicantData.specializationId = specializationSelect.value;
  const school = schoolsData[applicantData.schoolId];
  if (school) {
    const spec = school.specializations.find(s => s.id === applicantData.specializationId);
    applicantData.specialization = spec?.name;
  }

  if (!applicantData.avatarName || !applicantData.password || !applicantData.schoolId || !applicantData.specializationId || !applicantData.avatarStyle) {
    showModal("Ошибка Регистрации", "Пожалуйста, заполни все поля и выбери аватар, школу и специальность.");
    return;
  }

  document.getElementById('avatarNameDisplay').textContent = applicantData.avatarName;
  document.getElementById('avatarNameDisplayFinal').textContent = applicantData.avatarName;
  document.getElementById('dashboardAvatarName').textContent = applicantData.avatarName;

  const ieltsSchoolReqElement = document.getElementById('ieltsSchoolRequirement');
  if (ieltsSchoolReqElement && applicantData.ieltsSchoolRequirement) {
    ieltsSchoolReqElement.textContent = `Требования для твоей школы: ${applicantData.ieltsSchoolRequirement}`;
  }

  updateProgress('personalInfoProgress', 10);
  navigateTo('personalInfoPage');
}

// --- Personal Info Page Logic ---
const birthDateInput = document.getElementById('birthDate');
const parentGuardianSection = document.getElementById('parentGuardianSection');

birthDateInput.addEventListener('change', function() {
  const birthDate = new Date(this.value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    applicantData.isUnderage = true;
    parentGuardianSection.classList.remove('hidden');
    document.getElementById('parentFullName').required = true;
    document.getElementById('birthCertificate').required = true;
    document.getElementById('parentIdentityDocument').required = true;
  } else {
    applicantData.isUnderage = false;
    parentGuardianSection.classList.add('hidden');
    document.getElementById('parentFullName').required = false;
    document.getElementById('birthCertificate').required = false;
    document.getElementById('parentIdentityDocument').required = false;
  }
});

function submitPersonalInfo() {
  const form = document.getElementById('personalInfoForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    showModal("Ошибка", "Пожалуйста, заполни все обязательные поля.");
    return;
  }

  applicantData.personalInfo.fullName = document.getElementById('fullName').value;
  applicantData.personalInfo.birthDate = document.getElementById('birthDate').value;
  applicantData.personalInfo.phoneNumber = document.getElementById('phoneNumber').value;
  applicantData.personalInfo.email = document.getElementById('email').value;
  applicantData.documents.identityDocument = document.getElementById('identityDocument').files[0]?.name || 'Не загружено';

  if (applicantData.isUnderage) {
    applicantData.personalInfo.parentFullName = document.getElementById('parentFullName').value;
    applicantData.personalInfo.parentPhoneNumber = document.getElementById('parentPhoneNumber').value;
    applicantData.documents.birthCertificate = document.getElementById('birthCertificate').files[0]?.name || 'Не загружено';
    applicantData.documents.parentIdentityDocument = document.getElementById('parentIdentityDocument').files[0]?.name || 'Не загружено';

    if (!applicantData.personalInfo.parentFullName || !applicantData.documents.birthCertificate || !applicantData.documents.parentIdentityDocument) {
      showModal("Ошибка", "Для несовершеннолетних все поля и документы родителя/опекуна обязательны.");
      return;
    }
    showModal("Согласие Родителя", "Симуляция: Запрос на подписание согласия отправлен родителю/опекуну через TrustContract. После подтверждения вы сможете продолжить.<br>(Нажмите ОК для симуляции подтверждения)");
  }

  updateProgress('documentsProgress', 30);
  navigateTo('documentsPage');
}

// --- Documents Page Logic ---
function verifyENT() {
  const entNumber = document.getElementById('entNumber').value;
  const resultP = document.getElementById('entVerificationResult');
  if (!entNumber) {
    resultP.textContent = "Пожалуйста, введи номер ЕНТ.";
    resultP.className = 'text-xs mt-1 text-red-500';
    return;
  }
  resultP.textContent = "ИИ проверяет ЕНТ на подлинность...";
  resultP.className = 'text-xs mt-1 text-blue-500';
  setTimeout(() => {
    const isAuthentic = Math.random() > 0.1;
    const randomScore = Math.floor(Math.random() * (140 - 50 + 1)) + 50;
    if (isAuthentic) {
      resultP.textContent = `ЕНТ подтвержден! Твой результат (симуляция): ${randomScore} баллов.`;
      resultP.className = 'text-xs mt-1 text-green-600';
      applicantData.documents.entCertificate = `ЕНТ (${entNumber}) - ${randomScore} баллов`;
      updateDocumentProgress();
    } else {
      resultP.textContent = "Ошибка проверки ЕНТ. Пожалуйста, проверь номер или попробуй позже.";
      resultP.className = 'text-xs mt-1 text-red-600';
    }
  }, 2000);
}

function verifyIELTS() {
  const ieltsNumber = document.getElementById('ieltsNumber').value;
  const ieltsFile = document.getElementById('ieltsCertificateFile').files[0];
  const resultP = document.getElementById('ieltsVerificationResult');

  if (!ieltsNumber || !ieltsFile) {
    resultP.textContent = "Пожалуйста, введи номер сертификата и загрузи файл.";
    resultP.className = 'text-xs mt-1 text-red-500';
    return;
  }
  resultP.textContent = "ИИ проверяет IELTS на достоверность...";
  resultP.className = 'text-xs mt-1 text-blue-500';
  setTimeout(() => {
    const isAuthentic = Math.random() > 0.1;
    const randomScore = (Math.random() * (9 - 5) + 5).toFixed(1);
    if (isAuthentic) {
      resultP.textContent = `IELTS сертификат (симуляция) подтвержден! Общий балл: ${randomScore}.`;
      resultP.className = 'text-xs mt-1 text-green-600';
      applicantData.documents.ieltsCertificate = `IELTS (${ieltsNumber}) - ${randomScore} балла`;
      updateDocumentProgress();
    } else {
      resultP.textContent = "Ошибка проверки IELTS. Пожалуйста, проверь данные или попробуй позже.";
      resultP.className = 'text-xs mt-1 text-red-600';
    }
  }, 2000);
}

function verifyMotivationLetter() {
  const letterFile = document.getElementById('motivationLetter').files[0];
  const resultUl = document.getElementById('motivationLetterResult');
  resultUl.innerHTML = '';

  if (!letterFile) {
    const li = document.createElement('li');
    li.textContent = "Пожалуйста, загрузи файл мотивационного письма.";
    li.className = 'text-red-500';
    resultUl.appendChild(li);
    return;
  }

  const liProgress = document.createElement('li');
  liProgress.textContent = "ИИ анализирует твое мотивационное письмо...";
  liProgress.className = 'text-blue-500';
  resultUl.appendChild(liProgress);

  setTimeout(() => {
    resultUl.innerHTML = '';
    const checks = [
      { name: "Шрифт (Times New Roman)", pass: Math.random() > 0.3 },
      { name: "Кегль (12)", pass: Math.random() > 0.3 },
      { name: "Интервал (1.5)", pass: Math.random() > 0.2 },
      { name: "Количество слов (мин. 500)", pass: Math.random() > 0.1, value: Math.floor(Math.random() * (700 - 300 + 1)) + 300 },
      { name: "Структура (введение, осн. часть, заключение)", pass: Math.random() > 0.2 }
    ];

    let allPass = true;
    checks.forEach(check => {
      const li = document.createElement('li');
      let text = `${check.name}: `;
      if (check.name.includes("Количество слов")) {
        text += `${check.value} слов - `;
      }
      text += check.pass ? "ОК" : "Требует доработки";
      li.textContent = text;
      li.className = check.pass ? 'text-green-600' : 'text-red-600';
      resultUl.appendChild(li);
      if (!check.pass) allPass = false;
    });

    if (allPass) {
      applicantData.documents.motivationLetter = `Мотивационное письмо - Проверено`;
      updateDocumentProgress();
    }
  }, 2500);
}

function updateDocumentProgress() {
  let completedDocs = 0;
  const totalDocsRequired = 7;

  if (applicantData.documents.identityDocument !== 'Не загружено') completedDocs++;
  if (applicantData.documents.entCertificate) completedDocs++;
  if (applicantData.documents.ieltsCertificate) completedDocs++;
  if (document.getElementById('photo3x4').files.length > 0) completedDocs++;
  if (document.getElementById('medicalDocuments').files.length > 0) completedDocs++;
  if (applicantData.documents.motivationLetter) completedDocs++;
  if (document.getElementById('recommendationLetter').files.length > 0) completedDocs++;

  if (document.getElementById('grantCertificate').files.length > 0) {
    applicantData.grantApplied = true;
  }

  let progress = 30 + Math.round((completedDocs / totalDocsRequired) * 50);
  progress = Math.min(progress, 80);
  updateProgress('documentsProgress', progress);
}

document.querySelectorAll('#documentsForm input[type="file"]').forEach(input => {
  input.addEventListener('change', updateDocumentProgress);
});

function submitDocuments() {
  const schoolCert = document.getElementById('schoolCertificate').files.length > 0;
  const photo = document.getElementById('photo3x4').files.length > 0;
  const medical = document.getElementById('medicalDocuments').files.length > 0;
  const recommendation = document.getElementById('recommendationLetter').files.length > 0;

  if (!schoolCert || !photo || !medical || !recommendation || !applicantData.documents.entCertificate || !applicantData.documents.ieltsCertificate || !applicantData.documents.motivationLetter) {
    showModal("Не все артефакты собраны!", "Пожалуйста, загрузи все обязательные документы и дождись результатов ИИ-проверки для ЕНТ, IELTS и мотивационного письма.");
    return;
  }

  applicantData.documents.schoolCertificate = document.getElementById('schoolCertificate').files[0]?.name;
  applicantData.documents.photo3x4 = document.getElementById('photo3x4').files[0]?.name;
  applicantData.documents.medicalDocuments = document.getElementById('medicalDocuments').files[0]?.name;
  applicantData.documents.recommendationLetter = document.getElementById('recommendationLetter').files[0]?.name;
  if (document.getElementById('grantCertificate').files.length > 0) {
    applicantData.documents.grantCertificate = document.getElementById('grantCertificate').files[0]?.name;
  }

  document.getElementById('summaryAvatarName').textContent = applicantData.avatarName;
  document.getElementById('summarySchool').textContent = applicantData.school;
  document.getElementById('summarySpecialization').textContent = applicantData.specialization;
  document.getElementById('summaryFullName').textContent = applicantData.personalInfo.fullName;
  document.getElementById('summaryEmail').textContent = applicantData.personalInfo.email;

  const docCount = Object.keys(applicantData.documents).filter(key => applicantData.documents[key] && applicantData.documents[key] !== 'Не загружено').length;
  document.getElementById('summaryDocumentsCount').textContent = docCount;

  updateProgress('finalProgress', 90);
  navigateTo('finalSubmissionPage');
}

// --- Final Submission Page Logic ---
function initiateTrustContractSignature() {
  showModal("TrustContract Подписание", "Симуляция: Вы будете перенаправлены на безопасную страницу TrustContract для подписания заявления...<br><br>Пожалуйста, введите код из SMS (симуляция): <input type='text' id='smsCodeTrust' class='p-1 border rounded' placeholder='123456'><br><br>(Нажмите ОК для симуляции успешного подписания после ввода любого кода)");

  const modalOkButton = document.getElementById('modalOkButton');
  modalOkButton.onclick = function() {
    const smsCode = document.getElementById('smsCodeTrust')?.value;
    if (smsCode) {
      closeModal();
      modalOkButton.onclick = closeModal;
      showModal("Поздравляем!", "Заявление успешно подписан через TrustContract! Твоя заявка отправлена на рассмотрение.");
      document.getElementById('dashboardSchool').textContent = applicantData.school;
      document.getElementById('dashboardSpecialization').textContent = applicantData.specialization;
      const docCount = Object.keys(applicantData.documents).filter(key => applicantData.documents[key] && applicantData.documents[key] !== 'Не загружено').length;
      document.getElementById('dashboardDocumentsCount').textContent = docCount;
      document.getElementById('statusUpdateDate').textContent = new Date().toLocaleDateString('ru-RU');
      updateProgress('finalProgress', 100);
      navigateTo('dashboardPage');
    } else {
      alert("Пожалуйста, введите симулированный SMS код.");
    }
  };
}

// --- Utility Functions ---
function updateProgress(progressBarId, percentage) {
  const progressBar = document.getElementById(progressBarId);
  if (progressBar) {
    progressBar.style.width = percentage + '%';
    progressBar.textContent = percentage + '%';
    currentProgress = percentage;
  }
}

// --- Initial Setup ---
window.onload = () => {
  populateSchools();
  navigateTo('landingPage');
};