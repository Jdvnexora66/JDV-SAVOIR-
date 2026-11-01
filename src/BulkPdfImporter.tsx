import {useState} from 'react';
import JSZip from 'jszip';
import {supabase} from './supabase';
import {extractPdfText,classifyPdf,type Classification} from './pdfAutoClassifier';
import {AlertCircle,CheckCircle2,FileUp,LoaderCircle,ShieldCheck,Trash2,Sparkles} from 'lucide-react';
type Item={file:File;title:string;subject:string;year:string;level:string;kind:string;confidence:number;reasons:string[];review:boolean;state:'ready'|'analyzing'|'uploading'|'done'|'error';message?:string};
const bucket='jdv-educational-documents';
const subjects=['Communication écrite','Lecture','Mathématiques','Éducation sociale','Éducation scientifique et technologique (EST)','Éducation artistique (EA)','Éducation physique et sportive (EPS)','Français','Physique-Chimie','SVT','Histoire-Géographie','Anglais','Autre'];
const levels=['CM2','CM1','CE2','CE1','CP','CI','6e','5e','4e','3e','Seconde','Première','Terminale','Université','Autre'];
function initial(file:File):Item{return {file,title:file.name.replace(/\.pdf$/i,''),subject:'',year:'',level:'',kind:'other',confidence:0,reasons:[],review:true,state:'ready'};}
export default function BulkPdfImporter(){
 const[items,setItems]=useState<Item[]>([]),[busy,setBusy]=useState(false),[notice,setNotice]=useState('');
 const done=items.filter(x=>x.state==='done').length,review=items.filter(x=>x.review&&x.state!=='done').length;
 const add=async(files:FileList|null)=>{if(!files)return;const next:Item[]=[];let skipped=0;
  for(const file of Array.from(files)){if(file.name.toLowerCase().endsWith('.zip')||file.type==='application/zip'){try{const zip=await JSZip.loadAsync(file);for(const entry of Object.values(zip.files)){if(entry.dir||!entry.name.toLowerCase().endsWith('.pdf'))continue;const blob=await entry.async('blob');next.push(initial(new File([blob],entry.name.split('/').pop()||'document.pdf',{type:'application/pdf'})));}}catch{skipped++;}continue;}
   if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf')){skipped++;continue;}next.push(initial(file));}
  setItems(old=>{const seen=new Set(old.map(x=>x.file.name+'|'+x.file.size));return [...old,...next.filter(x=>{const k=x.file.name+'|'+x.file.size;if(seen.has(k)){skipped++;return false;}seen.add(k);return true;})]});
  setNotice(next.length+' PDF ajouté(s). Clique sur « Analyser et dispatcher » pour lire le contenu et proposer les catégories.');
 };
 const analyze=async()=>{setBusy(true);setNotice('Analyse du contenu PDF en cours…');for(let i=0;i<items.length;i++){const x=items[i];if(x.state==='done')continue;setItems(old=>old.map((v,j)=>j===i?{...v,state:'analyzing',message:undefined}:v));try{const text=await extractPdfText(x.file);const c:Classification=classifyPdf(x.file.name,text);setItems(old=>old.map((v,j)=>j===i?{...v,title:c.title,level:c.level,year:c.year,subject:c.subject,kind:c.kind,confidence:c.confidence,reasons:c.reasons,review:c.review,state:'ready',message:c.extractedChars<80?'PDF image/scanné : OCR non disponible dans cette version. Classement à vérifier.':c.review?'Classement incertain — vérification requise':'Classement automatique proposé'}:v));}catch(e:any){setItems(old=>old.map((v,j)=>j===i?{...v,state:'error',review:true,message:e?.message||'Lecture PDF impossible'}:v));}}setBusy(false);setNotice('Analyse terminée. Les fichiers incertains sont signalés « À vérifier » et ne sont pas importés automatiquement.');};
 const update=(i:number,key:keyof Item,value:string)=>setItems(old=>old.map((x,j)=>j===i?{...x,[key]:value,review:true,state:'ready'}:x));
 const remove=(i:number)=>setItems(old=>old.filter((_,j)=>j!==i));
 const start=async()=>{if(!supabase||!items.length)return;const{data:{user}}=await supabase.auth.getUser();if(!user){setNotice('Session administrateur requise.');return;}setBusy(true);let success=0;
  for(let i=0;i<items.length;i++){const x=items[i];if(x.state==='done')continue;if(!x.title.trim()||!x.level||!x.year||!x.subject){setItems(old=>old.map((v,j)=>j===i?{...v,state:'error',message:'Classe, année et matière doivent être confirmées'}:v));continue;}
   setItems(old=>old.map((v,j)=>j===i?{...v,state:'uploading',message:undefined}:v));try{const safe=x.file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g,'_');const path='imports/'+user.id+'/'+Date.now()+'_'+i+'_'+safe;
    const{error:up}=await supabase.storage.from(bucket).upload(path,x.file,{contentType:'application/pdf',upsert:false});if(up)throw up;
    const{error:ins}=await supabase.from('academic_resources').insert({title:x.title,resource_type:x.kind,subject_label:x.subject,level_label:x.level,exam_year:Number(x.year),session_label:x.year,storage_path:path,rights_status:'unverified',verification_status:'pending',publication_status:'draft',description:'Import automatique — classification proposée par analyse PDF, à vérifier avant publication.',metadata:{original_filename:x.file.name,uploaded_by:user.id,import_method:'bulk_pdf_auto_analysis',classification_confidence:x.confidence,classification_reasons:x.reasons,requires_review:x.review}});if(ins){await supabase.storage.from(bucket).remove([path]);throw ins;}
    success++;setItems(old=>old.map((v,j)=>j===i?{...v,state:'done',message:'Importé en brouillon'}:v));
   }catch(e:any){setItems(old=>old.map((v,j)=>j===i?{...v,state:'error',message:e?.message||'Échec de l’import'}:v));}}
  setBusy(false);setNotice(success+' document(s) importé(s) en brouillon. Vérification et publication restent manuelles.');
 };
 return <div style={{display:'grid',gap:16}}>
  <div className="page-heading"><div className="page-icon"><FileUp/></div><div><h1>Importation PDF intelligente</h1><p>Dépose un lot : l’analyse propose automatiquement classe, année, matière et type de document.</p></div></div>
  <div className="notice"><ShieldCheck size={17}/> Les documents sont importés en brouillon. Aucune publication automatique. Les classements incertains restent signalés pour contrôle.</div>
  <section className="table-card" style={{padding:16,display:'grid',gap:12}}>
   <label className="bulk-drop" style={{display:'grid',gap:8,padding:22,border:'1px dashed var(--border,#cbd5e1)',borderRadius:12,textAlign:'center',cursor:'pointer'}}><FileUp size={26}/><b>Choisir des PDF ou une archive ZIP</b><span>Les PDF des sous-dossiers ZIP sont extraits automatiquement.</span><input type="file" accept="application/pdf,.pdf,.zip,application/zip" multiple onChange={e=>{void add(e.target.files);e.currentTarget.value=''}}/></label>
   <div className="page-toolbar"><b>{items.length} fichier(s) · {done} importé(s) · {review} à vérifier</b><button className="outline-btn" disabled={!items.length||busy} onClick={()=>setItems([])}>Vider le lot</button></div>
   <button className="primary-btn" disabled={!items.length||busy} onClick={analyze}>{busy?<><LoaderCircle/> Analyse en cours…</>:<><Sparkles/> Analyser et dispatcher automatiquement</>}</button>
  </section>
  {items.length>0&&<section className="table-card" style={{padding:16,display:'grid',gap:10}}><div className="table-title">Résultats de l’analyse — vérifie les exceptions</div>
   {items.map((x,i)=><article key={i} className="resource-row" style={{alignItems:'flex-start'}}><div className="file-icon"><FileUp/></div><div className="resource-title" style={{flex:1,minWidth:0}}><b>{x.file.name}</b><small>{(x.file.size/1024/1024).toFixed(2)} Mo · {Math.round(x.confidence*100)} % de confiance · {x.review?'À vérifier':'Proposition automatique'}</small>
    <input className="toolbar-select" value={x.title} onChange={e=>update(i,'title',e.target.value)} aria-label="Titre"/>
    <div className="page-toolbar"><select className="toolbar-select" value={x.level} onChange={e=>update(i,'level',e.target.value)}><option value="">Classe / niveau à confirmer</option>{levels.map(s=><option key={s}>{s}</option>)}</select><input className="toolbar-select" type="number" placeholder="Année" value={x.year} onChange={e=>update(i,'year',e.target.value)}/><select className="toolbar-select" value={x.subject} onChange={e=>update(i,'subject',e.target.value)}><option value="">Matière à confirmer</option>{subjects.map(s=><option key={s}>{s}</option>)}</select><select className="toolbar-select" value={x.kind} onChange={e=>update(i,'kind',e.target.value)}><option value="exam_paper">Épreuve / annale</option><option value="correction">Corrigé</option><option value="curriculum">Programme</option><option value="manual">Cours / support</option><option value="book">Livre</option><option value="other">Autre</option></select></div>
    {x.reasons.map((r,j)=><small key={j}>{r}</small>)}{x.message&&<small>{x.message}</small>}
   </div><div style={{display:'grid',gap:6,justifyItems:'end'}}>{x.state==='done'?<CheckCircle2 color="green"/>:x.state==='analyzing'||x.state==='uploading'?<LoaderCircle/>:x.state==='error'?<AlertCircle color="crimson"/>:<button className="outline-btn" onClick={()=>remove(i)} aria-label="Retirer"><Trash2 size={15}/></button>}</div></article>)}
   <button className="primary-btn" disabled={busy||!items.some(x=>x.state==='ready'||x.state==='error')} onClick={start}>{busy?<><LoaderCircle/> Import en cours…</>:<><FileUp/> Importer les fichiers en brouillon</>}</button>
  </section>}
  {notice&&<div className="notice" role="status">{notice}</div>}
  <small className="muted">L’analyse lit le texte extrait des PDF (jusqu’aux 12 premières pages). Les scans sans couche texte sont détectés et marqués pour contrôle : l’OCR sera ajouté dans une étape dédiée. Le système ne devine pas les champs manquants et n’auto-publie jamais.</small>
 </div>;
}
