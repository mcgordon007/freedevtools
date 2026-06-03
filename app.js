// ==================== UTILITIES ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent || element.value;
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
}

function clearOutput(elementId) {
    document.getElementById(elementId).textContent = '';
}

function setToday(elementId) {
    document.getElementById(elementId).valueAsDate = new Date();
}

// Add copy buttons to output areas
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.output-area').forEach(area => {
        if (!area.querySelector('.copy-btn') && area.id) {
            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.textContent = 'Copy';
            btn.onclick = () => copyToClipboard(area.id);
            area.appendChild(btn);
        }
    });
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) input.valueAsDate = new Date();
    });
});

// ==================== JSON FORMATTER ====================
function formatJSON() {
    const input = document.getElementById('json-input').value;
    const output = document.getElementById('json-output');
    try { output.textContent = JSON.stringify(JSON.parse(input), null, 2); }
    catch (e) { output.textContent = 'Error: ' + e.message; }
}

function minifyJSON() {
    const input = document.getElementById('json-input').value;
    const output = document.getElementById('json-output');
    try { output.textContent = JSON.stringify(JSON.parse(input)); }
    catch (e) { output.textContent = 'Error: ' + e.message; }
}

function validateJSON() {
    const input = document.getElementById('json-input').value;
    const output = document.getElementById('json-output');
    try { JSON.parse(input); output.textContent = '✓ Valid JSON'; }
    catch (e) { output.textContent = '✗ Invalid: ' + e.message; }
}

function clearJSON() { document.getElementById('json-input').value = ''; document.getElementById('json-output').textContent = ''; }

// ==================== URL ENCODER ====================
function encodeURL() { document.getElementById('url-output').textContent = encodeURI(document.getElementById('url-input').value); }
function decodeURL() { try { document.getElementById('url-output').textContent = decodeURI(document.getElementById('url-input').value); } catch(e) { document.getElementById('url-output').textContent = 'Error: ' + e.message; } }
function encodeURLComponent() { document.getElementById('url-output').textContent = encodeURIComponent(document.getElementById('url-input').value); }
function decodeURLComponent() { try { document.getElementById('url-output').textContent = decodeURIComponent(document.getElementById('url-input').value); } catch(e) { document.getElementById('url-output').textContent = 'Error: ' + e.message; } }

// ==================== BASE64 ====================
function encodeBase64() { try { document.getElementById('base64-output').textContent = btoa(unescape(encodeURIComponent(document.getElementById('base64-input').value))); } catch(e) { document.getElementById('base64-output').textContent = 'Error: ' + e.message; } }
function decodeBase64() { try { document.getElementById('base64-output').textContent = decodeURIComponent(escape(atob(document.getElementById('base64-input').value))); } catch(e) { document.getElementById('base64-output').textContent = 'Error: ' + e.message; } }

// ==================== TIMESTAMP ====================
function timestampToDate() {
    const timestamp = parseInt(document.getElementById('timestamp-input').value);
    if (isNaN(timestamp)) { document.getElementById('timestamp-output').textContent = 'Please enter a valid timestamp'; return; }
    const date = new Date(timestamp * 1000);
    document.getElementById('timestamp-output').textContent = `Local: ${date.toLocaleString()}\nUTC: ${date.toUTCString()}\nISO: ${date.toISOString()}`;
}

function dateToTimestamp() {
    const input = document.getElementById('datetime-input').value;
    if (!input) { document.getElementById('timestamp-output').textContent = 'Please select a date and time'; return; }
    const date = new Date(input);
    document.getElementById('timestamp-output').textContent = `Seconds: ${Math.floor(date.getTime() / 1000)}\nMilliseconds: ${date.getTime()}`;
}

function setCurrentTimestamp() { document.getElementById('timestamp-input').value = Math.floor(Date.now() / 1000); timestampToDate(); }

// ==================== WORD COUNTER ====================
function countWords() {
    const text = document.getElementById('wordcount-input').value;
    document.getElementById('wc-words').textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
    document.getElementById('wc-chars').textContent = text.length;
    document.getElementById('wc-chars-nospace').textContent = text.replace(/\s/g, '').length;
    document.getElementById('wc-sentences').textContent = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    document.getElementById('wc-paragraphs').textContent = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    document.getElementById('wc-lines').textContent = text.trim() ? text.split('\n').length : 0;
}

