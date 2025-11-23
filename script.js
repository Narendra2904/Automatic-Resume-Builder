// keep the uploaded PDF path available (private path) per earlier state

function escapeHtml(str){
  if(!str && str !== 0) return '';
  return String(str).replace(/[&<>"']/g, function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
  });
}

// Correctly split on newlines (CRLF or LF)
function renderEducation(text){
  if(!text) return '';
  const lines = String(text).split(/\r?\n/).filter(l=>l.trim());
  return lines.map(l=>`<div class="edu-item">${escapeHtml(l)}</div>`).join('');
}
function renderProjects(text){
  if(!text) return '';
  const lines = String(text).split(/\r?\n/).filter(l=>l.trim());
  return lines.map(l=>`<div class="proj-item">${escapeHtml(l)}</div>`).join('');
}
function renderCerts(text){
  if(!text) return '';
  const lines = String(text).split(/\r?\n/).filter(l=>l.trim());
  return lines.map(l=>`<div class="cert-item">${escapeHtml(l)}</div>`).join('');
}
function renderSkills(text){
  if(!text) return '';
  return String(text).split(',').map(s=>s.trim()).filter(s=>s).map(s=>`<span class="skill-badge">${escapeHtml(s)}</span>`).join('');
}
function renderExperience(text){
  if(!text) return '';
  const lines = String(text).split(/\r?\n/).filter(l=>l.trim());
  return lines.map(l=>{
    const parts = l.split('|').map(p=>p.trim());
    if(parts.length >= 5){
      const [title, company, start, end, desc] = parts;
      return `<div class="exp-item"><div style="font-weight:700">${escapeHtml(title)} — ${escapeHtml(company)}</div><div class="exp-meta">${escapeHtml(start)} — ${escapeHtml(end)}</div><div>${escapeHtml(desc)}</div></div>`;
    } else if(parts.length >= 4){
      const [title, company, start, end] = parts;
      return `<div class="exp-item"><div style="font-weight:700">${escapeHtml(title)} — ${escapeHtml(company)}</div><div class="exp-meta">${escapeHtml(start)} — ${escapeHtml(end)}</div></div>`;
    } else {
      return `<div class="exp-item">${escapeHtml(l)}</div>`;
    }
  }).join('');
}

function makeSocials(linkedin, github, portfolio){
  const parts = [];
  if(linkedin) parts.push(`<a href="${escapeHtml(linkedin)}" target="_blank" title="LinkedIn">` +
    `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6C1.12 6 0 4.88 0 3.5C0 2.12 1.12 1 2.5 1C3.87 1 4.98 2.12 4.98 3.5Z" fill="#0A66C2"/><path d="M0 8.5H5V24H0V8.5Z" fill="#0A66C2"/><path d="M8 8.5H13V11.5C13.8 9.8 16 9.5 16 12.5V24H11V13.5C11 11.4 10.2 10.9 9 10.9C7.8 10.9 7 11.9 7 13.6V24H2V8.5H7V10.2C7.8 9.1 9.5 8.8 11 8.8C13.5 8.8 15 10 16 12.2V8.5H8Z" fill="#0A66C2"/></svg>` +
    `<span>LinkedIn</span></a>`);
  if(github) parts.push(`<a href="${escapeHtml(github)}" target="_blank" title="GitHub">` +
    `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 .5C5.73.5.75 5.48.75 11.76c0 4.94 3.2 9.13 7.64 10.61.56.1.76-.24.76-.53 0-.26-.01-.95-.01-1.86-3.11.68-3.77-1.5-3.77-1.5-.51-1.29-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.12.08 1.72 1.16 1.72 1.16 1 .0 1.6.75 1.6.75.99 1.7 2.6 1.21 3.24.93.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.43-2.22 1.13-3.01-.11-.28-.49-1.4.11-2.93 0 0 .92-.29 3.02 1.15.88-.25 1.82-.37 2.76-.37.94 0 1.88.12 2.76.37 2.1-1.44 3.02-1.15 3.02-1.15.6 1.53.22 2.65.11 2.93.7.79 1.13 1.79 1.13 3.01 0 4.29-2.62 5.24-5.11 5.52.4.35.76 1.04.76 2.1 0 1.51-.01 2.73-.01 3.11 0 .29.2.63.77.52 4.44-1.48 7.64-5.67 7.64-10.61C23.25 5.48 18.27.5 12 .5z" fill="#111"/></svg>` +
    `<span>GitHub</span></a>`);
  if(portfolio) parts.push(`<a href="${escapeHtml(portfolio)}" target="_blank" title="Website">` +
    `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.83.48-5.58-.6-7.5-2.51A8.002 8.002 0 0 1 4.07 13H11v6.93zM13 11h6.93A8.002 8.002 0 0 0 13 4.07V11z" fill="#111"/></svg>` +
    `<span>Website</span></a>`);
  return parts.join('');
}

