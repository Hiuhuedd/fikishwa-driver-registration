// // Firebase Config
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
//   };
  
//   // Initialize Firebase
//   const app = firebase.initializeApp(firebaseConfig);
//   const db = firebase.firestore();
//   const storage = firebase.storage();
  
//   // Form Submission
//   document.getElementById("driverForm").addEventListener("submit", async (e) => {
//     e.preventDefault();
  
//     const fullName = document.getElementById("fullName").value;
//     const contact = document.getElementById("contact").value;
//     const email = document.getElementById("email").value;
//     const address = document.getElementById("address").value;
//     const vehicleDetails = document.getElementById("vehicleDetails").value;
  
//     const idDocument = document.getElementById("idDocument").files[0];
//     const license = document.getElementById("license").files[0];
//     const insurance = document.getElementById("insurance").files[0];
  
//     const messageDiv = document.getElementById("message");
//     messageDiv.textContent = "Uploading data...";
  
//     try {
//       // Upload files to Firebase Storage
//       const idDocRef = storage.ref(`documents/${fullName}_ID.${idDocument.name.split('.').pop()}`);
//       const licenseRef = storage.ref(`documents/${fullName}_License.${license.name.split('.').pop()}`);
//       const insuranceRef = storage.ref(`documents/${fullName}_Insurance.${insurance.name.split('.').pop()}`);
  
//       await idDocRef.put(idDocument);
//       await licenseRef.put(license);
//       await insuranceRef.put(insurance);
  
//       const idDocURL = await idDocRef.getDownloadURL();
//       const licenseURL = await licenseRef.getDownloadURL();
//       const insuranceURL = await insuranceRef.getDownloadURL();
  
//       // Save form data to Firestore
//       await db.collection("drivers").add({
//         fullName,
//         contact,
//         email,
//         address,
//         vehicleDetails,
//         idDocURL,
//         licenseURL,
//         insuranceURL,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       });
  
