function showSection(sectionId) {
    // Hide all sections
	console.log('Hello')
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });

    // Show the selected section
    var sectionToShow = document.getElementById(sectionId);
    sectionToShow.classList.add('active');

    // Hide the menu after clicking an item
    document.querySelector('.menu-bar').classList.remove('show');
}

window.addEventListener('click',(e)=> {
    if(!document.querySelector('.menu-bar').contains(e.target) && !document.querySelector('.menu-btn').contains(e.target)) {
        console.log('aaaa')
        document.querySelector('.menu-bar').classList.remove('show');
    }
})

function toggleHideMenu() {
    document.querySelector('.menu-bar').classList.toggle('show');
}

document.querySelector('.menu-btn').addEventListener('click', e=> {
    toggleHideMenu();
    // e.classList.add('change');
});

// Add event listeners to menu items
document.querySelectorAll('.menu-bar a').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.menu-bar').classList.remove('show');
    });
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // First, send the form data to your email
    emailjs.sendForm('service_a3998zt', 'template_zbdnhbo', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Now send the auto-reply to the customer
            emailjs.send('service_a3998zt', 'template_8jfgy98', {
                name: event.target.name.value, // Adjust to your form field names
                email: event.target.email.value, // Adjust to your form field names
            })
            .then(function(response) {
                console.log('Auto-reply sent!', response.status, response.text);
            }, function(error) {
                console.error('Failed to send auto-reply...', error);
            });
            
            alert('Your enquiry has been sent successfully!');
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.error('FAILED...', error);
            alert('Failed to send enquiry. Please try again later.');
        });
});

function resetForm() {
    document.getElementById('contact-form').reset();
}