function makeContactHTML(phone, email){
  const items = [];
  if(phone){
    const tel = escapeHtml(phone);
    items.push(`<div class="contact-item"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 01.95-.27c1.04.26 2.16.4 3.33.4a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.17.14 2.29.4 3.33a1 1 0 01-.27.95l-2.01 2.51z" fill="#111"/></svg><a href="tel:${tel}">${tel}</a></div>`);
  }
  if(email){
    const mail = escapeHtml(email);
    items.push(`<div class="contact-item"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#111"/></svg><a href="mailto:${mail}">${mail}</a></div>`);
  }
  return items.join('');
}

/* ---------------------------
   Passport photo upload code
   --------------------------- */

/**
 * Resize & crop an image file to a square of specified size (px)
 * returns a Promise that resolves to a dataURL (PNG)
 */
function processImageFile(file, size = 300) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // create a square canvas of size×size
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // compute crop to center the image (cover strategy)
        const iw = img.width, ih = img.height;
        const scale = Math.max(size / iw, size / ih); // cover
        const sw = size / scale, sh = size / scale;
        const sx = Math.max(0, (iw - sw) / 2);
        const sy = Math.max(0, (ih - sh) / 2);

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = () => reject(new Error('Invalid image'));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// wire up the input element to process and preview the photo
(function wirePhotoInput() {
  const input = document.getElementById('photoInput');
  if (!input) return;
  const MAX_BYTES = 2 * 1024 * 1024; // 2 MB default limit
  const previewImg = document.getElementById('p-photo');

  input.addEventListener('change', async (ev) => {
    const f = ev.target.files && ev.target.files[0];
    if (!f) return;
    // simple validation
    if (!f.type.match(/^image\/(png|jpe?g|webp)$/)) {
      alert('Please upload a PNG, JPG, JPEG or WEBP image.');
      input.value = '';
      return;
    }
    if (f.size > MAX_BYTES) {
      alert('File is too large. Max allowed size is 2 MB.');
      input.value = '';
      return;
    }

    try {
      // process (crop + resize), returns dataURL
      const dataUrl = await processImageFile(f, 300); // 300x300 px internal
      // set preview in resume
      if (previewImg) {
        previewImg.src = dataUrl;
        previewImg.dataset.photo = dataUrl; // store for persistence across updatePreview
      }
    } catch (err) {
      console.error(err);
      alert('Unable to process image — choose another file.');
      input.value = '';
    }
  });
})();

/* ---------------------------
   Resume rendering
   --------------------------- */

function updatePreview(){
  // preserve uploaded photo if present
  const previewPhoto = document.getElementById('p-photo');
  if(previewPhoto && previewPhoto.dataset && previewPhoto.dataset.photo){
    previewPhoto.src = previewPhoto.dataset.photo;
  }

  document.getElementById('p-name').textContent = document.getElementById('name').value || 'Full Name';

  // address / contact lines
  document.getElementById('p-address').textContent = document.getElementById('address').value || '';
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  document.getElementById('p-contactline').innerHTML = makeContactHTML(phone, email) || '';

  const gpaVal = document.getElementById('gpa').value;
  document.getElementById('p-gpa').textContent = gpaVal ? `GPA: ${gpaVal}` : '';
  document.getElementById('p-summary').textContent = document.getElementById('summary').value || '';
  document.getElementById('p-education').innerHTML = renderEducation(document.getElementById('education').value);
  document.getElementById('p-projects').innerHTML = renderProjects(document.getElementById('projects').value);
  document.getElementById('p-certifications').innerHTML = renderCerts(document.getElementById('certifications').value);
  document.getElementById('p-skills').innerHTML = renderSkills(document.getElementById('skills').value);
  document.getElementById('p-extra').textContent = document.getElementById('extra').value || '';
  document.getElementById('p-experience').innerHTML = renderExperience(document.getElementById('experience').value);

  // social icons
  const ln = document.getElementById('link-linkedin').value.trim();
  const gh = document.getElementById('link-github').value.trim();
  const pf = document.getElementById('link-portfolio').value.trim();
  document.getElementById('p-socials').innerHTML = makeSocials(ln, gh, pf) || '';
}

// template switching
document.querySelectorAll('.templates button').forEach(btn=>btn.addEventListener('click',()=>{
  const t = btn.getAttribute('data-template');
  const preview = document.getElementById('resumePreview');
  preview.classList.remove('template-classic','template-modern','template-minimal');
  preview.classList.add('template-'+t);
}));

// wire up buttons
document.getElementById('updateBtn').addEventListener('click',updatePreview);
document.getElementById('resetBtn').addEventListener('click',()=>{
  // clear all fields (remove personal info)
  const ids = ['name','gpa','address','phone','email','link-linkedin','link-github','link-portfolio','summary','education','experience','projects','certifications','skills','extra'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if(el){
      if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = '';
    }
  });
  // clear uploaded photo
  const previewPhoto = document.getElementById('p-photo');
  if(previewPhoto){
    previewPhoto.removeAttribute('data-photo');
    previewPhoto.src = 'assets/logo.png';
  }
  // also clear file input
  const photoInput = document.getElementById('photoInput');
  if(photoInput) photoInput.value = '';

  updatePreview();
});

document.getElementById('printBtn').addEventListener('click',()=>{ window.print(); });

// initial render
updatePreview();