//       messageDiv.textContent = "Driver registered successfully!";
//       document.getElementById("driverForm").reset();
//     } catch (error) {
//       console.error("Error uploading data:", error);
//       messageDiv.textContent = "Error uploading data. Please try again.";
//     }
//   });
  


  // <!-- Firebase SDK -->
  // <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js"></script>
  // <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js"></script>
  // <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-storage.js"></script>

  // <script>
  //     // Firebase configuration
  //     const firebaseConfig = {
  //         // Add your Firebase configuration here
  //         apiKey: "YOUR_API_KEY",
  //         authDomain: "YOUR_AUTH_DOMAIN",
  //         projectId: "YOUR_PROJECT_ID",
  //         storageBucket: "YOUR_STORAGE_BUCKET",
  //         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  //         appId: "YOUR_APP_ID"
  //     };

  //     // Initialize Firebase
  //     firebase.initializeApp(firebaseConfig);
  //     const db = firebase.firestore();
  //     const storage = firebase.storage();

  //     // Handle form submission
  //     document.getElementById('registrationForm').addEventListener('submit', async (e) => {
  //         e.preventDefault();

  //         try {
  //             // Collect form data
  //             const formData = {
  //                 personalInfo: {
  //                     fullName: document.getElementById('fullName').value,
  //                     phone: document.getElementById('phone').value,
  //                     email: document.getElementById('email').value,
  //                     address: document.getElementById('address').value
  //                 },
  //                 vehicleInfo: {
  //                     make: document.getElementById('vehicleMake').value,
  //                     model: document.getElementById('vehicleModel').value,
  //                     year: document.getElementById('vehicleYear').value
  //                 },
  //                 bankInfo: {
  //                     bankName: document.getElementById('bankName').value,
  //                     accountNumber: document.getElementById('accountNumber').value
  //                 },
  //                 digitalData: {
  //                     emailConsent: document.getElementById('emailConsent').checked,
  //                     deviceInfo: document.getElementById('deviceInfo').value,
  //                     referralCode: document.getElementById('referralCode').value
  //                 },
  //                 timestamps: {
  //                     created: firebase.firestore.FieldValue.serverTimestamp()
  //                 }
  //             };

  //             // Upload files and get their URLs
  //             const fileUploads = [
  //                 { id: 'nationalId', path: 'documents/identification/' },
  //                 { id: 'driversLicense', path: 'documents/licenses/' },
  //                 { id: 'taxCompliance', path: 'documents/tax/' },
  //                 { id: 'vehicleReg', path: 'documents/vehicle/' },
  //                 { id: 'insurance', path: 'documents/insurance/' },
  //                 { id: 'inspection', path: 'documents/inspection/' },
  //                 { id: 'goodConduct', path: 'documents/conduct/' },
  //                 { id: 'profilePhoto', path: 'images/profile/' }
  //             ];

  //             const uploadPromises = fileUploads.map(async ({ id, path }) => {
  //                 const file = document.getElementById(id).files[0];
  //                 if (!file) return null;

  //                 const fileRef = storage.ref(`${path}${Date.now()}_${file.name}`);
  //                 const uploadTask = fileRef.put(file);

  //                 // Show upload progress
  //                 const progressBar = document.getElementById(`${id}Progress`);
  //                 progressBar.style.display = 'block';
  //                 const progressElement = progressBar.querySelector('.progress');

  //                 uploadTask.on('state_changed', 
  //                     (snapshot) => {
  //                         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //                         progressElement.style.width = progress + '%';
  //                     }
  //                 );

  //                 await uploadTask;
  //                 const url = await fileRef.getDownloadURL();
  //                 return { [id]: url };
  //             });

  //             const uploadedFiles = await Promise.all(uploadPromises);
  //             const fileUrls = Object.assign({}, ...uploadedFiles.filter(Boolean));

  //             // Combine form data with file URLs
  //             const finalData = {
  //                 ...formData,
  //                 documents: fileUrls
  //             };

  //             // Save to Firestore
  //             await db.collection('drivers').add(finalData);

  //             alert('Registration submitted successfully!');
  //             document.getElementById('registrationForm').reset();

  //             // Reset progress bars
  //             document.querySelectorAll('.progress-bar').forEach(bar => {
  //                 bar.style.display = 'none';
  //                 bar.querySelector('.progress').style.width = '0%';
  //             });

  //         } catch (error) {
  //             console.error('Error submitting form:', error);
  //             alert('Error submitting form. Please try again.');
  //         }
  //     });

  //     // File validation
  //     document.querySelectorAll('input[type="file"]').forEach(input => {
  //         input.addEventListener('change', (e) => {
  //             const file = e.target.files[0];
  //             const error = e.target.parentElement.querySelector('.error');
              
  //             if (file) {
  //                 // Check file size (max 5MB)
  //                 if (file.size > 5 * 1024 * 1024) {
  //                     error.textContent = 'File size must be less than 5MB';
  //                     error.style.display = 'block';
  //                     e.target.value = '';
  //                     return;
  //                 }

  //                 // Check file type
  //                 const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  //                 if (!allowedTypes.includes(file.type)) {
  //                     error.textContent = 'Only JPEG, PNG, and PDF files are allowed';
  //                     error.style.display = 'block';
  //                     e.target.value = '';
  //                     return;
  //                 }

  //                 error.style.display = 'none';
  //             }
  //         });
  //     });
  // </script>




  
 
  <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-storage.js"></script>



  // Firebase configuration
  const firebaseConfig = {
      // Add your Firebase configuration here
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();

  // Form Navigation Elements
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById('registrationForm');
  const sections = document.querySelectorAll('.section');
  const steps = document.querySelectorAll('.step');

  let currentStep = 1;
  const totalSteps = 5;

  // Navigation Functions
  function showStep(stepNumber) {
      // Hide all sections
      sections.forEach(section => {
          section.classList.remove('active');
      });

      // Show current section
      document.querySelector(`.section[data-step="${stepNumber}"]`).classList.add('active');

      // Update stepper UI
      steps.forEach((step, index) => {
          if (index + 1 < stepNumber) {
              step.classList.add('completed');
              step.classList.remove('active');
          } else if (index + 1 === stepNumber) {
              step.classList.add('active');
              step.classList.remove('completed');
          } else {
              step.classList.remove('completed', 'active');
          }
      });

      // Update buttons
      prevBtn.style.display = stepNumber === 1 ? 'none' : 'block';
      nextBtn.style.display = stepNumber === totalSteps ? 'none' : 'block';
      submitBtn.style.display = stepNumber === totalSteps ? 'block' : 'none';
  }

  function validateCurrentStep() {
      const currentSection = document.querySelector(`.section[data-step="${currentStep}"]`);
      const inputs = currentSection.querySelectorAll('input[required]');
      let isValid = true;

      inputs.forEach(input => {
          if (input.type === 'file') {
              if (!input.files[0] && input.required) {
                  isValid = false;
                  input.classList.add('invalid');
              }
          } else if (!input.value.trim()) {
              isValid = false;
              input.classList.add('invalid');
          }
      });

      return isValid;
  }

  // Event Listeners
  nextBtn.addEventListener('click', () => {
      if (validateCurrentStep()) {
          if (currentStep < totalSteps) {
              currentStep++;
              showStep(currentStep);
          }
      } else {
          alert('Please fill in all required fields before proceeding.');
      }
  });

  prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
          currentStep--;
          showStep(currentStep);
      }
  });

  // Form Submission
  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateCurrentStep()) {
          alert('Please fill in all required fields.');
          return;
      }

      try {
          // Collect form data
          const formData = {
              personalInfo: {
                  fullName: document.getElementById('fullName').value,
                  phone: document.getElementById('phone').value,
                  email: document.getElementById('email').value,
                  address: document.getElementById('address').value
              },
              vehicleInfo: {
                  make: document.getElementById('vehicleMake').value,
                  model: document.getElementById('vehicleModel').value,
                  year: document.getElementById('vehicleYear').value
              },
              bankInfo: {
                  bankName: document.getElementById('bankName').value,
                  accountNumber: document.getElementById('accountNumber').value
              },
              digitalData: {
                  emailConsent: document.getElementById('emailConsent').checked,
                  deviceInfo: document.getElementById('deviceInfo').value,
                  referralCode: document.getElementById('referralCode').value
              },
              timestamps: {
                  created: firebase.firestore.FieldValue.serverTimestamp()
              }
          };

          // Upload files and get their URLs
          const fileUploads = [
              { id: 'nationalId', path: 'documents/identification/' },
              { id: 'driversLicense', path: 'documents/licenses/' },
              { id: 'taxCompliance', path: 'documents/tax/' },
              { id: 'vehicleReg', path: 'documents/vehicle/' },
              { id: 'insurance', path: 'documents/insurance/' },
              { id: 'inspection', path: 'documents/inspection/' },
              { id: 'goodConduct', path: 'documents/conduct/' },
              { id: 'profilePhoto', path: 'images/profile/' }
          ];

          const uploadPromises = fileUploads.map(async ({ id, path }) => {
              const file = document.getElementById(id).files[0];
              if (!file) return null;

              const fileRef = storage.ref(`${path}${Date.now()}_${file.name}`);
              const uploadTask = fileRef.put(file);

              // Show upload progress
              const progressBar = document.getElementById(`${id}Progress`);
              progressBar.style.display = 'block';
              const progressElement = progressBar.querySelector('.progress');

              uploadTask.on('state_changed', 
                  (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      progressElement.style.width = progress + '%';
                  }
              );

              await uploadTask;
              const url = await fileRef.getDownloadURL();
              return { [id]: url };
          });

          const uploadedFiles = await Promise.all(uploadPromises);
          const fileUrls = Object.assign({}, ...uploadedFiles.filter(Boolean));

          // Combine form data with file URLs
          const finalData = {
              ...formData,
              documents: fileUrls
          };

          // Save to Firestore
          await db.collection('drivers').add(finalData);

          alert('Registration submitted successfully!');
          form.reset();
          currentStep = 1;
          showStep(currentStep);

          // Reset progress bars
          document.querySelectorAll('.progress-bar').forEach(bar => {
              bar.style.display = 'none';
              bar.querySelector('.progress').style.width = '0%';
          });

      } catch (error) {
          console.error('Error submitting form:', error);
          alert('Error submitting form. Please try again.');
      }
  });

  // File validation
  document.querySelectorAll('input[type="file"]').forEach(input => {
      input.addEventListener('change', (e) => {
          const file = e.target.files[0];
          const error = e.target.parentElement.querySelector('.error');
          
          if (file) {
              // Check file size (max 5MB)
              if (file.size > 5 * 1024 * 1024) {
                  error.textContent = 'File size must be less than 5MB';
                  error.style.display = 'block';
                  e.target.value = '';
                  return;
              }

              // Check file type
              const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
              if (!allowedTypes.includes(file.type)) {
                  error.textContent = 'Only JPEG, PNG, and PDF files are allowed';
                  error.style.display = 'block';
                  e.target.value = '';
                  return;
              }

              error.style.display = 'none';
          }
      });
  });


  document.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
          if (input.value.trim()) {
              input.classList.remove('invalid');
          }
      });
  });

  // Initialize the form
  showStep(currentStep);