// ==================== CASE CONVERTER ====================
function toUpperCase() { document.getElementById('case-output').textContent = document.getElementById('case-input').value.toUpperCase(); }
function toLowerCase() { document.getElementById('case-output').textContent = document.getElementById('case-input').value.toLowerCase(); }
function toTitleCase() { document.getElementById('case-output').textContent = document.getElementById('case-input').value.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()); }
function toSentenceCase() { document.getElementById('case-output').textContent = document.getElementById('case-input').value.toLowerCase().replace(/(^\w)|(\.\s+\w)/g, m => m.toUpperCase()); }
function toCamelCase() { document.getElementById('case-output').textContent = document.getElementById('case-input').value.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, ''); }
function toSnakeCase() { const m = document.getElementById('case-input').value.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g); document.getElementById('case-output').textContent = m ? m.map(x => x.toLowerCase()).join('_') : document.getElementById('case-input').value.toLowerCase().replace(/\s+/g, '_'); }
function toKebabCase() { const m = document.getElementById('case-input').value.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g); document.getElementById('case-output').textContent = m ? m.map(x => x.toLowerCase()).join('-') : document.getElementById('case-input').value.toLowerCase().replace(/\s+/g, '-'); }

// ==================== COLOR CONVERTER ====================
function updateColorPreview(hex) { const p = document.getElementById('color-preview'); p.style.backgroundColor = hex; p.style.color = (parseInt(hex.slice(1,3),16)*0.299+parseInt(hex.slice(3,5),16)*0.587+parseInt(hex.slice(5,7),16)*0.114)>186?'#000':'#fff'; p.textContent = hex.toUpperCase(); }
function isLightColor(hex) { return (parseInt(hex.slice(1,3),16)*0.299+parseInt(hex.slice(3,5),16)*0.587+parseInt(hex.slice(5,7),16)*0.114)>186; }

