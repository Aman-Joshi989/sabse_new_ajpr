const fs = require('fs');

async function testUpload() {
  const formData = new FormData();
  formData.append('role_applied_for', 'Test Role');
  formData.append('name', 'Test User');
  formData.append('email', 'test@example.com');
  
  // Create a dummy file blob
  const file = new File(['Dummy resume content'], 'resume.pdf', { type: 'application/pdf' });
  formData.append('resume', file);

  try {
    const res = await fetch('http://localhost:3000/api/careers/apply', {
      method: 'POST',
      body: formData
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Upload failed with status:', res.status, errorText);
    } else {
      console.log('Upload successful:', await res.json());
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testUpload();