document.addEventListener("DOMContentLoaded", function() {
    const countryCodes = {
        "Afghanistan": "+93", "Albania": "+355", "Algeria": "+213", "Andorra": "+376", "Angola": "+244",
        "Antigua and Barbuda": "+1-268", "Argentina": "+54", "Armenia": "+374", "Australia": "+61",
        "Austria": "+43", "Azerbaijan": "+994", "Bahamas": "+1-242", "Bahrain": "+973", "Bangladesh": "+880",
        "Barbados": "+1-246", "Belarus": "+375", "Belgium": "+32", "Belize": "+501", "Benin": "+229",
        "Bhutan": "+975", "Bolivia": "+591", "Bosnia and Herzegovina": "+387", "Botswana": "+267",
        "Brazil": "+55", "Brunei": "+673", "Bulgaria": "+359", "Burkina Faso": "+226", "Burundi": "+257",
        "Cabo Verde": "+238", "Cambodia": "+855", "Cameroon": "+237", "Canada": "+1", "Central African Republic": "+236",
        "Chad": "+235", "Chile": "+56", "China": "+86", "Colombia": "+57", "Comoros": "+269", "Congo": "+242",
        "Costa Rica": "+506", "Croatia": "+385", "Cuba": "+53", "Cyprus": "+357", "Czech Republic": "+420",
        "Democratic Republic of the Congo": "+243", "Denmark": "+45", "Djibouti": "+253", "Dominica": "+1-767",
        "Dominican Republic": "+1-809", "Ecuador": "+593", "Egypt": "+20", "El Salvador": "+503", "Equatorial Guinea": "+240",
        "Eritrea": "+291", "Estonia": "+372", "Eswatini": "+268", "Ethiopia": "+251", "Fiji": "+679",
        "Finland": "+358", "France": "+33", "Gabon": "+241", "Gambia": "+220", "Georgia": "+995", "Germany": "+49",
        "Ghana": "+233", "Greece": "+30", "Grenada": "+1-473", "Guatemala": "+502", "Guinea": "+224",
        "Guinea-Bissau": "+245", "Guyana": "+592", "Haiti": "+509", "Honduras": "+504", "Hungary": "+36",
        "Iceland": "+354", "India": "+91", "Indonesia": "+62", "Iran": "+98", "Iraq": "+964", "Ireland": "+353",
        "Israel": "+972", "Italy": "+39", "Jamaica": "+1-876", "Japan": "+81", "Jordan": "+962", "Kazakhstan": "+7",
        "Kenya": "+254", "Kiribati": "+686", "Kuwait": "+965", "Kyrgyzstan": "+996", "Laos": "+856", "Latvia": "+371",
        "Lebanon": "+961", "Lesotho": "+266", "Liberia": "+231", "Libya": "+218", "Liechtenstein": "+423",
        "Lithuania": "+370", "Luxembourg": "+352", "Madagascar": "+261", "Malawi": "+265", "Malaysia": "+60",
        "Maldives": "+960", "Mali": "+223", "Malta": "+356", "Marshall Islands": "+692", "Mauritania": "+222",
        "Mauritius": "+230", "Mexico": "+52", "Micronesia": "+691", "Moldova": "+373", "Monaco": "+377",
        "Mongolia": "+976", "Montenegro": "+382", "Morocco": "+212", "Mozambique": "+258", "Myanmar": "+95",
        "Namibia": "+264", "Nauru": "+674", "Nepal": "+977", "Netherlands": "+31", "New Zealand": "+64",
        "Nicaragua": "+505", "Niger": "+227", "Nigeria": "+234", "North Korea": "+850", "North Macedonia": "+389",
        "Norway": "+47", "Oman": "+968", "Pakistan": "+92", "Palau": "+680", "Palestine State": "+970",
        "Panama": "+507", "Papua New Guinea": "+675", "Paraguay": "+595", "Peru": "+51", "Philippines": "+63",
        "Poland": "+48", "Portugal": "+351", "Qatar": "+974", "Romania": "+40", "Russia": "+7", "Rwanda": "+250",
        "Saint Kitts and Nevis": "+1-869", "Saint Lucia": "+1-758", "Saint Vincent and the Grenadines": "+1-784",
        "Samoa": "+685", "San Marino": "+378", "Sao Tome and Principe": "+239", "Saudi Arabia": "+966",
        "Senegal": "+221", "Serbia": "+381", "Seychelles": "+248", "Sierra Leone": "+232", "Singapore": "+65",
        "Slovakia": "+421", "Slovenia": "+386", "Solomon Islands": "+677", "Somalia": "+252", "South Africa": "+27",
        "South Korea": "+82", "South Sudan": "+211", "Spain": "+34", "Sri Lanka": "+94", "Sudan": "+249",
        "Suriname": "+597", "Sweden": "+46", "Switzerland": "+41", "Syria": "+963", "Taiwan": "+886",
        "Tajikistan": "+992", "Tanzania": "+255", "Thailand": "+66", "Timor-Leste": "+670", "Togo": "+228",
        "Tonga": "+676", "Trinidad and Tobago": "+1-868", "Tunisia": "+216", "Turkey": "+90", "Turkmenistan": "+993",
        "Tuvalu": "+688", "Uganda": "+256", "Ukraine": "+380", "United Arab Emirates": "+971", "United Kingdom": "+44",
        "United States of America": "+1", "Uruguay": "+598", "Uzbekistan": "+998", "Vanuatu": "+678", "Vatican City": "+379",
        "Venezuela": "+58", "Vietnam": "+84", "Yemen": "+967", "Zambia": "+260", "Zimbabwe": "+263"
    };

    const countryMaxDigits = {
        "Afghanistan": 9, "Albania": 9, "Algeria": 9, "Andorra": 6, "Angola": 9,
        "Antigua and Barbuda": 7, "Argentina": 10, "Armenia": 8, "Australia": 9,
        "Austria": 10, "Azerbaijan": 9, "Bahamas": 7, "Bahrain": 8, "Bangladesh": 10,
        "Barbados": 7, "Belarus": 9, "Belgium": 9, "Belize": 7, "Benin": 9,
        "Bhutan": 8, "Bolivia": 8, "Bosnia and Herzegovina": 8, "Botswana": 8,
        "Brazil": 11, "Brunei": 7, "Bulgaria": 9, "Burkina Faso": 8, "Burundi": 8,
        "Cabo Verde": 7, "Cambodia": 9, "Cameroon": 9, "Canada": 10, "Central African Republic": 8,
        "Chad": 8, "Chile": 9, "China": 11, "Colombia": 10, "Comoros": 7, "Congo": 9,
        "Costa Rica": 8, "Croatia": 9, "Cuba": 8, "Cyprus": 8, "Czech Republic": 9,
        "Democratic Republic of the Congo": 9, "Denmark": 8, "Djibouti": 8, "Dominica": 7,
        "Dominican Republic": 10, "Ecuador": 9, "Egypt": 10, "El Salvador": 8, "Equatorial Guinea": 9,
        "Eritrea": 7, "Estonia": 7, "Eswatini": 7, "Ethiopia": 9, "Fiji": 7,
        "Finland": 9, "France": 9, "Gabon": 7, "Gambia": 7, "Georgia": 9, "Germany": 11,
        "Ghana": 9, "Greece": 10, "Grenada": 7, "Guatemala": 8, "Guinea": 9,
        "Guinea-Bissau": 7, "Guyana": 7, "Haiti": 8, "Honduras": 8, "Hungary": 9,
        "Iceland": 7, "India": 10, "Indonesia": 12, "Iran": 10, "Iraq": 10, "Ireland": 9,
        "Israel": 9, "Italy": 10, "Jamaica": 7, "Japan": 10, "Jordan": 9, "Kazakhstan": 10,
        "Kenya": 10, "Kiribati": 7, "Kuwait": 8, "Kyrgyzstan": 9, "Laos": 10, "Latvia": 8,
        "Lebanon": 8, "Lesotho": 8, "Liberia": 7, "Libya": 9, "Liechtenstein": 9,
        "Lithuania": 8, "Luxembourg": 9, "Madagascar": 9, "Malawi": 8, "Malaysia": 9,
        "Maldives": 7, "Mali": 8, "Malta": 8, "Marshall Islands": 7, "Mauritania": 8,
        "Mauritius": 8, "Mexico": 10, "Micronesia": 7, "Moldova": 8, "Monaco": 8,
        "Mongolia": 8, "Montenegro": 8, "Morocco": 9, "Mozambique": 9, "Myanmar": 9,
        "Namibia": 9, "Nauru": 7, "Nepal": 10, "Netherlands": 9, "New Zealand": 9,
        "Nicaragua": 8, "Niger": 8, "Nigeria": 10, "North Korea": 10, "North Macedonia": 9,
        "Norway": 8, "Oman": 8, "Pakistan": 10, "Palau": 7, "Palestine State": 9,
        "Panama": 8, "Papua New Guinea": 7, "Paraguay": 9, "Peru": 9, "Philippines": 10,
        "Poland": 9, "Portugal": 9, "Qatar": 8, "Romania": 10, "Russia": 10, "Rwanda": 9,
        "Saint Kitts and Nevis": 7, "Saint Lucia": 7, "Saint Vincent and the Grenadines": 7,
        "Samoa": 7, "San Marino": 9, "Sao Tome and Principe": 7, "Saudi Arabia": 9,
        "Senegal": 9, "Serbia": 9, "Seychelles": 7, "Sierra Leone": 8, "Singapore": 8,
        "Slovakia": 9, "Slovenia": 9, "Solomon Islands": 7, "Somalia": 8, "South Africa": 9,
        "South Korea": 9, "South Sudan": 9, "Spain": 9, "Sri Lanka": 9, "Sudan": 9,
        "Suriname": 7, "Sweden": 9, "Switzerland": 9, "Syria": 9, "Taiwan": 9,
        "Tajikistan": 9, "Tanzania": 9, "Thailand": 9, "Timor-Leste": 7, "Togo": 8,
        "Tonga": 7, "Trinidad and Tobago": 7, "Tunisia": 8, "Turkey": 10, "Turkmenistan": 8,
        "Tuvalu": 7, "Uganda": 9, "Ukraine": 9, "United Arab Emirates": 9, "United Kingdom": 10,
        "United States of America": 10, "Uruguay": 9, "Uzbekistan": 9, "Vanuatu": 7, "Vatican City": 7,
        "Venezuela": 10, "Vietnam": 9, "Yemen": 9, "Zambia": 9, "Zimbabwe": 9
    };

    const countrySelect = document.getElementById("country");
    const phoneInput = document.getElementById("phone");

    // Populate country options
    Object.keys(countryCodes).sort().forEach(country => {
        let option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    countrySelect.addEventListener("change", function() {
        const selectedCountry = this.value;
        if (selectedCountry && countryCodes[selectedCountry]) {
            phoneInput.value = countryCodes[selectedCountry] + " ";
        }
    });

    phoneInput.addEventListener("input", function(e) {
        const selectedCountry = countrySelect.value;
        const maxDigits = countryMaxDigits[selectedCountry] || 15;
        let input = this.value.replace(/[^0-9+ ]/g, '');

        // Get the country code length and count digits
        const countryCode = countryCodes[selectedCountry] || "";
        const countryCodeLength = countryCode.length;
        const digitsOnly = input.slice(countryCodeLength).replace(/[^0-9]/g, '');

        // Limit the length of digits
        if (digitsOnly.length > maxDigits) {
            input = input.slice(0, countryCodeLength) + digitsOnly.slice(0, maxDigits);
        }
        this.value = input;
    });
});

let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}