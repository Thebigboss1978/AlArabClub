// server.js - Express backend for Giza portal
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
require('dotenv').config({ path: path.join(__dirname, 'master.env') });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const CSV_URL = process.env.GOOGLE_SHEET_CSV || process.env.DEFAULT_CSV || '';
const LOCAL_CSV = path.join(__dirname, 'tour_template.csv');

app.use('/', express.static(path.join(__dirname, 'public')));

async function loadCSV(){
  try{
    let txt = '';
    if(CSV_URL && CSV_URL.startsWith('http')){
      const r = await fetch(CSV_URL, {cache:'no-store'});
      if(!r.ok) throw new Error('csv fetch failed');
      txt = await r.text();
    } else if(fs.existsSync(LOCAL_CSV)){
      txt = fs.readFileSync(LOCAL_CSV,'utf8');
    } else {
      return [];
    }
    const records = parse(txt, {columns:true, skip_empty_lines:true});
    return records;
  }catch(e){
    console.error(e);
    return [];
  }
}

app.get('/api/offers', async (req,res)=>{
  const data = await loadCSV();
  const out = data.map(r=>({
    id: r.id || r.uid || '',
    title: r.title || r.name || r.offer || '',
    desc: r.desc || r.description || r.details || '',
    price: r.price || r.cost || '',
    duration: r.duration || '',
    active: (r.active || '1').toString(),
    image: r.image || r.img || ''
  }));
  res.json(out);
});

app.post('/api/chat', async (req,res)=>{
  const prompt = req.body.prompt || '';
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY;
  if(!apiKey) return res.json({ok:true, reply:'AI not configured on server.'});
  try{
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{Authorization:`Bearer ${apiKey}`, 'Content-Type':'application/json'},
      body: JSON.stringify({model:'gpt-4o-mini', messages:[{role:'user', content:prompt}], max_tokens:400})
    });
    const j = await r.json();
    const reply = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || JSON.stringify(j);
    res.json({ok:true, reply});
  }catch(e){
    console.error(e);
    res.status(500).json({ok:false});
  }
});

app.listen(PORT, ()=> console.log('listening', PORT));