function convertFromHex() {
    let hex = document.getElementById('color-hex').value.trim();
    if (!hex.match(/^#/)) hex = '#' + hex;
    if (!hex.match(/^#[0-9A-Fa-f]{6}$/)) return;
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    document.getElementById('color-rgb').value = `rgb(${r}, ${g}, ${b})`;
    const hsl = rgbToHsl(r,g,b); document.getElementById('color-hsl').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    const cmyk = rgbToCmyk(r,g,b); document.getElementById('color-cmyk').value = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    updateColorPreview(hex);
}

function convertFromRGB() {
    const rgb = document.getElementById('color-rgb').value.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (!rgb) return;
    const r=parseInt(rgb[1]),g=parseInt(rgb[2]),b=parseInt(rgb[3]);
    const hex='#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
    document.getElementById('color-hex').value=hex;
    const hsl=rgbToHsl(r,g,b); document.getElementById('color-hsl').value=`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    const cmyk=rgbToCmyk(r,g,b); document.getElementById('color-cmyk').value=`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    updateColorPreview(hex);
}

function convertFromHSL() {
    const hsl = document.getElementById('color-hsl').value.match(/(\d+),\s*(\d+)%,\s*(\d+)%/);
    if (!hsl) return;
    const rgb = hslToRgb(parseInt(hsl[1]),parseInt(hsl[2]),parseInt(hsl[3]));
    const hex='#'+rgb.map(x=>x.toString(16).padStart(2,'0')).join('');
    document.getElementById('color-hex').value=hex;
    document.getElementById('color-rgb').value=`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    const cmyk=rgbToCmyk(rgb[0],rgb[1],rgb[2]); document.getElementById('color-cmyk').value=`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    updateColorPreview(hex);
}

function convertFromCMYK() {
    const cmyk = document.getElementById('color-cmyk').value.match(/(\d+)%?,\s*(\d+)%?,\s*(\d+)%?,\s*(\d+)%?/);
    if (!cmyk) return;
    const c=parseInt(cmyk[1])/100,m=parseInt(cmyk[2])/100,y=parseInt(cmyk[3])/100,k=parseInt(cmyk[4])/100;
    const r=Math.round(255*(1-c)*(1-k)),g=Math.round(255*(1-m)*(1-k)),b=Math.round(255*(1-y)*(1-k));
    const hex='#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
    document.getElementById('color-hex').value=hex; document.getElementById('color-rgb').value=`rgb(${r}, ${g}, ${b})`;
    const hsl=rgbToHsl(r,g,b); document.getElementById('color-hsl').value=`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    updateColorPreview(hex);
}

function rgbToHsl(r,g,b) { r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0;}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}h/=6;}return{h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)}; }
function hslToRgb(h,s,l) { h/=360;s/=100;l/=100;let r,g,b;if(s===0){r=g=b=l;}else{const hue2rgb=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};const q=l<0.5?l*(1+s):l+s-l*s;const p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3);}return[Math.round(r*255),Math.round(g*255),Math.round(b*255)]; }
function rgbToCmyk(r,g,b) { let c=1-(r/255),m=1-(g/255),y=1-(b/255),k=Math.min(c,m,y);if(k===1)return{c:0,m:0,y:0,k:100};c=Math.round(((c-k)/(1-k))*100);m=Math.round(((m-k)/(1-k))*100);y=Math.round(((y-k)/(1-k))*100);k=Math.round(k*100);return{c,m,y,k}; }

// ==================== PASSWORD GENERATOR ====================
function updatePwdLength() { document.getElementById('pwd-length-val').textContent = document.getElementById('pwd-length').value; }

function generatePassword() {
    const length = parseInt(document.getElementById('pwd-length').value);
    let chars = '';
    if (document.getElementById('pwd-uppercase').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (document.getElementById('pwd-lowercase').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (document.getElementById('pwd-numbers').checked) chars += '0123456789';
    if (document.getElementById('pwd-symbols').checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!chars) { document.getElementById('password-output').textContent = 'Please select at least one character type'; return; }
    let password = '';
    const array = new Uint32Array(length * 2);
    crypto.getRandomValues(array);
    let randIdx = 0;
    const charLen = chars.length;
    const limit = 0x100000000 - (0x100000000 % charLen);
    for (let i = 0; i < length; ) { const rand = array[randIdx++]; if (rand < limit) { password += chars[rand % charLen]; i++; } }
    document.getElementById('password-output').textContent = password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    const bar = document.getElementById('pwd-strength-bar');
    bar.className = 'password-strength-bar';
    if (strength <= 2) bar.classList.add('strength-weak');
    else if (strength <= 4) bar.classList.add('strength-medium');
    else bar.classList.add('strength-strong');
}

// ==================== DATE CALCULATOR ====================
function calculateDateDiff() {
    const start = new Date(document.getElementById('date-start').value), end = new Date(document.getElementById('date-end').value);
    if (isNaN(start) || isNaN(end)) { document.getElementById('date-output').textContent = 'Please select both dates'; return; }
    const diffDays = Math.ceil(Math.abs(end - start) / 86400000);
    document.getElementById('date-output').textContent = `Days: ${diffDays}\nWeeks: ${Math.floor(diffDays / 7)}\nMonths (approx): ${Math.floor(diffDays / 30.44)}\nYears (approx): ${Math.floor(diffDays / 365.25)}`;
}

// ==================== QR CODE GENERATOR ====================
function generateQR() {
    const content = document.getElementById('qr-input').value;
    if (!content) { document.getElementById('qrcode').innerHTML = '<p style="color:#64748b;">Please enter content</p>'; return; }
    document.getElementById('qrcode').innerHTML = '';
    new QRCode(document.getElementById('qrcode'), { text: content, width: parseInt(document.getElementById('qr-size').value), height: parseInt(document.getElementById('qr-size').value), colorDark: '#000000', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel[document.getElementById('qr-level').value] });
}

// ==================== NUMBER CONVERTER ====================
function convertFromBinary() { const b=document.getElementById('num-binary').value; if(!/^[01]+$/.test(b))return; const d=parseInt(b,2); document.getElementById('num-decimal').value=d; document.getElementById('num-hex').value=d.toString(16).toUpperCase(); document.getElementById('num-octal').value=d.toString(8); }
function convertFromDecimal() { const d=parseInt(document.getElementById('num-decimal').value); if(isNaN(d))return; document.getElementById('num-binary').value=d.toString(2); document.getElementById('num-hex').value=d.toString(16).toUpperCase(); document.getElementById('num-octal').value=d.toString(8); }
function convertFromHexNum() { const h=document.getElementById('num-hex').value; if(!/^[0-9A-Fa-f]+$/.test(h))return; const d=parseInt(h,16); document.getElementById('num-binary').value=d.toString(2); document.getElementById('num-decimal').value=d; document.getElementById('num-octal').value=d.toString(8); }
function convertFromOctal() { const o=document.getElementById('num-octal').value; if(!/^[0-7]+$/.test(o))return; const d=parseInt(o,8); document.getElementById('num-binary').value=d.toString(2); document.getElementById('num-decimal').value=d; document.getElementById('num-hex').value=d.toString(16).toUpperCase(); }

// ==================== HASH GENERATOR ====================
async function generateHash(algorithm) {
    const input = document.getElementById('hash-input').value;
    if (!input) { document.getElementById('hash-output').textContent = 'Please enter text to hash'; return; }
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        document.getElementById('hash-output').textContent = hashHex;
    } catch(e) {
        document.getElementById('hash-output').textContent = 'Error: ' + e.message;
    }
}

// ==================== HTML ENTITY ENCODER ====================
function encodeHTMLEntities() { const i=document.getElementById('html-input').value; document.getElementById('html-output').textContent=i.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function decodeHTMLEntities() { const ta=document.createElement('textarea'); ta.innerHTML=document.getElementById('html-input').value; document.getElementById('html-output').textContent=ta.value; }

// ==================== TEXT CLEANER ====================
function removeExtraSpaces() { document.getElementById('cleaner-output').textContent=document.getElementById('cleaner-input').value.replace(/\s+/g,' ').trim(); }
function removeEmptyLines() { document.getElementById('cleaner-output').textContent=document.getElementById('cleaner-input').value.split('\n').filter(l=>l.trim()).join('\n'); }
function removeDuplicateLines() { document.getElementById('cleaner-output').textContent=[...new Set(document.getElementById('cleaner-input').value.split('\n'))].join('\n'); }
function trimLines() { document.getElementById('cleaner-output').textContent=document.getElementById('cleaner-input').value.split('\n').map(l=>l.trim()).join('\n'); }
function sortLines() { document.getElementById('cleaner-output').textContent=document.getElementById('cleaner-input').value.split('\n').sort().join('\n'); }

// ==================== AGE CALCULATOR ====================
function calculateAge() {
    const birthDate = new Date(document.getElementById('birth-date').value);
    const ageOnDate = document.getElementById('age-on-date').valueAsDate || new Date();
    if (isNaN(birthDate)) { document.getElementById('age-output').textContent = 'Please enter a valid birth date'; return; }
    let years = ageOnDate.getFullYear() - birthDate.getFullYear(), months = ageOnDate.getMonth() - birthDate.getMonth(), days = ageOnDate.getDate() - birthDate.getDate();
    if (days < 0) { months--; days += new Date(ageOnDate.getFullYear(), ageOnDate.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((ageOnDate - birthDate) / 86400000);
    const nb = new Date(ageOnDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nb < ageOnDate) nb.setFullYear(nb.getFullYear() + 1);
    document.getElementById('age-output').textContent = `Age: ${years} years, ${months} months, ${days} days\nTotal days: ${totalDays}\nNext birthday in: ${Math.ceil((nb - ageOnDate) / 86400000)} days`;
}

// ==================== TIMEZONE CONVERTER ====================
const timezones = ['UTC','America/New_York','America/Chicago','America/Denver','America/Los_Angeles','America/Toronto','America/Vancouver','America/Mexico_City','America/Sao_Paulo','Europe/London','Europe/Paris','Europe/Berlin','Europe/Moscow','Europe/Istanbul','Asia/Dubai','Asia/Karachi','Asia/Kolkata','Asia/Bangkok','Asia/Shanghai','Asia/Hong_Kong','Asia/Tokyo','Asia/Seoul','Australia/Sydney','Australia/Melbourne','Pacific/Auckland','Pacific/Honolulu'];

function initTimezoneOptions() {
    const f=document.getElementById('tz-from'),t=document.getElementById('tz-to');
    if(f.children.length>0)return;
    timezones.forEach(tz=>{f.add(new Option(tz,tz));t.add(new Option(tz,tz));});
    f.value='UTC'; t.value=Intl.DateTimeFormat().resolvedOptions().timeZone||'America/New_York';
}

function convertTimezone() {
    const datetime=document.getElementById('tz-datetime').value,fromTz=document.getElementById('tz-from').value,toTz=document.getElementById('tz-to').value;
    if(!datetime){document.getElementById('tz-output').textContent='Please select date and time';return;}
    const date=new Date(datetime);
    const opts={year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',timeZoneName:'short'};
    try{document.getElementById('tz-output').textContent=`From (${fromTz}): ${new Intl.DateTimeFormat('en-US',{...opts,timeZone:fromTz}).format(date)}\nTo (${toTz}): ${new Intl.DateTimeFormat('en-US',{...opts,timeZone:toTz}).format(date)}`;}catch(e){document.getElementById('tz-output').textContent='Error: '+e.message;}
}

function setCurrentTime() { const n=new Date(); n.setMinutes(n.getMinutes()-n.getTimezoneOffset()); document.getElementById('tz-datetime').value=n.toISOString().slice(0,16); }
function swapTimezone() { const f=document.getElementById('tz-from'),t=document.getElementById('tz-to'),tmp=f.value; f.value=t.value; t.value=tmp; }

// ==================== ROMAN NUMERAL ====================
const romanMap = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
function toRoman() { let num=parseInt(document.getElementById('roman-arabic').value); if(num<1||num>3999)return; let r=''; for(let[k,v]of Object.entries(romanMap)){while(num>=v){r+=k;num-=v;}} document.getElementById('roman-numeral-input').value=r; }
function fromRoman() { const roman=document.getElementById('roman-numeral-input').value.toUpperCase(); let result=0,i=0; for(let[r,v]of Object.entries(romanMap)){while(roman.substr(i,r.length)===r){result+=v;i+=r.length;}} if(result>0&&result<=3999)document.getElementById('roman-arabic').value=result; }

// ==================== JS/CSS MINIFIER ====================
function minifyJS() { let m=document.getElementById('minifier-input').value.replace(/\/\*[\s\S]*?\*\//g,'').replace(/(?<!:)\s*\/\/.*$/gm,'').replace(/\s+/g,' ').replace(/;\s*}/g,'}').replace(/{\s*/g,'{').replace(/}\s*/g,'}').replace(/;\s*/g,';').replace(/,\s*/g,',').trim(); document.getElementById('minifier-output').textContent=m; }
function minifyCSS() { let m=document.getElementById('minifier-input').value.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,' ').replace(/;\s*}/g,'}').replace(/{\s*/g,'{').replace(/}\s*/g,'}').replace(/;\s*/g,';').replace(/,\s*/g,',').replace(/:\s*/g,':').trim(); document.getElementById('minifier-output').textContent=m; }

// ==================== FANCY TEXT ====================
const fancyStyles = {'Bold':'𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵','Italic':'𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧0123456789','Bold Italic':'𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛0123456789','Monospace':'𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿','Script':'𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789','Double-struck':'𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡','Circled':'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨','Fullwidth':'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９'};
const normalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateFancyText() {
    const input = document.getElementById('fancy-input').value;
    if (!input) { document.getElementById('fancy-output').textContent = ''; return; }
    let result = '';
    for (const [style, chars] of Object.entries(fancyStyles)) {
        let converted = '';
        for (const char of input) { const idx = normalChars.indexOf(char); converted += idx !== -1 ? (chars[idx] || char) : char; }
        result += `${style}: ${converted}\n\n`;
    }
    document.getElementById('fancy-output').textContent = result.trim();
}

// ==================== TEXT DIFF ====================
function compareText() {
    const original = document.getElementById('diff-original').value.split('\n'), modified = document.getElementById('diff-modified').value.split('\n');
    let result = '';
    for (let i = 0; i < Math.max(original.length, modified.length); i++) {
        const o = original[i] || '', m = modified[i] || '';
        if (o === m) result += `<div class="diff-line diff-unchanged"> ${o}</div>`;
        else if (!m) result += `<div class="diff-line diff-removed">- ${o}</div>`;
        else if (!o) result += `<div class="diff-line diff-added">+ ${m}</div>`;
        else { result += `<div class="diff-line diff-removed">- ${o}</div>`; result += `<div class="diff-line diff-added">+ ${m}</div>`; }
    }
    document.getElementById('diff-output').innerHTML = result || '<span style="color:#64748b;">No differences found</span>';
}

function clearDiff() { document.getElementById('diff-original').value = ''; document.getElementById('diff-modified').value = ''; document.getElementById('diff-output').innerHTML = ''; }

// ==================== SEARCH ====================
function searchTools() {
    const query = document.getElementById('toolSearch').value.toLowerCase();
    document.querySelectorAll('.tool-card').forEach(card => { card.style.display = card.textContent.toLowerCase().includes(query) ? 'block' : 'none'; });
}