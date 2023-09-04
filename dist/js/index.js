var usersname, switchno = 10, inputidcounter = 13, resultidcounter = 13;
var PersonalInfo = ['profile-job-title', 'firstname', 'lastname', 'countrycode', 'phone', 'country', 'state', 'user-description', 'address', 'postalcode', 'email'];
var ProffesionalInfo = ['compony', 'job-title', 'job-start-date', 'job-end-date', 'proffesional-description', 'current-job'];
var EducationalInfo = ['institute-name', 'institute-location', 'institute-start-date', 'institute-end-date', 'current-institute', 'institute-degree', 'institute-education', 'institute-description', 'institute-grade', 'institute-grade-in'];
var AdditionalSectionInfo = ['additional-description', 'additional-section-content', 'additional-section-title'];
var AccomplishmentInfo = ['award-name', 'awarded-by', 'award-date', 'award-description'];
var CertificationInfo = ['certification-link', 'certification-date', 'certification-by', 'certification-name', 'certification-description'];
var ProjectInfo = ['project-name', 'project-link', 'project-start', 'project-end', 'project-description', 'current-project']
var SocialInfo = ['social-link', 'social-link-for'];
var PublicationInfo = ['publication-link', 'publication-date', 'publication-details', 'publication-name', 'publication-description'];
var ResearchInfo = ['research-start-date', 'research-end-date', 'research-details', 'research-name', 'research-description', 'current-research'];
var Sections = ["Personal Information", "Proffesional Experince", "Education", "Key Skills", "Technical Skills", "Languages", "Certifications", "Accomplishments", "Projects", "Hobbies", "Publications", "Research", "Custom Section", "Declaration"]
const jsonData = {
    // professionalData: [],
    // educationalData: [],
    // socialData: [],
    // keySkillData: [],
    // technicalSkillData: [],
    // additionalData: [],
    // accomplishmentData: [],
    // certificationData: [],
    // projectData: [],
    // hobbiesData: [],
    // publicationData: [],
    // researchData: []
};
document.addEventListener('DOMContentLoaded', () => {
    var deletebutton = Array.from(document.querySelectorAll('.delete-button'));
    deletebutton.forEach(button => {
        button.addEventListener('click', () => {
            var id = (button.id).replaceAll('delete', '');
            var result = confirm("Do you really want to remove this Section ?");
            if (result) {
                document.getElementById(`div-input-${id}`).classList.add('is-hidden');
                document.getElementById(`div-result-${id}`).classList.add('is-hidden');
                document.getElementById(id).classList.add('is-hidden');
                document.getElementById(`additional-${id}`).parentElement.classList.remove('is-hidden');
            }
        })
    });

    document.getElementById('close-section').addEventListener('click', () => {
        document.getElementById('custom-title-input').classList.add('is-hidden');
    });
    document.getElementById('create-section').addEventListener('click', () => {
        CreateAdditionalSection();
    });
    document.getElementById('additional-12').addEventListener('click', () => {
        document.getElementById('custom-title-input').classList.remove('is-hidden');
    })
    var size = Array.from(document.querySelectorAll('.showcontent'));
    for (let i = 1; i <= size.length; i++) {
        document.getElementById(`switch${i}`).addEventListener('change', () => {
            RemoveContent(i);
        });
    }
    QuillEditor('proffesional', '0');
    QuillEditor('project', '0');
    QuillEditor('user', '');
    QuillEditor('certification', '0');
    QuillEditor('award', '0');
    QuillEditor('institute', '0');
    QuillEditor('research', '0');
    QuillEditor('publication', '0');
    QuillEditor('declaration', '');
    document.getElementById('imageswitch').addEventListener('change', () => {
        document.getElementById('imagecontainer').classList.toggle('is-hidden');
    });

    document.getElementById('edit').addEventListener('click', () => {
        document.getElementById('edit').classList.toggle('has-background-link-light');
        const menuButtons = document.getElementById('menubuttons');
        menuButtons.style.display = (menuButtons.style.display === 'block') ? 'none' : 'block';
    });

    // Get the color picker element
    const colorPicker = document.getElementById('colorpicker');

    // Set an initial color value
    colorPicker.value = '#2f8d46';

    // Add an event listener to detect changes in the color picker
    colorPicker.addEventListener('change', function () {
        // Get the selected color
        const selectedColor = colorPicker.value;

        // Add or update the styles based on the selected color
        const elementsToChange = document.querySelectorAll('.customborderColor, .customcolor, .custombackgroundColor');
        elementsToChange.forEach(function (element) {
            if (element.classList.contains('customborderColor')) {
                element.style.borderTopColor = selectedColor;
            }
            if (element.classList.contains('customcolor')) {
                element.style.color = selectedColor;
            }
            if (element.classList.contains('custombackgroundColor')) {
                element.style.backgroundColor = selectedColor;
            }
        });
    });

    document.getElementById('userimage').addEventListener('change', function (event) {
        var input = event.target;
        var reader = new FileReader();

        reader.onload = function () {
            var previewImage = document.getElementById('userimage-result');
            previewImage.src = reader.result;
        };

        reader.readAsDataURL(input.files[0]);
    });


    const toggleButtons = document.querySelectorAll('.collapse');

    toggleButtons.forEach(button => {
        CollapseDiv(button);
    });
    AddEventListener();
});

