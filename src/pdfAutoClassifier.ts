import * as pdfjsLib from 'pdfjs-dist';
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export type Classification = { title:string; level:string; year:string; subject:string; kind:string; confidence:number; reasons:string[]; review:boolean; extractedChars:number };
const LEVELS=['CM2','CM1','CE2','CE1','CP','CI','6e','5e','4e','3e','Seconde','Première','Terminale','Université'];
const SUBJECTS=[
['Communication écrite',/communication\s+écrite|expression\s+écrite|rédaction/i],
['Lecture',/lecture|compréhension\s+(?:de\s+)?texte/i],
['Mathématiques',/mathématiques|maths|calcul\s+et\s+problèmes/i],
['Éducation sociale',/éducation\s+sociale|histoire\s+géo/i],
['Éducation scientifique et technologique (EST)',/éducation\s+scientifique|technologique|\best\b|sciences\s+et\s+technologie/i],
['Éducation artistique (EA)',/éducation\s+artistique|\bea\b|arts\s+plastiques/i],
['Éducation physique et sportive (EPS)',/éducation\s+physique|\beps\b|sportive/i],
['Français',/français|grammaire|conjugaison|orthographe/i],
['Physique-Chimie',/physique.?chimie|physique|chimie/i],
['SVT',/\bsvt\b|sciences\s+de\s+la\s+vie/i],
['Histoire-Géographie',/histoire.?géographie|géographie/i],
['Anglais',/anglais|english/i]
] as const;
function clean(s:string){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
export async function extractPdfText(file:File):Promise<string>{
 const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;let out='';
 for(let i=1;i<=Math.min(pdf.numPages,12);i++){const page=await pdf.getPage(i);const tc=await page.getTextContent();out+=' '+tc.items.map((x:any)=>x.str||'').join(' ');}
 return out.slice(0,30000);
}
export function classifyPdf(filename:string,text:string):Classification{
 const title=filename.replace(/\.pdf$/i,'').replace(/[_.-]+/g,' ').trim();const raw=(title+' '+text.slice(0,12000)).toLowerCase();const source=clean(raw);const reasons:string[]=[];
 const levels=LEVELS.filter(l=>new RegExp('(^|\\W)'+clean(l)+'($|\\W)','i').test(source));let level='',year='',subject='',kind='other',confidence=0;
 if(levels.length===1){level=levels[0];confidence+=0.38;reasons.push('Classe repérée : '+level);}else if(levels.length>1)reasons.push('Plusieurs niveaux repérés : '+levels.join(', '));
 const ym=source.match(/\b(19\d{2}|20\d{2})\b/);if(ym){year=ym[0];confidence+=0.2;reasons.push('Année repérée : '+year);}
 const matched=SUBJECTS.filter(([,rx])=>rx.test(raw));if(matched.length===1){subject=matched[0][0];confidence+=0.22;reasons.push('Matière repérée : '+subject);}else if(matched.length>1)reasons.push('Plusieurs matières repérées : '+matched.map(x=>x[0]).join(', '));
 if(/corrig[eé]|solutionnaire|proposition\s+de\s+correction|réponses?\s+attendues/.test(raw)){kind='correction';confidence+=0.16;reasons.push('Type : corrigé');}
 else if(/programme\s+(?:officiel|d.?étude)|curriculum/.test(raw)){kind='curriculum';confidence+=0.16;reasons.push('Type : programme');}
 else if(/manuel|support\s+de\s+cours|cours\s+de/.test(raw)){kind='manual';confidence+=0.12;reasons.push('Type : cours/support');}
 else if(/épreuve|examen|annale|session|composé/.test(raw)){kind='exam_paper';confidence+=0.12;reasons.push('Type : épreuve/annale');}
 const extractedChars=text.trim().length;if(extractedChars<80){confidence=Math.min(confidence,0.25);reasons.push('PDF scanné ou sans texte exploitable : OCR nécessaire');}
 confidence=Math.min(0.98,confidence);const review=confidence<0.72||!level||!year||!subject||levels.length>1||matched.length>1||extractedChars<80;
 return {title,level,year,subject,kind,confidence,reasons,review,extractedChars};
}