function AddAdditionalSection(id) {
    document.getElementById(`div-result-${id}`).classList.remove('is-hidden');
    document.getElementById(`div-input-${id}`).classList.remove('is-hidden');
    document.getElementById(id).classList.remove('is-hidden');
    document.getElementById(`additional-${id}`).parentNode.classList.add('is-hidden');
}
// Collapse the DIV
function CollapseDiv(button) {
    button.addEventListener('click', function () {
        const contentDiv = this.parentElement.parentElement.nextElementSibling;
        // Toggle the visibility of the content div
        contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';

        // Toggle the button text and animation
        if (contentDiv.style.display === 'none') {
            this.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
        } else {
            this.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
        }
    });
}
// Redirect to particular section
function RedirectDiv(div) {
    div = document.getElementById(div);
    var elem = document.getElementById(div);
    div.style.display = 'block';
    var scrollableDiv = document.getElementById("userdetails");
    if (elem && scrollableDiv) {
        scrollableDiv.scrollTo({
            top: elem.offsetTop,
            behavior: "smooth"
        });
    }
}
// Print PDF
function printDiv() {
    const divToPrint = document.getElementById('preview').innerHTML;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    iframe.contentDocument.open();
    iframe.contentDocument.write(`
      <html>
      <head>
        <title>Print Preview</title>
        <link rel="stylesheet" href="./dist/css/bulma.min.css">
        <link rel="stylesheet" href="./dist/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
          body {
            margin: 0;
            padding: 0;
          }
          
          @media print {
            body * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              margin :0 important!;
            }
          }
        </style>
      </head>
      <body>
        ${divToPrint}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              setTimeout(function() {
                window.onafterprint = function() {
                  setTimeout(function() {
                    window.location.reload();
                  }, 0);
                };
                window.close();
              }, 500);
            }, 0);
          };
        </script>
      </body>
      </html>
    `);
    iframe.contentDocument.close();

    iframe.onload = function () {
        setTimeout(function () {
            document.body.removeChild(iframe);
        }, 100);
    };
}
// Show preview
function showPreview() {
    const divToPreview = document.getElementById('preview').innerHTML;

    // Create the preview window
    const previewWindow = document.createElement('div');
    previewWindow.className = 'preview-window';
    previewWindow.innerHTML = divToPreview;

    // Create the close button
    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.textContent = 'X';

    // Add event listener to close the preview window
    closeButton.addEventListener('click', function () {
        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('show-overlay');
        document.body.removeChild(overlay);
        document.body.removeChild(previewWindow);
    });

    // Append the close button to the preview window
    previewWindow.appendChild(closeButton);

    // Create the overlay background
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // Append the overlay and preview window to the body
    document.body.appendChild(overlay);
    document.body.appendChild(previewWindow);

    // Show the overlay
    overlay.classList.add('show-overlay');
}
// Function to create new Sub Section
const counters = {
    proffesional: 1,
    educational: 1,
    social: 1,
    keyskill: 1,
    technicalskill: 1,
    languages: 1,
    additional: 1,
    accomplishment: 1,
    certification: 1,
    project: 1,
    hobbies: 1,
    publication: 1,
    research: 1,
};
function Newsubsection(id, value) {
    // Update the counter for the given subsection
    const number = counters[value];
    const resultdiv = document.createElement('div');
    const resultdata = document.getElementById(`${value}-result0`).innerHTML.toString().replaceAll('0', number);
    resultdiv.innerHTML = resultdata;
    resultdiv.id = `${value}-result${number}`;
    document.getElementById(`${value}-result`).appendChild(resultdiv);
    const data = document.getElementById(id).innerHTML.toString().replaceAll('0', number).replaceAll('is-hidden', '');
    let datadiv;
    if (value === 'social') {
        const datatable = document.createElement('tbody');
        datatable.innerHTML = data;
        datatable.id = value + number;
        datadiv = datatable;
    } else {
        datadiv = document.createElement('div');
        datadiv.innerHTML = data;
        datadiv.id = value + number;
    }
    document.getElementById(value).appendChild(datadiv);
    counters[value]++;
    AddEventListener();
}
function QuillEditor(fieldname, number) {
    var quill = new Quill(`#${fieldname}-description${number}`, {
        theme: 'snow'
    });
}
// Function to removesubsection
function RemoveSubSection(elementId, value) {
    counters[value]--;
    const number = counters[value];
    const element = document.getElementById(elementId);
    const resultelement = document.getElementById(`${value}-result${number}`)
    if (resultelement) {
        resultelement.parentNode.removeChild(resultelement);
    }
    if (element) {
        element.parentNode.removeChild(element);
    }
}
// Functions to show the data on document
function ShowPersonalInfo() {
    var jobTitleInput = document.getElementById('profile-job-title');
    var jobTitleResult = document.getElementById('profile-job-title-result');
    jobTitleResult.innerHTML = '';
    if (jobTitleInput.value) {
        jobTitleResult.innerHTML = jobTitleInput.value;
        jsonData['jobTitle'] = jobTitleInput.value; // Add jobTitle to jsonData
    }

    var firstNameInput = document.getElementById('firstname');
    var lastNameInput = document.getElementById('lastname');
    var nameResult = document.getElementById('name-result');
    nameResult.innerHTML = '';
    if (firstNameInput.value || lastNameInput.value) {
        nameResult.innerHTML = capitalizeFirstLetter(firstNameInput.value) + ' ' + capitalizeFirstLetter(lastNameInput.value);
        usersname = firstNameInput.value + ' ' + lastNameInput.value;
        document.querySelector('#declaration-description .ql-editor').innerHTML = `I ${usersname} declare that all the above information is correct and I will be responsible if found any mistake in the information.`;
        jsonData['fullName'] = nameResult.innerHTML; // Add fullName to jsonData
    }

    var emailInput = document.getElementById('email');
    var emailResult = document.getElementById('email-result');
    emailResult.innerHTML = '';
    if (emailInput.value) {
        emailResult.innerHTML = `<i class="fa-solid fa-envelope"></i> <span>` + emailInput.value + '</span>';
        jsonData['email'] = emailInput.value; // Add email to jsonData
    }

    var countryCodeInput = document.getElementById('countrycode');
    var phoneInput = document.getElementById('phone');
    var phoneResult = document.getElementById('phone-result');
    phoneResult.innerHTML = '';
    if (countryCodeInput.value && phoneInput.value) {
        phoneResult.innerHTML = '<i class="fa-solid fa-phone mr-2"></i>' + '+' + countryCodeInput.value + ' ' + phoneInput.value;
        jsonData['phone'] = phoneResult.innerHTML; // Add phone to jsonData
    }

    var addressInput = document.getElementById('address');
    var cityInput = document.getElementById('city');
    var stateInput = document.getElementById('state');
    var countryInput = document.getElementById('country');
    var postalCodeInput = document.getElementById('postalcode');
    var addressResult = document.getElementById('address-result');
    addressResult.innerHTML = '';
    var addressData = [];
    if (addressInput.value) {
        addressData.push(`<i class="fa-solid fa-house mr-2"></i>${addressInput.value}`);
    }
    if (cityInput.value) {
        addressData.push(cityInput.value);
    }
    if (stateInput.value) {
        addressData.push(stateInput.value);
    }
    if (countryInput.value) {
        addressData.push(countryInput.value);
    }
    if (postalCodeInput.value) {
        addressData.push(postalCodeInput.value);
    }

    if (addressData.length > 0) {
        addressResult.innerHTML = addressData.join(', ');
        // Create a separate object to store address details
        jsonData['address'] = {
            street: addressInput.value,
            city: cityInput.value,
            state: stateInput.value,
            country: countryInput.value,
            postalCode: postalCodeInput.value
        };
    }

    var userDescriptionInput = document.getElementById('user-description');
    var userDescriptionResult = document.getElementById('user-description-result');
    userDescriptionResult.innerHTML = '';
    if (userDescriptionInput.textContent) {
        userDescriptionResult.innerHTML = getQuillContent('user-description');
        jsonData['userDescription'] = userDescriptionResult.innerHTML; // Add userDescription to jsonData
    }
}
function ShowProffesionalInfo() {
    const professionalInfoData = {
        professionalData: [],
    };
    professionalInfoData.professionalData = []; // Clear previous data

    for (let i = 0; i < counters.proffesional; i++) {
        var companyInput = document.getElementById(`compony${i}`);
        var companyResult = document.getElementById(`compony-result${i}`);
        var jobTitleInput = document.getElementById(`job-title${i}`);
        var jobTitleResult = document.getElementById(`job-title-result${i}`);
        var jobStartDateInput = document.getElementById(`job-start-date${i}`);
        var jobStartDateResult = document.getElementById(`job-start-date-result${i}`);
        var currentJobCheckbox = document.getElementById(`current-job${i}`);
        var jobEndDateResult = document.getElementById(`job-end-date-result${i}`);
        var jobDescriptionResult = document.getElementById(`job-description-result${i}`);
        var quillContent = getQuillContent(`proffesional-description${i}`);

        // Create an object to store the data for this iteration
        const professionalDataItem = {
            company: companyInput.value,
            jobTitle: jobTitleInput.value,
            jobStartDate: jobStartDateInput.value,
            isCurrentJob: currentJobCheckbox.checked,
            jobEndDate: '',
            jobDescription: quillContent,
        };

        if (!professionalDataItem.isCurrentJob) {
            var jobEndDateInput = document.getElementById(`job-end-date${i}`);
            professionalDataItem.jobEndDate = jobEndDateInput.value;
        }

        // Calculate experience if both start and end dates are available
        if (professionalDataItem.jobStartDate && professionalDataItem.jobEndDate) {
            professionalDataItem.experience = calculateExperience(professionalDataItem.jobStartDate, professionalDataItem.jobEndDate);
        }

        // Append the data object to the JSON array
        professionalInfoData.professionalData.push(professionalDataItem);

        // Update the DOM elements
        companyResult.innerHTML = professionalDataItem.company;
        jobTitleResult.innerHTML = professionalDataItem.jobTitle;
        jobStartDateResult.innerHTML = professionalDataItem.jobStartDate ? ` | ${professionalDataItem.jobStartDate}` : '';
        jobEndDateResult.innerHTML = professionalDataItem.isCurrentJob ? '<strong>- </strong>Present' : professionalDataItem.jobEndDate ? `<strong> - </strong>${professionalDataItem.jobEndDate}${professionalDataItem.experience ? `<span style="width:50px;">( ${professionalDataItem.experience} )</span>` : ''}` : '';
        jobDescriptionResult.innerHTML = professionalDataItem.jobDescription;
    }

    // Convert the JSON object to a string to save it or send it elsewhere
    jsonData.professionalData = professionalInfoData;
}
function ShowEducationalInfo() {
    const educationalInfoData = {
        educationalData: []
    };
    educationalInfoData.educationalData = []; // Clear previous data

    for (let i = 0; i < counters.educational; i++) {
        // Get the data for each entry in the Educational section
        document.getElementById(`institute-location-result${i}`).innerHTML = ' at ' + document.getElementById(`institute-location${i}`).value;
        document.getElementById(`institute-name-result${i}`).innerHTML = ' from ' + document.getElementById(`institute-name${i}`).value;
        document.getElementById(`current-institute${i}`).checked ? document.getElementById(`institute-end-date-result${i}`).innerHTML = "- Present" : document.getElementById(`institute-end-date-result${i}`).innerHTML = ' - ' + document.getElementById(`institute-end-date${i}`).value;
        document.getElementById(`institute-start-date-result${i}`).innerHTML = ' | ' + document.getElementById(`institute-start-date${i}`).value;
        document.getElementById(`institute-description-result${i}`).innerHTML = document.getElementById(`institute-description${i}`).textContent;
        document.getElementById(`institute-education-result${i}`).innerHTML = document.getElementById(`institute-degree${i}`).value + ' in ' + document.getElementById(`institute-education${i}`).value;
        document.getElementById(`institute-grade-result${i}`).innerHTML = ' With grade ' + '<span class="has-text-weight-semibold has-text-grey">' + document.getElementById(`institute-grade${i}`).value + ' ' + document.getElementById(`institute-grade-in${i}`).value + '</span>';
        // Append the data object to the JSON array
    }

    // Convert the JSON object to a string to save it or send it elsewhere
    jsonData.educationalData = educationalInfoData;
}
function ShowKeySkills() {
    // Create an array to store key skills
    const keySkillsArray = [];

    for (let i = 0; i < counters.keyskill; i++) {
        // Get the value of each key skill
        const keySkill = document.getElementById(`key-skill${i}`).value;

        // Add the key skill to the array
        if (keySkill) {
            keySkillsArray.push(keySkill);
        }

        // Update the DOM elements (similar to the previous function)
        var result = document.getElementById(`keyskill-result${i}`);
        result.innerHTML = '';
        result.innerHTML = '<li>' + keySkill + '</li>';
    }

    // Store the key skills array in the JSON object
    jsonData.keySkills = keySkillsArray;
}
function TechnicalSkills() {
    // Create an array to store technical skills
    const technicalSkillsArray = [];

    for (let i = 0; i < counters.technicalskill; i++) {
        // Get the value of each technical skill
        const technicalSkill = document.getElementById(`technical-skill${i}`).value;

        // Add the technical skill to the array
        if (technicalSkill) {
            technicalSkillsArray.push(technicalSkill);
        }

        // Update the DOM element
        document.getElementById(`technicalskill-result${i}`).innerHTML = technicalSkill;
    }

    // Store the technical skills array in the JSON object
    jsonData.technicalSkillData = technicalSkillsArray;
}
function ShowLanguage() {
    // Create an array to store known languages
    const knownLanguagesArray = [];

    for (let i = 0; i < counters.languages; i++) {
        // Get the value of each known language
        const knownLanguage = document.getElementById(`known-language${i}`).value;

        // Add the known language to the array
        if (knownLanguage) {
            knownLanguagesArray.push(knownLanguage);
        }

        // Update the DOM element
        document.getElementById(`languages-result${i}`).innerHTML = knownLanguage;
    }

    // Store the known languages array in the JSON object
    jsonData.knownLanguages = knownLanguagesArray;
}
function ShowAccomplishment() {
    // Create an array to store accomplishments
    const accomplishmentsArray = [];

    for (let i = counters.accomplishment; i > 0; i--) {
        // Get the award name and awarded by values
        const awardName = document.getElementById(`award-name${i - 1}`).value;
        const awardedBy = document.getElementById(`awarded-by${i - 1}`).value;

        // Get the award date value
        const awardDate = document.getElementById(`award-date${i - 1}`).value;

        // Get the award description value using the getQuillContent() function
        const awardDescription = getQuillContent(`award-description${i - 1}`);

        // Create an object for each accomplishment
        const accomplishment = {
            awardName: awardName || '',
            awardedBy: awardedBy || '',
            awardDate: awardDate || '',
            awardDescription: awardDescription || ''
        };

        // Add the accomplishment object to the array
        accomplishmentsArray.push(accomplishment);

        // Update the DOM elements
        var awarnnameresult = document.getElementById(`award-result${i - 1}`);
        awarnnameresult.innerHTML = awardName ? (awardName + ' by ' + awardedBy) : '';
        var dateresult = document.getElementById(`award-date-result${i - 1}`);
        dateresult.innerHTML = awardDate;
        var descriptionresult = document.getElementById(`award-description-result${i - 1}`);
        descriptionresult.innerHTML = awardDescription;
    }

    // Store the accomplishments array in the JSON object
    jsonData.accomplishmentData = accomplishmentsArray;
}
function ShowCertifications() {
    // Create an array to store certifications
    const certificationsArray = [];

    for (let i = 0; i < counters.certification; i++) {
        // Get the certification link value
        const certificationLink = document.getElementById(`certification-link${i}`).value;

        // Get the certification date value
        const certificationDate = document.getElementById(`certification-date${i}`).value;

        // Get the certification by value
        const certificationBy = document.getElementById(`certification-by${i}`).value;

        // Get the certification name value
        const certificationName = document.getElementById(`certification-name${i}`).value;

        // Get the certification description value using the getQuillContent() function
        const certificationDescription = getQuillContent(`certification-description${i}`);

        // Create an object for each certification
        const certification = {
            certificationLink: certificationLink || '',
            certificationDate: certificationDate || '',
            certificationBy: certificationBy || '',
            certificationName: certificationName || '',
            certificationDescription: certificationDescription || ''
        };

        // Add the certification object to the array
        certificationsArray.push(certification);

        // Update the DOM elements
        var linkresult = document.getElementById(`certification-link-result${i}`);
        linkresult.innerHTML = certificationLink ? 'View Certificate' : '';
        linkresult.href = certificationLink;
        var certificatedateresult = document.getElementById(`certification-date-result${i}`);
        certificatedateresult.innerHTML = certificationDate ? '| ' + certificationDate : '';
        document.getElementById(`certification-by-result${i}`).innerHTML = certificationBy;
        document.getElementById(`certification-name-result${i}`).innerHTML = certificationName;
        var certificationDescriptionresult = document.getElementById(`certification-description-result${i}`);
        certificationDescriptionresult.innerHTML = certificationDescription;
    }

    // Store the certifications array in the JSON object
    jsonData.certificationData = certificationsArray;
}
function ShowProjects() {
    // Create an array to store project details
    const projectsArray = [];

    // Update the result elements for each project
    for (let i = 0; i < counters.project; i++) {
        // Get the project start date value and the checkbox value to determine the project end date
        const projectStart = document.getElementById(`project-start${i}`).value;
        const isCurrentProject = document.getElementById(`current-project${i}`).checked;
        const enddate = document.getElementById(`project-end${i}`).value;

        // Determine the project end date based on the checkbox value
        let projectEnd = '';
        if (isCurrentProject) {
            projectEnd = ' - Present';
        } else if (enddate) {
            projectEnd = ' - ' + enddate;
        }

        // Update the project date result element with the start and end dates
        document.getElementById(`project-date-result${i}`).innerHTML = projectStart + projectEnd;

        // Get the project name value and update the corresponding result element
        const projectName = document.getElementById(`project-name${i}`).value;
        document.getElementById(`project-name-result${i}`).innerHTML = projectName;

        // Get the project description value using the getQuillContent() function and update the corresponding result element
        const projectDescription = getQuillContent(`project-description${i}`);
        document.getElementById(`project-description-result${i}`).innerHTML = projectDescription;

        // Get the project link value and update the corresponding result element's href attribute
        const projectLink = document.getElementById(`project-link${i}`).value;
        var linkresult = document.getElementById(`project-link-result${i}`);
        linkresult.innerHTML = projectLink ? 'View Project' : '';
        linkresult.href = projectLink;

        // Create an object for each project
        const project = {
            projectStart: projectStart || '',
            isCurrentProject: isCurrentProject || false,
            projectEnd: isCurrentProject ? 'Present' : enddate || '',
            projectName: projectName || '',
            projectDescription: projectDescription || '',
            projectLink: projectLink || ''
        };

        // Add the project object to the array
        projectsArray.push(project);
    }

    // Store the projects array in the JSON object
    jsonData.projectData = projectsArray;
}
function ShowHobbies() {
    // Create an array to store hobby details
    const hobbiesArray = [];

    // Update the result elements for each hobby
    for (let i = 0; i < counters.hobbies; i++) {
        const hobbyName = document.getElementById(`hobby${i}`).value;
        const hobbiesResult = document.getElementById(`hobbies-result${i}`);
        hobbiesResult.innerHTML = '';

        // Update the corresponding result element with the hobby name
        if (hobbyName) {
            hobbiesResult.innerHTML = `<li>${hobbyName}</li>`;
        }

        // Add the hobby name to the hobbies array
        hobbiesArray.push(hobbyName);
    }

    // Store the hobbies array in the JSON object
    jsonData.hobbiesData = hobbiesArray;
}
function ShowSocialLinks() {
    // Create an array to store social link details
    const socialLinksArray = [];

    // Update the result elements for each social link
    for (let i = 0; i < counters.social; i++) {
        const linkFor = document.getElementById(`social-link-for${i}`).value;
        const textToShow = document.getElementById(`texttoshow${i}`).value;
        const socialLink = document.getElementById(`social-link${i}`).value;

        // Update the corresponding result elements with the social link details
        document.getElementById(`social-link-for-result${i}`).innerHTML = linkFor;
        document.getElementById(`texttoshow-result${i}`).innerHTML = textToShow;
        document.getElementById(`social-link-result${i}`).href = socialLink;

        // Create an object to represent the social link
        const socialLinkObject = {
            linkFor: linkFor,
            textToShow: textToShow,
            socialLink: socialLink
        };

        // Add the social link object to the social links array
        socialLinksArray.push(socialLinkObject);
    }

    // Store the social links array in the JSON object
    jsonData.socialData = socialLinksArray;
}
function ShowPublications() {
    // Create an array to store publication details
    const publicationsArray = [];

    // Update the result elements for each publication
    for (let i = 0; i < counters.publication; i++) {
        const publicationLink = document.getElementById(`publication-link${i}`).value;
        const publicationDate = document.getElementById(`publication-date${i}`).value;
        const publicationDetails = document.getElementById(`publication-details${i}`).value;
        const publicationName = document.getElementById(`publication-name${i}`).value;
        const publicationDescription = getQuillContent(`publication-description${i}`);

        // Update the corresponding result elements with the publication details
        var linkresult = document.getElementById(`publication-link-result${i}`);
        linkresult.innerHTML = '';
        if (publicationLink) {
            linkresult.innerHTML = "View Paper";
            linkresult.href = publicationLink;
        }

        var dateresult = document.getElementById(`publication-date-result${i}`);
        dateresult.innerHTML = '';
        if (publicationDate)
            dateresult.innerHTML = ' | ' + publicationDate;

        document.getElementById(`publication-by-result${i}`).innerHTML = publicationDetails;
        document.getElementById(`publication-name-result${i}`).innerHTML = publicationName;

        var descriptionresult = document.getElementById(`publication-description-result${i}`);
        descriptionresult.innerHTML = '';
        if (publicationDescription) {
            descriptionresult.innerHTML = publicationDescription;
        }

        // Create an object to represent the publication
        const publicationObject = {
            publicationLink: publicationLink,
            publicationDate: publicationDate,
            publicationDetails: publicationDetails,
            publicationName: publicationName,
            publicationDescription: publicationDescription
        };

        // Add the publication object to the publications array
        publicationsArray.push(publicationObject);
    }

    // Store the publications array in the JSON object
    jsonData.publicationData = publicationsArray;
}
function ShowResearch() {
    // Create an array to store research entries
    const researchArray = [];

    // Update the result elements for each research entry
    for (let i = 0; i < counters.research; i++) {
        const researchStartDate = document.getElementById(`research-start-date${i}`).value;
        const isCurrentResearch = document.getElementById(`current-research${i}`).checked;
        const researchEndDate = isCurrentResearch ? '<strong> - </strong>' + 'Present' : '<strong> - </strong>' + document.getElementById(`research-end-date${i}`).value;

        // Update the research date result element with the start and end dates
        document.getElementById(`research-date-result${i}`).innerHTML = researchStartDate + researchEndDate;

        const researchDetails = document.getElementById(`research-details${i}`).value;
        document.getElementById(`research-by-result${i}`).innerHTML = researchDetails;

        const researchName = document.getElementById(`research-name${i}`).value;
        document.getElementById(`research-name-result${i}`).innerHTML = researchName;

        const researchDescription = getQuillContent(`research-description${i}`);
        document.getElementById(`research-description-result${i}`).innerHTML = researchDescription;

        // Create an object to represent the research entry
        const researchObject = {
            researchStartDate: researchStartDate,
            isCurrentResearch: isCurrentResearch,
            researchEndDate: researchEndDate,
            researchDetails: researchDetails,
            researchName: researchName,
            researchDescription: researchDescription
        };

        // Add the research object to the research array
        researchArray.push(researchObject);
    }

    // Store the research array in the JSON object
    jsonData.research = researchArray;
}
function getDecarationText() {
    var username = document.getElementById('declaration-user-name')
    username.innerHTML = ''
    username.innerHTML = usersname;
    var description = document.getElementById('declaration-text')
    description.innerHTML = '';
    description.innerHTML = getQuillContent('declaration-description');
}
// Collapse the content from the document
function RemoveContent(switchnumber) {
    var div = document.getElementById(`div${switchnumber}`);
    var resultdiv = document.getElementById(`div-result-${switchnumber}`);
    if (document.getElementById(`switch${switchnumber}`).checked) {
        div.style.display = 'block';
        resultdiv.classList.remove('is-hidden');
    }
    else {
        var result = window.confirm("Do you really want to remove this it? After removing it won't appear in your resume.")
        if (result == true) {
            div.style.display = 'none';
            resultdiv.classList.add('is-hidden');
        }
    }
}
var flag = 1;
// Toggle Priview
function TogglePreview() {
    var userdetails = document.getElementById('userdetails');
    button = document.getElementById('preview-button');
    if (flag == 1) {
        userdetails.classList.remove('is-4');
        userdetails.classList.add('is-10')
        document.getElementById('preview').classList.add('is-hidden')
        flag = 0;
        button.innerHTML = "Show Priview";
    }
    else {
        userdetails.classList.remove('is-10');
        userdetails.classList.add('is-4')
        document.getElementById('preview').classList.remove('is-hidden')
        button.innerHTML = "Hide Priview";
        flag = 1;
    }

}
function AddEventListener() {
    var menubuttons = document.querySelectorAll('#menubuttons li');
    i = 0;
    menubuttons.forEach(button => {
        button.addEventListener('click', () => {
            var div = `div${button.id}`
            RedirectDiv(div);
            var redirectLink = document.getElementById(`redirect${button.id}`);
            window.location.href = redirectLink.href;
            redirectLink.click();
            i++;
        });
    })
    PersonalInfo.forEach(info => {
        document.getElementById(info).addEventListener('input', ShowPersonalInfo);
    });
    // Function to add event listeners to sections with similar patterns
    function addEventListenersForSections(section, infoArray, showFunction) {
        for (let i = 0; i < counters[section]; i++) {
            for (let j = 0; j < infoArray.length; j++) {
                const element = infoArray[j] + i;
                document.getElementById(element).addEventListener('input', showFunction);
            }
        }
    }

    // Event Listener for menubuttons
    var menubuttons = document.querySelectorAll('#menubuttons li');
    menubuttons.forEach(button => {
        button.addEventListener('click', () => {
            var div = `div${button.id}`;
            RedirectDiv(div);
            var redirectLink = document.getElementById(`redirect${button.id}`);
            window.location.href = redirectLink.href;
            redirectLink.click();
        });
    });

    // Event Listener for Result Name Section

    for (let i = 0; i < Object.keys(counters).length; i++) {
        document.getElementById(`title-${i + 1}`).addEventListener('input', () => {
            var result = document.getElementById(`title-${i + 1}`);
            document.getElementById(`title-result-${i + 1}`).innerHTML = result.innerHTML || Sections[i + 1];
        });
    }

    // Event Listeners for PersonalInfo
    PersonalInfo.forEach(info => {
        document.getElementById(info).addEventListener('input', ShowPersonalInfo);
    });

    // Event Listeners for various sections using the addEventListenersForSections function
    addEventListenersForSections('social', SocialInfo, ShowSocialLinks);
    addEventListenersForSections('proffesional', ProffesionalInfo, ShowProffesionalInfo);
    addEventListenersForSections('educational', EducationalInfo, ShowEducationalInfo);
    addEventListenersForSections('keyskill', ['key-skill'], ShowKeySkills);
    addEventListenersForSections('technicalskill', ['technical-skill'], TechnicalSkills);
    addEventListenersForSections('languages', ['known-language'], ShowLanguage);
    addEventListenersForSections('hobbies', ['hobby'], ShowHobbies);
    addEventListenersForSections('certification', CertificationInfo, ShowCertifications);
    addEventListenersForSections('project', ProjectInfo, ShowProjects);
    addEventListenersForSections('accomplishment', AccomplishmentInfo, ShowAccomplishment);
    addEventListenersForSections('publication', PublicationInfo, ShowPublications);
    addEventListenersForSections('research', ResearchInfo, ShowResearch);


    // Event Listeners for Declaration Section
    document.getElementById('declaration-description').addEventListener('input', getDecarationText);


    // Get references to the button and the notification placeholder
    const button = document.getElementById('templates');
    const notificationPlaceholder = document.getElementById('notification-placeholder');

    // Add a click event listener to the button
    button.addEventListener('click', () => {
        // Create the notification element
        const notification = document.createElement('div');
        notification.className = 'notification is-warning centered-notification'; // Added 'centered-notification' class
        notification.textContent = "Unlock a world of endless possibilities. The future is arriving sooner than you think!";

        // Append the notification to the placeholder
        notificationPlaceholder.appendChild(notification);

        // Remove the notification after 2 seconds
        setTimeout(() => {
            notification.remove();
        }, 4000);
    });
}
// Function to handle drag start event
function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.innerHTML);
    event.dataTransfer.setData("text/plain", event.target.dataset.sectionId);
    event.target.classList.add("dragged");
}
// Function to handle drag over event
function allowDrop(event) {
    event.preventDefault();

    const targetElement = event.target;
    const isContainer = targetElement.classList.contains('container');
    const isDraggable = targetElement.getAttribute('draggable') === 'false';

    if (isContainer && isDraggable) {
        return false;
    }
}
// Function to handle drop event
function drop(event, containerId) {
    event.preventDefault();
    const draggedSection = document.querySelector('.container[draggable="true"].dragged');
    const targetSection = event.target.closest('.container');
    // Check if the target or any parent element is the specified div with draggable="false"
    if (targetSection && targetSection.getAttribute('draggable') === 'false') {
        return; // Prevent dropping above the specified div
    }

    if (draggedSection && targetSection) {
        const draggedIndex = getIndex(containerId, draggedSection);
        const targetIndex = getIndex(containerId, targetSection);
        if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
            const container = document.getElementById(containerId);
            const sections = Array.from(container.querySelectorAll('.container'));

            // Remove the dragged section from the container
            container.removeChild(draggedSection);

            // Insert the dragged section at the target position
            if (targetIndex === sections.length) {
                // If the target index is the last position, append the dragged section
                container.appendChild(draggedSection);
            } else {
                // Otherwise, insert the dragged section before the target section
                container.insertBefore(draggedSection, sections[targetIndex]);
            }

            // Update result container with animation
            const resultContainer = document.getElementById('userdetails-result');
            const resultSections = Array.from(resultContainer.querySelectorAll('.divsection'));

            const draggedSectionId = draggedSection.id;
            const resultSectionId = `div-result-${draggedSectionId.split('-')[2]}`;
            const resultDraggedSection = document.getElementById(resultSectionId);
            const resultTargetSection = resultSections[targetIndex];

            if (resultDraggedSection && resultTargetSection && resultDraggedSection.parentNode === resultContainer) {
                // Remove the result dragged section from the result container
                resultContainer.removeChild(resultDraggedSection);
                // Insert the result dragged section at the target position
                if (targetIndex === resultSections.length) {
                    // If the target index is the last position, append the result dragged section
                    resultContainer.appendChild(resultDraggedSection);
                } else {
                    // Otherwise, insert the result dragged section before the target section
                    const nextResultSection = resultSections[targetIndex + 1];
                    resultContainer.insertBefore(resultDraggedSection, nextResultSection);
                }
            }
        }
    }

    // Remove the "dragged" class from the dragged section
    draggedSection.classList.remove('dragged');
}
// Function to get the index of a section within a container
function getIndex(containerId, section) {
    const container = document.getElementById(containerId);
    const sections = container.querySelectorAll('.container');
    for (let i = 0; i < sections.length; i++) {
        if (sections[i] === section) {
            return i;
        }
    }
    return -1;
}
// function to get the QuillContent
function getQuillContent(id) {
    var quilleditor = document.getElementById(id);
    return quilleditor.querySelector('.ql-editor').innerHTML;
}
// Calculate Experience
function calculateExperience(startDateId, endDateId) {
    var startDate = document.getElementById(startDateId).value;
    var endDate = document.getElementById(endDateId).value;

    var startYear = parseInt(startDate.slice(0, 4));
    var startMonth = parseInt(startDate.slice(5));

    var endYear, endMonth;

    if (endDate) {
        endYear = parseInt(endDate.slice(0, 4));
        endMonth = parseInt(endDate.slice(5));
    } else {
        var currentDate = new Date();
        endYear = currentDate.getFullYear();
        endMonth = currentDate.getMonth() + 1; // getMonth() returns zero-based month
    }

    var yearsDiff = endYear - startYear;
    var monthsDiff = endMonth - startMonth;
    var totalMonths = yearsDiff * 12 + monthsDiff;

    var years = Math.floor(totalMonths / 12);
    var months = totalMonths % 12;

    var result = "";

    if (years > 0) {
        result += years + (years > 1 ? " years" : " year");
    }

    if (months > 0) {
        if (years > 0) {
            result += " and ";
        }
        result += months + (months > 1 ? " months" : " month");
    }

    if (years === 0 && months === 0) {
        result = "Less than a month";
    }
    return result;
}
function CreateAdditionalSection() {
    var addtional_section_container = document.getElementById('additional-section-container');
    var addtional_section_resultcontainer = document.getElementById('additional-section-result-container');
    var colsebutton = document.getElementById('close-section');

    var title = document.getElementById('section-name').value.trim();
    if (title) {
        inputidcounter++;
        resultidcounter++;
        SectionTitle = title;
        var li = document.createElement('li');
        li.id = inputidcounter;
        li.innerHTML = `<a href="#div-input-${inputidcounter}" class="has-text-weight-semibold"> ${SectionTitle}</a>`
        document.getElementById('menubuttons').appendChild(li);
        title = title.toLowerCase().replaceAll(' ', '-');


        // Create and append the input div
        var inputdivdata = document.getElementById('div-input-12').innerHTML;
        inputdivdata = inputdivdata.replaceAll('12', inputidcounter).replaceAll('additional', title);
        var inputdiv = document.createElement('div');
        inputdiv.id = `div-input-${inputidcounter}`;
        inputdiv.classList.add('container');
        inputdiv.innerHTML = inputdivdata;
        addtional_section_container.appendChild(inputdiv);


        // Create and append the result div
        var resultdivdata = document.getElementById('div-result-12').innerHTML;
        resultdivdata = resultdivdata.replaceAll('12', resultidcounter).replaceAll('additional', title);
        var resultdiv = document.createElement('div');
        resultdiv.id = `div-result-${resultidcounter}`;
        resultdiv.innerHTML = resultdivdata;
        addtional_section_resultcontainer.appendChild(resultdiv);

        // Update the title and result text using textContent
        document.getElementById(`title-result-${resultidcounter}`).textContent = SectionTitle;
        document.getElementById(`title-${resultidcounter}`).textContent = SectionTitle;

        // Click the close button to collapse the section
        colsebutton.click();

        // Add event listeners for the new subsection
        var InputArray = [`${title}-description`, `${title}-section-content`, `${title}-section-title`];
        AddAdditionalEventListener(InputArray, title);

        // Initialize the counter for the new subsection
        counters[title] = 1;
    } else {
        alert("Please enter Section Name");
    }
}
// Function to add Additional Event Listeners
function AddAdditionalEventListener(arr, title) {
    arr.forEach(element => {
        document.getElementById(`${element}0`).addEventListener('input', () => {
            ShowAdditionalContent(title);
        });
    });
    QuillEditor(title, 0);
}
function ShowAdditionalContent(element) {
    // Create an array to store additional content entries
    const additionalContentArray = [];

    // Update the result elements for each additional content entry
    for (let i = 0; i < counters[element]; i++) {
        const sectionTitle = document.getElementById(`${element}-section-title${i}`).value;
        document.getElementById(`${element}-section-title-result${i}`).innerHTML = sectionTitle;

        const description = getQuillContent(`${element}-description${i}`);
        document.getElementById(`${element}-section-description-result${i}`).innerHTML = description;

        const sectionContent = document.getElementById(`${element}-section-content${i}`).value;
        document.getElementById(`${element}-section-content-result${i}`).innerHTML = sectionContent;

        // Create an object to represent the additional content entry
        const additionalContentObject = {
            sectionTitle: sectionTitle,
            description: description,
            sectionContent: sectionContent
        };

        // Add the additional content object to the additional content array
        additionalContentArray.push(additionalContentObject);
    }

    // Store the additional content array in the JSON object
    jsonData[element] = additionalContentArray;
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function PushJson() {
    // const dbRef = firebase.database().ref();
    // // Push the JSON data to the Realtime Database
    // dbRef.push(jsonData)
    //     .then(() => {
    //         console.log("Data successfully pushed to Realtime Database.");
    //     })
    //     .catch((error) => {
    //         console.error("Error pushing data to Realtime Database:", error);
    //     });
    // downloadJSONFile(jsonData, `${document.getElementById('name-result').innerHTML}.json`);
}

// Download 
function downloadJSONFile(data, filename) {
    const jsonString = JSON.stringify(data, null, 2); // Convert JSON object to a formatted string
    const blob = new Blob([jsonString], { type: "application/json" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename || "data.json"; // Default filename if not provided
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}